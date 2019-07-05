module.exports = function(app){
    app.post('/api/mailing', function (req, res) {
        app.api.controllers.mailignController.save(app, req, res);

    });

    app.get('/api/mailing', function (req, res) {
        app.api.controllers.mailignController.findAll(app, req, res);

    });

    app.get('/api/mailing/:id', function (req, res) {
        app.api.controllers.mailignController.findByID(app, req, res);

    });

    app.put('/api/mailing/:id', function (req, res) {
        app.api.controllers.mailignController.alterByID(app, req, res);

    });

    app.delete('/api/mailing/:id', function (req, res) {
        app.api.controllers.mailignController.deleteByID(app, req, res);

    });

}