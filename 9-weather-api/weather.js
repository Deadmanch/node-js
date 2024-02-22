import express from 'express';
import { router } from './routes/index.js';
const port = 8000;

const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.use('/', router);

app.use((err, req, res, next) => {
	console.log(err.message);
	res.status(500).send({ success: false, data: [], message: err.message });
});

app.listen(port, () => {
	console.log(`Server started at: http://localhost:${port}`);
});
