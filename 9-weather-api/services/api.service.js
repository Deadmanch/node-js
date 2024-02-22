import axios from 'axios';
const getIcon = icon => {
	switch (icon.slice(0, -1)) {
		case '01':
			return './img/weather-icon/clear-day.svg';
		case '02':
			return './img/weather-icon/partly-cloudy-day.svg';
		case '03':
			return './img/weather-icon/cloudy.svg';
		case '04':
			return './img/weather-icon/cloudy.svg';
		case '09':
			return './img/weather-icon/heavy-showers.svg';
		case '10':
			return './img/weather-icon/heavy-showers.svg';
		case '11':
			return './img/weather-icon/thunderstorm-showers.svg';
		case '13':
			return './img/weather-icon/snow.svg';
		case '50':
			return './img/weather-icon/windy.svg';
	}
};

const getWeather = async (attrs, options) => {
	const city = attrs?.city ?? options?.city;

	if (!options?.token) {
		throw new Error('Не задан ключ API, задавайте его через команду -t [API_KEY]');
	}
	if (!city) {
		throw new Error('Не указан город для запроса');
	}

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: options.token,
			lang: options?.language ?? 'ru',
			units: 'metric',
		},
	});
	return data;
};

export { getIcon, getWeather };
