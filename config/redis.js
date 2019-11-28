require('dotenv').config();
const redis = require("redis")

const {log} = require('../log/setColors');
const {ERRO, OK, INFO, CALL, WARNING} = require('../log/tipoLog');

const port_redis = process.env.REDIS_PORT || 6379
const redis_client = redis.createClient(
  {
    port: port_redis,
    host: process.env.REDIS_HOST,
    auth_pass: process.env.REDIS_PASS
  }
)

redis_client.on('connect', () => {
  log('Connection Established on Redis server', OK)
})
redis_client.on('ready', () => {
  log('Redis server ready to work', INFO)
})
redis_client.on('reconnecting', () => {
  log('Reconnection on Redis server', CALL)
})
redis_client.on('end', () => {
  log('Connection is ended on Redis server', WARNING)
})
redis_client.on('warning', (warning) => {
  log('Alert: ' + warning , WARNING)
})
redis_client.on('error', (error) => {
  log('ERROR: ' + error, ERRO)
})

module.exports = redis_client