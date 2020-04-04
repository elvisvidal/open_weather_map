'use strict';

var app = {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

    init: function() {
        // Running the api without a server. ¯\_(ツ)_/¯
        // See more on the link bellow.
        // https://www.freecodecamp.org/forum/t/calling-openweathermap-api-is-blocked-due-to-cors-header-access-control-allow-origin-missing/191868
        var corsPrependUrl = 'https://cors-anywhere.herokuapp.com/';
        var url = 'https://api.openweathermap.org/data/2.5/forecast';
            url += '?id=7778677'; // Dublin City, IE
            url += '&units=metric'; // Celsius
        var apiKey = '&appid=95d930c62640ae65f5e1ffebcfb9e068';
        url += apiKey;
        Ajax.load('GET', corsPrependUrl+url, (res) => {
            var data = JSON.parse(res);
            app.setLocationInfoDOM(data);
            app.setCalendarInfoData(data);
        });
    },

    setLocationInfoDOM: function(data) {
        var cityNameElem = document.getElementById("city-name");
        cityNameElem.innerHTML = data.city.name;

        var countryElem = document.getElementById("country");
        countryElem.innerHTML = ` - ${data.city.country}`;
    },

    setCalendarInfoData: function(data) {
        var calendarArray = [];
        data.list.forEach(function(item) {
            var itemDateTxt = item.dt_txt.substr(0, 10);
            var itemIndex = calendarArray.findIndex(item => item.date === itemDateTxt);
            if (itemIndex === -1) {
                calendarArray.push({
                    items: [item],
                    date: itemDateTxt,
                });
            } else {
                calendarArray[itemIndex].items.push(item);
            }
        });

        app.setCalendarInfoDOM(calendarArray);
    },

    setCalendarInfoDOM: function(calendarArray) {
        var calendar = document.getElementById('calendar-container');
        var calendarItemTemplate = ``;

        // setting calendar item
        calendarArray.forEach(function(calendarItem){
            // setting forecast item template
            var forecastItemTemplate = ``;
            calendarItem.items.forEach(function(forecastItem) {
                var itemTimeTxt = forecastItem.dt_txt.substr(11, 19);
                forecastItemTemplate += `
                    <li class="forecast-item">
                        <span class="forecast-time">${itemTimeTxt}</span>
                        <img
                            class="forecast-weather-icon"
                            src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${
                                forecastItem.weather[0].icon
                            }.png"
                            alt="${forecastItem.weather[0].description}" />
                        <div class="forecast-weather-details">
                            <p>${forecastItem.weather[0].description}</p>
                            <p>
                                <b>Temp Min: </b><span>${forecastItem.main.temp_min}°C</span>
                            </p>
                            <p>
                                <b>Temp Max: </b><span>${forecastItem.main.temp_max}°C</span>
                            </p>
                        </div>
                    </li>
                `;
            });

            // setting calendar item template
            var itemDate = new Date(calendarItem.date);
            calendarItemTemplate += `
                <li class="calendar-item">
                    <span class="calendar-month">${app.months[itemDate.getUTCMonth()]}</span>
                    <h2 class="calendar-date">${itemDate.getUTCDate()}</h2>
                    <span class="calendar-day">${app.days[itemDate.getUTCDay()]}</span>
                    <img
                        class="calendar-weather-icon"
                        src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${
                            calendarItem.items[0].weather[0].icon
                        }.png"
                        alt="${calendarItem.items[0].weather[0].description}" />
                    <div class="calendar-weather-details">
                        <p>${calendarItem.items[0].weather[0].description}</p>
                        <p>
                            <b>Temp Min: </b><span>${calendarItem.items[0].main.temp_min}°C</span>
                        </p>
                        <p>
                            <b>Temp Max: </b><span>${calendarItem.items[0].main.temp_max}°C</span>
                        </p>
                    </div>
                    <a class="forecast-link" href="javascript:void(0);">Hourly Forecast</a>
                    <ul class="forecast-details">${forecastItemTemplate}</ul>
                </li>
            `;
        });

        calendar.insertAdjacentHTML('afterbegin', calendarItemTemplate);
        app.setListeners();
    },

    setListeners: function() {
        var forecastLinksElements = document.getElementsByClassName('forecast-link');
        Array.from(forecastLinksElements).forEach(function(element) {
            element.addEventListener('click', app.setForecastActive);
        });
    },

    setForecastActive: function(event) {
        event.preventDefault();
        var activeForecast = document.getElementsByClassName('active');
        Array.from(activeForecast).forEach(function(element) {
            element.classList.remove('active');
        });
        event.target.nextElementSibling.classList.toggle('active');
    },
};

(function(){
    // app.init();
}());
