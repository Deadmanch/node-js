import express from 'express';
import { weatherRouter } from './weather.js';

const router = express.Router();

router.use('/weather', weatherRouter);

export { router };
