function Validate() {

    /**
     * @param formToValidate
     * @param namespace The namespace the app uses to set variables to
     * @param automatic
     *      True - Validation occurs when form is submitted
     False - Validation must be manually invoked, e.g. validator.validateAll()
     Use this if JS is hijacking the form submission
     */
    this.attach = function(formToValidate, automatic = true) {

        var inputsToValidate = getInputsToValidate();

        // Report any server side errors that were attached to the window
        var errors = fl.getVariable('errors');
        if (errors) {
            $.each(errors, function (index, message) {
                el = $('input[name="' + index + '"]');
                feedback(message, el);
            });
        }

        // Initialize validation
        if (inputsToValidate.length > 0) {

            // Set up blur listeners on inputs
            $.each(inputsToValidate, function () {
                $(this).on('blur', function () {
                    validate($(this));
                });
            });

            // Validate when form is submitted
            if (automatic) {
                formToValidate.submit(function (event) {
                    event.preventDefault(); // Prevent submission

                    if (validateAll()) {
                        this.submit(); // Ok, validation passed, now submit
                    }

                });
            }
        }
    }

    /**
     * @private
     * @returns {number}
     */
    function getInputsToValidate() {
        return $('[data-rules]')
            .filter(":visible")
            .add($('[data-force-validate]')
            );
    }


    /**
     * @private
     * @returns {boolean}
     */
    // Make public
    this.validateAll = function() {
        return validateAll();
    }
    function validateAll() {

        inputsToValidate = getInputsToValidate();

        $.each(inputsToValidate, function () {
            validate($(this));
        });

        var errorCount = $('.errors').length;

        // Fail
        if (errorCount >= 1) {
            toggleGlobalFormError(true);
            return false;
        }
        // Pass
        else {
            toggleGlobalFormError(false);
            return true;
        }
    }


    /**
     * @private
     * @param el
     */
    // Make public
    this.validate = function () {
        return validate(el);
    }
    function validate(el) {

        var id = el.attr('id');
        var label = $('label[for=' + id + ']');
        var value = el.val();
        var name = el.attr('name');
        var rules = el.data('rules');

        // Go through the rules we need to validate
        if (rules) {
            rules = rules.split('|');
            $.each(rules, function (index, rule) {
                console.log('Field name:' + name + '; Rule:' + rule + '; Value:' + value);

                // Invoke the validation method for this rule
                validators[rule](value, el);
            });
        }
    }


    /**
     * @private
     * @param bool
     */
    function toggleGlobalFormError(bool) {
        var formErrors = $('.formErrors');
        if (formErrors.length > 0) {
            if (bool) {
                formErrors.show();
            } else {
                formErrors.hide();
            }
        }
    }


    /**
     * Helper method that helps "variablize" the id given to the feedback divs
     * @private
     * @param el
     * @param rule
     * @returns {string}
     */
    function getFeedbackId(el) {
        return el.attr('name') + '-feedback';
    }


    /**
    * Display feedback for a form field
    * Adds a feedback div right below the field, as well as style the label for the field
    * @private
    * @param message
    * @param el
    * @param type `error` (default) or `success`
    */
    // Make public
    this.feedback = function (message, el, type = 'error') {
        return feedback(message, el, type);
    }
    function feedback(message, el, type = 'error') {

        feedbackId = getFeedbackId(el);
        feedbackEl = $('#' + feedbackId);

        // Clean slate - remove any existing feedback styling on the field
        el.removeClass('error');
        el.removeClass('success');

        // Clean slate - remove any existing feedback
        feedbackEl.remove();

        // Style the field itself
        el.addClass(type);

        // Style this field's label
        $('label[for=' + el.attr('id') + ']').addClass(type);

        // Add feedback message after the field
        if(message !== '') {
            var feedbackElContent = "<div class='feedback " + type + "' id='" + feedbackId + "'>" + message + "</div>";
            el.after(feedbackElContent);
        }
    }


    /*----------------------------------------------------
    VALIDATORS:

    emailIsUnique
    required
    email
    creditCard

    All error message should end in a period.
    -----------------------------------------------------*/
    var validators = [];

    /**
     *
     */
    validators['emailIsUnique'] = function (value, el) {

        var rule = 'emailIsUnique';

        var url = '/user/email-is-unique?email=' + value;

        $.getJSON(url, function (json) {
            if (json.pass === 'True') {
                feedback('', el, 'success');
            } else {
                feedback('This email is already registered.', el, 'error');
            }
        });

    },


        /**
         *
         */
        validators['required'] = function (value, el) {

            var rule = 'required';

            if ($.trim(value).length === 0 || value === "") {
                feedback('This field is required.', el, 'error');
            } else {
                feedback('', el, 'success');
            }
        },


        /**
         *
         */
        validators['email'] = function (email, el) {

            var rule = 'email';

            var re = /\S+@\S+\.\S+/;
            if (!re.test(email)) {
                feedback('Invalid email.', el, rule);
            } else {
                feedback('', el, 'success');
            }
        },


        /**
         *
         */
        validators['alphaNum'] = function (value, el) {

            var rule = 'alphaNum';

            var re = /[^a-zA-Z0-9]/;

            if (value === '') {
                return false;
            }

            if (re.test(value)) {
                feedback('Only letters and numbers are allowed.', el, 'error');
            } else {
                feedback('', el, 'success');
            }

        },


        /**
         * Checks that it is a valid credit card number according to the Luhn checksum algorithm.
         */
        validators['creditCard'] = function (value, el) {

            var rule = 'creditCard';

            var valid = false

            // Spaces and dashes may be valid characters, but must be stripped to calculate the checksum.
            var cardNumber = value.replace(/ +/g, '').replace(/-+/g, '');
            var numDigits = cardNumber.length;

            if (numDigits >= 14 && numDigits <= 16 && parseInt(cardNumber) > 0) {

                var sum = 0, i = numDigits - 1, pos = 1, digit, luhn = new String();
                do {
                    digit = parseInt(cardNumber.charAt(i));
                    luhn += (pos++ % 2 === 0) ? digit * 2 : digit;
                } while (--i >= 0)

                for (i = 0; i < luhn.length; i++) {
                    sum += parseInt(luhn.charAt(i));
                }
                valid = sum % 10 === 0;
            }
            if (!valid) {
                feedback('Invalid credit card number.', el, 'error');
            } else {
                feedback('', el, 'success');
            }
        }
}


