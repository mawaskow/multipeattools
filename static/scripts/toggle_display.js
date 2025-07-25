function toggle_display(){
    el = document.getElementById("assum-form-div");
    
    if(el.style.display == 'none'){
        el.style.display = 'block'
    }else{
        el.style.display = 'none'
    }
};

$("#assum_disp_btn").on('click', function(event){
    af = document.getElementById("assum-form-div");
    fr = document.getElementById("full-results-div");
    
    if(af.style.display == 'none'){
        af.style.display = 'block'
    }else{
        af.style.display = 'none'
    }

    if(fr.style.display != 'none'){
        fr.style.display = 'none'
    }
});

$("#comp_res_btn").on('click', function(event){
    fr = document.getElementById("full-results-div");
    af = document.getElementById("assum-form-div");
    
    if(fr.style.display == 'none'){
        fr.style.display = 'block'
    }else{
        fr.style.display = 'none'
    }

    if(af.style.display != 'none'){
        af.style.display = 'none'
    }
});

$("#r-close-btn").on('click', function(event){
    fr = document.getElementById("full-results-div");
    
    if(fr.style.display != 'none'){
        fr.style.display = 'none'
    }
});

$("#a-close-btn").on('click', function(event){
    af = document.getElementById("assum-form-div");
    
    if(af.style.display != 'none'){
        af.style.display = 'none'
    }
});

/////////////////

$("#map-layers-btn").on('click', function(event){
    ld = document.getElementById("map-lyr-box");
    sv = document.getElementById("map-layers-svg");
    if(ld.style.display == 'none'){
        ld.style.display = 'block';
        sv.style.left = `200px`;
    }else if(ld.style.display == 'block'){
        ld.style.display = 'none';
        sv.style.left = 0;
    }
});

$("#map-pol-btn").on('click', function(event){
    ld = document.getElementById("map-pol-box");
    sv = document.getElementById("map-pol-svg");
    cs = document.getElementById("map-pol-cls-svg");
    cd = document.getElementById("map-pols-cls-div");
    if(ld.style.display == 'none'){
        ld.style.display = 'block';
        sv.style.right = `400px`;
        cs.style.display = 'block';
    }else if(ld.style.display == 'block'){
        ld.style.display = 'none';
        sv.style.right = 0;
        cs.style.display = 'none';
        cd.style.display = 'none';
        cs.style.right = `400px`;
    }
});

$("#map-pol-cls-btn").on('click', function(event){
    cd = document.getElementById("map-pols-cls-div");
    cs = document.getElementById("map-pol-cls-svg");
    if(cd.style.display == 'none'){
        cd.style.display = 'block';
        cs.style.right = `550px`;
    }else if(cd.style.display == 'block'){
        cd.style.display = 'none';
        cs.style.right = `400px`;
    }
});

/////////////////////////////////////////////////////////////////////////

