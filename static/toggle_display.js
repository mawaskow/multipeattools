function toggle_display(){
    el = document.querySelector('.content_section');
    
    if(el.style.display == 'none'){
        el.style.display = 'block'
    }else{
       el.style.display = 'none'
    }
  }