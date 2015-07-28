jQuery.fn.center = function () {

    //this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");

    return this;
}

// Preload loading image
if($('.ajax-loading').length) {
    $('<img/>')[0].src = '//d2v9gwqwifvt42.cloudfront.net/texture-strange-bullseyes.png';
}

var Freshlaundry = {

    /**
	*
	*/
    loadingButton: function(el,boolLoading) {



        // Default to true of boolLoading was not set
        boolLoading = typeof boolLoading !== 'undefined' ? boolLoading : true;

        if(boolLoading) {

            // Set width so we can restore it when done
            var width = el.outerWidth();
            el.css('width', width + 1); // quirk: w/o the extra 1, the button label will span two lines

            // Disable
            el.prop('disabled',true);
            el.addClass('loading');

    	    var loading_label = 'Loading...';
            var saved_label = '';

            // Different approaches for chaging the text of an input vs button
            if(el.is('input')) {
                saved_label = el.val();
                el.val(loading_label);
            }
            else {
                saved_label = el.html();
                el.html(loading_label);
            }

            el.attr('data-saved_label',saved_label);

            el.attr('data-loading',1);

        }
        else {

            // Enable
            el.prop('disabled',false);
            el.removeClass('loading');

            // What was the label before it was switched to loading?
            saved_label = el.attr('data-saved_label');

            // Different approaches for chaging the text of an input vs button
            if(el.is('input')) {
                el.val(saved_label);
            }
            else {
                el.html(saved_label);
            }

            el.attr('data-loading',0);

        }

    },


    /**
    *
    */
    modal: function(message,addClass) {

        /* Modal bar already exists... Update it */
        if($('#fl-modal').length > 0) {

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

            // Create the 100x100 background - this makes it so we can click off the bar to close it
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
            $('#fl-modal, .fl-modal-background, #fl-modal-close').click(function() {
                $('#fl-modal, .fl-modal-background').hide();
            });

        }

        if(addClass) {
            $('#fl-modal').addClass(addClass);
        }

        $('#fl-modal').center();

    },

    /**
    *
    */
    notifybar: function(message, type) {

        /* Notify bar already exsits... Update it */
        if($('#notifybar').length > 0) {

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
            var notifybar  = "<div id='notifybar' class='notifybar-" + type + "'>";
            notifybar += "<span>" + message + "</span>";
            notifybar += "<i class='fa fa-times'></i>";
            notifybar += "</div>";

            $('body').append(notifybar);

            // If the bar or background is clicked, close both
            $('#notifybar, .notifybar-background').click(function() {
                $('#notifybar, .notifybar-background').hide();
            });

        }

    }

} // eoc
