/* 
Custom modifications of Pagedown

/shared/vendors/Markdown/

1) Allow tab to work as tab rather than moving to next field
2) Replace with custom buttons
*/


/*-------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------*/
function initiate_pagedown() {

	enableTab('content');

	var converter = Markdown.getSanitizingConverter();	
	var editor    = new Markdown.Editor(converter);
	
	converter.hooks.chain('plainLinkText', function (url) {
		return url.replace(/^https?:\/\//, '');
	});

	editor.run();

	$('.wmd-button').addClass('button small');
	$('#wmd-bold-button').html("Bold");
	$('#wmd-italic-button').html("Italic");
	$('#wmd-code-button').html("Code");
	$('#wmd-link-button').html("Link");
	$('#wmd-quote-button').html("Quote");
	$('#wmd-image-button').html("Image");
	 
}



/*-------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------*/
function enableTab(id) {
    var el = document.getElementById(id);
    el.onkeydown = function(e) {
        if (e.keyCode === 9) { // tab was pressed

            // get caret position/selection
            var val = this.value,
                start = this.selectionStart,
                end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value = val.substring(0, start) + '\t' + val.substring(end);

            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            return false;

        }
    };
}


