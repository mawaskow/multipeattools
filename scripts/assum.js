$('#update-assum').on('click', function(event){
    var form = $('assum-form');
    var form_id = 'assum-form';
    var url = form.prop('action');
    var type = form.prop('method');
    var formData = getAssumFormData(form_id);

    send_assum(form, form_id, url, type, modular_ajax, formData);
});

function getAssumFormData(form_id) {
    var formData = new FormData(document.getElementById(form_id));
    return formData
}