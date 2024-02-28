import chalk from 'chalk';
import dedent from 'dedent-js';
import { LANGUAGE } from '../global/storage-keys.js';
class LogService {
	static success(msg) {
		console.log(`${chalk.bgGreen(' SUCCESS ')} ${msg}`);
	}
	static error(error) {
		console.log(`${chalk.bgRed(' ERROR ')} ${error}`);
	}
	static printHelp() {
		console.log(
			dedent`${chalk.bgCyan(' HELP ')} 
		Без параметров - вывод погоды 
		-s [CITY] - для добавления города в список городов. Разрешено добавлять несколько доп. городов
		-del [CITY] - удаляет сохраненные города
		-h - для вывода помощи
		-l [LANGUAGE] - для выбора языка вывода. Доступны ru/eng
		-t [API_KEY] - для сохранения токена
		`
		);
	}
	static printWeather(res, icon, language) {
		const templates = {
			[LANGUAGE.russian]: dedent`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${icon}  ${res.weather[0].description}
		Температура: ${res.main.temp}℃ (Ощущается как ${res.main.feels_like}℃)
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}м/c`,
			[LANGUAGE.english]: dedent`
		${chalk.bgYellow(' WEATHER ')} Weather in the city ${res.name}
		${icon}  ${res.weather[0].description}
		Temperature: ${res.main.temp}℃ (feels like ${res.main.feels_like}℃)
		Humidity: ${res.main.humidity}%
		Wind speed: ${res.wind.speed}m/s
		`,
		};
		const template = templates[language];
		if (template) {
			console.log(template);
		} else {
			this.error(`Указан невалидный язык! Список доступных языков: ru/eng`);
		}
	}
}

export { LogService };
