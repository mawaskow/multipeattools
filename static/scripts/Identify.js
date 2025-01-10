import Overlay from 'https://cdn.skypack.dev/ol/Overlay.js';
import {toLonLat} from 'https://cdn.skypack.dev/ol/proj.js';
import {toStringHDMS} from 'https://cdn.skypack.dev/ol/coordinate.js';
import {getLayerByName} from './customFunctions.js'
//import { get } from 'jquery';

const map=$('#map').data('map');

/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

const key = 'Get your own API key at https://www.maptiler.com/cloud/';
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';


map.addOverlay(overlay);

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));

  const view=map.getView();
  const resolution=view.getResolution();
  const projection=view.getProjection();

  // project sites
  const PSInfo=$('#PS-info');
  PSInfo.html('');
  // irish
  const ieInfo=$('#ie-info');
  ieInfo.html('');
  // polish alk fens
  const PlAlkFenInfo=$('#PlAlkFen-info');
  PlAlkFenInfo.html('');
  // alkaline fens
  const pltInfo=$('#plt-info');
  pltInfo.html('');
  // corine-18
  const corineInfo=$('#corine-info');
  corineInfo.html('');
  // nl-soiltypes
  const nlsInfo=$('#nls-info');
  nlsInfo.html('');
  // de-peatlands
  const detInfo=$('#det-info');
  detInfo.html('');
  // be-flanders
  const befInfo=$('#bef-info');
  befInfo.html('');
  // be-wallonia
  const bewInfo=$('#bew-info');
  bewInfo.html('');
  // be-wallonia
  const eeInfo=$('#ee-info');
  eeInfo.html('');
  // be-wallonia
  const fiInfo=$('#fi-info');
  fiInfo.html('');
  // default
  const noFeatures=$('#no-features');
  noFeatures.html('<p>No features</p>');

  const PSLayer=getLayerByName('Project_Sites');
  const PSSource=PSLayer.getSource();
  const PSUrl=PSSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(PSUrl){
        $.ajax({
            url:PSUrl,
            method:'GET',
            success:function(result){
                const PS=result.features[0];
                if(PS){
                    const Sname=PS.properties.site_name;
                    const Pname=PS.properties.proj_name;

                    PSInfo.html(`<h5>Project Info</h5> 
                        <p>Site Name: ${Sname}</p>
                        <p>Project Name: ${Pname}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

  const ieLayer=getLayerByName('IE_dipm');
  const ieSource=ieLayer.getSource();
  const ieUrl=ieSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(ieUrl){
        $.ajax({
            url:ieUrl,
            method:'GET',
            success:function(result){
                const ie=result.features[0];
                if(ie){
                    const iegc=ie.properties.site_type;

                    ieInfo.html(`<p>Site Type: ${iegc}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

  const PlAlkFenLayer=getLayerByName('PL_Alk_Fens');
  const PlAlkFenSource=PlAlkFenLayer.getSource();
  const PlAlkFenUrl=PlAlkFenSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(PlAlkFenUrl){
        $.ajax({
            url:PlAlkFenUrl,
            method:'GET',
            success:function(result){
                const PlAlkFen=result.features[0];
                if(PlAlkFen){
                    const PlAlkFenName=PlAlkFen.properties.nazwa_ob;

                    PlAlkFenInfo.html(`<p>Nazwa (Name): ${PlAlkFenName}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

const pltLayer=getLayerByName('PL_Torf');
const pltSource=pltLayer.getSource();
const pltUrl=pltSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(pltUrl){
        $.ajax({
            url:pltUrl,
            method:'GET',
            success:function(result){
                const plt=result.features[0];
                if(plt){
                    const pltTyp=plt.properties.TYP_NAZWA
                    const pltRos=plt.properties.ROS_NAZWA;

                    pltInfo.html(`<p>Typ: ${pltTyp}</p>
                        <p>Ros: ${pltRos}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

  const corineLayer=getLayerByName('Corine18');
  const corineSource=corineLayer.getSource();
  const corineUrl=corineSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(corineUrl){
        $.ajax({
            url:corineUrl,
            method:'GET',
            success:function(result){
                const corine=result.features[0];
                if(corine){
                    const corineName=corine.properties.site_type;

                    corineInfo.html(`<p>CORINE-18 Class: ${corineName}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

  const nlsLayer=getLayerByName('NL_Peat_Soils');
  const nlsSource=nlsLayer.getSource();
  const nlsUrl=nlsSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(nlsUrl){
        $.ajax({
            url:nlsUrl,
            method:'GET',
            success:function(result){
                const nls=result.features[0];
                if(nls){
                    const soilType=nls.properties.en_soil;

                    nlsInfo.html(`<p>Soil Type: ${soilType}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

  const detLayer=getLayerByName('DE_Peatlands');
  const detSource=detLayer.getSource();
  const detUrl=detSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(detUrl){
        $.ajax({
            url:detUrl,
            method:'GET',
            success:function(result){
                const det=result.features[0];
                if(det){
                    const subst=det.properties.genesis;
                    const thick=det.properties.thickness;

                    detInfo.html(`<p>Substrate: ${subst}</p>
                        <p>Thickness: ${thick}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }
  
  const befLayer=getLayerByName('BE_Fland_Peatlands');
  const befSource=befLayer.getSource();
  const befUrl=befSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(befUrl){
        $.ajax({
            url:befUrl,
            method:'GET',
            success:function(result){
                const bef=result.features[0];
                if(bef){
                    const val=bef.properties.VALUE;
                    befInfo.html(`<p>Soil Type: Peat</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }
  
  const bewLayer=getLayerByName('BE_Wallo_Peatlands');
  const bewSource=bewLayer.getSource();
  const bewUrl=bewSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(bewUrl){
        $.ajax({
            url:bewUrl,
            method:'GET',
            success:function(result){
                const bew=result.features[0];
                if(bew){
                    const styp=bew.properties.soil_type;
                    bewInfo.html(`
                        <p>Soil Type: Peat</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }
     
  const eeLayer=getLayerByName('EE_Peatlands');
  const eeSource=eeLayer.getSource();
  const eeUrl=eeSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(eeUrl){
        $.ajax({
            url:eeUrl,
            method:'GET',
            success:function(result){
                const ee=result.features[0];
                if(ee){
                    const styp=ee.properties.site_type;
                    eeInfo.html(`
                        <p>Site Type: ${styp}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

  const fiLayer=getLayerByName('FI_Peatlands');
  const fiSource=fiLayer.getSource();
  const fiUrl=fiSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(fiUrl){
        $.ajax({
            url:fiUrl,
            method:'GET',
            success:function(result){
                const fi=result.features[0];
                if(fi){
                    const styp=fi.properties.site_type;
                    fiInfo.html(`
                        <p>Site Type: ${styp}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

  overlay.setPosition(coordinate);
});
