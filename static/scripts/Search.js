const WFS = ol.format.WFS;
const GeoJSON = ol.format.GeoJSON;
const IsLike = ol.format.filter.isLike;
const Vector = ol.layer.Vector;
const VectorSource = ol.source.Vector;
const Stroke = ol.style.Stroke;
const Style = ol.style.Style;

const map=$('#map').data('map');

const searchBtn=$('#search');

var wfsUrl='http://multipeat.insight-centre.org/geoserver/multipeat/wfs';

var vectorSource=new VectorSource();
var style=new Style({
    stroke:new Stroke({
        color:'blue',
        width:2
    })
});
var vector=new Vector({
    source:vectorSource,
    style:style
});

map.addLayer(vector);

searchBtn.on("click", function(){
    const bog=$('#bogInput').val().toString();

    if(bog.length==0){
        window.alert('Please enter bog name');
        /*
        fetch(wfsUrl,{
            method:'POST',
            body: "wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=multipeat:bnm_reproj"
        });
        */
    }

    var featureRequest = new WFS().writeGetFeature({
    //const featureRequest = new WMS().writeGetFeature({
        srsName:'EPSG:3857',
        //featureNS:'http://multipeat.insight-centre.org/geoserver/multipeat',
        featureNS:'multipeat',
        featurePrefix:'bnm_reproj',
        //featurePrefix:'multipeat',
        featureTypes:['bnm_reproj'],
        outputFormat:'application/json',
        filter: new IsLike('name',bog)
    });

    console.log("Feature request constructed");
    fetch(wfsUrl,{
        method:'POST',
        mode:'no-cors',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: new XMLSerializer().serializeToString(featureRequest)
    }).then(function(response){
        console.log("wfsUrl fetched");
        console.log(response);
        return response.json();
    }).then(function(json){
        console.log("json received");
        if(json.features.length>0)
        {
            var features= new GeoJSON().readFeatures(json)
            vectorSource.clear(true);
            vectorSource.addFeatures(features);

            map.getView().fit(vectorSource.getExtent(), {'padding':[100,100,100,100]});
        }
        else{
            window.alert('No features found');
        }
    })
});