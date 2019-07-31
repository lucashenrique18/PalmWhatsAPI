require('dotenv').config();

const mongoose = require('mongoose');

const uri = `mongodb://${process.env.USERN}:${process.env.PASS}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DBNAME}`;

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
  console.log('Connection Established')
})
mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished')
})
mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected')
})
mongoose.connection.on('close', () => {
  console.log('Connection Closed')
})
mongoose.connection.on('error', (error) => {
  console.log('ERROR: ' + error)
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
      console.log("ERRO -- " + err);

  });

}