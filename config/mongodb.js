require('dotenv').config()
const mongoose = require('mongoose')
const {log} = require('../log/setColors')
const {ERRO, OK, CALL, INFO} = require('../log/tipoLog')

const uri = `mongodb://${process.env.DBUSERN}:${process.env.DBPASS}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`

mongoose.Promise = Promise

mongoose.connection.on('connecting', () => {
  log('Trying Create Connection', CALL)
})
mongoose.connection.on('connected', () => {
  log('Connection Established', OK)
})
mongoose.connection.on('reconnected', () => {
  log('Connection Reestablished', INFO)
})
mongoose.connection.on('disconnected', () => {
  log('Disconnecting', CALL)
})
mongoose.connection.on('close', () => {
  log('Connection Closed', OK)
})
mongoose.connection.on('error', (error) => {
  log('ERROR: ' + error, ERRO)
})

const run = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    autoReconnect: true,
    poolSize: 10,
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30,
    useCreateIndex: true
  })
}

module.exports = {
  Run: run,
  Mongoose: mongoose
}

module.exports.close = () => {
  mongoose.connection.close((err) => {
    if (err)
      log("ERRO -- " + err, ERRO)
  })
}