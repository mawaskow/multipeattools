$('#update-assum').on('click', function(event){
    var form = $('assum-form');
    var form_id = 'assum-form';
    var url = form.prop('action');
    var type = form.prop('method');
    var formData = getFormData(form_id);

    send_form(form, form_id, url, type, modular_ajax, formData);
});

function getFormData(form_id) {
    var formData = new FormData(document.getElementById(form_id));
    return formData
}