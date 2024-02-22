import { promises } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const filePath = join(homedir(), 'weather-data.json');

const saveKeyValue = async data => {
	let json = {};
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		json = JSON.parse(file);
	}
	data.map(([key, value]) => {
		if (!value) {
			return;
		}
		json[key] = value;
	});
	await promises.writeFile(filePath, JSON.stringify(json));
};

const getKeyValue = async key => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);
		if (key) {
			return { [key]: data[key] };
		}
		return data;
	}
	return undefined;
};

const isExist = async path => {
	try {
		await promises.stat(path);
		return true;
	} catch (e) {
		return false;
	}
};
export { getKeyValue, saveKeyValue };
