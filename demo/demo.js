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

$('#ajax-button1,#ajax-button2,#ajax-button3').click(function () {

    el = $(this);

    Freshlaundry.loadingButton(el);

    setTimeout(function () {
        Freshlaundry.loadingButton(el, false);
    }, 1000);

});