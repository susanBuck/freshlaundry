function Widget() {

    /**
     *
     * @param el
     */
    this.center = function(el) {
        var left = Math.max(0, (($(window).width() - el.outerWidth()) / 2) + $(window).scrollLeft()) + "px";
        el.css('left', left);
    }


    /**
     * Public
     * @param content
     * @param addClass
     */
    this.modal = function (content, addClass) {

        var body = $('body');

        // Modal bar already exists... Update it
        if ($('#fl-modal').length > 0) {

            var flModal = $('#fl-modal');

            // Update the message
            $('#fl-modal-inner').html(content);

            // Turn on the background
            $('.fl-modal-background').show();

            flModal.show();

            // Remove all previous classes
            flModal.attr('class', '');
            flModal.addClass('fl-modal-default');

        }
        // Modal bar does not exist... Add it
        else {

            // Create the 100%x100% background - this makes it so we can click off the bar to close it
            var background = "<div class='fl-modal-background'></div>";
            body.append(background);

            // Create the modal
            var modal = ''

            modal += "<div id='fl-modal' class='fl-modal-default'>";
            modal += "<div id='fl-modal-close'><i class='fa fa-times'></i></div>";
            modal += "<div id='fl-modal-inner'>" + content + "</div>";
            modal += "</div>";

            body.append(modal);

            var flModal = $('#fl-modal');

            // Close functionality
            $('.fl-modal-background, #fl-modal-close').click(function () {
                $('#fl-modal, .fl-modal-background').hide();
            });
        }

        if (addClass) {
            flModal.addClass(addClass);
        }

        this.center(flModal);
    }


    /**
     * Public
     * @param message
     * @param type
     */
    this.notifyBar = function (message, type = 'default') {

        var notifyBar = $('#notifyBar');
        var body = $('body');

        // Notify bar already exists... Update it
        if (notifyBar.length > 0) {

            // Update the message
            $('#notifybar > span').html(message);

            // Turn on the background
            $('.notifybar-background').show();

            notifyBar.show();

            // Remove all previous class and add this class
            notifyBar.attr('class', '').addClass('notifybar-' + type);
        }

        /* Notify bar does not exist... Add it */
        else {

            // Create the 100x100 background - this makes it so we can click off the bar to close it
            var background = "<div class='notifybar-background'></div>";
            body.append(background);

            // Create the notifybar
            var notifybar = "<div id='notifybar' class='notifybar-" + type + "'>";
            notifybar += "<span>" + message + "</span>";
            notifybar += "<i class='fa fa-times'></i>";
            notifybar += "</div>";

            body.append(notifybar);

            // If the bar or background is clicked, close both
            $('#notifybar, .notifybar-background').click(function () {
                $('#notifybar, .notifybar-background').hide();
            });

        }

    }

}
