import wm from "./weather.mjs";
import b from "./business.mjs";
import setDefaultElements from "./main.mjs";

setDefaultElements();

/*MODULE FUNCTION CALLS*/

/*Weather Call*/
const weatherApi = 'https://api.openweathermap.org/data/2.5/weather?lat=14.626494330217767&lon=-90.4939512943793&units=metric&appid=806efde2412e8382b6356050186fbc6a';
const weather = await wm.getWeatherData(weatherApi);
wm.displayCurrentWeather(weather, 'index-weather-now', 'c');

/*Forecast Call*/
const forecastApi = 'https://api.openweathermap.org/data/2.5/forecast?lat=14.626494330217767&lon=-90.4939512943793&units=metric&appid=806efde2412e8382b6356050186fbc6a';
const forecast = await wm.getForecastData(forecastApi);
wm.displayForecast(forecast, 'index-weather-next', 'c', 3);

/*Businesses Call*/
const businessUrl = "https://el-luih.github.io/wdd231/chamber/data/members.json";
b.getBusinesses(businessUrl, "index-business-board", 3, 2);