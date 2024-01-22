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

$("#map-pol-size-btn").on('click', function(event){
    map = document.getElementById("map");
    btn = document.getElementById("map-pol-size-btn");
    
    if(map.style.maxHeight == '50%'){
        map.style.maxHeight = '100%';
        btn.innerHTML = 'Shrink Map View';
    }else if(map.style.maxHeight == '100%'){
        map.style.maxHeight = '50%';
        btn.innerHTML = 'Expand Map View';
    }
});