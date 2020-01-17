const Redis = require('ioredis');

let client = null;


const getClient = async () => client;

const initClient = async ({ redisConf }) => {
	return new Promise((resolve, reject) => {
		const client = new Redis(redisConf);

		client
			.on('ready', () => resolve(client))
			.on('error', error => {
				console.log(error);
				reject(error);
			})
			.on('reconnecting', () => console.log('reconnecting'))
			.on('end', () => console.log('end'));
	});
}

Object.assign(module.exports, {
	initClient,
	getClient
});