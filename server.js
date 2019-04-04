const express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb').MongoClient,
    assert = require('assert'),
    objectId = require('mongodb').ObjectId,
    app = express();

//body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const port = 8080;
app.listen(port);
console.log('Servidor está está escutando http://localhost:' + port);

//configurando conexão com mongodb
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

app.get('/', function (req, res) {
    
    res.send({
        msg: 'Olá'
    });

});

//cria campanha
app.post('/api', function (req, res) {

    let dados = req.body;

    database.connect(function (err) {
        if (err)
            console.log('ERROR CONECTION -- ' + err);
        else {
            console.log('Connected successfully to MONGODB server')
            const db = database.db(dbName);
            let collectionCampanha = db.collection('campanha');
            collectionCampanha.insertOne(dados, function (err, records) {
                if (err)
                    res.json('ERROR INSERTONE -- ' + err);
                else
                    res.json(records.insertedCount + " -- dado inserido");
            });
        }
    });

});

//receber todas campanhas
app.get('/api', function (req, res) {

    database.connect(function (err) {
        if (err)
            console.log('ERROR CONECTION -- ' + err);
        else {
            console.log('Connected successfully to MONGODB server')
            const db = database.db(dbName);
            let collectionCampanha = db.collection('campanha');
            collectionCampanha.find().toArray(function (err, result) {
                if (err)
                    res.json('ERROR FIND -- ' + err);
                else
                    res.json(result);
            });
        }
    });

});

//receber campanhas por id
app.get('/api/:id', function (req, res) {

    database.connect(function (err) {
        if (err)
            console.log('ERROR CONECTION -- ' + err);
        else {
            console.log('Connected successfully to MONGODB server')
            const db = database.db(dbName);
            let collectionCampanha = db.collection('campanha');
            collectionCampanha.find({_id : objectId(req.params.id)}).toArray(function (err, result) {
                if (err)
                    res.json('ERROR FIND BY ID -- ' + err);
                else
                    res.json(result);
            });
        }
    });

});

//receber campanhas por id
app.put('/api/:id', function (req, res) {

    let dados = req.body;

    database.connect(function (err) {
        if (err)
            console.log('ERROR CONECTION -- ' + err);
        else {
            console.log('Connected successfully to MONGODB server')
            const db = database.db(dbName);
            var collectionCampanha = db.collection('campanha');
            collectionCampanha.find({_id : objectId(req.params.id)}).toArray(function (err, result) {
                if (err)
                    res.json('ERROR FIND BY ID -- ' + err);
                else
                    res.json(result);
            });
        }
    });

});