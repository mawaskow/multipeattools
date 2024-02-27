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

function displayPols(polList){
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
    for (let i=0; i < polList.length; i++){
        var element = 
            `<a class="pol-lst-name" href=${polList[i]['link']} target="_blank" rel="noopener noreferrer">${polList[i]['name']}</a>
            <p>Level: ${polList[i]['level']}</p>
            <p style="display: inline">Classification:</p>
            <p style="display: inline" class="badge rounded-pill ${pillDct[polList[i]['class']]}">${polList[i]['class']}</p>
            <br><br>`;
        if(polList[i]["level"]=="County" & document.getElementById("county-fltr").checked==true){
            if(classQuerying(polList[i])){
                counPolInfo.append(element);
            }
        }else if(polList[i]["level"]=="Regional" & document.getElementById("regional-fltr").checked==true){
            if(classQuerying(polList[i])){
                regPolInfo.append(element);
            }
        }else if(polList[i]["level"]=="National" & document.getElementById("national-fltr").checked==true){
            if(classQuerying(polList[i])){
                natPolInfo.append(element);
            }
        }else if(polList[i]["level"]=="European"){
            if(classQuerying(polList[i])){
                euPolInfo.append(element);
            }
        }else if(polList[i]["level"]=="Global"){
            if(classQuerying(polList[i])){
                globPolInfo.append(element);
            }
        }
        noFeatures.html('');
    }
}

// MAIN EVENT
map.on('singleclick', function (evt) {
    const coordinate = evt.coordinate;
  
    const view=map.getView();
    const resolution=view.getResolution();
    const projection=view.getProjection();
  
    const ipolLayer=getLayerByDisplay('Policies');
    const ipolSource=ipolLayer.getSource();
    const ipolUrl=ipolSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json', 'FEATURE_COUNT':'1000'});    
    if(ipolUrl){
        var polList= [];
        // gets features
        $.ajax({
            url:ipolUrl,
            method:'GET',
            async:false,
            success:function(result){
                for (let i=0; i < result.features.length; i++){
                    const ipol=result.features[i];
                    if(ipol){
                        polList.push(
                            {'name':ipol.properties.name, 
                            'level':ipol.properties.level, 
                            'class':ipol.properties.classif, 
                            'link':ipol.properties.link}
                        );
                    }
                }
            }
        })
        displayPols(polList)
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