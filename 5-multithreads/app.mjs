import { cpus } from 'os';
import { performance, PerformanceObserver } from 'perf_hooks';
import { Worker } from 'worker_threads';
import { createArr, splitArray } from './calc.mjs';
const numCores = cpus().length;
const arr = createArr(105000000);
const performanceObserver = new PerformanceObserver(items => {
	items.getEntries().forEach(entry => {
		console.log(`${entry.name}: ${entry.duration}`);
	});
});

performanceObserver.observe({ entryTypes: ['measure'] });

const calc = async arr => {
	return new Promise((resolve, reject) => {
		const subArrays = splitArray(arr, numCores);
		performance.mark('calc start');
		const promises = subArrays.map(subArray => {
			return new Promise((resolve, reject) => {
				const worker = new Worker('./worker.mjs', {
					workerData: subArray,
				});
				worker.on('message', msg => {
					resolve(msg);
				});
				worker.on('error', err => {
					reject(err);
				});
			});
		});
		Promise.all(promises)
			.then(res => {
				performance.mark('calc end');
				performance.measure('calc', 'calc start', 'calc end');
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
	});
};
const basicCalc = arr => {
	return new Promise((resolve, reject) => {
		performance.mark('basicCalc start');
		const worker = new Worker('./worker.mjs', {
			workerData: arr,
		});
		worker.on('message', msg => {
			performance.mark('basicCalc end');
			performance.measure('basicCalc', 'basicCalc start', 'basicCalc end');
			resolve(msg);
		});
		worker.on('error', err => {
			reject(err);
		});
	});
};
const main = async () => {
	try {
		await calc(arr);
		await basicCalc(arr);
	} catch (e) {
		console.log(e.message);
	}
};

main();
