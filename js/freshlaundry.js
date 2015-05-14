jQuery.fn.center = function () {
    
    //this.css("position","absolute");
    
    //this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");

    return this;
}


var Freshlaundry = {

    /**
    *
    */
    modal: function(message,addClass) {

        /* Modal bar already exists... Update it */
        if($('#fl-modal').length > 0) {

            // Update the message
            $('#fl-modal > span').html(message);

            // Turn on the background
            $('.fl-modal-background').show();

            $('#fl-modal').show();

            // Remove all previous classes
            $('#fl-modal').attr('class', '').addClass('fl-modal-default');

        }
        /* Modal bar does not exist... Add it */
        else {

            // Create the 100x100 background - this makes it so we can click off the bar to close it
            var background = "<div class='fl-modal-background'></div>";
            $('body').append(background);

            // Create the modal
            var modal  = "<div id='fl-modal' class='fl-modal-default'>";
            modal += "<i id='fl-modal-close' class='fa fa-times'></i>";
            modal += "<span>" + message + "</span>";
            modal += "</div>";

            $('body').append(modal);

            // If the bar or background is clicked, close both
            $('#fl-modal, .fl-modal-background').click(function() {
                $('#fl-modal, .fl-modal-background').hide();
            });

        }

        if(addClass) {
            $('#fl-modal').attr('class', addClass);
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