const EventEmitter = require('events');

const calcEmitter = new EventEmitter();
calcEmitter.on('add', (a, b) => {
	calcEmitter.emit('result', Number(a + b));
});
calcEmitter.on('minus', (a, b) => {
	calcEmitter.emit('result', Number(a - b));
});

calcEmitter.on('multiply', (a, b) => {
	calcEmitter.emit('result', Number(a * b));
});

calcEmitter.on('divide', (a, b) => {
	calcEmitter.emit('result', Number(a / b));
});

calcEmitter.on('result', result => {
	console.log(result);
});
calcEmitter.emit('add', 2, 3);
calcEmitter.emit('multiply', 2, 3);
calcEmitter.emit('minus', 3, 2);
calcEmitter.emit('divide', 6, 2);
