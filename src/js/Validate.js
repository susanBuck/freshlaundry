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
                el = $('[name="' + index + '"]');
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
                //console.log('Field name:' + name + '; Rule:' + rule + '; Value:' + value);

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
                feedback('Invalid email.', el, 'error');
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

