require('dotenv').config();

const mongodb = require('mongodb').MongoClient;
const dbName = 'whatsdb';

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

var connDataBase =  ()=>{
    database.connect(function (err) {
        if (err)
            res.status(500).json('ERROR CONECTION -- ' + err);
        else {
            console.log('Connected successfully to MONGODB server')
        }
    });
}


module.exports = ()=>{
    connDataBase
};

