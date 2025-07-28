const weatherModule = {
    /*Retrives the weather object from the API URL and parses it. 
    Arguments:
    - URL from the weather API.*/
    async getWeatherData(apiURL) {
        const getData = await fetch(apiURL);
        const data = await getData.json();
        return data;
    },

    /*Retrives the forecast object from the API URL and parses it. 
    Arguments:
    - URL from the weather API.*/
    async getForecastData(apiURL) {
        const getData = await fetch(apiURL);
        const data = await getData.json();
        return data;
    },

    /*Converts a Unix UTC time in seconds to a 12 hours format string relative to the target city.
    Arguments:
    - The Unix UTC-based time in seconds.
    - The shift of the timezone from UTC 0 in seconds.*/
    unixToHourString(unixUtc, shift = 0) {
        const shiftedUnix = unixUtc + shift;
        const date = new Date(shiftedUnix * 1000);
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes}${ampm}`;
    },

    /*Displays the weather information following the given format in the wireframe.
    Arguments:
    - The parsed weather object.
    - The ID of the container element in the HTML document.
    - The letter of the degrees format.*/
    displayCurrentWeather(weather, containerID, degrees = 'f') {
        const containerElement = document.querySelector(`#${containerID}`);
        const weatherElement = document.createElement('div');
        const weatherParagraph = document.createElement('p');
        const weatherImage = document.createElement('img');
        const timezone = weather.timezone;

        const icon = weather.weather[0].icon;
        const temp = weather.main.temp;
        const description = () => {
            let words = weather.weather[0].description.split(' ');
            let titledWords = words.map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            });
            return titledWords.join(' ');
        };
        const tempHigh = weather.main.temp_max;
        const tempLow = weather.main.temp_min;
        const humidity = weather.main.humidity;
        const sunrise = this.unixToHourString(weather.sys.sunrise, timezone);
        const sunset = this.unixToHourString(weather.sys.sunset, timezone);

        weatherParagraph.innerHTML = `<strong>${temp}°</strong>${degrees.toUpperCase()}<br>
        ${description()}<br>
        High: ${tempHigh}°<br>
        Low: ${tempLow}°<br>
        Humidity: ${humidity}%<br>
        Sunrise: ${sunrise}<br>
        Sunset: ${sunset}`

        weatherImage.setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
        weatherImage.setAttribute('alt', description());

        weatherElement.classList.add('weather-element');
        weatherElement.appendChild(weatherImage);
        weatherElement.appendChild(weatherParagraph);

        containerElement.appendChild(weatherElement);
    },

    /*Converts a Unix UTC time in seconds to a day string relative to the target city.
    Arguments:
    - The Unix UTC-based time in seconds.
    - The shift of the timezone from UTC 0 in seconds.*/
    unixToWeekDay(unixUtc, shift = 0) {
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const shiftedUnix = unixUtc + shift;
        const date = new Date(shiftedUnix * 1000);
        const dayIndex = date.getUTCDay();
        return weekDays[dayIndex];
    },

    /*Displays the weather forecast following the given format in the wireframe.
    Arguments:
    - The parsed weather object.
    - The ID of the container element in the HTML document.
    - The letter of the degrees format.
    - The number of days to be displayed (max 5)*/
    displayForecast(forecast, containerID, degrees = 'f', days = 5) {
        const containerElement = document.querySelector(`#${containerID}`);
        const daysList = document.createElement('ul');

        const forecastList = forecast.list;

        for (let i = 0; i < (days * 8); i += 8) {
            const forecastItem = document.createElement('li');
            const itemTemp = document.createElement('strong');
            const temp = forecastList[i].main.temp;

            if (i === 0) {
                forecastItem.textContent = 'Today: '
            } else {
                const dayUnix = forecastList[i].dt;
                const timezone = forecast.city.timezone;
                forecastItem.textContent = `${this.unixToWeekDay(dayUnix, timezone)}: `;
            }
            
            itemTemp.textContent = `${temp}°${degrees.toUpperCase()}`
            forecastItem.appendChild(itemTemp);
            daysList.appendChild(forecastItem);
        };

        containerElement.appendChild(daysList);
    },
};

export default weatherModule;