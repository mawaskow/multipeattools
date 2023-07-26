//https://javascript.plainenglish.io/how-to-form-submissions-with-flask-and-ajax-dfde9891c620

function send_form(form, form_id, url, type, inner_ajax, formData) {
    // form validation and sending of form items

    if ( form[0].checkValidity() && isFormDataEmpty(formData) == false ) { // checks if form is empty
        event.preventDefault();

        // inner AJAX call
        inner_ajax(url, type, formData);

    }
    else {
        // first, scan the page for labels, and assign a reference to the label from the actual form element:
        var labels = document.getElementsByTagName('LABEL');
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].htmlFor != '') {
                 var elem = document.getElementById(labels[i].htmlFor);
                 if (elem)
                    elem.label = labels[i];
            }
        }

        // then find all invalid input elements (form fields)
        var Form = document.getElementById(form_id);
        var invalidList = Form.querySelectorAll(':invalid');

        if ( typeof invalidList !== 'undefined' && invalidList.length > 0 ) {
            // errors were found in the form (required fields not filled out)

            // for each invalid input element (form field) return error
            for (var item of invalidList) {
                M.toast({html: "Please fill the "+item.label.innerHTML+"", classes: 'bg-danger text-white'});
            }
        }
        else {
            M.toast({html: "Another error occured, please try again.", classes: 'bg-danger text-white'});
        }
    }
}


function isFormDataEmpty(formData) {
    // checks for all values in formData object if they are empty
    for (var [key, value] of formData.entries()) {
        if (key != 'csrf_token') {
            if (value != '' && value != []) {
                return false;
            }
        }
    }
    return true;
}