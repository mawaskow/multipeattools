import {getLayerByName} from './customFunctions.js'
import {getLayerByDisplay} from './customFunctions.js'

const map=$('#map').data('map');

const pillDct = 
    {'Economy': `econ-class-pill`,
    'Land-Use / Agriculture': `land-class-pill`,
    'Environmental quality: water, soil, air':`env-class-pill`,
    'Community and Culture':`comm-class-pill`,
    'Climate':`clm-class-pill`,
    'Energy':`enr-class-pill`,
    'Biodiversity':`bio-class-pill`,
    'Research and applied sciences':`res-class-pill`
    };

const pillNames = 
    {'Economy': `Economy`,
    'Land-Use / Agriculture': `Land-Use / Agriculture`,
    'Environmental quality: water, soil, air':`Environmental Quality`,
    'Community and Culture':`Community and Culture`,
    'Climate':`Climate`,
    'Energy':`Energy`,
    'Biodiversity':`Biodiversity`,
    'Research and applied sciences':`Research`
    };

// FXNS
function classQuerying(policy){
    var biod = document.getElementById("bio-cls-bx");
    var clmac = document.getElementById("clm-cls-bx");
    var enrg = document.getElementById("enr-cls-bx");
    var econ = document.getElementById("econ-cls-bx");
    var land = document.getElementById("land-cls-bx");
    var comm = document.getElementById("comm-cls-bx");
    var res = document.getElementById("res-cls-bx");
    var env = document.getElementById("env-cls-bx"); 
    if(policy[2]=="Biodiversity" & biod.checked==true){
        return true;
    }else if(policy[2]=="Climate" & clmac.checked==true){
        return true;
    }else if(policy[2]=="Energy" & enrg.checked==true){
        return true;
    }else if(policy[2]=="Economy" & econ.checked==true){
        return true;
    }else if(policy[2]=="Land-Use / Agriculture" & land.checked==true){
        return true;
    }else if(policy[2]=="Community and Culture" & comm.checked==true){
        return true;
    }else if(policy[2]=="Research and applied sciences" & res.checked==true){
        return true;
    }else if(policy[2]=="Environmental quality: water, soil, air" & env.checked==true){
        return true;
    }
    return false;
}

function displayPols(polLst){
    ////////////////
    const counPolInfo=$('#coun-pol');
    counPolInfo.html('');
    const regPolInfo=$('#reg-pol');
    regPolInfo.html('');
    const natPolInfo=$('#nat-pol');
    natPolInfo.html('');
    const euPolInfo=$('#eu-pol');
    euPolInfo.html('');
    const globPolInfo=$('#glob-pol');
    globPolInfo.html('');
    ///////////////
    // default
    const noFeatures=$('#offc-no-features');
    noFeatures.html('<p>No features</p>');
    ///////////////////////
    //console.log(polLst.length, polLst);
    polLst.forEach(pol => {
        var element = 
            `<a class="pol-lst-name" href=${pol[3]} target="_blank" rel="noopener noreferrer">${pol[0]}</a>
            <p>Level: ${pol[1]}</p>
            <p style="display: inline">Classification:</p>
            <p style="display: inline" class="badge rounded-pill ${pillDct[pol[2]]}">${pillNames[pol[2]]}</p>
            <br><br>`;
        if(pol[1]=="Local" & document.getElementById("locauth-fltr").checked==true){
            if(classQuerying(pol)){
                counPolInfo.append(element);
            }
        }else if(pol[1]=="Regional" & document.getElementById("regional-fltr").checked==true){
            if(classQuerying(pol)){
                regPolInfo.append(element);
            }
        }else if(pol[1]=="National" & document.getElementById("national-fltr").checked==true){
            if(classQuerying(pol)){
                natPolInfo.append(element);
            }
        }else if(pol[1]=="European" & document.getElementById("eu-fltr").checked==true){
            if(classQuerying(pol)){
                euPolInfo.append(element);
            }
        }else if(pol[1]=="Global" & document.getElementById("global-fltr").checked==true){
            if(classQuerying(pol)){
                globPolInfo.append(element);
            }
        }
        noFeatures.html('');
    })
}

function updatePols(){
    var polLst = $('#policy-request-store').val();
    //console.log(polLst);
    if(polLst != JSON.stringify([])){
        displayPols(JSON.parse(polLst));
    }
    //console.log(JSON.parse(polLst));
    
}

function getEUGlobPols(eustat){
    // get global policies
    var polLst = [];
    var xhttp;
    xhttp =  new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        JSON.parse(this.responseText).forEach(pol =>{
            polLst.push(pol);
        });
        }
    };
    xhttp.open("GET", "/getpols/1", true);
    xhttp.send();
    //
    //var eustat= document.getElementById('eustat-request-store').value;
    if(eustat=='T'){
        //console.log("Is EU member state.");
        xhttp =  new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            JSON.parse(this.responseText).forEach(pol =>{
                polLst.push(pol);
            });
            }
        };
        xhttp.open("GET", "/getpols/0", true);
        xhttp.send();
    }
    //return polLst;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(polLst);
          }, 100);
        }
    );
}

