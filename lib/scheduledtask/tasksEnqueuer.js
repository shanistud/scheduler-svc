// this module should only be run from one server instance
const redis = require('../connectors/redis');

const { SCHEDULED_TASKS_ZSET_KEY, SCHEDULED_TASKS_QUEUE_KEY, sleep } = require('./scheduledTasksCommon');

const startEnqueuingTasks = async () => {

    while (true) {

        const redisClient = await redis.getClient();

        const tasks = await redisClient.zrevrangebyscore(SCHEDULED_TASKS_ZSET_KEY, Date.now(), 0);

        for (let task of tasks) {
            await enqueueAndDeleteFromZset(redisClient, task);
        }

        await sleep(100);
    }
}

const enqueueAndDeleteFromZset = async (redisClient, task) => {
    const deleteAndEnqueueCommand = redisClient.multi().rpush(SCHEDULED_TASKS_QUEUE_KEY, task).zrem(SCHEDULED_TASKS_ZSET_KEY, task);
    await deleteAndEnqueueCommand.exec();
}

Object.assign(module.exports, {
    startEnqueuingTasks
});