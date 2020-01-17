const setupAppRouter = (router) => {
	const controller = require('../controllers/schedulerController');

	router.post('scheduler/echoAtTime', controller.echoAtTime);
};

Object.assign(module.exports, {
	setupAppRouter
});