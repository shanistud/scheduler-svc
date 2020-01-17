const config = require('config');
const redis = require('../connectors/redis');

const init = () => {
	const redisConf = config.get('connectors.redis');
	redis.initClient({ redisConf });
};

const scheduleConsolePrint = async({ message, triggerTime }) => {
	const redisClient = await redisClient.getClient();

	const timeLeft = triggerTime - Date.UTC();
	setTimeout(() => console.log(message), triggerTime);
}

Object.assign(module.exports, {
	init,
	scheduleConsolePrint
});