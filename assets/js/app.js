"use strict";

var app = {
    init: function() {
        // Running the api without a server. ¯\_(ツ)_/¯
        // See more on the link bellow.
        // https://www.freecodecamp.org/forum/t/calling-openweathermap-api-is-blocked-due-to-cors-header-access-control-allow-origin-missing/191868
        var corsPrependUrl = 'https://cors-anywhere.herokuapp.com/';
        var url = 'https://api.openweathermap.org/data/2.5/forecast';
        var cityId = '?id=7778677'; // Dublin City, IE
        var apiKey = '&appid=95d930c62640ae65f5e1ffebcfb9e068';
            url += cityId + apiKey;
        Ajax.load('GET', corsPrependUrl+url, (res) => {
            console.log('--- res', res);
        });
    },
};

(function(){
    app.init();
}());