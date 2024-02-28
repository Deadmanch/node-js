import { LANGUAGE } from '../global/enums.js';
const icons = {
	'01': './img/weather-icon/clear-day.svg',
	'02': './img/weather-icon/partly-cloudy-day.svg',
	'03': './img/weather-icon/cloudy.svg',
	'04': './img/weather-icon/cloudy.svg',
	'09': './img/weather-icon/heavy-showers.svg',
	10: './img/weather-icon/heavy-showers.svg',
	11: './img/weather-icon/thunderstorm-showers.svg',
	13: './img/weather-icon/snow.svg',
	50: './img/weather-icon/windy.svg',
};

class LogService {
	static getIcon = icon => {
		return icons[icon.slice(0, -1)];
	};
	static printWeather(weatherInfo, icon, lang = [LANGUAGE.russian]) {
		const { name, main, wind } = weatherInfo;
		return {
			cityName: name,
			temperature: main.temp,
			feelsLike: main.feels_like,
			humidity: main.humidity,
			windSpeed: wind.speed,
			lang: lang,
			icon: icon,
		};
	}
}
export { LogService };