function Ajax() {

    // Preload loading image
    if ($('.ajax-loading').length) {
        $('<img/>')[0].src = '//d2v9gwqwifvt42.cloudfront.net/texture-strange-bullseyes.png';
    }

    // CSRF token for forms submitted via Ajax
    $.ajaxSetup({
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content')
        }
    });

    /**
     * Public
     * @param el
     * @param loading
     */
    this.toggleButton = function (el, loading) {

        // Default to true of boolLoading was not set
        loading = typeof loading !== 'undefined' ? loading : true;

        // Loading
        if (loading) {

            // Disable button
            el.prop('disabled', true);
            el.addClass('loading');

            var loading_label = 'Loading...';
            var saved_label = '';

            // Different approaches for changing the text of an input vs button
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

            // Done loading
        } else {
            // Enable button
            el.prop('disabled', false);
            el.removeClass('loading');

            // What was the label before it was switched to loading?
            saved_label = el.attr('data-saved_label');

            // Different approaches for changing the text of an input vs button
            if (el.is('input')) {
                el.val(saved_label);
            }
            else {
                el.html(saved_label);
            }

            el.attr('data-loading', 0);
        }
    }


}
function Util() {

    /**
     * JS equivalent of PHP's $_GET
     * @public
     * @param q
     * @param s
     * @returns {string}
     */
    this.get = function (q, s) {
        s = s ? s : window.location.search;
        var re = new RegExp('&' + q + '(?:=([^&]*))?(?=&|$)', 'i');
        s = s.replace('?', '&').match(re);
        if (s)
            return typeof s[1] != 'undefined' ? decodeURIComponent(s[1]) : '';
    }


    /*
    * Console.log alias that only invokes if in local env
    */
    this.console = function(data, label) {
        if(fl.getVariable('environment') === 'local') {
            if(label)
                console.log(label + ': ' + data);
            else
                console.log(data);
        }
    }

}










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
            $('.fl-modal-background, #fl-modal-close i').click(function () {
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

// Primary .js file for freshlaundry

/**
 * fl "Class"
 */
function fl(namespace) {

    /**
     * Application namespace to which JS variables are attached to
     */
    var namespace = namespace;


    /**
     * Get a variable from the global window (via this app's namespace)
     * @param varName
     */
    this.getVariable = function(varName) {
        return window[namespace][varName];
    }


    /**
     * Instantiate the various fl modules
     */
    this.widget = new Widget();
    this.util = new Util();
    this.ajax = new Ajax();
    this.validate = new Validate();

    /*
    * Misc. JS stuff we always want to happen
    */
    /* If we use a button in a form as a submit, instead of a submit button it triggers on most browsers except IE.
    If we add the class "submit" to it, this function will make it work */
    $('.submit:button').click(function () {
        $(this).parents('form:first').submit();
    });
}

