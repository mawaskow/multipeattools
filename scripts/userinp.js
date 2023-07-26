$('#update-usrinpt').on('click', function(event){
    var form = $('input-form');
    var form_id = 'input-form';
    var url = form.prop('action');
    var type = form.prop('method');
    var formData = getInputFormData(form_id);

    send_form(form, form_id, url, type, modular_ajax, formData);
});
