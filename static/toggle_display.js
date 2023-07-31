
function toggle_display(){
    console.log("ffs");
    el = document.selectElementById("assum-form-div");
    
    if(el.style.display == 'none'){
        el.style.display = 'block'
    }else if(el.style.display == 'block'){
        el.style.display = 'none'
    }else{
        el.style.display = 'none'
    }
};

/*
$('#assum_disp_btn').on('click', function(event){
    el = document.selectElementByID("assum-form-div");
    
    if(el.style.display == 'none'){
        el.style.display = 'block'
    }else if(el.style.display == 'block'){
        el.style.display = 'none'
    }else{
        el.style.display = 'none'
    }
});*/