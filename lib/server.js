const express = require('express');
const bodyParser = require('body-parser');
const schedulePrintService = require('./services/schedulePrintService')
const { setupAppRouter } = require('./routes');
const { promisify } = require('util');

const port = 3000;

const run = async() => {
	const { app, router } = init();
	setupAppRouter(router);
	await initServiceComponents();
	const server = await start({ app, port });

	return server;
}


const init = () => {
	const app = express();
	const router = express.Router();

	app.use(bodyParser.json({ type: 'application/*+json' }));

	const errorHandler = require('./routes/errorHandler').errorHandler;
	app.use(errorHandler);

	return { app, router };

};

const start = async ({ app, port }) => {
	const listen = promisify(app.listen).bind(app);

	const server = await listen(port);

	console.log(`service is ready on port: ${port}`);

	return server;
};



const initServiceComponents = () => {
	schedulePrintService.init();
}

Object.assign(module.exports, {
	init,
	start,
	run
});