/* ============================================================================
 * KMA Policy Intelligence Viewer
 * ----------------------------------------------------------------------------
 * - Loads policy + chunks from Flask (which proxies Odoo).
 * - Renders PDFs with PDF.js to a <canvas>, with prev/next/zoom controls.
 * - Highlight overlay aligns with the canvas, not a floating iframe.
 * =========================================================================== */

// PDF.js worker — must be set before any getDocument() call.
if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// ── CONFIG (injected from template) ──────────────────────────────────────────
const CFG = window.KMA_CONFIG || {};
const FLASK_BASE = (CFG.flaskBase || '').replace(/\/$/, '');
const POLICY_ID  = CFG.policyId || 1;

// ── STATE ────────────────────────────────────────────────────────────────────
const state = {
  allChunks: [],
  pdfFiles: [],
  activeFilter: { type: 'all', value: null },
  searchTerm: '',
  policy: {},

  // PDF.js
  pdfDoc: null,
  currentPdfUrl: null,
  currentPage: 1,
  totalPages: 0,
  zoom: 1.2,
  rendering: false,
  pendingPage: null,
};

const CLASS_DOT = {
  'Area': 'dot-area',
  'Emissions': 'dot-em',
  'Environment Quality': 'dot-eq',
  'Knowledge Resource': 'dot-kr',
  'Miscellaneous': 'dot-misc',
  'Policy Action': 'dot-poa',
  'Practical Resource': 'dot-pr',
  'Site Status': 'dot-site',
  'Spending': 'dot-sp',
};

const LEVEL_DOTS = {
  'Policy Action': 'dot-pa',
  'Policy Outcome': 'dot-po',
  'Unsure': 'dot-un',
};

// ── DOM ──────────────────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

