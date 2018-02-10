let mix = require('laravel-mix');

/*----------------------------------------------------
Build for freshlaundry
-----------------------------------------------------*/
// Compile less to CSS
mix.less('src/less/freshlaundry.less', 'dist/freshlaundry.css');

// Distribute fonts.less so apps can use it
/*
Causes an endless loop on `npm run watch`
I think it's because of the relationship
between dist/freshlaundry-fonts.less' and demo/less/demo.less
To avoid, uncomment this line and run `npm run dev` once if there are changes to fonts
*/
//mix.copy('src/less/fonts.less', 'dist/freshlaundry-fonts.less');


// Concatenate all .js files into one
mix.scripts([
    'src/js/Validate.js',
    'src/js/Ajax.js',
    'src/js/Util.js',
    'src/js/Widget.js',
    'src/js/Form.js',
    'src/js/Freshlaundry.js' // Has to come last
], 'dist/freshlaundry.js');


/*----------------------------------------------------
Build for demo
-----------------------------------------------------*/
mix.less('demo/less/demo.less', 'demo/css/demo.css');