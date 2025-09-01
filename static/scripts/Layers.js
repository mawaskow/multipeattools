import {getLayerByName} from "./customFunctions.js";
import {getLayersByCluster} from "./customFunctions.js";

const map=$('#map').data('map');
const layers=map.getLayers();

const lyrClrLib = {
    'Project_Sites':`proj-sites-box`,
    'IE_ispm':`ie-ispm-box`,
    'PL_Alk_Fens':`alk-fen-box`,
    'PL_Torf':`pl-torf-box`,
    'Corine18':`corine-box`,
    'NL_Peat_Soils':`nl-soil-box`,
    'DE_Peatlands': `de-soil-box`,
    'BE_Fland_Peatlands': `bef-soil-box`,
    'BE_Wallo_Peatlands': `bew-soil-box`,
    'EE_Peatlands': `ee-soil-box`,
    'FI_Peatlands': `fi-soil-box`,
    'AL_Peatlands': `al-soil-box`,
    'AN_Peatlands': `an-soil-box`,
    'AU_Peatlands': `au-soil-box`,
    'BE_Peatlands': `be-soil-box`,
    'BO_Peatlands': `bo-soil-box`,
    'BU_Peatlands': `bu-soil-box`,
    'CR_Peatlands': `cr-soil-box`,
    'CZ_Peatlands': `cz-soil-box`,
    'DN_EWM_Peatlands': `dn-ewm-soil-box`,
    'FR_Peatlands': `fr-soil-box`,
    'DE_EWM_Peatlands': `ge-soil-box`,
    'GR_Peatlands': `gr-soil-box`,
    'HU_Peatlands': `hu-soil-box`,
    'IC_Peatlands': `ic-soil-box`,
    'IT_Peatlands': `it-soil-box`,
    'LA_Peatlands': `la-soil-box`,
    'LIE_Peatlands': `lie-soil-box`,
    'LIT_Peatlands': `lit-soil-box`,
    'LU_Peatlands': `lu-soil-box`,
    'MA_Peatlands': `ma-soil-box`,
    'MO_Peatlands': `mo-soil-box`,
    'NE_Peatlands': `ne-soil-box`,
    'POL_Peatlands': `pol-soil-box`,
    'POR_Peatlands': `por-soil-box`,
    'RO_Peatlands': `ro-soil-box`,
    'SE_Peatlands': `se-soil-box`,
    'SLK_Peatlands': `slk-soil-box`,
    'SLV_Peatlands': `slv-soil-box`,
    'SP_Peatlands': `sp-soil-box`,
    'SWE_Peatlands': `swe-soil-box`,
    'SWI_Peatlands': `swi-soil-box`,
    "GBR_Peatlands" :`gbr-soil-box`,
    "ENG_Peatlands" :`eng-soil-box`,
    "SCOT_Peatlands" :`scot-soil-box`,
    "WEL_Peatlands" :`wel-soil-box`
};

const regLib = {
    'International': "int-lyr-lyrs",
    'Belgium':"be-lyr-lyrs",
    'Ireland': "ie-lyr-lyrs",
    'Poland': "pl-lyr-lyrs",
    'Netherlands':"nl-lyr-lyrs",
    'Germany':"de-lyr-lyrs",
    'Estonia':"ee-lyr-lyrs",
    'Finland':"fi-lyr-lyrs",
    'Albania':"al-lyr-lyrs",
    'Andorra':"an-lyr-lyrs",
    'Austria':"au-lyr-lyrs",
    'Bosnia':"bo-lyr-lyrs",
    'Bulgaria':"bu-lyr-lyrs",
    'Croatia':"cr-lyr-lyrs",
    'Czech':"cz-lyr-lyrs",
    'Denmark':"dn-lyr-lyrs",
    'France':"fr-lyr-lyrs",
    'Greece':'gr-lyr-lyrs',
    'Hungary':"hu-lyr-lyrs",
    'Iceland':"ic-lyr-lyrs",
    'Italy':"it-lyr-lyrs",
    'Latvia':"la-lyr-lyrs",
    'Liechtenstein':"lie-lyr-lyrs",
    'Lithuania':"lit-lyr-lyrs",
    'Luxembourg':"lu-lyr-lyrs",
    'Macedonia':"ma-lyr-lyrs",
    'Montenegro':"mo-lyr-lyrs",
    'Portugal':"por-lyr-lyrs",
    'Romania':"ro-lyr-lyrs",
    'Serbia':"se-lyr-lyrs",
    'Slovekia':"slk-lyr-lyrs",
    'Slovenia':"slv-lyr-lyrs",
    'Spain':"sp-lyr-lyrs",
    'Sweden':"swe-lyr-lyrs",
    'Switzerland':"swi-lyr-lyrs",
    "United Kingdom":"uk-lyr-lyrs"
};

layers.forEach(layer => {
    if(layer.get('name')){
        const element = `<div class="form-check drag">
        <input class="form-check-input layerbox ${lyrClrLib[layer.get('name')]}" type="checkbox" value="" id=${layer.get('name')}>
        <label class="form-check-label" for=${layer.get('name')}>
        ${layer.get('display')}</label>
        </div>`;
        const layerlyr=$(`#${regLib[layer.get('region')]}`);
        layerlyr.append(element);
        $(`#${layer.get('name')}`).prop('checked', layer.getVisible());
    }
});

$('.layerbox').on('change', function(){
    const checkbox=this;
    const layerName=checkbox.id;
    const layers=getLayersByCluster(layerName);
    // @ts-ignore
    layers.forEach(layer => {
        layer.setVisible(checkbox.checked);
    }
    );
});