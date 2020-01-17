const Redis = require('ioredis');

let client = null;


const getClient = () => client;

const initClient = async ({ redisConf }) => {
	return new Promise((resolve, reject) => {
		client = new Redis(redisConf);

		client
			.on('ready', () => {
				console.log('redis connected');
				resolve(client)
			})
			.on('reconnecting', () => console.log('reconnecting'))
			.on('end', () => console.log('end'))
			.on('error', error => {
				console.log(error);
				reject(error);
			});
	});
}

Object.assign(module.exports, {
	initClient,
	getClient
});