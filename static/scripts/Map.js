import Map from 'https://cdn.skypack.dev/ol/Map.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import TileWMS from 'https://cdn.skypack.dev/ol/source/TileWMS.js';
import Projection from 'https://cdn.skypack.dev/ol/proj/Projection.js';
import ImageLayer from 'https://cdn.skypack.dev/ol/layer/Image.js';
import ImageWMS from 'https://cdn.skypack.dev/ol/source/TileWMS.js';

const serverURL="https://multipeat.insight-centre.org/geoserver/wms";
//const serverURL="http://140.203.155.66:8080/geoserver/wms";
//const serverURL="https://test-multipeat.insight-centre.org/geoserver/wms";

const res_dct={
    "max":{
        0: 100, //5.2, // 575K
        1: 850 //15 //20.7 // 2.3M
    },
    "min":{
        1: 100, // 425K
        2: 850 //15 //15.3 // 1.7M
    }
};

const mapProjection=new Projection({
    code:'EPSG:3857',
    units:'m',
    axisOrientation:'neu',
    global:false
});

// Project Sites Resource
const PSSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:proj_sites","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const PSLayer= new TileLayer({
    source:PSSource,
    preload: 0,
    // @ts-ignore
    name:'Project_Sites',
    display: 'Project Sites',
    region: 'International',
    cluster: "Project_Sites",
    simp_lvl: 0
});

