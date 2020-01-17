const config = require('config');
const redis = require('../connectors/redis');
const tasksFetcher = require('../scheduledtask/tasksFetcher');
const taskScheduler = require('../scheduledtask/taskScheduler');
const tasksEnqueuer = require('../scheduledtask/tasksEnqueuer');

const init = () => {
	const redisConf = config.get('connectors.redis');
	redis.initClient({ redisConf });
};


const handleScheduledTasks = async () => {
	// runs a worker that finds messages that thyre trigger time has arrived or passed, and enqueues them in the ready queue
	tasksEnqueuer.startEnqueuingTasks();

	while(true) {
		//pull the next ready-to-print message from queue
		const task = await tasksFetcher.nextTask();
		if (task != null) {
			console.log(task.message);
		}
	}
}


const scheduleConsolePrint = async({ message, triggerTime }) => {
	await taskScheduler.scheduleTask({ message, triggerTime });
}

Object.assign(module.exports, {
	init,
	scheduleConsolePrint,
	handleScheduledTasks
});
