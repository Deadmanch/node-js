export function divide(a, b) {
	if (b === 0) {
		throw new Error('На ноль делить нельзя!');
	}
	return Number(a / b);
}
