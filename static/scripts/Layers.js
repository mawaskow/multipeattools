import {getLayerByName} from "./customFunctions.js";

const map=$('#map').data('map');
const layers=map.getLayers();

const layersDivContent=$('#layers-div');
layersDivContent.html('');

layers.forEach(layer => {
    if(layer.get('name')){
        const element = `<div class="form-check drag">
        <input class="form-check-input" type="checkbox" value="" id=${layer.get('name')}>
        <label class="form-check-label d-flex align-self-center" for=${layer.get('name')}>
        ${layer.get('display')}</label>
        </div>`;
        layersDivContent.append(element);
        $(`#${layer.get('name')}`).prop('checked', layer.getVisible());
    }
});

$('.form-check-input').on('change', function(){
    const checkbox=this;
    const layerName=checkbox.id;
    const layer=getLayerByName(layerName);
    // @ts-ignore
    layer.setVisible(checkbox.checked);
});