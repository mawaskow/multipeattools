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

const bogSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:bnm_reproj", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bogLayer= new ImageLayer({
    source:bogSource,
    // @ts-ignore
    name:'Bogs'
});

const ipolSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:gi_pol", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ipolLayer= new ImageLayer({
    source:ipolSource,
    // @ts-ignore
    name:'IrishPolicies'
});

const osmLayer=new TileLayer({
    source:new OSM(),
    // @ts-ignore
    name:'Basemap'
});

const view=new View({
    extent:[-1189593, 6692152.5, -665102.8125, 7450535],
    center:[0,0],
    zoom:0,
    projection: mapProjection
});

const map=new Map({
    target:"map",
    layers:[osmLayer, bogLayer, ipolLayer],
    view:view
});

$('#map').data('map',map);