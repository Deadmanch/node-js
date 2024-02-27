import express from 'express';
import { STORAGE_KEYS } from '../global/enums.js';
import { errorsMessages } from '../global/errors.js';
import { getWeather } from '../services/api.service.js';
import { LogService } from '../services/log.service.js';
import { getKeyValue, saveKeyValue } from '../services/storage.service.js';

const weatherRouter = express.Router();

weatherRouter
	.get('/options/:key?', async (req, res) => {
		try {
			const key = req?.params?.key;
			if (key !== undefined && !Object.hasOwn(STORAGE_KEYS, key)) {
				return res.status(404).json({ success: false, error: [], message: errorsMessages.KEY_IS_NOT_FOUND });
			}
			const data = await getKeyValue(req.params.key);
			res.json({ success: true, data, message: '' });
		} catch (error) {
			res.status(500).send(error.message);
		}
	})
	.post('/options', async (req, res) => {
		try {
			const body = Object.entries(req.body);
			if (!body.length) {
				return res.status(404).json({ success: false, error: [], message: errorsMessages.PARAMETERS_NOT_PASSED });
			}
			await saveKeyValue(body);
			res.json({ success: true, message: 'Данные успешно сохранены' });
		} catch (error) {
			res.status(500).send(error.message);
		}
	});

weatherRouter.get('/:city?', async (req, res) => {
	try {
		const options = await getKeyValue();
		const weather = await getWeather(req.params, options);
		const icon = LogService.getIcon(weather.weather[0].icon);
		const message = LogService.printWeather(weather, icon, options?.language);
		res.json({ success: true, data: weather, message });
	} catch (error) {
		let message;
		if (error?.response?.status === 404) {
			message = errorsMessages.INCORRECT_CITY;
		} else if (error?.response?.status === 401) {
			message = errorsMessages.INCORRECT_TOKEN;
		} else {
			message = error.message;
		}
		res.status(error?.response?.status ?? 500).json({ success: false, error: [], message });
	}
});
export { weatherRouter };
