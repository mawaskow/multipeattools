/*
import 'ol/ol.css'
//import Map from 'https://cdn.skypack.dev/ol/Map.js';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import {Image as ImageLayer} from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';
import TileWMS from 'ol/source/TileWMS'
import Projection from 'ol/proj/Projection';
*/

import Map from 'https://cdn.skypack.dev/ol/Map.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import ImageLayer from 'https://cdn.skypack.dev/ol/layer/Image.js';
import ImageWMS from 'https://cdn.skypack.dev/ol/source/ImageWMS.js';
import TileWMS from 'https://cdn.skypack.dev/ol/source/TileWMS.js';
import Projection from 'https://cdn.skypack.dev/ol/proj/Projection.js';

const serverURL="http://multipeat.insight-centre.org/geoserver/wms";

const mapProjection=new Projection({
    code:'EPSG:3857',
    units:'m',
    axisOrientation:'neu',
    global:false
});

const bnmSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:bnm_reproj", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bnmLayer= new ImageLayer({
    source:bnmSource,
    // @ts-ignore
    name:'Bord_na_Mona'
});

const IESource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:dipm", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const IELayer= new ImageLayer({
    source:IESource,
    // @ts-ignore
    name:'Irish_Peatlands'
});

const PSSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:proj_sites", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const PSLayer= new ImageLayer({
    source:PSSource,
    // @ts-ignore
    name:'Project_Sites'
});

const D1Source=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:dipm1", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const D1Layer= new ImageLayer({
    source:D1Source,
    // @ts-ignore
    name:'Raised_Bog'
});

const D2Source=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:dipm2", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const D2Layer= new ImageLayer({
    source:D2Source,
    // @ts-ignore
    name:'LL_Atlantic_Bog'
});

const D3Source=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:dipm3", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const D3Layer= new ImageLayer({
    source:D3Source,
    // @ts-ignore
    name:'HL_Montane_Bog'
});

const ipolSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:geo_pol", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ipolLayer= new ImageLayer({
    source:ipolSource,
    // @ts-ignore
    name:'Policies'
});

const osmLayer=new TileLayer({
    source:new OSM(),
    // @ts-ignore
    name:'Basemap'
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
    layers:[osmLayer, IELayer, D1Layer, D2Layer, D3Layer, PSLayer, ipolLayer, bnmLayer],
    view:view
});

$('#map').data('map',map);