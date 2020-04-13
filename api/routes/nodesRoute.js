module.exports = app => {
  app.post("/api/nodes", app.api.services.token.validateToken, (req, res) => {
    app.api.controllers.nodesController.save(app, req, res);
  });

  app.get("/api/nodes", app.api.services.token.validateToken, (req, res) => {
    app.api.controllers.nodesController.findAll(app, req, res);
  });

  app.get(
    "/api/nodes/:id",
    app.api.services.token.validateToken,
    (req, res) => {
      app.api.controllers.nodesController.findByID(app, req, res);
    }
  );

  app.put(
    "/api/nodes/:id",
    app.api.services.token.validateToken,
    (req, res) => {
      app.api.controllers.nodesController.alterByID(app, req, res);
    }
  );

  app.delete(
    "/api/nodes/:id",
    app.api.services.token.validateToken,
    (req, res) => {
      app.api.controllers.nodesController.deleteByID(app, req, res);
    }
  );
};
