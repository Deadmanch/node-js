const notifier = require('node-notifier');
const path = require('path');

function startTimer(callTime) {
	if (!callTime || !callTime.match(/^(\d+[hms] )*(\d+[hms])$/)) {
		throw new Error('Вы не ввели данные или ввели их в неверном формате, используйте формат 1h 5m 2s');
	}
	const seconds = callTime.split(' ').reduce((total, item) => {
		if (item) {
			const value = parseInt(item);
			const multiplier = item.includes('h') ? 3600 : item.includes('m') ? 60 : 1;
			total += value * multiplier;
		}
		return total;
	}, 0);

	notifier.notify({
		title: 'The start of the timer',
		icon: path.join(__dirname, 'img/bomb.jpg'),
		message: `Bomb has been planed: ${callTime}`,
		sound: true,
	});
	setTimeout(() => {
		notifier.notify({
			title: 'The end of the timer',
			icon: path.join(__dirname, 'img/boom.jpg'),
			message: 'Booom!',
			sound: true,
		});
	}, seconds * 1000);
}

const args = process.argv.slice(2);
startTimer(args.join(' '));
