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









