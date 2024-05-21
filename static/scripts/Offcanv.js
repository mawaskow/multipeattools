import {getLayerByName} from './customFunctions.js'
import {getLayerByDisplay} from './customFunctions.js'

const map=$('#map').data('map');

const pillDct = 
    {'Economy': `econ-class-pill`,
    'Land Use': `land-class-pill`,
    'Environmental Quality':`env-class-pill`,
    'Community and Culture':`comm-class-pill`,
    'Climate Action':`clm-class-pill`,
    'Energy':`enr-class-pill`,
    'Biodiversity':`bio-class-pill`,
    'Research and Applied Sciences':`res-class-pill`
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
    if(policy["class"]=="Biodiversity" & biod.checked==true){
        return true;
    }else if(policy["class"]=="Climate Action" & clmac.checked==true){
        return true;
    }else if(policy["class"]=="Energy" & enrg.checked==true){
        return true;
    }else if(policy["class"]=="Economy" & econ.checked==true){
        return true;
    }else if(policy["class"]=="Land Use" & land.checked==true){
        return true;
    }else if(policy["class"]=="Community and Culture" & comm.checked==true){
        return true;
    }else if(policy["class"]=="Research and Applied Sciences" & res.checked==true){
        return true;
    }else if(policy["class"]=="Environmental Quality" & env.checked==true){
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
    //console.log(polLst);
    polLst.forEach(pol => {
        var element = 
            `<a class="pol-lst-name" href=${pol['link']} target="_blank" rel="noopener noreferrer">${pol['name']}</a>
            <p>Level: ${pol['level']}</p>
            <p style="display: inline">Classification:</p>
            <p style="display: inline" class="badge rounded-pill ${pillDct[pol['class']]}">${pol['class']}</p>
            <br><br>`;
        if(pol["level"]=="County" & document.getElementById("locauth-fltr").checked==true){
            if(classQuerying(pol)){
                counPolInfo.append(element);
            }
        }else if(pol["level"]=="Regional" & document.getElementById("regional-fltr").checked==true){
            if(classQuerying(pol)){
                regPolInfo.append(element);
            }
        }else if(pol["level"]=="National" & document.getElementById("national-fltr").checked==true){
            if(classQuerying(pol)){
                natPolInfo.append(element);
            }
        }else if(pol["level"]=="European" & document.getElementById("eu-fltr").checked==true){
            if(classQuerying(pol)){
                euPolInfo.append(element);
            }
        }else if(pol["level"]=="Global" & document.getElementById("global-fltr").checked==true){
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
}

// MAIN EVENT
map.on('singleclick', function (evt) {
    $('#policy-request-store').attr({
        value: JSON.stringify([])
    });
    var polLst = [];
    // first, get coordinate and map info
    const coordinate = evt.coordinate;
    const view=map.getView();
    const resolution=view.getResolution();
    const projection=view.getProjection();
    // then get info on whether or not this is an EU member state
    // do this first by calling on countries layer
    const ctryLayer=getLayerByDisplay('Countries');
    const ctrySource=ctryLayer.getSource();
    const ctryUrl=ctrySource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json', 'FEATURE_COUNT':'1'});
    // then send ajax request for EU member state status
    if(ctryUrl){
        $.ajax({
            url:ctryUrl,
            method:'GET',
            async:false,
            success:function(result){
                const info=result.features[0];
                $('#eustat-request-store').attr({
                    value: info.properties.eu_stat
                });
            }
        })
    }
    // then get global and potentially EU policies??
    // with php request maybe??
    // read into policy list hidden feature
    // ???????????????????????????????????????????
    var xhttp;
    xhttp =  new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // push global list to the #policy-request-store
        //document.getElementById("test-glob").innerHTML = this.responseText;
        console.log(this.responseText);
        }
    };
    xhttp.open("GET", "/getpols/0", true);
    xhttp.send();
    //
    var eustat= document.getElementById('eustat-request-store').value;
    if(eustat=='T'){
        console.log("Is EU member state.");
        // now get the EU data via xhttp
        // and push list to the #policy-request-store
    }
    
    // then get national/sub-national policies
    // do this first by calling the policies layer
    const ipolLayer=getLayerByDisplay('Policies');
    const ipolSource=ipolLayer.getSource();
    const ipolUrl=ipolSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json', 'FEATURE_COUNT':'1000'});
    // then send ajax request and update the policylist
    if(ipolUrl){
        polLst= JSON.parse(document.getElementById('policy-request-store').value);
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
                            {'name':ipol.properties.name, 
                            'level':ipol.properties.level, 
                            'class':ipol.properties.classif, 
                            'link':ipol.properties.link}
                        );
                    }
                };
                $('#policy-request-store').attr({
                    value: JSON.stringify(polLst)
                });
            }
        })
        displayPols(polLst);
    }
});

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
