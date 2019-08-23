module.exports = function(app){
    app.post('/api/campaign', function (req, res) {
        app.api.controllers.campaignController.save(app, req, res);

    });

    app.get('/api/campaign', function (req, res) {
        app.api.controllers.campaignController.findAll(app, req, res);

    });

    app.get('/api/campaign/:id', function (req, res) {
        app.api.controllers.campaignController.findByID(app, req, res);

    });

    app.put('/api/campaign/:id', function (req, res) {
        app.api.controllers.campaignController.alterByID(app, req, res);

    });

    app.delete('/api/campaign/:id', function (req, res) {
        app.api.controllers.campaignController.deleteByID(app, req, res);

    });

}