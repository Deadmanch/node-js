import { STORAGE_KEYS } from '../global/storage-keys.js';
import { LogService } from './log.service.js';
import { getKeyValue, saveKeyValue } from './storage.service.js';

const addCity = async cityString => {
	if (!cityString.length) {
		LogService.error('Не передан город');
		return;
	}
	const newCities = cityString.split(', ').map(city => city.trim());
	try {
		let cities = await getKeyValue(STORAGE_KEYS.city);
		let citySet = new Set();
		if (!cities) {
			cities = city;
		} else {
			citySet = new Set(cities.split(', '));
		}
		newCities.forEach(city => {
			citySet.add(city);
		});
		cities = [...citySet].join(', ');
		await saveKeyValue(STORAGE_KEYS.city, cities);
		LogService.success(`Город ${cityString} успешно добавлен в список`);
	} catch (e) {
		LogService.error(e.message);
	}
};

const deleteCity = async city => {
	if (!city.length) {
		LogService.error('Не передан город');
		return;
	}
	try {
		let cities = await getKeyValue(STORAGE_KEYS.city);
		if (!cities) {
			LogService.error('Список городов пуст');
			return;
		}
		cities = cities
			.split(', ')
			.filter(item => item !== city)
			.join(', ');
		await saveKeyValue(STORAGE_KEYS.city, cities);
		LogService.success(`Город ${city} удален из списка`);
	} catch (e) {
		LogService.error(e.message);
	}
};

const saveToken = async token => {
	if (!token.length) {
		LogService.error('Не передан токен');
		return;
	}
	try {
		await saveKeyValue(STORAGE_KEYS.token, token);
		LogService.success('Токен сохранен');
	} catch (e) {
		LogService.error(e.message);
	}
};

const saveLanguage = async language => {
	if (!language.length) {
		LogService.error('Не передан язык!');
		return;
	}
	try {
		await saveKeyValue(STORAGE_KEYS.language, language);
		LogService.success('Язык сохранен');
	} catch (e) {
		LogService.error(e.message);
	}
};

export { addCity, deleteCity, saveLanguage, saveToken };
