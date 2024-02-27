'use strict';
const page = {
	popup: document.querySelector('.popup'),
	content: document.querySelector('.content__block'),
	form: document.querySelector('#param-form'),
	weatherButton: document.querySelector('.weather-button'),
	formButton: document.querySelector('.form-button'),
	loader: document.querySelector('.loader'),
};
const createDiv = data => {
	if (page.content.classList.contains('hidden')) {
		page.content.classList.remove('hidden');
	}
	const element = document.createElement('div');
	element.classList.add('javascript', 'weather');
	element.innerHTML = data;
	page.content.append(element);
};
const buttonToggleActive = btn => {
	btn.disabled = !btn.disabled;
	toggleHiddenElement(btn, 'sending');
};

const toggleHiddenElement = (element, style = 'hidden') => {
	element.classList.toggle(style);
};
const getWeather = async () => {
	buttonToggleActive(page.weatherButton);
	toggleHiddenElement(page.loader);
	page.content.innerHTML = '';
	try {
		const weatherInfo = await request('./weather');
		let result;
		if (weatherInfo.message.lang === 'ru') {
			result = `<div class="content__block-wrapper">
					<h2>Погода в городе ${weatherInfo.message.cityName}</h2>
					<div class="content__block-bottom">
						<img class="content__block-img" src="${weatherInfo.message.icon}" alt="Иконка погоды" />
						<div class="content__block-info">
							<div class="content__block-temp">${Math.floor(weatherInfo.message.temperature)}°</div>
							<div class="content__block-feels">Ощущается: <span>${Math.floor(weatherInfo.message.feelsLike)}°</span></div>
							<div class="content__block-feels">Влажность: ${Math.floor(weatherInfo.message.humidity)}%</div>
							<div class="content__block-feels">Ветер: ${Math.floor(weatherInfo.message.windSpeed)}м/c</div>
						</div>
					</div>
				</div>`;
		} else {
			result = `<div class="content__block-wrapper">
					<h2>Weather in the city ${weatherInfo.message.cityName}</h2>
					<div class="content__block-bottom">
						<img class="content__block-img" src="${weatherInfo.message.icon}" alt="Иконка погоды" />
						<div class="content__block-info">
							<div class="content__block-temp">${Math.floor(weatherInfo.message.temperature)}°</div>
							<div class="content__block-feels">Feels like: <span>${Math.floor(weatherInfo.message.feelsLike)}°</span></div>
							<div class="content__block-feels">Humidity: ${Math.floor(weatherInfo.message.humidity)}%</div>
							<div class="content__block-feels">Wind speed: ${Math.floor(weatherInfo.message.windSpeed)}м/c</div>
						</div>
					</div>
				</div>`;
		}
		console.log(result);
		createDiv(result);
		toggleHiddenElement(page.loader);
		buttonToggleActive(page.weatherButton);
	} catch (e) {
		createDiv(e);
		toggleHiddenElement(page.loader);
		buttonToggleActive(page.weatherButton);
	}
};

const setDefaultFormVal = async values => {
	try {
		let data = {};
		if (!values) {
			const res = await request('./weather/options');
			data = res.data;
		} else {
			data = values;
		}
		Object.entries(data).map(([key, value]) => {
			const select = document.querySelector(`select#${key}`);
			if (!select) {
				return;
			}
			Array.from(select.options).map(item => {
				item.removeAttribute('selected');
				if (item.value === value) {
					item.select = true;
					item.setAttribute('selected', true);
				}
			});
		});
	} catch (e) {
		createDiv(e);
	}
};

const postForm = async event => {
	event.preventDefault();
	buttonToggleActive(page.formButton);

	try {
		const values = {};
		const form = new FormData(event.target);
		for (const [key, value] of form.entries()) {
			values[key] = value;
		}

		const data = await request('./weather/options/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values),
		});
		if (!data?.success) {
			throw new Error(data?.message);
		}
		buttonToggleActive(page.formButton);
		toggleHiddenElement(page.popup);
		await setDefaultFormVal(values);
		event.target.reset();
	} catch (e) {
		createDiv(e);
		buttonToggleActive(page.formButton);
		toggleHiddenElement(page.popup);
	}
};

