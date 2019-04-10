module.exports = function(app){

    //var database = require('../config/mongo/mongodb');
    //const dbName = 'whatsdb';

    // ! VERBOS E ROTAS ==>
    app.get('/', function (req, res) {

        res.send({
            msg: 'Olá'
        });

    });

    app.post('/api', function (req, res) {
        //app.server.controllers.CampanhaController.registrar(app, req, res);
        app.controllers.campanhaController.registrar(app, req, res)

    });

    app.get('/api', function (req, res) {

        database.connect(function (err) {
            if (err)
                res.status(500).json('ERROR CONECTION -- ' + err);
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
                res.status(500).json('ERROR CONECTION -- ' + err);
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
            res.status(500).json('ERROR CONECTION -- ' + err);
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
                res.status(500).json('ERROR CONECTION -- ' + err);
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



}