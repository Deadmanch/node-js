export const getArgs = args => {
	const res = {};
	const [executer, file, ...rest] = args;
	let currentKey;
	rest.forEach(value => {
		if (!value.match('^-[a-z]') && currentKey) {
			res[currentKey] += value + ' ';
			return;
		}
		currentKey = value.substring(1);
		res[currentKey] = '';
	});

	for (const resKey in res) {
		if (!res[resKey]) {
			res[resKey] = true;
		} else {
			res[resKey] = res[resKey].trim();
		}
	}
	return res;
};
