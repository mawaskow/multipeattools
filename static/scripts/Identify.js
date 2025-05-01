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
  // wetlands map of europe layers
  // al-albania
  const alInfo=$('#al-info');
  alInfo.html('');
  // an-andorra
  const anInfo=$('#an-info');
  anInfo.html('');
  // au-austria
  const auInfo=$('#au-info');
  auInfo.html('');
  // be-belgium
  const beInfo=$('#be-info');
  beInfo.html('');
  // bo-bosnia
  const boInfo=$('#bo-info');
  boInfo.html('');
  // bu-bulgaria
  const buInfo=$('#bu-info');
  buInfo.html('');
  // cr-croatia
  const crInfo=$('#cr-info');
  crInfo.html('');
  // cz-czech
  const czInfo=$('#cz-info');
  czInfo.html('');
  // de-denmark
  const dn_ewmInfo=$('#dn-ewm-info');
  dn_ewmInfo.html('');
  // fr-france
  const frInfo=$('#fr-info');
  frInfo.html('');
  // ge-germany
  const geInfo=$('#ge-info');
  geInfo.html('');
  // gr-greece
  const grInfo=$('#gr-info');
  grInfo.html('');
  // hu-hungary
  const huInfo=$('#hu-info');
  huInfo.html('');
  // ic-iceland
  const icInfo=$('#ic-info');
  icInfo.html('');
  // ir-ireland
  const irInfo=$('#ir-info');
  irInfo.html('');
  // it-italy
  const itInfo=$('#it-info');
  itInfo.html('');
  // la-latvia
  const laInfo=$('#la-info');
  laInfo.html('');
  // lie-liechtenstein
  const lieInfo=$('#lie-info');
  lieInfo.html('');
  // lit-lithuania
  const litInfo=$('#lit-info');
  litInfo.html('');
  // lu-luxembourg
  const luInfo=$('#lu-info');
  luInfo.html('');
  // ma-macedonia
  const maInfo=$('#ma-info');
  maInfo.html('');
  // mo-montenegro
  const moInfo=$('#mo-info');
  moInfo.html('');
  // ne-netherland 
  const neInfo=$('#ne-info');
  neInfo.html('');
  // pol-poland
  const polInfo=$('#pol-info');
  polInfo.html('');
  // por-portugal
  const porInfo=$('#por-info');
  porInfo.html('');
  // ro-romania
  const roInfo=$('#ro-info');
  roInfo.html('');
  // se-serbia
  const seInfo=$('#se-info');
  seInfo.html('');
  // slk-slovekia
  const slkInfo=$('#slk-info');
  slkInfo.html('');
  // slv-slovenia
  const slvInfo=$('#slv-info');
  slvInfo.html('');
  // sp-spain
  const spInfo=$('#sp-info');
  spInfo.html('');
  // swe-sweden
  const sweInfo=$('#swe-info');
  sweInfo.html('');
  // swi-switzerland
  const swiInfo=$('#swi-info');
  swiInfo.html('');
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
    // wetlands map of europe
    const alLayer=getLayerByName('AL_Peatlands');
    const alSource=alLayer.getSource();
    const alUrl=alSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});
    
    if(alUrl){
        $.ajax({
            url:alUrl,
            method:'GET',
            success:function(result){
                const al=result.features[0];
                if(al){
                    const styp=al.properties.site_type;
                    alInfo.html(`
                        <p>Site Type: ${styp}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

    const anLayer=getLayerByName('AN_Peatlands');
    const anSource=anLayer.getSource();
    const anUrl=anSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(anUrl){
        $.ajax({
            url:anUrl,
            method:'GET',
            success:function(result){
                const an=result.features[0];
                if(an){
                    const styp=an.properties.site_type;
                    anInfo.html(`
                        <p>Site Type: ${styp}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

    const auLayer=getLayerByName('AU_Peatlands');
    const auSource=auLayer.getSource();
    const auUrl=auSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(auUrl){
            $.ajax({
                url:auUrl,
                method:'GET',
                success:function(result){
                    const au=result.features[0];
                    if(au){
                        const styp=au.properties.site_type;
                        auInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const beLayer=getLayerByName('BE_Peatlands');
    const beSource=beLayer.getSource();
    const beUrl=beSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(beUrl){
            $.ajax({
                url:beUrl,
                method:'GET',
                success:function(result){
                    const be=result.features[0];
                    if(be){
                        const styp=be.properties.site_type;
                        beInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const boLayer=getLayerByName('BO_Peatlands');
    const boSource=boLayer.getSource();
    const boUrl=boSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(boUrl){
            $.ajax({
                url:boUrl,
                method:'GET',
                success:function(result){
                    const bo=result.features[0];
                    if(bo){
                        const styp=bo.properties.site_type;
                        boInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const buLayer=getLayerByName('BU_Peatlands');
    const buSource=buLayer.getSource();
    const buUrl=buSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(buUrl){
            $.ajax({
                url:buUrl,
                method:'GET',
                success:function(result){
                    const bu=result.features[0];
                    if(bu){
                        const styp=bu.properties.site_type;
                        buInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }
    
    const crLayer=getLayerByName('CR_Peatlands');
    const crSource=crLayer.getSource();
    const crUrl=crSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(crUrl){
            $.ajax({
                url:crUrl,
                method:'GET',
                success:function(result){
                    const cr=result.features[0];
                    if(cr){
                        const styp=cr.properties.site_type;
                        crInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const czLayer=getLayerByName('CZ_Peatlands');
    const czSource=czLayer.getSource();
    const czUrl=czSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(czUrl){
            $.ajax({
                url:czUrl,
                method:'GET',
                success:function(result){
                    const cz=result.features[0];
                    if(cz){
                        const styp=cz.properties.site_type;
                        czInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }
    
    const dn_ewmLayer=getLayerByName('DN_EWM_Peatlands');
    const dn_ewmSource=dn_ewmLayer.getSource();
    const dn_ewmUrl=dn_ewmSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(dn_ewmUrl){
            $.ajax({
                url:dn_ewmUrl,
                method:'GET',
                success:function(result){
                    const dn_ewm=result.features[0];
                    if(dn_ewm){
                        const styp=dn_ewm.properties.site_type;
                        dnInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const frLayer=getLayerByName('FR_Peatlands');
    const frSource=frLayer.getSource();
    const frUrl=frSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(frUrl){
            $.ajax({
                url:frUrl,
                method:'GET',
                success:function(result){
                    const fr=result.features[0];
                    if(fr){
                        const styp=fr.properties.site_type;
                        frInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const geLayer=getLayerByName('DE_EWM_Peatlands');
    const geSource=geLayer.getSource();
    const geUrl=geSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(geUrl){
            $.ajax({
                url:geUrl,
                method:'GET',
                success:function(result){
                    const ge=result.features[0];
                    if(ge){
                        const styp=ge.properties.site_type;
                        geInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const grLayer=getLayerByName('GR_Peatlands');
    const grSource=grLayer.getSource();
    const grUrl=grSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(grUrl){
            $.ajax({
                url:grUrl,
                method:'GET',
                success:function(result){
                    const gr=result.features[0];
                    if(gr){
                        const styp=gr.properties.site_type;
                        grInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const huLayer=getLayerByName('HU_Peatlands');
    const huSource=huLayer.getSource();
    const huUrl=huSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(huUrl){
            $.ajax({
                url:huUrl,
                method:'GET',
                success:function(result){
                    const hu=result.features[0];
                    if(hu){
                        const styp=hu.properties.site_type;
                        huInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const icLayer=getLayerByName('IC_Peatlands');
    const icSource=icLayer.getSource();
    const icUrl=icSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(icUrl){
            $.ajax({
                url:icUrl,
                method:'GET',
                success:function(result){
                    const ic=result.features[0];
                    if(ic){
                        const styp=ic.properties.site_type;
                        icInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const irLayer=getLayerByName('IR_Peatlands');
    const irSource=irLayer.getSource();
    const irUrl=irSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(irUrl){
            $.ajax({
                url:irUrl,
                method:'GET',
                success:function(result){
                    const ir=result.features[0];
                    if(ir){
                        const styp=ir.properties.site_type;
                        irInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const itLayer=getLayerByName('IT_Peatlands');
    const itSource=itLayer.getSource();
    const itUrl=itSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(itUrl){
            $.ajax({
                url:itUrl,
                method:'GET',
                success:function(result){
                    const it=result.features[0];
                    if(it){
                        const styp=it.properties.site_type;
                        itInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const laLayer=getLayerByName('LA_Peatlands');
    const laSource=laLayer.getSource();
    const laUrl=laSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(laUrl){
            $.ajax({
                url:laUrl,
                method:'GET',
                success:function(result){
                    const la=result.features[0];
                    if(la){
                        const styp=la.properties.site_type;
                        laInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const lieLayer=getLayerByName('LIE_Peatlands');
    const lieSource=lieLayer.getSource();
    const lieUrl=lieSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(lieUrl){
            $.ajax({
                url:lieUrl,
                method:'GET',
                success:function(result){
                    const lie=result.features[0];
                    if(lie){
                        const styp=lie.properties.site_type;
                        lieInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const litLayer=getLayerByName('LIT_Peatlands');
    const litSource=litLayer.getSource();
    const litUrl=litSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(litUrl){
            $.ajax({
                url:litUrl,
                method:'GET',
                success:function(result){
                    const lit=result.features[0];
                    if(lit){
                        const styp=lit.properties.site_type;
                        litInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const luLayer=getLayerByName('LU_Peatlands');
    const luSource=luLayer.getSource();
    const luUrl=luSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(luUrl){
            $.ajax({
                url:luUrl,
                method:'GET',
                success:function(result){
                    const lu=result.features[0];
                    if(lu){
                        const styp=lu.properties.site_type;
                        luInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const maLayer=getLayerByName('MA_Peatlands');
    const maSource=maLayer.getSource();
    const maUrl=maSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(maUrl){
            $.ajax({
                url:maUrl,
                method:'GET',
                success:function(result){
                    const ma=result.features[0];
                    if(ma){
                        const styp=ma.properties.site_type;
                        maInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const moLayer=getLayerByName('MO_Peatlands');
    const moSource=moLayer.getSource();
    const moUrl=moSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(moUrl){
            $.ajax({
                url:moUrl,
                method:'GET',
                success:function(result){
                    const mo=result.features[0];
                    if(mo){
                        const styp=mo.properties.site_type;
                        moInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const neLayer=getLayerByName('NE_Peatlands');
    const neSource=neLayer.getSource();
    const neUrl=neSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(neUrl){
            $.ajax({
                url:neUrl,
                method:'GET',
                success:function(result){
                    const ne=result.features[0];
                    if(ne){
                        const styp=ne.properties.site_type;
                        neInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const polLayer=getLayerByName('POL_Peatlands');
    const polSource=polLayer.getSource();
    const polUrl=polSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(polUrl){
            $.ajax({
                url:polUrl,
                method:'GET',
                success:function(result){
                    const pol=result.features[0];
                    if(pol){
                        const styp=pol.properties.site_type;
                        polInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const porLayer=getLayerByName('POR_Peatlands');
    const porSource=porLayer.getSource();
    const porUrl=porSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(porUrl){
            $.ajax({
                url:porUrl,
                method:'GET',
                success:function(result){
                    const por=result.features[0];
                    if(por){
                        const styp=por.properties.site_type;
                        porInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const roLayer=getLayerByName('RO_Peatlands');
    const roSource=roLayer.getSource();
    const roUrl=roSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(roUrl){
            $.ajax({
                url:roUrl,
                method:'GET',
                success:function(result){
                    const ro=result.features[0];
                    if(ro){
                        const styp=ro.properties.site_type;
                        roInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const seLayer=getLayerByName('SE_Peatlands');
    const seSource=seLayer.getSource();
    const seUrl=seSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(seUrl){
            $.ajax({
                url:seUrl,
                method:'GET',
                success:function(result){
                    const se=result.features[0];
                    if(se){
                        const styp=se.properties.site_type;
                        seInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const slkLayer=getLayerByName('SLK_Peatlands');
    const slkSource=slkLayer.getSource();
    const slkUrl=slkSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(slkUrl){
            $.ajax({
                url:slkUrl,
                method:'GET',
                success:function(result){
                    const slk=result.features[0];
                    if(slk){
                        const styp=slk.properties.site_type;
                        slkInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const slvLayer=getLayerByName('SLV_Peatlands');
    const slvSource=slvLayer.getSource();
    const slvUrl=slvSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(slvUrl){
            $.ajax({
                url:slvUrl,
                method:'GET',
                success:function(result){
                    const slv=result.features[0];
                    if(slv){
                        const styp=slv.properties.site_type;
                        slvInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const spLayer=getLayerByName('SP_Peatlands');
    const spSource=spLayer.getSource();
    const spUrl=spSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(spUrl){
            $.ajax({
                url:spUrl,
                method:'GET',
                success:function(result){
                    const sp=result.features[0];
                    if(sp){
                        const styp=sp.properties.site_type;
                        spInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const sweLayer=getLayerByName('SWE_Peatlands');
    const sweSource=sweLayer.getSource();
    const sweUrl=sweSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(sweUrl){
            $.ajax({
                url:sweUrl,
                method:'GET',
                success:function(result){
                    const swe=result.features[0];
                    if(swe){
                        const styp=swe.properties.site_type;
                        sweInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
        }

    const swiLayer=getLayerByName('SWI_Peatlands');
    const swiSource=swiLayer.getSource();
    const swiUrl=swiSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});
    
        if(swiUrl){
            $.ajax({
                url:swiUrl,
                method:'GET',
                success:function(result){
                    const swi=result.features[0];
                    if(swi){
                        const styp=swi.properties.site_type;
                        swiInfo.html(`
                            <p>Site Type: ${styp}</p>`);
                        noFeatures.html('');
                        }
    
                }
            })
    }

  overlay.setPosition(coordinate);
});