// Irish Peat Classes
const ieSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:dipm","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ieLayer= new TileLayer({
    source:ieSource,
    preload: 0,
    // @ts-ignore
    name:'IE_dipm',
    display: 'Irish Peat Map',
    region: 'Ireland',
    cluster: "IE_dipm",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const ie_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:dipm_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ie_s1Layer= new TileLayer({
    source:ie_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Irish Peat Map s1',
    region: 'Ireland',
    cluster: "IE_dipm",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const ie_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:dipm_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ie_s2Layer= new TileLayer({
    source:ie_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Irish Peat Map s2',
    region: 'Ireland',
    cluster: "IE_dipm",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

// Countries
const ctrySource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:countries","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ctryLayer= new TileLayer({
    source:ctrySource,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Countries'
});

// Policies
const ipolSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:aspect_policy","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ipolLayer= new TileLayer({
    source:ipolSource,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Policies'
});

// Polish Alkaline Fens
const alkFenSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:pl_alk_fen","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const alkFenLayer= new TileLayer({
    source:alkFenSource,
    preload: 0,
    // @ts-ignore
    name:'PL_Alk_Fens',
    display: 'Alkaline Fen Map',
    region: 'Poland',
    cluster: "PL_Alk_Fens",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const alkFen_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:pl_alk_fen_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const alkFen_s1Layer= new TileLayer({
    source:alkFen_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Alkaline Fen Map s1',
    cluster: "PL_Alk_Fens",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const alkFen_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:pl_alk_fen_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const alkFen_s2Layer= new TileLayer({
    source:alkFen_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Alkaline Fen Map s2',
    cluster: "PL_Alk_Fens",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

// Polish Torfowiska
const pltSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:pl_peat","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const pltLayer= new TileLayer({
    source:pltSource,
    preload: 0,
    // @ts-ignore
    name:'PL_Torf',
    display: 'Peatland Map',
    region: 'Poland',
    cluster: "PL_Torf",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const plt_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:pl_peat_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const plt_s1Layer= new TileLayer({
    source:plt_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Peatland Map s1',
    cluster: "PL_Torf",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const plt_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:pl_peat_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const plt_s2Layer= new TileLayer({
    source:plt_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Peatland Map s2',
    cluster: "PL_Torf",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

// Dutch Peat Soils
const nlSoilSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:nl_peatsoils","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const nlSoilLayer= new TileLayer({
    source:nlSoilSource,
    preload: 0,
    // @ts-ignore
    name:'NL_Peat_Soils',
    display: 'Dutch Soil Map',
    region: 'Netherlands',
    cluster: "NL_Peat_Soils",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const nlSoil_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:nl_peatsoils_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const nlSoil_s1Layer= new TileLayer({
    source:nlSoil_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Dutch Soil Map s1',
    cluster: "NL_Peat_Soils",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const nlSoil_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:nl_peatsoils_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const nlSoil_s2Layer= new TileLayer({
    source:nlSoil_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Dutch Soil Map s2',
    cluster: "NL_Peat_Soils",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

// German Peatlands
const detSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:thuenen","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const detLayer= new TileLayer({
    source:detSource,
    preload: 0,
    // @ts-ignore
    name:'DE_Peatlands',
    display: 'Thuenen Soil Map',
    region: 'Germany',
    cluster: "DE_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const det_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:de_thuenen_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const det_s1Layer= new TileLayer({
    source:det_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Thuenen Soil Map s1',
    cluster: "DE_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const det_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:de_thuenen_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const det_s2Layer= new TileLayer({
    source:det_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Thuenen Soil Map s2',
    cluster: "DE_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

// Belgian Peatlands
const befSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:be_fland_peatsurf","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const befLayer= new TileLayer({
    source:befSource,
    preload: 0,
    // @ts-ignore
    name:'BE_Fland_Peatlands',
    display: 'Flanders Surface Peat',
    region: 'Belgium',
    cluster: "BE_Fland_Peatlands",
    //simp_lvl: 0,
    //maxResolution: res_dct["max"][0]
});
/*
const bef_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:be_fland_peatsurf_s1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bef_s1Layer= new TileLayer({
    source:bef_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Flanders Surface Peat s1',
    cluster: "BE_Fland_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const bef_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:be_fland_peatsurf_s2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bef_s2Layer= new TileLayer({
    source:bef_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Flanders Surface Peat s2',
    cluster: "BE_Fland_Peatlands",
    simp_lvl: 2,
    maxResolution: 15.3
});
*/
const bewSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:be_wallon_peat","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bewLayer= new TileLayer({
    source:bewSource,
    preload: 0,
    // @ts-ignore
    name:'BE_Wallo_Peatlands',
    display: 'Wallonia Eco Soils',
    region: 'Belgium',
    cluster: "BE_Wallo_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const bew_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:be_wallon_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bew_s1Layer= new TileLayer({
    source:bew_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Wallonia Eco Soils s1',
    cluster: "BE_Wallo_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const bew_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:be_wallon_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bew_s2Layer= new TileLayer({
    source:bew_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Wallonia Eco Soils s2',
    cluster: "BE_Wallo_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

const eeSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:peat_ee","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const eeLayer= new TileLayer({
    source:eeSource,
    preload: 0,
    // @ts-ignore
    name:'EE_Peatlands',
    display: 'Estonian Bogs',
    region: 'Estonia',
    cluster: "EE_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const ee_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:peat_ee_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ee_s1Layer= new TileLayer({
    source:ee_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Estonian Bogs s1',
    cluster: "EE_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const ee_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:peat_ee_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ee_s2Layer= new TileLayer({
    source:ee_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Estonian Bogs s2',
    cluster: "EE_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

const fiSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:peat_fi","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const fiLayer= new TileLayer({
    source:fiSource,
    preload: 0,
    // @ts-ignore
    name:'FI_Peatlands',
    display: 'Finnish Bogs',
    region: 'Finland',
    cluster: "FI_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const fi_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:peat_fi_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const fi_s1Layer= new TileLayer({
    source:fi_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Finnish Bogs s1',
    cluster: "FI_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const fi_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:peat_fi_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const fi_s2Layer= new TileLayer({
    source:fi_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Finnish Bogs s2',
    cluster: "FI_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

// EWM Peatlands
//albania
/*
const alSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:albania","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const alLayer= new TileLayer({
    source:alSource,
    preload: 0,
    // @ts-ignore
    name:'AL_Peatlands',
    display: 'Albanian Bogs',
    region: 'Albania',
    cluster: "AL_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const al_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:albania_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const al_s1Layer= new TileLayer({
    source:al_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Albanian Bogs s1',
    cluster: "AL_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const al_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:albania_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const al_s2Layer= new TileLayer({
    source:al_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Albanian Bogs s2',
    cluster: "AL_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});


//andorra
const anSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:andorra","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const anLayer= new TileLayer({
    source:anSource,
    preload: 0,
    // @ts-ignore
    name:'AN_Peatlands',
    display: 'Andorran Bogs',
    region: 'Andorra',
    cluster: "AN_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const an_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:andorra_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const an_s1Layer= new TileLayer({
    source:an_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Andorran Bogs s1',
    cluster: "AN_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const an_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:andorra_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const an_s2Layer= new TileLayer({
    source:an_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Andorran Bogs s2',
    cluster: "AN_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
*/
//austria
const auSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:austria","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const auLayer= new TileLayer({
    source:auSource,
    preload: 0,
    // @ts-ignore
    name:'AU_Peatlands',
    display: 'Austrian Bogs',
    region: 'Austria',
    cluster: "AU_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const au_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:austria_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const au_s1Layer= new TileLayer({
    source:au_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Austrian Bogs s1',
    cluster: "AU_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const au_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:austria_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const au_s2Layer= new TileLayer({
    source:au_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Austrian Bogs s2',
    cluster: "AU_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//belgium
const beSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:belgium","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const beLayer= new TileLayer({
    source:beSource,
    preload: 0,
    // @ts-ignore
    name:"BE_Peatlands",
    display: 'Belgian Bogs',
    cluster: "BE_Peatlands",
    region: "Belgium",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const be_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:belgium_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const be_s1Layer= new TileLayer({
    source:be_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Belgian Bogs s1',
    cluster: "BE_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const be_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:belgium_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const be_s2Layer= new TileLayer({
    source:be_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Belgian Bogs s2',
    cluster: "BE_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
/*
//bosnia
const boSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:bosnia","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const boLayer= new TileLayer({
    source:boSource,
    preload: 0,
    // @ts-ignore
    name:'BO_Peatlands',
    display: 'Bosnian Bogs',
    region: 'Bosnia',
    cluster: "BO_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const bo_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:bosnia_s1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bo_s1Layer= new TileLayer({
    source:bo_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Bosnian Bogs s1',
    cluster: "BO_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const bo_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:bosnia_s2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bo_s2Layer= new TileLayer({
    source:bo_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Bosnian Bogs s2',
    cluster: "BO_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
*/
//bulgaria
const buSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:bulgaria","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const buLayer= new TileLayer({
    source:buSource,
    preload: 0,
    // @ts-ignore
    name:"BU_Peatlands",
    display: 'Bulgarian Bogs',
    cluster: "BU_Peatlands",
    region: "Bulgaria",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const bu_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:bulgaria_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bu_s1Layer= new TileLayer({
    source:bu_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Bulgarian Bogs s1',
    cluster: "BU_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const bu_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:bulgaria_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bu_s2Layer= new TileLayer({
    source:bu_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Bulgarian Bogs s2',
    cluster: "BU_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//croatia
const crSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:croatia","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const crLayer= new TileLayer({
    source:crSource,
    preload: 0,
    // @ts-ignore
    name:'CR_Peatlands',
    display: 'Croatian Bogs',
    region: 'Croatia',
    cluster: "CR_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const cr_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:croatia_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const cr_s1Layer= new TileLayer({
    source:cr_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Croatian Bogs s1',
    cluster: "CR_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const cr_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:croatia_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const cr_s2Layer= new TileLayer({
    source:cr_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Croatian Bogs s2',
    cluster: "CR_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//czech
const czSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:czech","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const czLayer= new TileLayer({
    source:czSource,
    preload: 0,
    // @ts-ignore
    name:'CZ_Peatlands',
    display: 'Czech Bogs',
    region: 'Czech',
    cluster: "CZ_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const cz_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:czech_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const cz_s1Layer= new TileLayer({
    source:cz_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Czech Bogs s1',
    cluster: "CZ_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const cz_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:czech_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const cz_s2Layer= new TileLayer({
    source:cz_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Czech Bogs s2',
    cluster: "CZ_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//denmark
const dn_ewmSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:denmark","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const dn_ewmLayer= new TileLayer({
    source:dn_ewmSource,
    preload: 0,
    // @ts-ignore
    name:'DN_EWM_Peatlands',
    display: 'Danish Bogs',
    region: 'Denmark',
    cluster: "DN_EWM_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const dn_ewm_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:denmark_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const dn_ewm_s1Layer= new TileLayer({
    source:dn_ewm_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Danish Bogs s1',
    cluster: "DN_EWM_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const dn_ewm_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:denmark_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const dn_ewm_s2Layer= new TileLayer({
    source:dn_ewm_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Danish Bogs s2',
    cluster: "DN_EWM_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//france
const frSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:france","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const frLayer= new TileLayer({
    source:frSource,
    preload: 0,
    // @ts-ignore
    name:'FR_Peatlands',
    display: 'French Bogs',
    region: 'France',
    cluster: "FR_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const fr_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:france_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const fr_s1Layer= new TileLayer({
    source:fr_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'French Bogs s1',
    cluster: "FR_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const fr_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:france_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const fr_s2Layer= new TileLayer({
    source:fr_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'French Bogs s2',
    cluster: "FR_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//germany
const geSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:germany","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const geLayer= new TileLayer({
    source:geSource,
    preload: 0,
    // @ts-ignore
    name:'DE_EWM_Peatlands',
    display: 'German Bogs',
    region: 'Germany',
    cluster: "DE_EWM_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const ge_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:germany_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ge_s1Layer= new TileLayer({
    source:ge_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'German Bogs s1',
    cluster: "DE_EWM_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const ge_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:germany_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ge_s2Layer= new TileLayer({
    source:ge_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'German Bogs s2',
    cluster: "DE_EWM_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//greece
const grSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:greece","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const grLayer= new TileLayer({
    source:grSource,
    preload: 0,
    // @ts-ignore
    name:'GR_Peatlands',
    display: 'Greek Bogs',
    region: 'Greece',
    cluster: "GR_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const gr_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:greece_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const gr_s1Layer= new TileLayer({
    source:gr_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Greek Bogs s1',
    cluster: "GR_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const gr_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:greece_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const gr_s2Layer= new TileLayer({
    source:gr_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Greek Bogs s2',
    cluster: "GR_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//hungary
const huSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:hungary","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const huLayer= new TileLayer({
    source:huSource,
    preload: 0,
    // @ts-ignore
    name:'HU_Peatlands',
    display: 'Hungarian Bogs',
    region: 'Hungary',
    cluster: "HU_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const hu_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:hungary_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const hu_s1Layer= new TileLayer({
    source:hu_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Hungarian Bogs s1',
    cluster: "HU_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const hu_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:hungary_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const hu_s2Layer= new TileLayer({
    source:hu_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Hungarian Bogs s2',
    cluster: "HU_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
/*
// iceland
const icSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:iceland","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const icLayer= new TileLayer({
    source:icSource,
    preload: 0,
    // @ts-ignore
    name:'IC_Peatlands',
    display: 'Icelandic Bogs',
    region: 'Iceland',
    cluster: "IC_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const ic_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:iceland_s1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ic_s1Layer= new TileLayer({
    source:ic_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Icelandic Bogs s1',
    cluster: "IC_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const ic_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:iceland_s2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ic_s2Layer= new TileLayer({
    source:ic_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Icelandic Bogs s2',
    cluster: "IC_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
*/
//ireland
const irSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:ireland","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const irLayer= new TileLayer({
    source:irSource,
    preload: 0,
    // @ts-ignore
    name:'IR_Peatlands',
    display: 'Irish Bogs',
    region: 'Ireland',
    cluster: "IR_Peatlands",
    //simp_lvl: 0,
    //maxResolution: res_dct["max"][0]
});
/*
const ir_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:ireland_s1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ir_s1Layer= new TileLayer({
    source:ir_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Irish Bogs s1',
    cluster: "IR_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const ir_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:ireland_s2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ir_s2Layer= new TileLayer({
    source:ir_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Irish Bogs s2',
    cluster: "IR_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
*/
//italy
const itSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:italy","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const itLayer= new TileLayer({
    source:itSource,
    preload: 0,
    // @ts-ignore
    name:'IT_Peatlands',
    display: 'Italian Bogs',
    region: 'Italy',
    cluster: "IT_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const it_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:italy_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const it_s1Layer= new TileLayer({
    source:it_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Italian Bogs s1',
    cluster: "IT_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const it_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:italy_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const it_s2Layer= new TileLayer({
    source:it_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Italian Bogs s2',
    cluster: "IT_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//latvia
const laSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:latvia","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const laLayer= new TileLayer({
    source:laSource,
    preload: 0,
    // @ts-ignore
    name:'LA_Peatlands',
    display: 'Latvian Bogs',
    region: 'Latvia',
    cluster: "LA_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const la_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:latvia_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const la_s1Layer= new TileLayer({
    source:la_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Latvian Bogs s1',
    cluster: "LA_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const la_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:latvia_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const la_s2Layer= new TileLayer({
    source:la_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Latvian Bogs s2',
    cluster: "LA_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
/*
//liechtenstein
const lieSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:liechtenstein","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const lieLayer= new TileLayer({
    source:lieSource,
    preload: 0,
    // @ts-ignore
    name:'LIE_Peatlands',
    display: 'Liechtenstein Bogs',
    region: 'Liechtenstein',
    cluster: "LIE_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const lie_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:liechtenstein_s1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const lie_s1Layer= new TileLayer({
    source:lie_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Liechtenstein Bogs s1',
    cluster: "LIE_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const lie_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:liechtenstein_s2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const lie_s2Layer= new TileLayer({
    source:lie_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Liechtenstein Bogs s2',
    cluster: "LIE_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
*/
//lithuania
const litSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:lithuania","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const litLayer= new TileLayer({
    source:litSource,
    preload: 0,
    // @ts-ignore
    name:'LIT_Peatlands',
    display: 'Lithuanian Bogs',
    region: 'Lithuania',
    cluster: "LIT_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const lit_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:lithuania_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const lit_s1Layer= new TileLayer({
    source:lit_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Lithuanian Bogs s1',
    cluster: "LIT_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const lit_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:lithuania_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const lit_s2Layer= new TileLayer({
    source:lit_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Lithuanian Bogs s2',
    cluster: "LIT_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//luxembourg
const luSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:luxembourg","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const luLayer= new TileLayer({
    source:luSource,
    preload: 0,
    // @ts-ignore
    name:'LU_Peatlands',
    display: 'Luxembourg Bogs',
    region: 'Luxembourg',
    cluster: "LU_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const lu_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:luxembourg_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const lu_s1Layer= new TileLayer({
    source:lu_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Luxembourg Bogs s1',
    cluster: "LU_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const lu_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:luxembourg_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const lu_s2Layer= new TileLayer({
    source:lu_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Luxembourg Bogs s2',
    cluster: "LU_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
/*
//macedonia
const maSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:macedonia","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const maLayer= new TileLayer({
    source:maSource,
    preload: 0,
    // @ts-ignore
    name:'MA_Peatlands',
    display: 'Macedonian Bogs',
    region: 'Macedonia',
    cluster: "MA_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const ma_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:macedonia_s1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ma_s1Layer= new TileLayer({
    source:ma_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Macedonian Bogs s1',
    cluster: "MA_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const ma_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:macedonia_s2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ma_s2Layer= new TileLayer({
    source:ma_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Macedonian Bogs s2',
    cluster: "MA_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//montenegro
const moSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:montenegro","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const moLayer= new TileLayer({
    source:moSource,
    preload: 0,
    // @ts-ignore
    name:'MO_Peatlands',
    display: 'Montenegrin Bogs',
    region: 'Montenegro',
    cluster: "MO_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const mo_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:montenegro_s1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const mo_s1Layer= new TileLayer({
    source:mo_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Montenegrin Bogs s1',
    cluster: "MO_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const mo_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:montenegro_s2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const mo_s2Layer= new TileLayer({
    source:mo_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Montenegrin Bogs s2',
    cluster: "MO_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
*/
//netherlands
const neSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:netherland","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const neLayer= new TileLayer({
    source:neSource,
    preload: 0,
    // @ts-ignore
    name:'NE_Peatlands',
    display: 'Dutch Bogs',
    region: 'Netherlands',
    cluster: "NE_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const ne_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:netherland_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ne_s1Layer= new TileLayer({
    source:ne_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Dutch Bogs s1',
    cluster: "NE_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const ne_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:netherland_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ne_s2Layer= new TileLayer({
    source:ne_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Dutch Bogs s2',
    cluster: "NE_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//poland
const polSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:poland","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const polLayer= new TileLayer({
    source:polSource,
    preload: 0,
    // @ts-ignore
    name:'POL_Peatlands',
    display: 'Polish Bogs',
    region: 'Poland',
    cluster: "POL_Peatlands",
    //simp_lvl: 0,
    //maxResolution: res_dct["max"][0]
});
/*
const pol_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:poland_s1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const pol_s1Layer= new TileLayer({
    source:pol_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Polish Bogs s1',
    cluster: "POL_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const pol_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:poland_s2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const pol_s2Layer= new TileLayer({
    source:pol_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Polish Bogs s2',
    cluster: "POL_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
*/
//portugal
const porSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:portugal","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const porLayer= new TileLayer({
    source:porSource,
    preload: 0,
    // @ts-ignore
    name:'POR_Peatlands',
    display: 'Portuguese Bogs',
    region: 'Portugal',
    cluster: "POR_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const por_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:portugal_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const por_s1Layer= new TileLayer({
    source:por_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Portuguese Bogs s1',
    cluster: "POR_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const por_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:portugal_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const por_s2Layer= new TileLayer({
    source:por_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Portuguese Bogs s2',
    cluster: "POR_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//romania
const roSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:romania","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const roLayer= new TileLayer({
    source:roSource,
    preload: 0,
    // @ts-ignore
    name:'RO_Peatlands',
    display: 'Romanian Bogs',
    region: 'Romania',
    cluster: "RO_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const ro_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:romania_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ro_s1Layer= new TileLayer({
    source:ro_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Romanian Bogs s1',
    cluster: "RO_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const ro_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:romania_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ro_s2Layer= new TileLayer({
    source:ro_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Romanian Bogs s2',
    cluster: "RO_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
/*
//serbia
const seSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:serbia","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const seLayer= new TileLayer({
    source:seSource,
    preload: 0,
    // @ts-ignore
    name:'SE_Peatlands',
    display: 'Serbian Bogs',
    region: 'Serbia',
    cluster: "SE_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const se_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:serbia_s1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const se_s1Layer= new TileLayer({
    source:se_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Serbian Bogs s1',
    cluster: "SE_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const se_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:serbia_s2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const se_s2Layer= new TileLayer({
    source:se_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Serbian Bogs s2',
    cluster: "SE_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
*/
//slovakia
const slkSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:slovekia","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const slkLayer= new TileLayer({
    source:slkSource,
    preload: 0,
    // @ts-ignore
    name:'SLK_Peatlands',
    display: 'Slovak Bogs',
    region: 'Slovekia',
    cluster: "SLK_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const slk_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:slovakia_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const slk_s1Layer= new TileLayer({
    source:slk_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Slovak Bogs s1',
    cluster: "SLK_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const slk_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:slovakia_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const slk_s2Layer= new TileLayer({
    source:slk_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Slovak Bogs s2',
    cluster: "SLK_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//slovenia
const slvSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:slovenia","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const slvLayer= new TileLayer({
    source:slvSource,
    preload: 0,
    // @ts-ignore
    name:'SLV_Peatlands',
    display: 'Slovenian Bogs',
    region: 'Slovenia',
    cluster: "SLV_Peatlands",
    //simp_lvl: 0,
    //maxResolution: res_dct["max"][0]
});
/*
const slv_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:slovenia_s1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const slv_s1Layer= new TileLayer({
    source:slv_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Slovenian Bogs s1',
    cluster: "SLV_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const slv_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:slovenia_s2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const slv_s2Layer= new TileLayer({
    source:slv_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Slovenian Bogs s2',
    cluster: "SLV_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
*/
//spain
const spSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:spain","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const spLayer= new TileLayer({
    source:spSource,
    preload: 0,
    // @ts-ignore
    name:"SP_Peatlands",
    display: 'Spanish Bogs',
    cluster: "SP_Peatlands",
    region: "Spain",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const sp_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:spain_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const sp_s1Layer= new TileLayer({
    source:sp_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Spanish Bogs s1',
    cluster: "SP_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const sp_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:spain_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const sp_s2Layer= new TileLayer({
    source:sp_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Spanish Bogs s2',
    cluster: "SP_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//sweden
const sweSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:sweden","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const sweLayer= new TileLayer({
    source:sweSource,
    preload: 0,
    // @ts-ignore
    name:'SWE_Peatlands',
    display: 'Swedish Bogs',
    region: 'Sweden',
    cluster: "SWE_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const swe_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:sweden_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const swe_s1Layer= new TileLayer({
    source:swe_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Swedish Bogs s1',
    cluster: "SWE_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const swe_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:sweden_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const swe_s2Layer= new TileLayer({
    source:swe_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Swedish Bogs s2',
    cluster: "SWE_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
/*
//switzerland
const swiSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:switzerland","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const swiLayer= new TileLayer({
    source:swiSource,
    preload: 0,
    // @ts-ignore
    name:'SWI_Peatlands',
    display: 'Swiss Bogs',
    region: 'Switzerland',
    cluster: "SWI_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const swi_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:switzerland_s1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const swi_s1Layer= new TileLayer({
    source:swi_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Swiss Bogs s1',
    cluster: "SWI_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const swi_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:switzerland_s2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const swi_s2Layer= new TileLayer({
    source:swi_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'Swiss Bogs s2',
    cluster: "SWI_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
*/

//UK EWM
const gbrSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:britain_ni","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const gbrLayer= new TileLayer({
    source:gbrSource,
    preload: 0,
    // @ts-ignore
    name:'GBR_Peatlands',
    display: 'UK Bogs',
    region: 'United Kingdom',
    cluster: "GBR_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const gbr_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:britain_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const gbr_s1Layer= new TileLayer({
    source:gbr_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'UK Bogs s1',
    cluster: "GBR_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const gbr_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:britain_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const gbr_s2Layer= new TileLayer({
    source:gbr_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'UK Bogs s2',
    cluster: "GBR_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//england
const engSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:uk_england","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const engLayer= new TileLayer({
    source:engSource,
    preload: 0,
    // @ts-ignore
    name:'ENG_Peatlands',
    display: 'English Bogs',
    region: 'United Kingdom',
    cluster: "ENG_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const eng_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:uk_england_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const eng_s1Layer= new TileLayer({
    source:eng_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: '',
    cluster: "ENG_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const eng_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:uk_england_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const eng_s2Layer= new TileLayer({
    source:eng_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: '',
    cluster: "ENG_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//Scotland
const scotSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:uk_scotland","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const scotLayer= new TileLayer({
    source:scotSource,
    preload: 0,
    // @ts-ignore
    name:'SCOT_Peatlands',
    display: 'Scottish Bogs',
    region: 'United Kingdom',
    cluster: "SCOT_Peatlands",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const scot_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:uk_scotland_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const scot_s1Layer= new TileLayer({
    source:scot_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: '',
    cluster: "SCOT_Peatlands",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const scot_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:uk_scotland_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const scot_s2Layer= new TileLayer({
    source:scot_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: '',
    cluster: "SCOT_Peatlands",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});

//Wales
const welSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:uk_wales","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const welLayer= new TileLayer({
    source:welSource,
    preload: 0,
    // @ts-ignore
    name:'WEL_Peatlands',
    display: 'Welsh Bogs',
    region: 'United Kingdom',
    cluster: "WEL_Peatlands",
    simp_lvl: 0,
});

/*
// CORINE-18 
const corineSource=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:corine18","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const corineLayer= new TileLayer({
    source:corineSource,
    preload: 0,
    // @ts-ignore
    name:'Corine18',
    display: 'CORINE',
    region: 'International',
    cluster: "Corine18",
    simp_lvl: 0,
    maxResolution: res_dct["max"][0]
});

const corine_s1Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:corine18_drop1","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const corine_s1Layer= new TileLayer({
    source:corine_s1Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'CORINE s1',
    cluster: "Corine18",
    simp_lvl: 1,
    minResolution: res_dct["min"][1],
    maxResolution: res_dct["max"][1]
});

const corine_s2Source=new TileWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:corine18_drop2","TILED":true, "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const corine_s2Layer= new TileLayer({
    source:corine_s2Source,
    preload: 0,
    // @ts-ignore
    name:null,
    display: 'CORINE s2',
    cluster: "Corine18",
    simp_lvl: 2,
    minResolution: res_dct["min"][2]
});
*/
const osmLayer=new TileLayer({
    source:new OSM(),
    preload: 0,
    // @ts-ignore
    name: 'Basemap',
    region: 'International',
    cluster: 'Basemap',
    display: 'OSM Basemap'
});

const view=new View({
    // left bottom right top
    //extent:[-1189593, 6692152.5, -665102.8125, 7450535], // ireland
    extent:[-2010000, 3800000, 3800000, 11500000], // europe
    //extent:[-4000000, 3500000, 7000000, 13000000], // europe and EEA countries
    center:[895000, 7000000],//[895000, 7400000],//[2000000, 7500000],
    zoom:0,
    projection: mapProjection
});

const map=new Map({
    target:"map",
    layers:[osmLayer, ctryLayer, 
        //corineLayer, corine_s1Layer, corine_s2Layer, 
        ieLayer, ie_s1Layer, ie_s2Layer, 
        nlSoilLayer, nlSoil_s1Layer, nlSoil_s2Layer, 
        detLayer, det_s1Layer, det_s2Layer, 
        pltLayer, plt_s1Layer, plt_s2Layer, 
        alkFenLayer, alkFen_s1Layer, alkFen_s2Layer, 
        befLayer, //bef_s1Layer, bef_s2Layer, 
        bewLayer, bew_s1Layer, bew_s2Layer,
        eeLayer, ee_s1Layer, ee_s2Layer, 
        fiLayer, fi_s1Layer, fi_s2Layer, 
        //alLayer, al_s1Layer, al_s2Layer, 
        //anLayer, an_s1Layer, an_s2Layer, 
        auLayer, au_s1Layer, au_s2Layer, 
        beLayer, be_s1Layer, be_s2Layer, 
        //boLayer, bo_s1Layer, bo_s2Layer, 
        buLayer, bu_s1Layer, bu_s2Layer, 
        crLayer, cr_s1Layer, cr_s2Layer, 
        czLayer, cz_s1Layer, cz_s2Layer,
        dn_ewmLayer, dn_ewm_s1Layer, dn_ewm_s2Layer, 
        frLayer, fr_s1Layer, fr_s2Layer, 
        geLayer, ge_s1Layer, ge_s2Layer,
        grLayer, gr_s1Layer, gr_s2Layer, 
        huLayer, hu_s1Layer, hu_s2Layer, 
        //icLayer, ic_s1Layer, ic_s2Layer, 
        irLayer, //ir_s1Layer, ir_s2Layer, 
        itLayer, it_s1Layer, it_s2Layer, 
        laLayer, la_s1Layer, la_s2Layer, 
        //lieLayer, lie_s1Layer, lie_s2Layer, 
        litLayer, lit_s1Layer, lit_s2Layer, 
        luLayer, lu_s1Layer, lu_s2Layer, 
        //maLayer, ma_s1Layer, ma_s2Layer,
       // moLayer, mo_s1Layer, mo_s2Layer, 
        neLayer, ne_s1Layer, ne_s2Layer, 
        polLayer, //pol_s1Layer, pol_s2Layer,
        porLayer, por_s1Layer, por_s2Layer, 
        roLayer, ro_s1Layer, ro_s2Layer, 
        //seLayer, se_s1Layer, se_s2Layer, 
        slkLayer, slk_s1Layer, slk_s2Layer, 
        slvLayer, //slv_s1Layer, slv_s2Layer, 
        spLayer, sp_s1Layer, sp_s2Layer,
        sweLayer, swe_s1Layer, swe_s2Layer, 
        //swiLayer, swi_s1Layer, swi_s2Layer, 
        gbrLayer, gbr_s1Layer, gbr_s2Layer,
        engLayer, eng_s1Layer, eng_s2Layer,
        scotLayer, scot_s1Layer, scot_s2Layer,
        welLayer,
        PSLayer, ipolLayer],
    view:view
});


$('#map').data('map',map);