$("#int-lyr-tog").on('click', function(event){
    el = document.getElementById("int-lyr-lyrs");
    td = document.getElementById("int-lyr-tog-down");
    tu = document.getElementById("int-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#ie-lyr-tog").on('click', function(event){
    el = document.getElementById("ie-lyr-lyrs");
    td = document.getElementById("ie-lyr-tog-down");
    tu = document.getElementById("ie-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#pl-lyr-tog").on('click', function(event){
    el = document.getElementById("pl-lyr-lyrs");
    td = document.getElementById("pl-lyr-tog-down");
    tu = document.getElementById("pl-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#nl-lyr-tog").on('click', function(event){
    el = document.getElementById("nl-lyr-lyrs");
    td = document.getElementById("nl-lyr-tog-down");
    tu = document.getElementById("nl-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#de-lyr-tog").on('click', function(event){
    el = document.getElementById("de-lyr-lyrs");
    td = document.getElementById("de-lyr-tog-down");
    tu = document.getElementById("de-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#be-lyr-tog").on('click', function(event){
    el = document.getElementById("be-lyr-lyrs");
    td = document.getElementById("be-lyr-tog-down");
    tu = document.getElementById("be-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#ee-lyr-tog").on('click', function(event){
    el = document.getElementById("ee-lyr-lyrs");
    td = document.getElementById("ee-lyr-tog-down");
    tu = document.getElementById("ee-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#fi-lyr-tog").on('click', function(event){
    el = document.getElementById("fi-lyr-lyrs");
    td = document.getElementById("fi-lyr-tog-down");
    tu = document.getElementById("fi-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

//Wetlands Map of Europe Layers

$("#al-lyr-tog").on('click', function(event){
    el = document.getElementById("al-lyr-lyrs");
    td = document.getElementById("al-lyr-tog-down");
    tu = document.getElementById("al-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#an-lyr-tog").on('click', function(event){
    el = document.getElementById("an-lyr-lyrs");
    td = document.getElementById("an-lyr-tog-down");
    tu = document.getElementById("an-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#au-lyr-tog").on('click', function(event){
    el = document.getElementById("au-lyr-lyrs");
    td = document.getElementById("au-lyr-tog-down");
    tu = document.getElementById("au-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#bo-lyr-tog").on('click', function(event){
    el = document.getElementById("bo-lyr-lyrs");
    td = document.getElementById("bo-lyr-tog-down");
    tu = document.getElementById("bo-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#bu-lyr-tog").on('click', function(event){
    el = document.getElementById("bu-lyr-lyrs");
    td = document.getElementById("bu-lyr-tog-down");
    tu = document.getElementById("bu-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#cr-lyr-tog").on('click', function(event){
    el = document.getElementById("cr-lyr-lyrs");
    td = document.getElementById("cr-lyr-tog-down");
    tu = document.getElementById("cr-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#cz-lyr-tog").on('click', function(event){
    el = document.getElementById("cz-lyr-lyrs");
    td = document.getElementById("cz-lyr-tog-down");
    tu = document.getElementById("cz-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#dn-lyr-tog").on('click', function(event){
    el = document.getElementById("dn-lyr-lyrs");
    td = document.getElementById("dn-lyr-tog-down");
    tu = document.getElementById("dn-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#fr-lyr-tog").on('click', function(event){
    el = document.getElementById("fr-lyr-lyrs");
    td = document.getElementById("fr-lyr-tog-down");
    tu = document.getElementById("fr-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});


$("#gr-lyr-tog").on('click', function(event){
    el = document.getElementById("gr-lyr-lyrs");
    td = document.getElementById("gr-lyr-tog-down");
    tu = document.getElementById("gr-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#hu-lyr-tog").on('click', function(event){
    el = document.getElementById("hu-lyr-lyrs");
    td = document.getElementById("hu-lyr-tog-down");
    tu = document.getElementById("hu-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#ic-lyr-tog").on('click', function(event){
    el = document.getElementById("ic-lyr-lyrs");
    td = document.getElementById("ic-lyr-tog-down");
    tu = document.getElementById("ic-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#it-lyr-tog").on('click', function(event){
    el = document.getElementById("it-lyr-lyrs");
    td = document.getElementById("it-lyr-tog-down");
    tu = document.getElementById("it-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#la-lyr-tog").on('click', function(event){
    el = document.getElementById("la-lyr-lyrs");
    td = document.getElementById("la-lyr-tog-down");
    tu = document.getElementById("la-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#lie-lyr-tog").on('click', function(event){
    el = document.getElementById("lie-lyr-lyrs");
    td = document.getElementById("lie-lyr-tog-down");
    tu = document.getElementById("lie-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#lit-lyr-tog").on('click', function(event){
    el = document.getElementById("lit-lyr-lyrs");
    td = document.getElementById("lit-lyr-tog-down");
    tu = document.getElementById("lit-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#lu-lyr-tog").on('click', function(event){
    el = document.getElementById("lu-lyr-lyrs");
    td = document.getElementById("lu-lyr-tog-down");
    tu = document.getElementById("lu-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#ma-lyr-tog").on('click', function(event){
    el = document.getElementById("ma-lyr-lyrs");
    td = document.getElementById("ma-lyr-tog-down");
    tu = document.getElementById("ma-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#mo-lyr-tog").on('click', function(event){
    el = document.getElementById("mo-lyr-lyrs");
    td = document.getElementById("mo-lyr-tog-down");
    tu = document.getElementById("mo-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#por-lyr-tog").on('click', function(event){
    el = document.getElementById("por-lyr-lyrs");
    td = document.getElementById("por-lyr-tog-down");
    tu = document.getElementById("por-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#ro-lyr-tog").on('click', function(event){
    el = document.getElementById("ro-lyr-lyrs");
    td = document.getElementById("ro-lyr-tog-down");
    tu = document.getElementById("ro-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#se-lyr-tog").on('click', function(event){
    el = document.getElementById("se-lyr-lyrs");
    td = document.getElementById("se-lyr-tog-down");
    tu = document.getElementById("se-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#slk-lyr-tog").on('click', function(event){
    el = document.getElementById("slk-lyr-lyrs");
    td = document.getElementById("slk-lyr-tog-down");
    tu = document.getElementById("slk-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#slv-lyr-tog").on('click', function(event){
    el = document.getElementById("slv-lyr-lyrs");
    td = document.getElementById("slv-lyr-tog-down");
    tu = document.getElementById("slv-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#sp-lyr-tog").on('click', function(event){
    el = document.getElementById("sp-lyr-lyrs");
    td = document.getElementById("sp-lyr-tog-down");
    tu = document.getElementById("sp-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#swe-lyr-tog").on('click', function(event){
    el = document.getElementById("swe-lyr-lyrs");
    td = document.getElementById("swe-lyr-tog-down");
    tu = document.getElementById("swe-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#swi-lyr-tog").on('click', function(event){
    el = document.getElementById("swi-lyr-lyrs");
    td = document.getElementById("swi-lyr-tog-down");
    tu = document.getElementById("swi-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

$("#uk-lyr-tog").on('click', function(event){
    el = document.getElementById("uk-lyr-lyrs");
    td = document.getElementById("uk-lyr-tog-down");
    tu = document.getElementById("uk-lyr-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block';
        td.style.display = 'none';
        tu.style.display = 'block';
    }else if(el.style.display != 'none'){
        el.style.display = 'none';
        td.style.display = 'block';
        tu.style.display = 'none';
    }
});

//
$("#inputPolLvl").on('change', function(event){
    var lvl_sel = document.getElementById('inputPolLvl');
    //
    var h5 = document.getElementById('inputPolLocHead');
    var hr = document.getElementById('polsub-loc-hr');
    var cd = document.getElementById('inputPolCtryDiv');
    var rd = document.getElementById('inputPolRegDiv');
    var ld = document.getElementById('inputPolLocDiv');
    //
    if(lvl_sel.value=="National"){
        h5.style.display ='block';
        hr.style.display ='block';
        cd.style.display ='block';
        rd.style.display ='none';
        ld.style.display ='none';
    }else if(lvl_sel.value=="Regional"){
        h5.style.display ='block';
        hr.style.display ='block';
        cd.style.display ='block';
        rd.style.display ='block';
        ld.style.display ='none';
    }else if(lvl_sel.value=="Local"){
        h5.style.display ='block';
        hr.style.display ='block';
        cd.style.display ='block';
        rd.style.display ='block';
        ld.style.display ='block';
    }else if(lvl_sel.value=="European"){
        h5.style.display ='none';
        hr.style.display ='none';
        cd.style.display ='none';
        rd.style.display ='none';
        ld.style.display ='none';
    }else if(lvl_sel.value=="Global"){
        h5.style.display ='none';
        hr.style.display ='none';
        cd.style.display ='none';
        rd.style.display ='none';
        ld.style.display ='none';
    }
});