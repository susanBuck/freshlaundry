/* If we use a button in a form as a submit, instead of a submit button it triggers on most browsers except id. 
If we add the class "submit" to it, this function will make it work */
$('.submit:button').click(function() {
	$(this).parents('form:first').submit();
});	


/*-------------------------------------------------------------------------------------------------
JS equivalent of PHP's $_GET
Use: var foobar = $_GET('foobar');
-------------------------------------------------------------------------------------------------*/
function common_get(q,s) {
	s = s ? s : window.location.search; 
	var re = new RegExp('&'+q+'(?:=([^&]*))?(?=&|$)','i'); 
	s = s.replace('?','&').match(re); 
	if(s) 
		return typeof s[1] != 'undefined' ? decodeURIComponent(s[1]) : '';
}

/*-------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------*/
function common_start_ajax(id) {

	var button = $('#' + id);
	
	// Make the button unclickable
		button.attr('disabled','disabled');
 	
 	// Change the class to the loading one (yellow animated stripe background)
		button.addClass("ajax-loading");

}


/*-------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------*/
function common_end_ajax(id) {

	var button = $('#' + id);
	
	// Turn off the loading class (yellow animated stripe background)
		button.removeClass("ajax-loading");
	
	// Turn on complete loading class (green)
		button.addClass("ajax-complete");
						
	// Wait a quick second, then return to normal state
		setTimeout(function() {
		
			$(button).removeClass("ajax-complete");
			
			// Make the button clickable again
				button.removeAttr('disabled');
		}, 500);
}


/*-------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------*/
function common_dialog(data, width) {

	var dialog = $("#common-dialog");
	
	if ($("#common-dialog").length == 0) {
	   	dialog = $('<div id="common-dialog"><span class="icon">%</span></div>').appendTo('body');
	}
		
	dialog.append(data);
	
	dialog.dialog({ 
		autoOpen: true,
		draggable: true,
		modal:true,
		resizable: true, 
		title: '', 
		width: width,
		closeOnEscape: true,
		dialogClass: "common-dialog",
		close: function(){
			dialog.remove();
		},
		open: function(event,ui){
			
			//if ($.browser.mozilla) {
				//$('.ui-dialog').css('position', 'fixed');
				//$('.ui-dialog').css("top", "50px");
			//}
		
            $('.ui-widget-overlay, .icon').bind('click',function(){
                dialog.dialog('close');
            })
        }
	})
	
	
}


/*-------------------------------------------------------------------------------------------------
Arguments: 
	The data - array,hash(associative array),object
	The level - OPTIONAL

Returns  : The textual representation of the array.

This function was inspired by the print_r function of PHP.
This will accept some data as the argument and return a text that will be a more readable 
version of the array/hash/object that is given.
-------------------------------------------------------------------------------------------------*/
function common_dump(arr,level) {
	
	var dumped_text = "";
	
	if(!level) level = 0;
	
	// The padding given at the beginning of the line.
	var level_padding = "";
	
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { // Array/Hashes/Objects
		for(var item in arr) {
			var value = arr[item];
	 
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { // Strings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}

	return dumped_text;
} 		






jQuery.fn.center = function () {

    //this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");

    return this;
}

// Preload loading image
if ($('.ajax-loading').length) {
    $('<img/>')[0].src = '//d2v9gwqwifvt42.cloudfront.net/texture-strange-bullseyes.png';
}

var Freshlaundry = {

    /**
     *
     */
    loadingButton: function (el, boolLoading) {

        // Default to true of boolLoading was not set
        boolLoading = typeof boolLoading !== 'undefined' ? boolLoading : true;

        if (boolLoading) {

            // Disable
            el.prop('disabled', true);
            el.addClass('loading');

            var loading_label = 'Loading...';
            var saved_label = '';

            // Different approaches for chaging the text of an input vs button
            if (el.is('input')) {
                saved_label = el.val();
                el.val(loading_label);
            }
            else {
                saved_label = el.html();
                el.html(loading_label);
            }

            el.attr('data-saved_label', saved_label);

            el.attr('data-loading', 1);

        }
        else {

            // Enable
            el.prop('disabled', false);
            el.removeClass('loading');

            // What was the label before it was switched to loading?
            saved_label = el.attr('data-saved_label');

            // Different approaches for chaging the text of an input vs button
            if (el.is('input')) {
                el.val(saved_label);
            }
            else {
                el.html(saved_label);
            }

            el.attr('data-loading', 0);

        }

    },


    /**
     *
     */
    modal: function (message, addClass) {

        /* Modal bar already exists... Update it */
        if ($('#fl-modal').length > 0) {

            // Update the message
            $('#fl-modal-inner').html(message);

            // Turn on the background
            $('.fl-modal-background').show();

            $('#fl-modal').show();

            // Remove all previous classes
            $('#fl-modal').attr('class', '');
            $('#fl-modal').addClass('fl-modal-default');

        }
        /* Modal bar does not exist... Add it */
        else {

            // Create the 100%x100% background - this makes it so we can click off the bar to close it
            var background = "<div class='fl-modal-background'></div>";
            $('body').append(background);

            // Create the modal
            var modal = ''

            modal += "<div id='fl-modal' class='fl-modal-default'>";
            modal += "<div id='fl-modal-close'><i class='fa fa-times'></i></div>";
            modal += "<div id='fl-modal-inner'>" + message + "</div>";
            modal += "</div>";

            $('body').append(modal);

            // Close functionality
            $('.fl-modal-background, #fl-modal-close i').click(function () {
                $('#fl-modal, .fl-modal-background').hide();
            });

        }

        if (addClass) {
            $('#fl-modal').addClass(addClass);
        }

        $('#fl-modal').center();

    },

    /**
     *
     */
    notifybar: function (message, type) {

        /* Notify bar already exsits... Update it */
        if ($('#notifybar').length > 0) {

            // Update the message
            $('#notifybar > span').html(message);

            // Turn on the background
            $('.notifybar-background').show();

            $('#notifybar').show();

            // Remove all previous class and add this class
            $('#notifybar').attr('class', '').addClass('notifybar-' + type);
        }

        /* Notify bar does not exist... Add it */
        else {

            // Create the 100x100 background - this makes it so we can click off the bar to close it
            var background = "<div class='notifybar-background'></div>";
            $('body').append(background);

            // Create the notifybar
            var notifybar = "<div id='notifybar' class='notifybar-" + type + "'>";
            notifybar += "<span>" + message + "</span>";
            notifybar += "<i class='fa fa-times'></i>";
            notifybar += "</div>";

            $('body').append(notifybar);

            // If the bar or background is clicked, close both
            $('#notifybar, .notifybar-background').click(function () {
                $('#notifybar, .notifybar-background').hide();
            });

        }

    }

} // eoc

/*-------------------------------------------------------------------------------------------------
If a retina @2x version of an image is available, append ?@2x to the image path

Example:

	<img id='main-logo' src='/images/wcc-logo-375-37-punchier.png?@2x'>
	
Note: Must use CSS width/height on the image
-------------------------------------------------------------------------------------------------*/
if (window.devicePixelRatio > 1) {

	$('img').each(function(i) {
			
	    var lowres = $(this).attr('src');
		
		if(lowres.indexOf('@2x') > 1) {
		
			var ext     = lowres.substr(lowres.lastIndexOf('.'));	
			var highres = lowres.replace(ext, '@2x.png');
			
			$(this).attr('src',highres);
	    }

	});
	    	   
}

