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

conn = function(){
    database.connect(function (err) {
        if (err) {
            console.log('ERROR -- ' + err);
        } else {
            console.log('Connected successfully to MONGODB server')
        }
        const dbwhats = database.db(dbName);
        insertDocuments(dbwhats, function() {
            database.close();
        });
    });
}

conn();

const insertDocuments = function(dbwhats, callback) {
    // Get the documents collection
    const collection = dbwhats.collection('numeros');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      if(err){
        console.log('ERROR -- ' + err);
      }else{
        console.log("Inserted 3 documents into the collection");
        callback(result);
      }
    });
  }



app.get('/', function (req, res) {
    res.send({
        msg: 'Olá'
    });
});

app.post('/api', function (req, res) {
    var dados = req.body;
    res.send(dados);
});