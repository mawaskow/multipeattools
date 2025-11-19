import Map from 'https://cdn.skypack.dev/ol/Map.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import VectorLayer from 'https://cdn.skypack.dev/ol/layer/Vector.js';
import VectorSource from 'https://cdn.skypack.dev/ol/source/Vector.js';
import Projection from 'https://cdn.skypack.dev/ol/proj/Projection.js';
import Feature from 'https://cdn.skypack.dev/ol/Feature.js';
import Point from 'https://cdn.skypack.dev/ol/geom/Point.js';
import {Icon, Style} from 'https://cdn.skypack.dev/ol/style.js';
import {fromLonLat} from 'https://cdn.skypack.dev/ol/proj.js';
import GeoJSON from 'https://cdn.skypack.dev/ol/format/GeoJSON.js';

//////////////////
//              //
// PROJECTS MAP //
//              //
//////////////////

const serverURL="https://multipeat.insight-centre.org/geoserver/wms";

const baseIcon = '/static/icon-loc-def.png';
const activeIcon = '/static/icon-loc-act.png';
const projIcon = '/static/icon-loc-proj.png';

const iconStyle = (src) => new Style({
  image: new Icon({
    src: src,
    scale: 0.75,
    anchor: [0.5, 1],
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    // size: [20, 20]
  })
});

const mapProjection=new Projection({
    code:'EPSG:3857',
    units:'m',
    axisOrientation:'neu',
    global:false
});

const osmLayer=new TileLayer({
    source:new OSM(),
    //preload: 0,
    // @ts-ignore
    name: 'Basemap',
    region: 'International',
    cluster: 'Basemap',
    display: 'OSM Basemap'
});

const ProjectSource = new VectorSource({
  url: serverURL.replace('/wms', '/wfs') +
       '?service=WFS&version=1.1.0&request=GetFeature' +
       '&typename=multipeat:project_map_data' +
       '&outputFormat=application/json',
  format: new GeoJSON()
});

const ProjectLayer = new VectorLayer({
  source: ProjectSource,
  style: new Style({
    image: new Icon({
        src: baseIcon,
        scale: 0.75,
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
    })
  })
});

const proj_view=new View({
    // left bottom right top
    //extent:[-2010000, 3800000, 3800000, 11500000], // europe
    extent:[-4000000, 3500000, 7000000, 13000000], // europe and EEA countries
    center:[2000000, 6000000],
    zoom:0,
    projection: mapProjection
});

const project_map=new Map({
    target:"project_map",
    layers:[osmLayer, ProjectLayer],
    view:proj_view
});

// make map
$('#project_map').data('project_map', project_map);

/////////////////////////////////////////////////////////////////////
// populate sidebar with project info
function proj_div_pop_all() {
  const projs_div = $('#map-projs-div');
  const seen = new Set();
  projs_div.html('');

  ProjectSource.getFeatures().forEach(f => {
    const projname = f.get('project');
    const ref = f.get('life_reference');
    if (!projname || !ref) return;
    if (seen.has(projname)) return;
    seen.add(projname);

    let projlink = f.get('proj_link') || '';
    if (projlink) projlink = `<p>${projlink}</p>`;

    const element = $(`
      <div class="proj-item" data-proj="${projname}" style="padding:5px; cursor:pointer;">
        <h5>${projname}</h5>
        <p>${ref}</p>
        <p>${f.get('start_yr')}-${f.get('end_yr')}</p>
        ${projlink}
        <hr>
      </div>
    `);

    projs_div.append(element);
  });

  // click handler: recolor features to pink for selected project
  $('.proj-item').on('click', function () {
    const selProj = $(this).data('proj');
    ProjectSource.getFeatures().forEach(f => {
      const icon =
        f.get('project') === selProj ? '/static/icon-loc-proj.png' : '/static/icon-loc-def.png';
      f.setStyle(iconStyle(icon));
    });
  });
}

// single project
function show_single_project(f) {
  const projs_div = $('#map-projs-div');
  projs_div.html('');

  let projlink = f.get('proj_link') || '';
  if (projlink) projlink = `<p>${projlink}</p>`;

  const element = $(`
    <div style="padding:5px;">
      <h5>${f.get('project')}</h5>
      <p>${f.get('life_reference')}</p>
      <p>${f.get('start_yr')}-${f.get('end_yr')}</p>
      ${projlink}
      <p><b>Site:</b> ${f.get('name')}</p>
      <hr>
      <button id="return_all_proj_btn" class="btn btn-success" style="cursor:pointer;">Return to all projects</button>
    </div>
  `);

  projs_div.append(element);
  $('#return_all_proj_btn').on('click', function () {
    // reset styles and repopulate
    ProjectSource.getFeatures().forEach(f => f.setStyle(iconStyle('/static/icon-loc-def.png')));
    proj_div_pop_all();
  });
}
///////////////////////////////////////////////////////////////////////
// handle clicks on map

project_map.on('singleclick', function (evt) {
  project_map.forEachFeatureAtPixel(evt.pixel, function (clickedFeature) {
    const clickedProject = clickedFeature.get('project');
    ProjectSource.getFeatures().forEach(f => {
      let icon;
      if (f === clickedFeature) {
        icon = '/static/icon-loc-act.png';
        show_single_project(f);
      } else if (f.get('project') === clickedProject) {
        icon = '/static/icon-loc-proj.png';
      } else {
        icon = '/static/icon-loc-def.png';
      }
      f.setStyle(iconStyle(icon));
    });
  });
});

ProjectSource.once('featuresloadend', proj_div_pop_all);
/////////////////////////////////////////////////////////