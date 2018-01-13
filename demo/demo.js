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
demo.errors = {'city' : 'Server says this is bad.'};

// Attach the validator to the form
fl.validate.attach($('#demo'), true);

// Test manually throwing error/success feedback
fl.validate.feedback('JS says this is bad', $('input[name="state"]'));
fl.validate.feedback('JS says this is good', $('input[name="zip"]'), 'success');



/*
* Widget
 */
$('.demoNotifyBar').click(function() {
    var type = $(this).html();
    fl.widget.notifyBar('This is a ' + type + ' notify bar', type);
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


/*
Programmatically build some of the demo elements
TODO: Convert to PHP now that demo is a PHP file instead of HTML
 */
palette = {
    primary: 'FF4b33',
    secondary: 'AAAAAA'
}

ux = {
    red: 'B71C1C',
    green: '2ECC40',
    orange: 'FFC107',
    yellow: 'FFE548',
    highlight: 'FFE787'
}

grays = {
    black: '111111',
    gray: 'AAAAAA',
    silver: 'DDDDDD',
    white: 'FFFFFF'
}

colors = [grays, ux];
names = ['Grays', 'UX'];

content = '';

for (temps in colors) {

    content += '<h3>' + names[temps] + '</h3>';

    for (color in colors[temps]) {
        content += '<div>';
        content += '<span class="color-label">@' + color + ' ' + colors[temps][color] + '</span>';
        content += '<span class="color-text" style="color:#' + colors[temps][color] + '">Lorem ipsum</span>';
        content += '<span class="color" style="background-color:#' + colors[temps][color] + '"></span>';
        content += '</div>';
    }
}

$('#colors').html(content)

$('.font').each(function () {
    $(this).append($(this).css('font-family'));
});
