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