// MAIN EVENT
async function getPols(evt){
    // set html policy store and local list store to empty
    $('#policy-request-store').attr({
        value: JSON.stringify([])
    });
    //var polLst = [];
    // first, get coordinate and map info
    const coordinate = evt.coordinate;
    const view=map.getView();
    const resolution=view.getResolution();
    const projection=view.getProjection();
    //
    const ctryLayer=getLayerByDisplay('Countries');
    const ctrySource=ctryLayer.getSource();
    const ctryUrl=ctrySource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json', 'FEATURE_COUNT':'1'});
    // then send ajax request for EU member state status
    var val= 'F';
    if(ctryUrl){
        $.ajax({
            url:ctryUrl,
            method:'GET',
            async:false,
            success:function(result){
                const info=result.features[0];
                if(info){
                    val = info.properties.eu_stat;
                }
                $('#eustat-request-store').attr({
                    value: val
                });
            }
        })
    }
    var polLst = await getEUGlobPols(val);
    // get natl and subnatl pols
    const ipolLayer=getLayerByDisplay('Policies');
    const ipolSource=ipolLayer.getSource();
    const ipolUrl=ipolSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json', 'FEATURE_COUNT':'1000'});
    // then send ajax request and update the policylist
    if(ipolUrl){
        // gets features
        $.ajax({
            url:ipolUrl,
            method:'GET',
            async:false,
            success:function(result){
                for (let i=0; i < result.features.length; i++){
                    const ipol=result.features[i];
                    if(ipol){
                        polLst.push( 
                        [ipol.properties.engname, 
                        ipol.properties.level, 
                        ipol.properties.classif, 
                        ipol.properties.link]
                        );
                    }
                };
                //console.log("polLst after pushing natl pols:",polLst);
            }
        })
        
    }
    //console.log(polLst.length, polLst);
    document.getElementById('policy-request-store').value = JSON.stringify(polLst);
    //console.log(JSON.parse(document.getElementById('policy-request-store').value));
    displayPols(polLst);
    //console.log(polLst);
};

function displayChange(evt){
    var lb = document.getElementById("map-lyr-box");
    var lsv = document.getElementById("map-layers-svg");
    lb.style.display = 'block';
    lsv.style.left = `175px`;
    var pb = document.getElementById("map-pol-box");
    var psv = document.getElementById("map-pol-svg");
    var pcs = document.getElementById("map-pol-cls-svg");
    pb.style.display = 'block';
    psv.style.right = `400px`;
    pcs.style.display = 'block';
    var cb = document.getElementById("map-pols-cls-div");
    var csv = document.getElementById("map-pol-cls-svg");
    cb.style.display = 'block';
    csv.style.right = `550px`;
};

map.addEventListener("singleclick", displayChange);
map.addEventListener("singleclick", getPols);

const pol_filt_dct = 
{"biodiv":"Biodiversity", "clmact":"Climate Action", "econ":"Economy", 
"lu":"Land Use", "cultr":"Culture", "enrg":"Energy", "resr":"Research", "envqual": "Env. Quality"};
// make dictionary instead for having spaces in display names?
const polDivContent=$('#pol-filter-div');
polDivContent.html('');

for (let pol in pol_filt_dct) {
    const element = `<div class="form-check drag">
    <input class="form-check-input" type="checkbox" value="" id=${pol}>
    <label class="form-check-label d-flex align-self-center" for=${pol}>
    ${pol_filt_dct[pol]}</label>
    </div>`;
    polDivContent.append(element);
    $(`#${pol}`).prop('checked', true);
};

// Update policies on click for all checkboxes
// levels
var locauthFltr = document.getElementById("locauth-fltr");
locauthFltr.addEventListener("click", updatePols);
var regFltr = document.getElementById("regional-fltr");
regFltr.addEventListener("click", updatePols);
var natFltr = document.getElementById("national-fltr");
natFltr.addEventListener("click", updatePols);
var euFltr = document.getElementById("eu-fltr");
euFltr.addEventListener("click", updatePols);
var glbFltr = document.getElementById("global-fltr");
glbFltr.addEventListener("click", updatePols);
// classes
var bioFltr = document.getElementById("bio-cls-bx");
bioFltr.addEventListener("click", updatePols);
var clmFltr = document.getElementById("clm-cls-bx");
clmFltr.addEventListener("click", updatePols);
var enrFltr = document.getElementById("enr-cls-bx");
enrFltr.addEventListener("click", updatePols);
var econFltr = document.getElementById("econ-cls-bx");
econFltr.addEventListener("click", updatePols);
var landFltr = document.getElementById("land-cls-bx");
landFltr.addEventListener("click", updatePols);
var commFltr = document.getElementById("comm-cls-bx");
commFltr.addEventListener("click", updatePols);
var resFltr = document.getElementById("res-cls-bx");
resFltr.addEventListener("click", updatePols);
var envFltr = document.getElementById("env-cls-bx");
envFltr.addEventListener("click", updatePols);