// ── API HELPERS ──────────────────────────────────────────────────────────────
async function apiGet(path) {
  const res = await fetch(`${FLASK_BASE}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ── INIT ─────────────────────────────────────────────────────────────────────
async function init() {
  try {
    const [policy, chunkData] = await Promise.all([
      apiGet(`/api/policy/${POLICY_ID}`),
      apiGet(`/api/policy/${POLICY_ID}/chunks?limit=2000`),
    ]);

    state.policy    = policy;
    state.allChunks = chunkData.chunks || [];
    state.pdfFiles  = policy.pdf_files || [];

    renderTopbar(policy);
    renderSidebar();
    renderChunks(state.allChunks);
    wireUpControls();

    if (state.pdfFiles.length > 0) {
      $('pdfName').textContent = state.pdfFiles[0].name;
      // Load (but don't render until a chunk is clicked)
      loadPdf(state.pdfFiles[0]);
    }
  } catch (e) {
    $('chunksWrap').innerHTML = `
      <div class="empty">
        <div class="empty-icon">⚠️</div>
        <div class="empty-title">Could not load data</div>
        <div class="empty-sub">
          ${escHtml(e.message)}<br><br>
          Try <code>?policy_id=1</code> in the URL, or check Flask logs.
        </div>
      </div>`;
  }
}

// ── TOPBAR ───────────────────────────────────────────────────────────────────
function renderTopbar(p) {
  $('policyTitle').textContent = p.name || 'Untitled policy';
  const metas = [
    p.country      && `<div class="meta-tag">🌍 <b>${escHtml(p.country)}</b></div>`,
    p.year_from    && `<div class="meta-tag">📅 <b>${escHtml(p.year_from)}${p.year_to ? '–' + escHtml(p.year_to) : ''}</b></div>`,
    p.policy_level && `<div class="meta-tag">🏛 <b>${escHtml(p.policy_level)}</b></div>`,
    p.chunk_count  && `<div class="meta-tag">📄 <b>${p.chunk_count}</b> sentences</div>`,
  ].filter(Boolean).join('');
  const pppage = `<a href="/policy/${POLICY_ID}" target="_blank" style="text-decoration: none; color: white;"><button class="meta-tag btn btn-success">↖ Policy Profile</a></button>`;
  $('policyMeta').innerHTML = [pppage, metas].join('');
}

// ── SIDEBAR ──────────────────────────────────────────────────────────────────
function renderSidebar() {
  const levelCounts = {};
  const classCounts = {};
  state.allChunks.forEach((c) => {
    levelCounts[c.level] = (levelCounts[c.level] || 0) + 1;
    classCounts[c.class] = (classCounts[c.class] || 0) + 1;
  });

  let html = `
    <div class="filter-section">
      <span class="filter-label">Levels</span>
      <div class="f-btn active" data-filter-type="all" data-filter-value="">
        <div class="f-left"><div class="f-dot dot-all"></div>All Sentences</div>
        <div class="f-count">${state.allChunks.length}</div>
      </div>`;

  Object.entries(levelCounts).sort().forEach(([lvl, cnt]) => {
    html += `
      <div class="f-btn" data-filter-type="level" data-filter-value="${escAttr(lvl)}">
        <div class="f-left">
          <div class="f-dot ${LEVEL_DOTS[lvl] || 'dot-all'}"></div>${escHtml(lvl)}
        </div>
        <div class="f-count">${cnt}</div>
      </div>`;
  });

  html += `</div><div class="filter-section"><span class="filter-label">Classes</span>`;

  Object.entries(classCounts).sort().forEach(([cls, cnt]) => {
    html += `
      <div class="f-btn" data-filter-type="class" data-filter-value="${escAttr(cls)}">
        <div class="f-left">
          <div class="f-dot ${CLASS_DOT[cls] || 'dot-all'}"></div>${escHtml(cls)}
        </div>
        <div class="f-count">${cnt}</div>
      </div>`;
  });

  html += `</div>`;
  $('filterArea').innerHTML = html;

  // Wire filter buttons (event delegation)
  $('filterArea').addEventListener('click', (e) => {
    const btn = e.target.closest('.f-btn');
    if (!btn) return;
    document.querySelectorAll('.f-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    state.activeFilter = {
      type:  btn.dataset.filterType,
      value: btn.dataset.filterValue || null,
    };
    applyFilters();
  });
}

// ── CHUNK LIST ───────────────────────────────────────────────────────────────
function getTagClass(level) {
  if (level === 'Policy Action')  return 'tag-level-pa';
  if (level === 'Policy Outcome') return 'tag-level-po';
  return 'tag-level-un';
}

function renderChunks(chunks) {
  const wrap = $('chunksWrap');
  if (!chunks.length) {
    wrap.innerHTML = `
      <div class="empty">
        <div class="empty-icon">🔍</div>
        <div class="empty-title">No sentences found</div>
        <div class="empty-sub">Try a different filter or search term.</div>
      </div>`;
    return;
  }

  wrap.innerHTML = chunks.map((c, i) => `
    <div class="card ${i === 0 ? 'active' : ''}"
         id="card-${c.id}"
         data-chunk-id="${c.id}"
         data-page="${c.page}">
      <div class="card-top">
        <div class="card-page">Page ${c.page}</div>
        <div class="card-tags">
          <div class="tag ${getTagClass(c.level)}">${escHtml(c.level)}</div>
          <div class="tag tag-class">${escHtml(c.class)}</div>
          ${c.has_metric ? '<div class="kpi-badge">KPI</div>' : ''}
        </div>
      </div>
      <div class="card-text truncated">${escHtml(c.text)}</div>
      <div class="card-foot">
        <div class="conf-bars">
          <div class="conf">
            Lv
            <div class="conf-bar"><div class="conf-fill" style="width:${Math.round(c.lv_confidence * 100)}%"></div></div>
            ${Math.round(c.lv_confidence * 100)}%
          </div>
          <div class="conf">
            Cl
            <div class="conf-bar"><div class="conf-fill" style="width:${Math.round(c.cl_confidence * 100)}%"></div></div>
            ${Math.round(c.cl_confidence * 100)}%
          </div>
        </div>
        <div class="view-src">View in PDF →</div>
      </div>
    </div>
  `).join('');

  // Wire card clicks (event delegation)
  wrap.onclick = (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    document.querySelectorAll('.card').forEach((c) => c.classList.remove('active'));
    card.classList.add('active');
    const page = parseInt(card.dataset.page, 10) || 1;
    goToPage(page);
  };

  // Auto-open the first one
  if (chunks.length > 0) {
    goToPage(chunks[0].page);
  }
}

// ── FILTERS / SEARCH ─────────────────────────────────────────────────────────
function applyFilters() {
  let filtered = state.allChunks;
  if (state.activeFilter.type === 'level') {
    filtered = filtered.filter((c) => c.level === state.activeFilter.value);
  }
  if (state.activeFilter.type === 'class') {
    filtered = filtered.filter((c) => c.class === state.activeFilter.value);
  }
  if (state.searchTerm) {
    const q = state.searchTerm;
    filtered = filtered.filter((c) =>
      (c.text || '').toLowerCase().includes(q) ||
      (c.level || '').toLowerCase().includes(q) ||
      (c.class || '').toLowerCase().includes(q)
    );
  }
  renderChunks(filtered);
}

// ── PDF (PDF.js) ─────────────────────────────────────────────────────────────
async function loadPdf(pdfFile) {
  if (!window.pdfjsLib) {
    toast('PDF.js failed to load');
    return;
  }

  // Build the Flask-proxied URL. Server expects /api/pdf/<attachment_id>.
  // If the Odoo response gives a full URL instead, the file object must
  // include attachment_id (preferred) or we fall back to the raw url.
  let pdfUrl;
  if (pdfFile.attachment_id) {
    pdfUrl = `${FLASK_BASE}/api/pdf/${pdfFile.attachment_id}`;
  } else if (pdfFile.url) {
    // Fallback — only works if same-origin / CORS allows it.
    pdfUrl = pdfFile.url;
  } else {
    toast('PDF has no URL');
    return;
  }

  state.currentPdfUrl = pdfUrl;
  $('pdfEmpty').classList.remove('hidden');
  $('pdfCanvasWrap').classList.remove('ready');

  try {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    state.pdfDoc = await loadingTask.promise;
    state.totalPages = state.pdfDoc.numPages;
    $('totPage').textContent = state.totalPages;
    $('pdfEmpty').classList.add('hidden');
    $('pdfCanvasWrap').classList.add('ready');
    await renderPage(state.currentPage || 1);
  } catch (e) {
    console.error('PDF load failed', e);
    $('pdfEmpty').innerHTML = `
      <div class="empty-icon">⚠️</div>
      <div class="empty-title">Could not load PDF</div>
      <div class="empty-title">This issue will be resolved in the next update. In the meantime, please explore the identified excerpts themselves.</div>
      <div class="empty-sub">${escHtml(e.message || String(e))}</div>`;
  }
}

async function renderPage(pageNum) {
  if (!state.pdfDoc) return;
  if (state.rendering) {
    // Queue the latest requested page; current render will pick it up after.
    state.pendingPage = pageNum;
    return;
  }
  state.rendering = true;

  const clamped = Math.max(1, Math.min(pageNum, state.totalPages));
  state.currentPage = clamped;
  $('curPage').textContent = clamped;
  $('prevPage').disabled = clamped <= 1;
  $('nextPage').disabled = clamped >= state.totalPages;

  try {
    const page = await state.pdfDoc.getPage(clamped);
    const canvas = $('pdfCanvas');
    const ctx = canvas.getContext('2d');
    const wrap = $('pdfCanvasWrap');

    // --- FIX: Force-constrain the wrapper layout on desktop view ---
    if (window.innerWidth > 800 && wrap) {
      // Find out how much vertical space the main layout block has
      const mainLayout = $('mainLayout');
      if (mainLayout) {
        const availableHeight = mainLayout.getBoundingClientRect().height;
        // Keep the wrapper slightly shorter than the layout to account for headers/controls
        wrap.style.maxHeight = `${availableHeight - 60}px`;
        wrap.style.overflow = 'auto'; 
      }
    }

    // DPI-aware rendering for crisp text
    const dpr = window.devicePixelRatio || 1;
    const viewport = page.getViewport({ scale: state.zoom });
    canvas.width  = Math.floor(viewport.width  * dpr);
    canvas.height = Math.floor(viewport.height * dpr);
    canvas.style.width  = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;

    const renderCtx = {
      canvasContext: ctx,
      viewport,
      transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null,
    };
    await page.render(renderCtx).promise;

    // Generic highlight (no bbox available); positioned over upper-middle
    const hl = $('highlight');
    hl.style.display = 'block';
    hl.style.top  = '15%';
    hl.style.left = '8%';
    hl.style.width  = '84%';
    hl.style.height = '8%';
  } catch (e) {
    console.error('Render failed', e);
    toast(`Could not render page ${clamped}`);
  } finally {
    state.rendering = false;
    if (state.pendingPage && state.pendingPage !== clamped) {
      const next = state.pendingPage;
      state.pendingPage = null;
      renderPage(next);
    }
  }
}

function goToPage(pageNum) {
  $('pdfPg').textContent = `Page ${pageNum}`;
  if (state.pdfDoc) renderPage(pageNum);
  else state.currentPage = pageNum;  // remember for when PDF finishes loading
}

// ── CONTROLS ─────────────────────────────────────────────────────────────────
function wireUpControls() {
  $('prevPage').addEventListener('click', () => goToPage(state.currentPage - 1));
  $('nextPage').addEventListener('click', () => goToPage(state.currentPage + 1));
  $('zoomIn').addEventListener('click', () => {
    state.zoom = Math.min(state.zoom + 0.2, 3.0);
    renderPage(state.currentPage);
  });
  $('zoomOut').addEventListener('click', () => {
    state.zoom = Math.max(state.zoom - 0.2, 0.5);
    renderPage(state.currentPage);
  });

  $('searchInput').addEventListener('input', (e) => {
    state.searchTerm = (e.target.value || '').toLowerCase();
    applyFilters();
  });

  // Keyboard nav for PDF
  document.addEventListener('keydown', (e) => {
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft')  goToPage(state.currentPage - 1);
    if (e.key === 'ArrowRight') goToPage(state.currentPage + 1);
  });
}

// ── UTILS ────────────────────────────────────────────────────────────────────
function escHtml(t) {
  return String(t == null ? '' : t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escAttr(t) {
  return escHtml(t).replace(/"/g, '&quot;');
}
function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

// ── GO ───────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
