module.exports = function(app){
    app.post('/api/dispatch', app.api.services.token.validateToken, function (req, res) {
        app.api.controllers.dispatchController.save(app, req, res);
    });

    app.get('/api/dispatch', app.api.services.token.validateToken, function (req, res) {
        app.api.controllers.dispatchController.findAll(app, req, res);
    });

    app.get('/api/dispatch/:id', app.api.services.token.validateToken, function (req, res) {
        app.api.controllers.dispatchController.findByID(app, req, res);
    });

    app.put('/api/dispatch/:id', app.api.services.token.validateToken, function (req, res) {
        app.api.controllers.dispatchController.alterByID(app, req, res);
    });

    app.delete('/api/dispatch/:id', app.api.services.token.validateToken, function (req, res) {
        app.api.controllers.dispatchController.deleteByID(app, req, res);
    });
}