const request = async (url, options = {}) => {
	try {
		const res = await fetch(url, options);
		return await res.json();
	} catch (e) {
		throw new Error(JSON.stringify({ code: response.status, message: response.statusText }));
	}
};

page.popup.addEventListener('click', e => {
	const target = e.target;
	const isPopup = page.form.contains(target);
	if (!isPopup) {
		toggleHiddenElement(page.popup);
	}
});

page.form.addEventListener('keyup', function (e) {
	if (e.key === 'Escape') {
		toggleHiddenElement(page.popup);
	}
});
setDefaultFormVal();

class formField {
	constructor(options, tagName = 'input') {
		this.input = document.createElement(tagName);
		this.options = options;
		Object.entries(this.options).map(([key, value]) => {
			this.input[key] = value;
		});
	}
	get element() {
		return this.input;
	}
}

class selectInput extends formField {
	constructor(options, fields = [], tagName = 'select') {
		super(options, tagName);
		this.fields = fields;
		this.setOptions();
	}

	setOptions() {
		this.fields.map(field => {
			const option = document.createElement('option');
			option.value = field.value;
			option.text = field.text;
			this.input.append(option);
		});
		return this.input;
	}
}

const formFieldsGenerate = {
	title: 'Параметры для передачи',
	fields: [
		{
			input_type: 'input',
			options: {
				id: 'token',
				name: 'token',
				type: 'text',
				placeholder: 'Токен для авторизации',
			},
			fields: [],
			img: { url: './img/api.svg', alt: 'Иконка токена' },
		},
		{
			input_type: 'input',
			options: {
				id: 'city',
				name: 'city',
				type: 'text',
				placeholder: 'Введите название города',
			},
			fields: [],
			img: { url: './img/city.svg', alt: 'Иконка города' },
		},
		{
			input_type: 'select',
			options: {
				id: 'language',
				name: 'language',
			},
			label: 'Выбрать язык',
			fields: [
				{ value: 'ru', text: 'Русский' },
				{ value: 'eng', text: 'Английский' },
			],
			img: { url: './img/language.svg', alt: 'Иконка языка' },
		},
	],
};

const formConstructor = (form, params) => {
	form.innerHTML = `<div class="close-form" onclick="toggleHiddenElement(page.popup)">
						<svg width="15" height="15" viewBox="0 0 15 15" fill="#212121" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12.9706 12.9706L1.65685 1.65687M12.9706 1.65687L1.65685 12.9706"
								stroke="#212121"
								stroke-width="3"
								stroke-linecap="round"
							/>
						</svg>
					</div>
					<h2>${params.title}</h2>
					`;
	params.fields.map(field => {
		const itemDiv = document.createElement('div');
		itemDiv.classList.add('form__item');
		if (field?.img?.url) {
			const img = document.createElement('img');
			img.setAttribute('src', field.img.url);
			img.setAttribute('alt', field.img.alt);
			itemDiv.append(img);
		}
		const input =
			field.input_type === 'select'
				? new selectInput(field.options, field.fields).element
				: new formField(field.options).element;
		if (field?.classList) {
			field.classList.map(a => {
				input.classList(a);
			});
		}
		const contentDiv = document.createElement('div');
		contentDiv.classList.add('form__content');
		contentDiv.innerHTML = `${field.label ? `<label for="${field.options.id}">${field.label}</label>` : ``}`;
		contentDiv.append(input);
		itemDiv.append(contentDiv);

		form.appendChild(itemDiv);
	});
	const button = document.createElement('button');
	button.innerText = 'Отправить';
	button.classList.add('form-button');
	button.type = 'submit';
	page.formButton = button;
	form.append(button);
};

formConstructor(page.form, formFieldsGenerate);
