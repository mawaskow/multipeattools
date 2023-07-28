function toggle_display(){
    el = document.selectElementByID("assum-form-div");
    
    if(el.style.display == 'none'){
        el.style.display = 'block'
    }else{
       el.style.display = 'none'
    }
  }