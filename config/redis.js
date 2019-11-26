require('dotenv').config();
const redis = require("redis")

const {log} = require('../log/setColors');
const {ERRO,OK,CALL,INFO} = require('../log/tipoLog');

const port_redis = process.env.REDISPORT || 6379
const redis_client = redis.createClient(port_redis)


// redis_client.on('connecting', () => {
//   log('Trying Create Connection', CALL)
// })
redis_client.on('connect', () => {
  log('Connection Established', OK)
})
// redis_client.on('reconnected', () => {
//   log('Connection Reestablished', INFO)
// })
// redis_client.on('disconnected', () => {
//   log('Disconnecting', CALL)
// })
// redis_client.on('close', () => {
//   log('Connection Closed', OK)
// })
redis_client.on('error', (error) => {
  log('ERROR: ' + error, ERRO)
})


module.exports = redis_client