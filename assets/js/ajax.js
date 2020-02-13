"use strict";

var Ajax = {
    init: function() {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        } else {
            var versions = ["MSXML2.XmlHttp.5.0",
                            "MSXML2.XmlHttp.4.0",
                            "MSXML2.XmlHttp.3.0",
                            "MSXML2.XmlHttp.2.0",
                            "Microsoft.XmlHttp"];

            versions.forEach(function(version){
                try {
                    return new ActiveXObject(version);
                }
                catch(e){}
            });
        }
    },

    load: function(method, url, callback) {
        var xhr = Ajax.init();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            } else {
                return false;
            }
        };

        xhr.open(method, url, true);
        xhr.send();
    }
};