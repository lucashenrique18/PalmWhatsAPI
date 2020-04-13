module.exports = app => {
  app.post("/api/queue", app.api.services.token.validateToken, (req, res) => {
    app.api.controllers.queueController.save(app, req, res);
  });

  app.get("/api/queue", app.api.services.token.validateToken, (req, res) => {
    app.api.controllers.queueController.findAll(app, req, res);
  });

  app.get(
    "/api/queue/:id",
    app.api.services.token.validateToken,
    (req, res) => {
      app.api.controllers.queueController.findByID(app, req, res);
    }
  );

  app.put(
    "/api/queue/:id",
    app.api.services.token.validateToken,
    (req, res) => {
      app.api.controllers.queueController.alterByID(app, req, res);
    }
  );

  app.delete(
    "/api/queue/:id",
    app.api.services.token.validateToken,
    (req, res) => {
      app.api.controllers.queueController.deleteByID(app, req, res);
    }
  );
};
