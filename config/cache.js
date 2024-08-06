const redis = require('redis');
const util = require('util');

client = redis.createClient(CONFIG.redisPort, CONFIG.redisUrl, {
	retry_strategy: function (options) {

		console.log(`Redis Error::${options.error.message}`);

		return Math.min(options.attempt * 300000, 3600000);
	}
});

client.hget = util.promisify(client.hget);
client.get = util.promisify(client.get);
client.incr = util.promisify(client.incr);
client.del = util.promisify(client.del);

client.on('ready', function () {
	console.log('Redis is ready')
});

client.on('reconnecting', function () {
	console.log('Redis reconnecting')
});


setRadisByKeyTime = function (key, content, time) {
	client.set(key, content, redis.print);
	
	client.expire(key, time * 60 * 60)
}
// Example:
// setRadisByKeyTime(redis_key, JSON.stringify(data), 0.5);

setRadisByKey = function (key, content) {
	client.set(key, content, 'EX', 1 * 60 * 60);
}
// Example:
// setRadisByKey(redis_key, JSON.stringify(data));

getRadisByKey = function (key, callback) {
	client.get(key)
		.then(cachedvalue => {
			console.log(cachedvalue)
			if (cachedvalue != null) {
				return callback(JSON.parse(cachedvalue));
			} else {
				return callback();
			}
		})
		.catch(err => {
			console.log("Error: Redis getRadisByKey " + err);
			return callback();
		});
}
// Example:
// exports.getRadisByKey(redis_key, function (jsonData_radis) {
//     resolve(jsonData_radis);
// })

delRadisByKey = function (keys) {
	// ["del", "key1"],
	// ["del", "key2"]
	client.multi(keys).exec(function (err, replies) {
		if (err) {
			console.log("Error: Redis delRadisByKey " + err);
		}
		console.log("Redis delRadisByKey " + replies);
	});
}
// Example:
// delRadisByKey([ ["del",redis_key_instructor],["del",redis_key_instructor] ])