import { LANGUAGE } from '../global/storage-keys.js';

class LogService {
	static printWeather(res, icon, lang) {
		const { name, main, wind } = res;
		const templates = {
			[LANGUAGE.russian]: `<div class="content__block-wrapper">
					<h2>Погода в городе ${name}</h2>
					<div class="content__block-bottom">
						<img class="content__block-img" src="${icon}" alt="Иконка погоды" />
						<div class="content__block-info">
							<div class="content__block-temp">${Math.floor(main.temp)}°</div>
							<div class="content__block-feels">Ощущается: <span>${Math.floor(main.feels_like)}°</span></div>
							<div class="content__block-feels">Влажность: ${Math.floor(main.humidity)}%</div>
							<div class="content__block-feels">Ветер: ${Math.floor(wind.speed)}м/c</div>
						</div>
					</div>
				</div>`,
			[LANGUAGE.english]: `<div class="content__block-wrapper">
					<h2>Weather in the city ${name}</h2>
					<div class="content__block-bottom">
						<img class="content__block-img" src="${icon}" alt="Иконка погоды" />
						<div class="content__block-info">
							<div class="content__block-temp">${Math.floor(main.temp)}°</div>
							<div class="content__block-feels">Feels like: <span>${Math.floor(main.feels_like)}°</span></div>
							<div class="content__block-feels">Humidity: ${Math.floor(main.humidity)}%</div>
							<div class="content__block-feels">Wind speed: ${Math.floor(wind.speed)}m/s</div>
						</div>
					</div>
				</div>`,
		};
		return templates[lang];
	}
}
export { LogService };
