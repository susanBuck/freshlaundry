## Install
```bash
npm install susanBuck/freshlaundry
```

## Usage
Link CSS and JS:
```
<link href='/path/to/freshlaundry/dist/freshlaundry.css' rel='stylesheet'>
<script src='/path/to/freshlaundry/dist/freshlaundry.js'></script>
```

Bootstrap with the app's JS namespace (e.g. `foobar`)
```js
fl = new fl('foobar');
```

## Demos
<http://freshlaundry.loc>

## Signatures

### Freshlaundry
```js
fl.getVariable(key)
````

### Util
```js
fl.util.get(string key);
fl.util.console(mixed data, string label)
```

### Widget
```js
fl.widget.modal(string content [, string addClass]);
fl.widget.notifyBar(string message, [string type]);
````

### Ajax
```js
fl.ajax.toggleButton(element el [, boolean loading]);
```

### Validate
```js
fl.validate.attach(element form [, boolean automatic]);
```

## Usage

## Image
Link images using their non-retina paths. If a retina version is available, append `?@2x` query string.
```
<img id='main-logo' src='/images/wcc-logo-375-37-punchier.png?@2x'>
``` 

## Forms
+ Put radios/checkboxes in an unordered list with the class `radios` or `checkboxes`
+ Labels should immediately follow the radio/checkbox input
```html
<ul class='checkboxes'>
    <li><input type='checkbox' name='radio' id='optionC'><label for='optionC'>Option C</label>
    <li><input type='checkbox' name='radio' id='optionD'><label for='optionD'>Option D</label>
</ul>
```



## Modifying freshlaundry
Edit files in `/src/less` and/or `/src/js`

Run `npm run watch` 

