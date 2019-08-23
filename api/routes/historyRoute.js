module.exports = function(app){
    app.post('/api/history', function (req, res) {
        app.api.controllers.historyController.save(app, req, res);

    });

    app.get('/api/history', function (req, res) {
        app.api.controllers.historyController.findAll(app, req, res);

    });

    app.get('/api/history/:id', function (req, res) {
        app.api.controllers.historyController.findByID(app, req, res);

    });

    app.put('/api/history/:id', function (req, res) {
        app.api.controllers.historyController.alterByID(app, req, res);

    });

    app.delete('/api/history/:id', function (req, res) {
        app.api.controllers.historyController.deleteByID(app, req, res);

    });

}