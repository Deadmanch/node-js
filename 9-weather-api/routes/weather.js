import express from 'express';
import { STORAGE_KEYS } from '../global/storage-keys.js';
import { getIcon, getWeather } from '../services/api.service.js';
import { LogService } from '../services/log.service.js';
import { getKeyValue, saveKeyValue } from '../services/storage.service.js';

const weatherRouter = express.Router();

weatherRouter
	.get('/options/:key?', (req, res) => {
		const key = req?.params?.key;
		if (key !== undefined && !Object.hasOwn(STORAGE_KEYS, key)) {
			return res.status(404).json({ success: false, error: [], message: 'Key is not found' });
		}
		getKeyValue(req.params.key)
			.then(data => res.json({ success: true, data, message: '' }))
			.catch(error => res.status(500).send(error.message));
	})
	.post('/options', async (req, res) => {
		const body = Object.entries(req.body);
		if (!body.length) {
			return res.status(404).json({ success: false, error: [], message: 'Parameters not passed' });
		}
		saveKeyValue(body)
			.then(res.json({ success: true, message: 'Данные успешно сохранены' }))
			.catch(error => res.status(500).send(error.message));
	});

weatherRouter.get('/:city?', async (req, res) => {
	try {
		const result = await getKeyValue();
		const weather = await getWeather(req.params, result);

		const icon = getIcon(weather.weather[0].icon);
		const message = LogService.printWeather(weather, icon, result?.language);
		res.json({ success: true, data: weather, message });
	} catch (error) {
		let message;
		if (error?.response?.status === 404) {
			message = 'Неверно указан город';
		} else if (error?.response?.status === 401) {
			message = 'Неверно указан токен';
		} else {
			message = error.message;
		}
		res.status(error?.response?.status ?? 500).json({ success: false, error: [], message });
	}
});
export { weatherRouter };
