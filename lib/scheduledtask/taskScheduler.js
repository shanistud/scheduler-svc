const redis = require('../connectors/redis');
const uuidv4 = require('uuid/v4');
const { SCHEDULED_TASKS_ZSET_KEY } = require('./scheduledTasksCommon');

const scheduleTask = async({ message, triggerTime }) => {
    const redisClient = await redis.getClient();

    // add a task to ZSET ordered by date
    const res = await redisClient.zadd(SCHEDULED_TASKS_ZSET_KEY, triggerTime, JSON.stringify({ id: uuidv4(), message }));

    return res;
}


Object.assign(module.exports, {
    scheduleTask
});


