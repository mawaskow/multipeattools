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

$("#set-land-tog-down").on('click', function(event){
    el = document.getElementById("set-land-coll");
    td = document.getElementById("set-land-tog-down");
    tu = document.getElementById("set-land-tog-up");
    
    if(el.style.display == 'none'){
        el.style.display = 'block'
    }

    if(td.style.display != 'none'){
        td.style.display = 'none'
    }

    if(tu.style.display == 'none'){
        tu.style.display = 'block'
    }
});

$("#set-land-tog-up").on('click', function(event){
    el = document.getElementById("set-land-coll");
    td = document.getElementById("set-land-tog-down");
    tu = document.getElementById("set-land-tog-up");
    
    if(el.style.display != 'none'){
        el.style.display = 'none'
    }

    if(tu.style.display != 'none'){
        tu.style.display = 'none'
    }

    if(td.style.display == 'none'){
        td.style.display = 'block'
    }
});