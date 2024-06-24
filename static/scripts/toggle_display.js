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

$("#set-land-tog").on('click', function(event){
    el = document.getElementById("set-land-coll");
    td = document.getElementById("set-land-tog-down");
    tu = document.getElementById("set-land-tog-up");
    
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

$("#set-gw-tog").on('click', function(event){
    el = document.getElementById("set-gw-coll");
    td = document.getElementById("set-gw-tog-down");
    tu = document.getElementById("set-gw-tog-up");
    
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

$("#set-fu-tog").on('click', function(event){
    el = document.getElementById("set-fu-coll");
    td = document.getElementById("set-fu-tog-down");
    tu = document.getElementById("set-fu-tog-up");
    
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

$("#set-cu-tog").on('click', function(event){
    el = document.getElementById("set-cu-coll");
    td = document.getElementById("set-cu-tog-down");
    tu = document.getElementById("set-cu-tog-up");
    
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

/////////////////

$("#map-layers-btn").on('click', function(event){
    ld = document.getElementById("map-lyr-box");
    sv = document.getElementById("map-layers-svg");
    if(ld.style.display == 'none'){
        ld.style.display = 'block';
        sv.style.left = `175px`;
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