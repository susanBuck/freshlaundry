let mix = require('laravel-mix');

// After you make changes to this file run `npm run dev` or `nd`

// Compile less to CSS
// All the less includes are in freshlaundry.less so we only have one file to do here
mix.less('src/less/freshlaundry.less', 'dist/freshlaundry.css');

// Concatenate all .js files into one
mix.scripts([
    'src/js/common.js',
    'src/js/freshlaundry.js',
    'src/js/retina.js'
], 'dist/freshlaundry.js');

