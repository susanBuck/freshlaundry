var Freshlaundry = {

	/*----------------------------------------------------

	-----------------------------------------------------*/
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