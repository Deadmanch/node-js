import axios from 'axios';
import { LANGUAGE } from '../global/enums.js';
import { errorsMessages } from '../global/errors.js';

const getWeather = async (attrs, options) => {
	const city = attrs?.city ?? options?.city;

	if (!options?.token) {
		throw new Error(errorsMessages.API_KEY_IS_NOT_SET);
	}
	if (!city) {
		throw new Error(errorsMessages.CITY_IS_NOT_SET);
	}

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: options.token,
			lang: options?.language ?? LANGUAGE.russian,
			units: 'metric',
		},
	});
	return data;
};

export { getWeather };
