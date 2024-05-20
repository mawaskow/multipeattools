import Map from 'https://cdn.skypack.dev/ol/Map.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import ImageLayer from 'https://cdn.skypack.dev/ol/layer/Image.js';
import ImageWMS from 'https://cdn.skypack.dev/ol/source/ImageWMS.js';
import Projection from 'https://cdn.skypack.dev/ol/proj/Projection.js';

const serverURL="https://multipeat.insight-centre.org/geoserver/wms";

const mapProjection=new Projection({
    code:'EPSG:3857',
    units:'m',
    axisOrientation:'neu',
    global:false
});

// Project Sites Resource
const PSSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:proj_sites", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const PSLayer= new ImageLayer({
    source:PSSource,
    // @ts-ignore
    name:'Project_Sites',
    display: 'Project Sites',
    region: 'International'
});

// Irish Peat Classes
const D1Source=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:dipm1", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const D1Layer= new ImageLayer({
    source:D1Source,
    // @ts-ignore
    name:'Raised_Bog',
    display: 'Raised Bog',
    region: 'Ireland'
});

const D2Source=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:dipm2", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const D2Layer= new ImageLayer({
    source:D2Source,
    // @ts-ignore
    name:'LL_Atlantic_Bog',
    display: 'LL Atlantic Bog',
    region: 'Ireland'
});

const D3Source=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:dipm3", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const D3Layer= new ImageLayer({
    source:D3Source,
    // @ts-ignore
    name:'HL_Montane_Bog',
    display: 'HL Montane Bog',
    region: 'Ireland'
});

// Countries
const ctrySource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:countries", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ctryLayer= new ImageLayer({
    source:ctrySource,
    // @ts-ignore
    name:null,
    display: 'Countries'
});

// Policies
const ipolSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:geo_pol", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ipolLayer= new ImageLayer({
    source:ipolSource,
    // @ts-ignore
    name:null,
    display: 'Policies'
});

// Polish Alkaline Fens
const alkFenSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:pl_alk_fen", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const alkFenLayer= new ImageLayer({
    source:alkFenSource,
    // @ts-ignore
    name:'PL_Alk_Fens',
    display: 'Alkaline Fens',
    region: 'Poland'
});

// CORINE-18 data for PL and IE for 411, 412, and 322
const corineSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:corine18", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const corineLayer= new ImageLayer({
    source:corineSource,
    // @ts-ignore
    name:'Corine18',
    display: 'CORINE',
    region: 'International'
});

const osmLayer=new TileLayer({
    source:new OSM(),
    // @ts-ignore
    name: null,
    display: 'Basemap'
});

const view=new View({
    //extent:[-1189593, 6692152.5, -665102.8125, 7450535], // ireland
    extent:[-2005155, 3723095, 3711745, 8600839], // europe
    center:[-816308.25,7051300.85],
    zoom:7.5,
    projection: mapProjection
});

const map=new Map({
    target:"map",
    layers:[osmLayer, corineLayer, D1Layer, D2Layer, D3Layer, PSLayer, ctryLayer, ipolLayer, alkFenLayer],
    view:view
});

$('#map').data('map',map);