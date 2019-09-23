module.exports = function(app){
  app.post('/api/user', app.api.utils.util.validateToken, function (req, res) {
      app.api.controllers.userController.save(app, req, res);
  });

  app.get('/api/user', app.api.utils.util.validateToken, function (req, res) {
      app.api.controllers.userController.findAll(app, req, res);
  });

  app.get('/api/user/:id', app.api.utils.util.validateToken, function (req, res) {
      app.api.controllers.userController.findByID(app, req, res);
  });

  app.put('/api/user/:id', app.api.utils.util.validateToken, function (req, res) {
      app.api.controllers.userController.alterByID(app, req, res);
  });

  app.delete('/api/user/:id', app.api.utils.util.validateToken, function (req, res) {
      app.api.controllers.userController.deleteByID(app, req, res);
  });

}