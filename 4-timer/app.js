const timeUnits = new Map([
	['ч', 'h'],
	['час', 'h'],
	['часа', 'h'],
	['м', 'm'],
	['мин', 'm'],
	['минут', 'm'],
	['минуты', 'm'],
	['с', 's'],
	['сек', 's'],
	['секунд', 's'],
	['секунды', 's'],
	['h', 'h'],
	['m', 'm'],
	['s', 's'],
]);

const parseTime = timeArgs => {
	const regex = /(\d+)\s*(h|ч|м|s|с)/g;
	let match;
	let timeInMilliseconds = 0;

	if (!regex.test(timeArgs)) {
		throw new Error('Неверный формат. Пожалуйста используйте формат - "1ч 5минут 10с" или "1h 5m 10s"');
	}
	regex.lastIndex = 0;
	while ((match = regex.exec(timeArgs)) !== null) {
		const value = parseInt(match[1]);
		const timeUnit = timeUnits.get(match[2]);

		switch (timeUnit) {
			case 'h':
				timeInMilliseconds += value * 60 * 60 * 1000;
				break;
			case 'm':
				timeInMilliseconds += value * 60 * 1000;
				break;
			case 's':
				timeInMilliseconds += value * 1000;
				break;
			default:
				break;
		}
	}
	return timeInMilliseconds;
};

const startTimer = timeArgs => {
	const timeInMilliseconds = parseTime(timeArgs);
	console.log(`Bomb has been planted: ${timeArgs}`);

	setTimeout(() => {
		console.log('BOOM!');
	}, timeInMilliseconds);
};

const timeArg = '5 s';
const timeArg2 = '2секунды';
startTimer(timeArg);
startTimer(timeArg2);
