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
    'Research and applied sciences':`res-class-pill`,
    //
    'Land Use / Agriculture': `land-class-pill`,
    'Climate Action':`clm-class-pill`,
    'Research and Applied Sciences':`res-class-pill`,
    'Environment Quality':`env-class-pill`,
    };
const pillNames = 
    {'Economy': `Economy`,
    'Land-Use / Agriculture': `Land-Use / Agriculture`,
    'Environmental quality: water, soil, air':`Environmental Quality`,
    'Community and Culture':`Community and Culture`,
    'Climate':`Climate`,
    'Energy':`Energy`,
    'Biodiversity':`Biodiversity`,
    'Research and applied sciences':`Research`,
    //
    'Land Use / Agriculture': `Land-Use / Agriculture`,
    'Climate Action':`Climate`,
    'Research and Applied Sciences':`Research`,
    'Environment Quality':`Environmental Quality`,
    };

// FXNS
function classQuerying(policy){
    // takes a policy object and returns whether or not to display the policy
    // based on the policy's primary category and whether that category box is checked
    var biod = document.getElementById("bio-cls-bx");
    var clmac = document.getElementById("clm-cls-bx");
    var enrg = document.getElementById("enr-cls-bx");
    var econ = document.getElementById("econ-cls-bx");
    var land = document.getElementById("land-cls-bx");
    var comm = document.getElementById("comm-cls-bx");
    var res = document.getElementById("res-cls-bx");
    var env = document.getElementById("env-cls-bx"); 
    if(policy["primary_category"]=="Biodiversity" & biod.checked==true){
        return true;
    }else if(policy["primary_category"]=='Climate Action' & clmac.checked==true){
        return true;
    }else if(policy["primary_category"]=="Community and Culture" & comm.checked==true){
        return true;
    }else if(policy["primary_category"]=="Economy" & econ.checked==true){
        return true;
    }else if(policy["primary_category"]=="Energy" & enrg.checked==true){
        return true;
    }else if(policy["primary_category"]=='Environment Quality' & env.checked==true){
        return true;
    }else if(policy["primary_category"]=='Land Use / Agriculture' & land.checked==true){
        return true;
    }else if(policy["primary_category"]=='Research and Applied Sciences' & res.checked==true){
        return true;
    }
    return false;
}

function togglePols(polLst){
    // takes the polLst, filters it according to levels and categories selected, 
    // then displays them in their predefined level sections
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
            `<a class="pol-lst-name" href=${pol["data_link"]} target="_blank" rel="noopener noreferrer">${pol["name"]}</a>
            <p>Level: ${pol["policy_level"]}</p>
            <p style="display: inline">Classification:</p>
            <p style="display: inline" class="badge rounded-pill ${pillDct[pol["primary_category"]]}">${pillNames[pol["primary_category"]]}</p>
            <br><br>`;
        if(pol["policy_level"]=="Local" & document.getElementById("locauth-fltr").checked==true){
            if(classQuerying(pol)){
                counPolInfo.append(element);
            }
        }else if(pol["policy_level"]=="Regional" & document.getElementById("regional-fltr").checked==true){
            if(classQuerying(pol)){
                regPolInfo.append(element);
            }
        }else if(pol["policy_level"]=="National" & document.getElementById("national-fltr").checked==true){
            if(classQuerying(pol)){
                natPolInfo.append(element);
            }
        }else if(pol["policy_level"]=="European" & document.getElementById("eu-fltr").checked==true){
            if(classQuerying(pol)){
                euPolInfo.append(element);
            }
        }else if(pol["policy_level"]=="Global" & document.getElementById("global-fltr").checked==true){
            if(classQuerying(pol)){
                globPolInfo.append(element);
            }
        }
        noFeatures.html('');
    })
}

function updatePols(){
    // calls toggling function on polLst stored in #policy-request-store
    var polLst = $('#policy-request-store').val();
    //console.log(polLst);
    if(polLst != JSON.stringify([])){
        togglePols(JSON.parse(polLst));
    }
    //console.log(JSON.parse(polLst));
}

async function getGlobEuPol(european){
    // get global policies and maybe european policies 
    // depending on the value of "european"
    const url = '/policydata';
    var polLst = [];
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        var polcol= json["result"]["response"];
        polcol.forEach(pol =>{
            if(pol["policy_level"] == "Global"){
                polLst.push(pol);
            }
            if(european=="T"){
                if(pol["policy_level"] == "European"){
                    polLst.push(pol);
                }
            }
        })
    } catch (error) {
        console.error(error.message);
    }
    return polLst;
}

// MAIN EVENT
async function parsePols(evt){
    // on event (click), first check if click is within EU,
    // then get global (and EU, depending) policies
    // then get the policies that contain the coordinates of the click i.e. national, regional, local
    $('#policy-request-store').attr({
        value: JSON.stringify([])
    });
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
    var val= "F";
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
    var eu_status = $('#eustat-request-store').val();
    var polLst = await getGlobEuPol(eu_status);
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
                        {"name": ipol.properties.name, 
                        "policy_level": ipol.properties.policy_level, 
                        "primary_category": ipol.properties.primary_category, 
                        "data_link": ipol.properties.data_link}
                        );
                    }
                };
            }
        })
    }
    document.getElementById('policy-request-store').value = JSON.stringify(polLst);
    togglePols(polLst);
    //console.log(polLst.length, polLst);
};

function displayChange(evt){
    var lb = document.getElementById("map-lyr-box");
    var lsv = document.getElementById("map-layers-svg");
    lb.style.display = 'block';
    lsv.style.left = `200px`;
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
map.addEventListener("singleclick", parsePols);

const pol_filt_dct = 
{"biodiv":"Biodiversity", "clmact":"Climate Action", "cultr":"Culture", "econ":"Economy", "enrg":"Energy", "envqual": "Env. Quality", 
"lu":"Land Use", "resr":"Research"};
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
var commFltr = document.getElementById("comm-cls-bx");
commFltr.addEventListener("click", updatePols);
var econFltr = document.getElementById("econ-cls-bx");
econFltr.addEventListener("click", updatePols);
var enrFltr = document.getElementById("enr-cls-bx");
enrFltr.addEventListener("click", updatePols);
var envFltr = document.getElementById("env-cls-bx");
envFltr.addEventListener("click", updatePols);
var landFltr = document.getElementById("land-cls-bx");
landFltr.addEventListener("click", updatePols);
var resFltr = document.getElementById("res-cls-bx");
resFltr.addEventListener("click", updatePols);