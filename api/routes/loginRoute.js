module.exports = function(app){
  app.post('/api/login', function (req, res) {
      app.api.controllers.loginController.login(app, req, res);
  });
}