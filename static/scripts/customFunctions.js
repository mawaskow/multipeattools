const map=$('#map').data('map');
const mapLayers=map.getLayers();

export function getLayerByName(layerName){
    let layer=null;

    mapLayers.forEach(lyr => {
        if(lyr.get('name')===layerName)
        layer=lyr;
    });
    return layer;
}

export function getLayerByDisplay(layerDisplayName){
    let layer=null;

    mapLayers.forEach(lyr => {
        if(lyr.get('display')===layerDisplayName)
        layer=lyr;
    });
    return layer;
}

export function getLayersByCluster(layerClusterName){
    let layers=[];

    mapLayers.forEach(lyr => {
        if(lyr.get('cluster')===layerClusterName)
        layers.push(lyr);
    });
    return layers;
}