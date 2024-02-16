import { add } from './operations/add.mjs';
import { divide } from './operations/divide.mjs';
import { minus } from './operations/minus.mjs';
import { multiply } from './operations/multiply.mjs';
const operation = process.argv[4];
const firstNum = process.argv[2];
const secondNum = process.argv[3];
const operations = {
	add,
	divide,
	minus,
	multiply,
};

if (!operations[operation]) {
	throw new Error(
		`Вы ввели неверную операцию - ${operation}. Введите одну из операций - ${Object.keys(operations).join(', ')}`
	);
} else if (!(parseInt(firstNum) && parseInt(secondNum))) {
	throw new Error('Вы ввели не число! Введите пожалуйста число');
} else {
	console.log(`Результат операции ${operation}: ${operations[operation](parseInt(firstNum), parseInt(secondNum))}`);
}
