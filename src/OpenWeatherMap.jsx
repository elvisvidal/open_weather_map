// React
const e = React.createElement;

const LocationInfo = ({ ...props }) => {
    const {
        city,
        country
    } = props;

    return (
        <div id='location-info'>
            <h1 id='city-name'>{city}</h1>
            <i id='country'> - {country}</i>
        </div>
    );
};

class ForecastInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastVisible: false,
        };
        this.swtichForecastVisibility = this.swtichForecastVisibility.bind(this);
    }

    swtichForecastVisibility() {
        this.setState({
            ...this.state,
            forecastVisible: !this.state.forecastVisible,
        })
    }

    render () {
        return (
            <div>
                <a
                    className='forecast-link'
                    href='#'
                    onClick={() => {
                        this.swtichForecastVisibility();
                    }}
                >Hourly Forecast</a>
                <ul className={`forecast-details ${this.state.forecastVisible ? 'active' : ''}`}>
                    {// setting forecast item template
                    this.props.data.map((forecastItem, index) => {
                        const itemTimeTxt = forecastItem.dt_txt.substr(11, 19);
    
                        return (
                            <li
                                key={`forecast-item-${index}`}
                                className='forecast-item'>
                                <span className='forecast-time'>{itemTimeTxt}</span>
                                <img
                                    className='forecast-weather-icon'
                                    src={`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${
                                        forecastItem.weather[0].icon
                                    }.png`}
                                    alt={forecastItem.weather[0].description} />
                                <div className='forecast-weather-details'>
                                    <p>${forecastItem.weather[0].description}</p>
                                    <p>
                                        <b>Temp Min: </b><span>{forecastItem.main.temp_min}°C</span>
                                    </p>
                                    <p>
                                        <b>Temp Max: </b><span>{forecastItem.main.temp_max}°C</span>
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

const CalendarInfo = ({ ...props }) => {
    const {
        data,
        days,
        months,
    } = props;

    return (
        <ul id='calendar-container'>
            {// setting calendar item template
            data.map((calendarItem, index) => {
                var itemDate = new Date(calendarItem.date);

                return (
                    <li key={`calendar-item-${index}`} className='calendar-item'>
                        <span className='calendar-month'>{months[itemDate.getUTCMonth()]}</span>
                        <h2 className='calendar-date'>{itemDate.getUTCDate()}</h2>
                        <span className='calendar-day'>{days[itemDate.getUTCDay()]}</span>
                        <img
                            className='calendar-weather-icon'
                            src={`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${
                                calendarItem.items[0].weather[0].icon
                            }.png`}
                            alt={calendarItem.items[0].weather[0].description} />
                        <div className='calendar-weather-details'>
                            <p>{calendarItem.items[0].weather[0].description}</p>
                            <p>
                                <b>Temp Min: </b><span>{calendarItem.items[0].main.temp_min}°C</span>
                            </p>
                            <p>
                                <b>Temp Max: </b><span>{calendarItem.items[0].main.temp_max}°C</span>
                            </p>
                        </div>
                        <ForecastInfo
                            data={calendarItem.items}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

class OpenWetaherMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            city: '',
            country: '',
            calendarArray: [],
        };
        this.fetchData();
    }

    fetchData() {
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
            this.setCalendarInfoData(data);
            this.setState({
                ...this.state,
                city: data.city.name,
                country: data.city.country,
            });
        });
    }

    setCalendarInfoData(data) {
        const calendarArray = [];
        data.list.forEach(function(item) {
            const itemDateTxt = item.dt_txt.substr(0, 10);
            const itemIndex = calendarArray.findIndex(item => item.date === itemDateTxt);
            if (itemIndex === -1) {
                calendarArray.push({
                    items: [item],
                    date: itemDateTxt,
                });
            } else {
                calendarArray[itemIndex].items.push(item);
            }
        });

        this.setState({
            ...this.state,
            calendarArray,
        });
    }

    render() {
        return (
            <div>
                <LocationInfo
                    city={this.state.city}
                    country={this.state.country}
                />
                <CalendarInfo
                    data={this.state.calendarArray}
                    days={this.state.days}
                    months={this.state.months}
                />
            </div>
        );
    }
}

const domContainer = document.querySelector('#react-app');
ReactDOM.render(e(OpenWetaherMap), domContainer);
