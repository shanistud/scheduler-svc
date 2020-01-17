const SCHEDULED_TASKS_ZSET_KEY = 'SCHEDULED_TASKS_ZSET';
const SCHEDULED_TASKS_QUEUE_KEY = 'SCHEDULED_TASKS_QUEUE';

const sleep = async (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
};


Object.assign(module.exports, {
    SCHEDULED_TASKS_ZSET_KEY,
    SCHEDULED_TASKS_QUEUE_KEY,
    sleep
});
