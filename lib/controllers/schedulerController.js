const schedulePrintService = require('../services/schedulePrintService');
const assert = require('assert');
const { get, isEmpty } = require('lodash');

const echoAtTime = (req, res, next) => {
	const message = get(req, 'body.message');
	const triggerTime = Date.parse(get(req, 'body.time', ''));

	validateRequest({ message, triggerTime });

	schedulePrintService.scheduleConsolePrint({ message, triggerTime })
		.then(result => res.send(result))
		.catch(e => {
			console.log(e, 'failed scheduling print');
			next(new Error("Error occured"));
		});
};

const validateRequest = ({ message, triggerTime }) => {
	assert(isString(message) && !isEmpty(message), 'request must contain text message in body');
	assert(isString(message) && isDate(Date.parse(time))(time), 'request must contain time parameter');
	assert(triggerTime.getTime() > Date.now(), 'supplied time must be in the future');
};

module.exports = {
	echoAtTime
};