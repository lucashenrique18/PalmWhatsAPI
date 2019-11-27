module.exports = (app) => {
    app.post('/api/campaign', app.api.services.token.validateToken, (req, res) => {
        app.api.controllers.campaignController.save(app, req, res);
    });

    app.get('/api/campaign', app.api.services.token.validateToken, (req, res) => {
        app.api.controllers.campaignController.findAll(app, req, res);
    });

    app.get('/api/campaign/:id', app.api.services.token.validateToken, (req, res) => {
        app.api.controllers.campaignController.findByID(app, req, res);
    });

    app.put('/api/campaign/:id', app.api.services.token.validateToken, (req, res) => {
        app.api.controllers.campaignController.alterByID(app, req, res);
    });

    app.delete('/api/campaign/:id', app.api.services.token.validateToken, (req, res) => {
        app.api.controllers.campaignController.deleteByID(app, req, res);
    });
}