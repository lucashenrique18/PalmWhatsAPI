module.exports = function(app){
  app.post('/api/contacts/:id', app.api.services.token.validateToken, function (req, res) {
      app.api.controllers.contactsController.insertContacts(app, req, res);
  });
  app.get('/api/contacts/:id', app.api.services.token.validateToken, function (req, res) {
      app.api.controllers.contactsController.findContacts(app, req, res);
  });

  app.get('/api/contacts/:id', app.api.services.token.validateToken, function (req, res) {
      app.api.controllers.contactsController.findContactByID(app, req, res);
  });

  app.put('/api/contacts/:id', app.api.services.token.validateToken, function (req, res) {
      app.api.controllers.contactsController.alterContactByID(app, req, res);
  });

  app.delete('/api/contacts/:id', app.api.services.token.validateToken, function (req, res) {
      app.api.controllers.contactsController.deleteContactByID(app, req, res);
  });

}