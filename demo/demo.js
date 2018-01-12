/*
* Setup
*/
// Instantiate freshlaundry, setting `demo` as the namespace
fl = new fl('demo');

// Create a `demo` namespace with a variable `environment`
// Mimics what we do in a Laravel app
window.demo = {};
demo.environment = 'local';

// Attach some mimic'd server errors to the window
demo.errors = {'birthDate' : 'Server says this is bad.'};

/*
* Test some fl.util functionality
*/
fl.util.console(data = demo.environment, label = 'Environment');


/*
* Setup validation on form
*/
fl.validate.attach($('#demo'), true);


// Demo notify bars
$('.demoNotifyBar').click(function() {
    var type = $(this).html();
    fl.widget.notifyBar('This is a ' + type + ' notify bar', type);
});


// Demo modals
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


// Demo ajax buttons
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
