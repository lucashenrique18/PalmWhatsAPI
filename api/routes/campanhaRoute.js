module.exports = function(app){
    app.post('/api/campanha', function (req, res) {
        app.api.controllers.campanhaController.save(app, req, res);

    });

    app.get('/api/campanha', function (req, res) {
        app.api.controllers.campanhaController.findAll(app, req, res);

    });

    app.get('/api/campanha/:id', function (req, res) {
        app.api.controllers.campanhaController.findByID(app, req, res);

    });

    app.put('/api/campanha/:id', function (req, res) {
        app.api.controllers.campanhaController.alterByID(app, req, res);

    });

    app.delete('/api/campanha/:id', function (req, res) {
        app.api.controllers.campanhaController.deleteByID(app, req, res);

    });

}