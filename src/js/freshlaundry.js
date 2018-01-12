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

