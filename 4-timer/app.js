const args = process.argv.slice(2);
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

	console.log(`Bomb has been planted: ${callTime}`);
	setTimeout(() => {
		console.log('Boom');
	}, seconds * 1000);
}
startTimer(args.join(' '));
