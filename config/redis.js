require('dotenv').config();
const redis = require("redis")

const {log} = require('../log/setColors');
const {ERRO, OK} = require('../log/tipoLog');

const port_redis = process.env.REDISPORT || 6379
const redis_client = redis.createClient(
  {
    port: port_redis,
    host: process.env.REDISHOST,
    auth_pass: process.env.REDIS_PASS
  }
)

redis_client.on('connect', () => {
  log('Connection Established on Redis server', OK)
})
redis_client.on('error', (error) => {
  log('ERROR: ' + error, ERRO)
})

module.exports = redis_client