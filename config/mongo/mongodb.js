const dotenv = require('dotenv').config,
    mongodb = require('mongodb').MongoClient;

dotenv();

const url = `mongodb://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}`;

const database = new mongodb(url, {
    useNewUrlParser: true,
    useNewUrlParser: true,
    poolSize: 20,
    socketTimeoutMS: 480000,
    keepAlive: 300000,
    keepAliveInitialDelay: 300000,
    connectTimeoutMS: 30000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
});

module.exports = database;
