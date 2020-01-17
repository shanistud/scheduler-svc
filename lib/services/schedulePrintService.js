const config = require('config');
const redis = require('../connectors/redis');

const init = () => {
	const redisConf = config.get('connectors.redis');
	redis.initClient({ redisConf });
};

const scheduleConsolePrint = async({ message, triggerTime }) => {
	const redisClient = await redis.getClient();

	const timeLeft = triggerTime.getTime() - Date.now();
	setTimeout(() => console.log(message), timeLeft);
}

Object.assign(module.exports, {
	init,
	scheduleConsolePrint
});
