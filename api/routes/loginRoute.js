module.exports = function(app){
  app.post('/api/login', function (req, res) {
      app.api.controllers.loginController.login(app, req, res);

  });

  app.get('/api/login', function (req, res) {
      app.api.controllers.loginController.findLogin(app, req, res);

  });

}