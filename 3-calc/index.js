const add = require('./operations/add.js');
const minus = require('./operations/minus.js');
const multiply = require('./operations/multiply.js');
const divide = require('./operations/divide.js');

let nodePath = process.argv[0];
let appPath = process.argv[1];

let firstNum = Number(process.argv[2]);
let secondNum = Number(process.argv[3]);
let operations = process.argv[4];

let result;

switch (operations) {
	case 'add':
		result = add(firstNum, secondNum);
		break;
	case 'minus':
		result = minus(firstNum, secondNum);
		break;
	case 'multiply':
		result = multiply(firstNum, secondNum);
		break;
	case 'divide':
		result = divide(firstNum, secondNum);
		break;
	default:
		console.log('Invalid operation');
		process.exit(1);
}

console.log(result);
