const express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb').MongoClient,
    assert = require('assert'),
    objectId = require('mongodb').ObjectId,
    dotenv = require('dotenv').config;
    app = express();

//body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const port = 8080;
app.listen(port);
dotenv();
console.log('Servidor está está escutando http://localhost:' + port);

const url = `mongodb://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}`;

/*
const url = 'mongodb://localhost:27017';
const dbName = 'whatsapp';
const database = new mongodb(url, {
    useNewUrlParser: true,
    poolSize: 20,
    socketTimeoutMS: 480000,
    keepAlive: 300000,
    keepAliveInitialDelay: 300000,
    connectTimeoutMS: 30000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
});
*/

const dbName = 'whatsdb';
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

// ! VERBOS E ROTAS 
app.get('/', function (req, res) {
    
    res.send({
        msg: 'Olá'
    });

});

app.post('/api', function (req, res) {

    let dados = req.body;

    database.connect(function (err) {
        if (err)
            res.json('ERROR CONECTION -- ' + err);
        else {
            console.log('Connected successfully to MONGODB server')
            const db = database.db(dbName);
            let collection = db.collection('campanha');
            collection.insertOne(dados, function (err, records) {
                if (err)
                    res.json('ERROR INSERTONE -- ' + err);
                else
                    res.json(records.insertedCount + " -- dado inserido");
            });
        }
    });

});

app.get('/api', function (req, res) {

    database.connect(function (err) {
        if (err)
            res.json('ERROR CONECTION -- ' + err);
        else {
            console.log('Connected successfully to MONGODB server')
            const db = database.db(dbName);
            let collection = db.collection('campanha');
            collection.find().toArray(function (err, result) {
                if (err)
                    res.json('ERROR FIND -- ' + err);
                else
                    res.json(result);
            });
        }
    });

});

app.get('/api/:id', function (req, res) {

    database.connect(function (err) {
        if (err)
            res.json('ERROR CONECTION -- ' + err);
        else {
            const db = database.db(dbName);
            let collection = db.collection('campanha');
            collection.find({_id : objectId(req.params.id)}).toArray(function (err, result) {
                if (err)
                    res.json('ERROR FIND BY ID -- ' + err);
                else
                    res.json(result);
            });
        }
    });

});

app.put('/api/:id', function (req, res) {

    let dados = req.body;

    database.connect(function (err) {
        if (err)
            res.json('ERROR CONECTION -- ' + err);
        else {
            const db = database.db(dbName);
            var collection = db.collection('campanha');
            collection.update(
                {_id : objectId(req.params.id)},
                { $set : {titulo : dados.titulo}},
                {},
                function(err, records){
                if (err)
                    res.json('ERROR UPDATE -- ' + err);
                else
                    res.json(records);
            });
        }
    });

});

app.delete('/api/:id', function (req, res) {

    database.connect(function (err) {
        if (err)
            res.json('ERROR CONECTION -- ' + err);
        else {
            const db = database.db(dbName);
            var collection = db.collection('campanha');
            collection.deleteOne(
                {_id : objectId(req.params.id)},
                function(err, records){
                if (err)
                    res.json('ERROR DELETE -- ' + err);
                else
                    res.json(records);
            });
        }
    });

});