#!/usr/bin/env node

import { LANGUAGE, STORAGE_KEYS } from './global/storage-keys.js';
import { getArgs } from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import { addCity, deleteCity, saveLanguage, saveToken } from './services/config.service.js';
import { LogService } from './services/log.service.js';
import { getKeyValue } from './services/storage.service.js';

const getForecast = async () => {
	try {
		const token = await getKeyValue(STORAGE_KEYS.token);
		const language = (await getKeyValue(STORAGE_KEYS.language)) || LANGUAGE.russian;
		const city = await getKeyValue(STORAGE_KEYS.city);
		if (!city || !token || !language) {
			LogService.error(`Не указан токен, город или язык`);
			return;
		}
		const cities = city.split(', ');
		for (const city of cities) {
			const weather = await getWeather(city, token, language);
			LogService.printWeather(weather, getIcon(weather.weather[0].icon), language);
		}
	} catch (e) {
		if (e?.response?.status === 404) {
			LogService.error(`Неверно указан город`);
		} else if (e?.response?.status === 401) {
			LogService.error('Неверно указан токен');
		} else {
			LogService.error(e.message);
		}
	}
};
const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		return LogService.printHelp();
	}
	if (args.s) {
		return addCity(args.s);
	}
	if (args.del) {
		return deleteCity(args.del);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	if (args.l) {
		return saveLanguage(args.l);
	}
	return getForecast();
};

initCLI();
