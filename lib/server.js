const express = require('express');
const bodyParser = require('body-parser');
const schedulePrintService = require('./services/schedulePrintService')
const { setupAppRouter } = require('./routes');

const basePath = '/scheduler';
const port = 3000;

const run = () => {
	const { app, router } = init();
	setupAppRouter(router);
	initServiceComponents();
	const server = start({ app, port });

	return server;
}


const init = () => {
	const app = express();
	const router = express.Router();

	app.use(basePath, bodyParser.json());
	app.use(basePath, router);

	const errorHandler = require('./routes/errorHandler').errorHandler;
	app.use(basePath, errorHandler);

	return { app, router };
};

const start = ({ app, port }) => {
	const server = app.listen(port);

	console.log(`service is ready on port: ${port}`);

	return server;
};

const initServiceComponents = async () => {
	schedulePrintService.init();
	schedulePrintService.handleScheduledTasks();
}

Object.assign(module.exports, {
	init,
	start,
	run
});