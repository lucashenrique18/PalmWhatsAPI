require('dotenv').config();
const mongoose = require('mongoose');
const dbName = 'whatsdb';

const uri = `mongodb://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}`;


connDataBase = (req, res)=>{
    mongoose.connect(uri, {useNewUrlParser: true}, function(err){
        if (err)
            res.status(500).json('ERROR CONECTION -- ' + err);
        else {
            console.log('Connected successfully to MONGODB server')
        }
    });
}

/*const database = new mongodb(url, {
    useNewUrlParser: true,
    useNewUrlParser: true,
    poolSize: 20,
    socketTimeoutMS: 480000,
    keepAlive: 300000,
    keepAliveInitialDelay: 300000,
    connectTimeoutMS: 30000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
});*/

module.exports = ()=>{
    return connDataBase, mongoose;
};

