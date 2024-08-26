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
  // Raised Bog
  const D1Info=$('#D1-info');
  D1Info.html('');
  // LL Atlantic Bog
  const D2Info=$('#D2-info');
  D2Info.html('');
  // HL Montane Bog
  const D3Info=$('#D3-info');
  D3Info.html('');
  // alkaline fens
  const PlAlkFenInfo=$('#PlAlkFen-info');
  PlAlkFenInfo.html('');
  // corine-18
  const corineInfo=$('#corine-info');
  corineInfo.html('');
  // nl-soiltypes
  const nlsInfo=$('#nls-info');
  nlsInfo.html('');
  // de-peatlands
  const detInfo=$('#det-info');
  detInfo.html('');
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

  const D1Layer=getLayerByName('Raised_Bog');
  const D1Source=D1Layer.getSource();
  const D1Url=D1Source.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(D1Url){
        $.ajax({
            url:D1Url,
            method:'GET',
            success:function(result){
                const D1=result.features[0];
                if(D1){
                    const D1gc=D1.properties.site_type;

                    D1Info.html(`<p>Site Type: ${D1gc}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

  const D2Layer=getLayerByName('LL_Atlantic_Bog');
  const D2Source=D2Layer.getSource();
  const D2Url=D2Source.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(D2Url){
        $.ajax({
            url:D2Url,
            method:'GET',
            success:function(result){
                const D2=result.features[0];
                if(D2){
                    const D2gc=D2.properties.site_type;

                    D2Info.html(`<p>Site Type: ${D2gc}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }
  
  const D3Layer=getLayerByName('HL_Montane_Bog');
  const D3Source=D3Layer.getSource();
  const D3Url=D3Source.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(D3Url){
        $.ajax({
            url:D3Url,
            method:'GET',
            success:function(result){
                const D3=result.features[0];
                if(D3){
                    const D3gc=D3.properties.site_type;

                    D3Info.html(`<p>Site Type: ${D3gc}</p>`);
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

  overlay.setPosition(coordinate);
});
