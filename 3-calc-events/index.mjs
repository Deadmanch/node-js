import EventEmitter from 'events';
import operations from './operations/index.mjs';
const calcEmitter = new EventEmitter();
calcEmitter.on('result', res => {
	console.log(res);
});

Object.entries(operations).map(([key, operation]) => {
	calcEmitter.on(key, (firstNum, secondNum) => {
		calcEmitter.emit('result', operation(firstNum, secondNum));
	});
});

calcEmitter.emit('add', '33', 6);
calcEmitter.emit('divide', 36, 6);
calcEmitter.emit('multiply', 2, 6);
