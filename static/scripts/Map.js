import Map from 'https://cdn.skypack.dev/ol/Map.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import ImageLayer from 'https://cdn.skypack.dev/ol/layer/Image.js';
import ImageWMS from 'https://cdn.skypack.dev/ol/source/ImageWMS.js';
import Projection from 'https://cdn.skypack.dev/ol/proj/Projection.js';

const serverURL="https://multipeat.insight-centre.org/geoserver/wms";
//const serverURL="http://140.203.155.66:8080/geoserver/wms";
//const serverURL="https://test-multipeat.insight-centre.org/geoserver/wms";

const mapProjection=new Projection({
    code:'EPSG:3857',
    units:'m',
    axisOrientation:'neu',
    global:false
});

// Project Sites Resource
const PSSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:proj_sites", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const PSLayer= new ImageLayer({
    source:PSSource,
    // @ts-ignore
    name:'Project_Sites',
    display: 'Project Sites',
    region: 'International'
});

// Irish Peat Classes
const ieSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:dipm", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ieLayer= new ImageLayer({
    source:ieSource,
    // @ts-ignore
    name:'IE_dipm',
    display: 'Irish Peat Map',
    region: 'Ireland'
});

// Countries
const ctrySource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:countries", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ctryLayer= new ImageLayer({
    source:ctrySource,
    // @ts-ignore
    name:null,
    display: 'Countries'
});

// Policies
const ipolSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:geo_pol", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const ipolLayer= new ImageLayer({
    source:ipolSource,
    // @ts-ignore
    name:null,
    display: 'Policies'
});

// Polish Alkaline Fens
const alkFenSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:pl_alk_fen", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const alkFenLayer= new ImageLayer({
    source:alkFenSource,
    // @ts-ignore
    name:'PL_Alk_Fens',
    display: 'Alkaline Fen Map',
    region: 'Poland'
});

// Polish Torfowiska
const pltSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:pl_peat", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const pltLayer= new ImageLayer({
    source:pltSource,
    // @ts-ignore
    name:'PL_Torf',
    display: 'Peatland Map',
    region: 'Poland'
});

// Dutch Peat Soils
const nlSoilSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:nl_peatsoils", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const nlSoilLayer= new ImageLayer({
    source:nlSoilSource,
    // @ts-ignore
    name:'NL_Peat_Soils',
    display: 'Dutch Soil Map',
    region: 'Netherlands'
});

// German Peatlands
const detSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:thuenen", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const detLayer= new ImageLayer({
    source:detSource,
    // @ts-ignore
    name:'DE_Peatlands',
    display: 'Thuenen Soil Map',
    region: 'Germany'
});

// Belgian Peatlands
const befSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:be_fland_peatsurf", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const befLayer= new ImageLayer({
    source:befSource,
    // @ts-ignore
    name:'BE_Fland_Peatlands',
    display: 'Flanders Surface Peat',
    region: 'Belgium'
});

const bewSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:be_wallon_peat", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const bewLayer= new ImageLayer({
    source:bewSource,
    // @ts-ignore
    name:'BE_Wallo_Peatlands',
    display: 'Wallonia Eco Soils',
    region: 'Belgium'
});

const eeSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:peat_ee", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const eeLayer= new ImageLayer({
    source:eeSource,
    // @ts-ignore
    name:'EE_Peatlands',
    display: 'Estonian Bogs',
    region: 'Estonia'
});

const fiSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:peat_fi", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const fiLayer= new ImageLayer({
    source:fiSource,
    // @ts-ignore
    name:'FI_Peatlands',
    display: 'Finnish Bogs',
    region: 'Finland'
});
// EWM Peatlands

const alSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:albania", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const alLayer= new ImageLayer({
    source:alSource,
    // @ts-ignore
    name:'AL_Peatlands',
    display: 'Albanian Bogs',
    region: 'Albania'
});

const anSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:andorra", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const anLayer= new ImageLayer({
    source:anSource,
    // @ts-ignore
    name:'AN_Peatlands',
    display: 'Andorran Bogs',
    region: 'Andorra'
});

const auSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:austria", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const auLayer= new ImageLayer({
    source:auSource,
    // @ts-ignore
    name:'AU_Peatlands',
    display: 'Austrian Bogs',
    region: 'Austria'
});

const beSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:belgium", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const beLayer= new ImageLayer({
    source:beSource,
    // @ts-ignore
    name:'BE_Peatlands',
    display: 'Belgian Bogs',
    region: 'Belgium'
});

const boSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:bosnia", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const boLayer= new ImageLayer({
    source:boSource,
    // @ts-ignore
    name:'BO_Peatlands',
    display: 'Bosnian Bogs',
    region: 'Bosnia'
});

const buSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:bulgaria", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const buLayer= new ImageLayer({
    source:buSource,
    // @ts-ignore
    name:'BU_Peatlands',
    display: 'Bulgarian Bogs',
    region: 'Bulgaria'
});

const crSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:croatia", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const crLayer= new ImageLayer({
    source:crSource,
    // @ts-ignore
    name:'CR_Peatlands',
    display: 'Croatian Bogs',
    region: 'Croatia'
});

const czSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:czech", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const czLayer= new ImageLayer({
    source:czSource,
    // @ts-ignore
    name:'CZ_Peatlands',
    display: 'Czech Bogs',
    region: 'Czech'
});

const dn_ewmSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:denmark", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const dn_ewmLayer= new ImageLayer({
    source:dn_ewmSource,
    // @ts-ignore
    name:'DN_EWM_Peatlands',
    display: 'Danish Bogs',
    region: 'Denmark'
});

const frSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:france", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const frLayer= new ImageLayer({
    source:frSource,
    // @ts-ignore
    name:'FR_Peatlands',
    display: 'French Bogs',
    region: 'France'
});

const geSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:germany", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const geLayer= new ImageLayer({
    source:geSource,
    // @ts-ignore
    name:'DE_EWM_Peatlands',
    display: 'German Bogs',
    region: 'Germany'
});

const grSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:greece", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const grLayer= new ImageLayer({
    source:grSource,
    // @ts-ignore
    name:'GR_Peatlands',
    display: 'Greek Bogs',
    region: 'Greece'
});

const huSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:hungary", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const huLayer= new ImageLayer({
    source:huSource,
    // @ts-ignore
    name:'HU_Peatlands',
    display: 'Hungarian Bogs',
    region: 'Hungary'
});

const icSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:iceland", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const icLayer= new ImageLayer({
    source:icSource,
    // @ts-ignore
    name:'IC_Peatlands',
    display: 'Icelandic Bogs',
    region: 'Iceland'
});

const irSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:ireland", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const irLayer= new ImageLayer({
    source:irSource,
    // @ts-ignore
    name:'IR_Peatlands',
    display: 'Irish Bogs',
    region: 'Ireland'
});

const itSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:italy", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const itLayer= new ImageLayer({
    source:itSource,
    // @ts-ignore
    name:'IT_Peatlands',
    display: 'Italian Bogs',
    region: 'Italy'
});

const laSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:latvia", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const laLayer= new ImageLayer({
    source:laSource,
    // @ts-ignore
    name:'LA_Peatlands',
    display: 'Latvian Bogs',
    region: 'Latvia'
});

const lieSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:liechtenstein", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const lieLayer= new ImageLayer({
    source:lieSource,
    // @ts-ignore
    name:'LIE_Peatlands',
    display: 'Liechtenstein Bogs',
    region: 'Liechtenstein'
});

const litSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:lithuania", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const litLayer= new ImageLayer({
    source:litSource,
    // @ts-ignore
    name:'LIT_Peatlands',
    display: 'Lithuanian Bogs',
    region: 'Lithuania'
});

const luSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:luxembourg", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const luLayer= new ImageLayer({
    source:luSource,
    // @ts-ignore
    name:'LU_Peatlands',
    display: 'Luxembourg Bogs',
    region: 'Luxembourg'
});

const maSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:macedonia", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const maLayer= new ImageLayer({
    source:maSource,
    // @ts-ignore
    name:'MA_Peatlands',
    display: 'Macedonian Bogs',
    region: 'Macedonia'
});

const moSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:montenegro", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const moLayer= new ImageLayer({
    source:moSource,
    // @ts-ignore
    name:'MO_Peatlands',
    display: 'Montenegrin Bogs',
    region: 'Montenegro'
});

const neSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:netherland", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const neLayer= new ImageLayer({
    source:neSource,
    // @ts-ignore
    name:'NE_Peatlands',
    display: 'Dutch Bogs',
    region: 'Netherlands'
});

const polSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:poland", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const polLayer= new ImageLayer({
    source:polSource,
    // @ts-ignore
    name:'POL_Peatlands',
    display: 'Polish Bogs',
    region: 'Poland'
});

const porSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:portugal", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const porLayer= new ImageLayer({
    source:porSource,
    // @ts-ignore
    name:'POR_Peatlands',
    display: 'Portuguese Bogs',
    region: 'Portugal'
});

const roSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:romania", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const roLayer= new ImageLayer({
    source:roSource,
    // @ts-ignore
    name:'RO_Peatlands',
    display: 'Romanian Bogs',
    region: 'Romania'
});

const seSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:serbia", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const seLayer= new ImageLayer({
    source:seSource,
    // @ts-ignore
    name:'SE_Peatlands',
    display: 'Serbian Bogs',
    region: 'Serbia'
});

const slkSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:slovekia", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const slkLayer= new ImageLayer({
    source:slkSource,
    // @ts-ignore
    name:'SLK_Peatlands',
    display: 'Slovak Bogs',
    region: 'Slovekia'
});

const slvSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:slovenia", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const slvLayer= new ImageLayer({
    source:slvSource,
    // @ts-ignore
    name:'SLV_Peatlands',
    display: 'Slovenian Bogs',
    region: 'Slovenia'
});

const spSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:spain", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const spLayer= new ImageLayer({
    source:spSource,
    // @ts-ignore
    name:'SP_Peatlands',
    display: 'Spanish Bogs',
    region: 'Spain'
});

const sweSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:sweden", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const sweLayer= new ImageLayer({
    source:sweSource,
    // @ts-ignore
    name:'SWE_Peatlands',
    display: 'Swedish Bogs',
    region: 'Sweden'
});

const swiSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:switzerland", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const swiLayer= new ImageLayer({
    source:swiSource,
    // @ts-ignore
    name:'SWI_Peatlands',
    display: 'Swiss Bogs',
    region: 'Switzerland'
});


// CORINE-18 
const corineSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"multipeat:corine18", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const corineLayer= new ImageLayer({
    source:corineSource,
    // @ts-ignore
    name:'Corine18',
    display: 'CORINE',
    region: 'International'
});

const osmLayer=new TileLayer({
    source:new OSM(),
    // @ts-ignore
    name: null,
    display: 'Basemap'
});

const view=new View({
    //extent:[-1189593, 6692152.5, -665102.8125, 7450535], // ireland
    //extent:[-2005155, 3723095, 3711745, 8600839], // europe
    extent:[-2050000, 3500000, 8000000, 15000000], // europe and EEA countries
    center:[2000000,7500000],
    zoom:5,
    projection: mapProjection
});

const map=new Map({
    target:"map",
    layers:[osmLayer, corineLayer, ieLayer, nlSoilLayer, 
        detLayer, pltLayer, alkFenLayer, befLayer, bewLayer, eeLayer, fiLayer, alLayer, anLayer,
        auLayer, beLayer, boLayer, buLayer, crLayer, czLayer, dn_ewmLayer, frLayer, geLayer, grLayer, huLayer, 
        icLayer, irLayer, itLayer, laLayer, lieLayer, litLayer, luLayer, maLayer, moLayer, neLayer, 
        polLayer, porLayer, roLayer, seLayer, slkLayer, slvLayer, spLayer, sweLayer, 
        swiLayer, PSLayer, ctryLayer, ipolLayer],
    view:view
});

$('#map').data('map',map);
