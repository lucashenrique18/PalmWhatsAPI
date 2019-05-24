module.exports = function(app){

    //const dbName = 'whatsdb';

    // ! VERBOS E ROTAS ==>
    app.get('/', function (req, res) {

        res.send({
            msg: 'Olá'
        });

    });

    app.post('/api/campanha', function (req, res) {

        app.api.controllers.campanhaController.registrar(app, req, res)

    });

    app.get('/api/campanha', function (req, res) {

        app.api.controllers.campanhaController.consultar(app, req, res)

    });

    app.get('/api/:id', function (req, res) {

        app.api.controllers.campanhaController.consultarID(app, req, res)

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