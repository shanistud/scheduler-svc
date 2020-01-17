const schedulePrintService = require('../services/schedulePrintService');
const assert = require('assert');
const { get, isString, isEmpty } = require('lodash');

const echoAtTime = (req, res, next) => {
	const message = get(req, 'body.message');
	const triggerTimeMS = Date.parse(get(req, 'body.time', ''));

	try {
		validateRequest({ message, triggerTimeMS });
	} catch(e) {
		console.log(e);

		return next(new Error('validation failed: ' + e.message));
	}

	schedulePrintService.scheduleConsolePrint({ message, triggerTime: new Date(triggerTimeMS)})
		.then(result => res.send(result))
		.catch(e => {
			console.log(e, 'failed scheduling print');
			next(new Error("Error occured"));
		});
};

const validateRequest = ({ message, triggerTimeMS }) => {
	assert(isString(message) && !isEmpty(message), 'request must contain text message in body');
	assert(!isNaN(triggerTimeMS), 'request must contain time parameter');
	assert(triggerTimeMS > Date.now(), 'supplied time must be in the future');
};

module.exports = {
	echoAtTime
};