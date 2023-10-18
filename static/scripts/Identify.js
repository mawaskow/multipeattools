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

  // getting the layer source: getting the layer itself
  const bogLayer=getLayerByName('Bord_na_Mona');
  const bogSource=bogLayer.getSource();

  const view=map.getView();
  const resolution=view.getResolution();
  const projection=view.getProjection();

  const bogInfo=$('#bog-info');
  bogInfo.html('');
  const ipolInfo=$('#ipol-info');
  ipolInfo.html('');
  const IEInfo=$('#IE-info');
  IEInfo.html('');
  const noFeatures=$('#no-features');
  noFeatures.html('<p>No features</p>');

  const bogUrl=bogSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(bogUrl){
        $.ajax({
            url:bogUrl,
            method:'GET',
            success:function(result){
                const bog=result.features[0];
                if(bog){
                    const bogName=bog.properties.name;
                    const bogGroup=bog.properties.boggroup;
                    const bogArea=bog.properties.area_km2;

                    bogInfo.html(`<h5>Bog Info</h5> 
                        <p>Name: ${bogName}</p>
                        <p>Group: ${bogGroup}</p>
                        <p>Area (sqkm): ${bogArea.toFixed(2)}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

    const ipolLayer=getLayerByName('Irish_Policies');
    const ipolSource=ipolLayer.getSource();
    const ipolUrl=ipolSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json', 'FEATURE_COUNT':'1000'});    
    if(ipolUrl){
        $.ajax({
            url:ipolUrl,
            method:'GET',
            success:function(result){
              // how to add more than one return feature?
                const ipol=result.features[0];
                if(ipol){
                    const ipolPol=ipol.properties.p_name;
                    const ipolCounty=ipol.properties.a_name;

                    ipolInfo.html(`<h5>Policy Info</h5> 
                        <p>Name: ${ipolPol}</p>
                        <p>County: ${ipolCounty}</p>`);
                    noFeatures.html('');
                }

            }
        })
    }

    const IELayer=getLayerByName('Irish_Peatlands');
    const IESource=IELayer.getSource();
    const IEUrl=IESource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json', 'FEATURE_COUNT':'1000'});    
    if(IEUrl){
        $.ajax({
            url:IEUrl,
            method:'GET',
            success:function(result){
                const IE=result.features[0];
                console.log(IE);
                if(IE){
                    const IEgc=IE.properties.gridcode;

                    IEInfo.html(`<h5>Bog Type</h5> 
                        <p>Code: ${IEgc}</p>`);
                    noFeatures.html('');
                }

            }
        })
    }

  overlay.setPosition(coordinate);
});
