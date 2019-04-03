var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb').MongoClient,
    assert = require('assert');

var app = express();

//body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = 8080;
app.listen(port);
console.log('Servidor está está escutando http://localhost:' + port);

//configurando conexão com mongodb
const url = 'mongodb://localhost:27017';
const dbName = 'whatsapp';
const database = new mongodb(url, {
    useNewUrlParser: true
});

app.get('/', function (req, res) {
    res.send({
        msg: 'Olá'
    });
});

app.post('/api', function (req, res) {

    var dados = req.body;

    database.connect(function (err) {
        if (err)
            console.log('ERROR CONECTION -- ' + err);
        else {
            console.log('Connected successfully to MONGODB server')
            const db = database.db(dbName);
            var collectionCampanha = db.collection('campanha');
            collectionCampanha.insertOne(dados, function (err, records) {
                if (err) 
                    res.json('ERROR INSERTONE -- ' + err);
                else 
                    res.json(records);
                
                database.close();
            });
        }
    });
});

app.get('/api', function (req, res) {

     database.connect(function (err) {
        if (err) 
            console.log('ERROR CONECTION -- ' + err);
        else {
            console.log('Connected successfully to MONGODB server')
            const db = database.db(dbName);
            var collectionCampanha = db.collection('campanha');
            collectionCampanha.find().toArray(function (err, result) {
                if (err)
                    res.json('ERROR FIND-- ' + err);
                else 
                    res.json(result);
        
                database.close();
            });
        }
    });
});