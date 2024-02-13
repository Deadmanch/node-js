export function createArr(length) {
	let arr = [];
	for (let i = 1; i <= length; i++) {
		arr.push(i);
	}
	return arr;
}

export function splitArray(arr, cpusNumber) {
	const chunks = [];
	const chunkSize = Math.ceil(arr.length / cpusNumber);
	for (let i = 0; i < arr.length; i += chunkSize) {
		chunks.push(arr.slice(i, i + chunkSize));
	}
	return chunks;
}
export function remainderArr(arr) {
	let num = 0;
	arr.forEach(el => {
		if (el % 3 === 0) {
			num++;
		}
	});
	return num;
}
