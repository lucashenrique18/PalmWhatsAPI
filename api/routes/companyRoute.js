module.exports = function(app){
    app.post('/api/company', function (req, res) {
        app.api.controllers.companyController.save(app, req, res);

    });

    app.get('/api/company', function (req, res) {
        app.api.controllers.companyController.findAll(app, req, res);

    });

    app.get('/api/company/:id', function (req, res) {
        app.api.controllers.companyController.findByID(app, req, res);

    });

    app.put('/api/company/:id', function (req, res) {
        app.api.controllers.companyController.alterByID(app, req, res);

    });

    app.delete('/api/company/:id', function (req, res) {
        app.api.controllers.companyController.deleteByID(app, req, res);

    });

}