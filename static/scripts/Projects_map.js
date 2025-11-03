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
    center:[2000000, 7500000],
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
const projs_lst = [];
const projs_div = $('#map-projs-div');
projs_div.html('');
ProjectSource.on('featuresloadend', function() {
    ProjectSource.getFeatures().forEach(f =>{
        var projname = f.get("project");
        if(!(projname ==null)&!(f.get("life_reference")==null)){
            if(!(projs_lst.includes(projname))){
                var projlink = f.get('proj_link');
                if(projlink == null){
                    projlink = '';
                }else{
                    projlink = `<p>${projlink}</p>`
                };
                var element = `<div style="padding: 5px;">
                    <h5>${f.get("project")}</h5>
                    <p>${f.get("life_reference")}</p>
                    <p>${f.get("start_yr")}-${f.get("end_yr")}</p>
                    ${projlink}
                    <hr>
                </div>`;
                projs_div.append(element);
                projs_lst.push(projname);
            }
        }
    });
});

///////////////////////////////////////////////////////////////////////
// handle clicks on map

project_map.on('singleclick', function (evt) {
  project_map.forEachFeatureAtPixel(evt.pixel, function (clickedFeature) {
    const clickedProject = clickedFeature.get('project');
    const clickedSite = clickedFeature.get('name');
    ProjectSource.getFeatures().forEach(f => {
        let icon;
        if (f === clickedFeature) {
        icon = activeIcon;
        //
        projs_div.html('');
        var projlink = f.get('proj_link');
        if(projlink == null){
            projlink = '';
        }else{
            projlink = `<p>${projlink}</p>`
        };
        var element = `<div style="padding: 5px;">
            <h5>${f.get("project")}</h5>
            <p>${f.get("life_reference")}</p>
            <p>${f.get("start_yr")}-${f.get("end_yr")}</p>
            ${projlink}
            <hr>
        </div>`;
        projs_div.append(element);
        } else if (f.get('project') === clickedProject) {
        icon = projIcon;
        } else {
        icon = baseIcon;
        }
        f.setStyle(iconStyle(icon));
        //
    });
  });
});

/////////////////////////////////////////////////////////