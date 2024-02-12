import { parentPort, workerData } from 'worker_threads';
import { remainderArr } from './calc.mjs';

parentPort.postMessage(remainderArr(workerData));
