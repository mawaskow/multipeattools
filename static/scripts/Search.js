import WFS from 'https://cdn.skypack.dev/ol/format/WFS.js';
import GeoJSON from 'https://cdn.skypack.dev/ol/format/GeoJSON.js';
import And from 'https://cdn.skypack.dev/ol/format/filter/And.js';
import EqualTo from 'https://cdn.skypack.dev/ol/format/filter/EqualTo.js';
import Vector from 'https://cdn.skypack.dev/ol/layer/Vector.js';
import VectorSource from 'https://cdn.skypack.dev/ol/source/Vector.js';
import Stroke from 'https://cdn.skypack.dev/ol/style/Stroke.js';
import Style from 'https://cdn.skypack.dev/ol/style/Style.js';

const map=$('#map').data('map');

const searchBtn=$('#search');

const wfsUrl='http://multipeat.insight-centre.org/geoserver/multipeat/wfs';

const vectorSource=new VectorSource();
const style=new Style({
    stroke:new Stroke({
        color:'blue',
        width:2
    })
});
const vector=new Vector({
    source:vectorSource,
    style:style
});

map.addLayer(vector);

searchBtn.on("click", function(){
    const bog=$('#bogInput').val().toString();

    if(bog.length==0){
        window.alert('Please enter bog name');
    }

    const featureRequest = new WFS().writeGetFeature({
        srsName:'EPSG:3857',
        featureNS:'http://multipeat.insight-centre.org/geoserver/multipeat',
        featurePrefix:'bnm_reproj',
        featureTypes:['bnm_reproj'],
        outputFormat:'application/json',
        filter: new EqualTo('name',bog)
    });

    fetch(wfsUrl,{
        method:'POST',
        body: new XMLSerializer().serializeToString(featureRequest)
    }).then(function(response){
        return response.json();
    }).then(function(json){

        if(json.features.length>0)
        {
            const features= new GeoJSON().readFeatures(json)
            vectorSource.clear(true);
            vectorSource.addFeatures(features);

            map.getView().fit(vectorSource.getExtent(), {'padding':[100,100,100,100]});
        }
        else{
            window.alert('No features found');
        }
    })
});