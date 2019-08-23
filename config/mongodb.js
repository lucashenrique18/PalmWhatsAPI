require('dotenv').config();
var app = require('./config.js');
const mongoose = require('mongoose');

const {log} = require('../log/setColors');
const {ERRO,ALERT,WARNING,DANGER,OK,CALL,INFO} = require('../log/tipoLog');

const uri = `mongodb://${process.env.USERN}:${process.env.PASS}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DBNAME}`;

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
    reconnectTries: 30
  });
}

module.exports = {
  Run: run,
  Mongoose: mongoose
};

module.exports.close = () => {
  mongoose.connection.close(function (err) {
    if (err)
      log("ERRO -- " + err, ERRO);

  });

}