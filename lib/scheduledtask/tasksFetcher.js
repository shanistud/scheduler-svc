const redis = require('../connectors/redis');
const { SCHEDULED_TASKS_QUEUE_KEY, sleep } = require('./scheduledTasksCommon');

let fetchingClient = null;

const nextTask = async () => {

    if (fetchingClient == null) {
        fetchingClient = (await redis.getClient()).duplicate();
    }

    while(true) {
        const task = await fetchingClient.lpop(SCHEDULED_TASKS_QUEUE_KEY);

        if (task != null) {
            return JSON.parse(task);
        } else {
            await sleep(100);
        }
    }
}

Object.assign(module.exports, {
    nextTask
});
