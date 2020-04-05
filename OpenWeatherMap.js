var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// React
var e = React.createElement;

var LocationInfo = function LocationInfo(_ref) {
    var props = _objectWithoutProperties(_ref, []);

    var city = props.city,
        country = props.country;


    return React.createElement(
        'div',
        { id: 'location-info' },
        React.createElement(
            'h1',
            { id: 'city-name' },
            city
        ),
        React.createElement(
            'i',
            { id: 'country' },
            ' - ',
            country
        )
    );
};

var ForecastInfo = function ForecastInfo(_ref2) {
    var props = _objectWithoutProperties(_ref2, []);

    var data = props.data,
        forecastVisible = props.forecastVisible,
        swtichForecastVisibility = props.swtichForecastVisibility;


    return React.createElement(
        'div',
        null,
        React.createElement(
            'a',
            {
                className: 'forecast-link',
                href: '#',
                onClick: function onClick() {
                    swtichForecastVisibility();
                }
            },
            'Hourly Forecast'
        ),
        React.createElement(
            'ul',
            { className: 'forecast-details ' + (forecastVisible ? 'active' : '') },
            // setting forecast item template
            data.map(function (forecastItem, index) {
                var itemTimeTxt = forecastItem.dt_txt.substr(11, 19);

                return React.createElement(
                    'li',
                    {
                        key: 'forecast-item-' + index,
                        className: 'forecast-item' },
                    React.createElement(
                        'span',
                        { className: 'forecast-time' },
                        itemTimeTxt
                    ),
                    React.createElement('img', {
                        className: 'forecast-weather-icon',
                        src: 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/' + forecastItem.weather[0].icon + '.png',
                        alt: forecastItem.weather[0].description }),
                    React.createElement(
                        'div',
                        { className: 'forecast-weather-details' },
                        React.createElement(
                            'p',
                            null,
                            '$',
                            forecastItem.weather[0].description
                        ),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'b',
                                null,
                                'Temp Min: '
                            ),
                            React.createElement(
                                'span',
                                null,
                                forecastItem.main.temp_min,
                                '\xB0C'
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'b',
                                null,
                                'Temp Max: '
                            ),
                            React.createElement(
                                'span',
                                null,
                                forecastItem.main.temp_max,
                                '\xB0C'
                            )
                        )
                    )
                );
            })
        )
    );
};

var CalendarInfo = function CalendarInfo(_ref3) {
    var props = _objectWithoutProperties(_ref3, []);

    var data = props.data,
        days = props.days,
        months = props.months,
        forecastVisible = props.forecastVisible,
        swtichForecastVisibility = props.swtichForecastVisibility;


    return React.createElement(
        'ul',
        { id: 'calendar-container' },
        React.createElement(
            'li',
            null,
            React.createElement(TestComponent, null)
        ),
        // setting calendar item template
        data.map(function (calendarItem, index) {
            var itemDate = new Date(calendarItem.date);

            return React.createElement(
                'li',
                { key: 'calendar-item-' + index, className: 'calendar-item' },
                React.createElement(
                    'span',
                    { className: 'calendar-month' },
                    months[itemDate.getUTCMonth()]
                ),
                React.createElement(
                    'h2',
                    { className: 'calendar-date' },
                    itemDate.getUTCDate()
                ),
                React.createElement(
                    'span',
                    { className: 'calendar-day' },
                    days[itemDate.getUTCDay()]
                ),
                React.createElement('img', {
                    className: 'calendar-weather-icon',
                    src: 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/' + calendarItem.items[0].weather[0].icon + '.png',
                    alt: calendarItem.items[0].weather[0].description }),
                React.createElement(
                    'div',
                    { className: 'calendar-weather-details' },
                    React.createElement(
                        'p',
                        null,
                        calendarItem.items[0].weather[0].description
                    ),
                    React.createElement(
                        'p',
                        null,
                        React.createElement(
                            'b',
                            null,
                            'Temp Min: '
                        ),
                        React.createElement(
                            'span',
                            null,
                            calendarItem.items[0].main.temp_min,
                            '\xB0C'
                        )
                    ),
                    React.createElement(
                        'p',
                        null,
                        React.createElement(
                            'b',
                            null,
                            'Temp Max: '
                        ),
                        React.createElement(
                            'span',
                            null,
                            calendarItem.items[0].main.temp_max,
                            '\xB0C'
                        )
                    )
                ),
                React.createElement(ForecastInfo, {
                    data: calendarItem.items,
                    forecastVisible: forecastVisible,
                    swtichForecastVisibility: swtichForecastVisibility
                })
            );
        })
    );
};

var OpenWetaherMap = function (_React$Component) {
    _inherits(OpenWetaherMap, _React$Component);

    function OpenWetaherMap(props) {
        _classCallCheck(this, OpenWetaherMap);

        var _this = _possibleConstructorReturn(this, (OpenWetaherMap.__proto__ || Object.getPrototypeOf(OpenWetaherMap)).call(this, props));

        _this.state = {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            city: '',
            country: '',
            calendarArray: [],
            forecastVisible: false
        };
        _this.fetchData();
        _this.swtichForecastVisibility = _this.swtichForecastVisibility.bind(_this);
        return _this;
    }

    _createClass(OpenWetaherMap, [{
        key: 'fetchData',
        value: function fetchData() {
            var _this2 = this;

            // Running the api without a server. ¯\_(ツ)_/¯
            // See more on the link bellow.
            // https://www.freecodecamp.org/forum/t/calling-openweathermap-api-is-blocked-due-to-cors-header-access-control-allow-origin-missing/191868
            var corsPrependUrl = 'https://cors-anywhere.herokuapp.com/';
            var url = 'https://api.openweathermap.org/data/2.5/forecast';
            url += '?id=7778677'; // Dublin City, IE
            url += '&units=metric'; // Celsius
            var apiKey = '&appid=95d930c62640ae65f5e1ffebcfb9e068';
            url += apiKey;
            Ajax.load('GET', corsPrependUrl + url, function (res) {
                var data = JSON.parse(res);
                _this2.setCalendarInfoData(data);
                _this2.setState(Object.assign({}, _this2.state, {
                    city: data.city.name,
                    country: data.city.country
                }));
            });
        }
    }, {
        key: 'setCalendarInfoData',
        value: function setCalendarInfoData(data) {
            var calendarArray = [];
            data.list.forEach(function (item) {
                var itemDateTxt = item.dt_txt.substr(0, 10);
                var itemIndex = calendarArray.findIndex(function (item) {
                    return item.date === itemDateTxt;
                });
                if (itemIndex === -1) {
                    calendarArray.push({
                        items: [item],
                        date: itemDateTxt
                    });
                } else {
                    calendarArray[itemIndex].items.push(item);
                }
            });

            this.setState(Object.assign({}, this.state, {
                calendarArray: calendarArray
            }));
        }
    }, {
        key: 'swtichForecastVisibility',
        value: function swtichForecastVisibility() {
            this.setState(Object.assign({}, this.state, {
                forecastVisible: !this.state.forecastVisible
            }));
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(LocationInfo, {
                    city: this.state.city,
                    country: this.state.country
                }),
                React.createElement(CalendarInfo, {
                    data: this.state.calendarArray,
                    days: this.state.days,
                    months: this.state.months,
                    forecastVisible: this.state.forecastVisible,
                    swtichForecastVisibility: this.swtichForecastVisibility
                })
            );
        }
    }]);

    return OpenWetaherMap;
}(React.Component);

var domContainer = document.querySelector('#react-app');
ReactDOM.render(e(OpenWetaherMap), domContainer);