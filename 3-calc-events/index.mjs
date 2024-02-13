import EventEmitter from 'events';
import operations from './operations/index.mjs';
const calcEmitter = new EventEmitter();
calcEmitter.on('result', res => {
	console.log(res);
});
const args = process.argv.slice(2);
const [firstNum, secondNum, operation] = args;

if (!operations[operation]) {
	throw new Error(
		`Вы ввели неверную операцию - ${operation}. Введите одну из операций - ${Object.keys(operations).join(', ')}`
	);
} else if (isNaN(firstNum) || isNaN(secondNum)) {
	throw new Error('Вы ввели не число! Введите пожалуйста число');
} else {
	Object.keys(operations).forEach(operation => {
		calcEmitter.on(operation, (firstNum, secondNum) => {
			calcEmitter.emit('result', operations[operation](firstNum, secondNum));
		});
	});

	calcEmitter.emit(operation, parseInt(firstNum), parseInt(secondNum));
}
