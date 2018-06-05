/*
* Setup
*/
// Instantiate freshlaundry, setting `demo` as the namespace
fl = new fl('demo');

// Create a `demo` namespace with a variable `environment`
// Mimics what we do in a Laravel app
window.demo = {};
demo.environment = 'local';


/*
* Util
*/
fl.util.console(data = demo.environment, label = 'Environment');


/*
* Validate
*/
// Attach some mimic'd server errors to the window
demo.errors = {
    'city' : 'Server says this is bad.',
    'description' : 'Server says this is bad'
};

// Attach the validator to the form
fl.validate.attach($('#demo'), true);

// Test manually throwing error/success feedback
fl.validate.feedback('JS says this is bad', $('input[name="state"]'));
fl.validate.feedback('JS says this is good', $('input[name="zip"]'), 'success');
fl.validate.feedback('JS says this is a warning', $('input[name="address1"]'), 'warning');
fl.validate.feedback('JS says this is info', $('input[name="address2"]'), 'info');


/*
* Widget
 */
$('.demoNotifyBar').click(function() {
    var type = $(this).html();
    fl.widget.notifyBar('This is a ' + type + ' notify bar. <a href="">Link...</a>', type);
});

$('#demoBasicModal').click(function() {
    fl.widget.modal('Basic example');
});

$('#demoMoreContentModal').click(function() {
    var content = $(".fl-modal-content").html();
    fl.widget.modal(content);
});

$('#demoCustomClassModal').click(function() {
    var content = $(".fl-modal-content").html();
    fl.widget.modal('Example with a custom class', 'sampleModalClass');
});


/*
* Ajax
 */
$('.ajaxButtonDemo').click(function () {

    el = $(this);

    fl.ajax.toggleButton(el);

    // Demo turning off after 1 second
    setTimeout(function () {
        fl.ajax.toggleButton(el, false);
    }, 1000);

});
