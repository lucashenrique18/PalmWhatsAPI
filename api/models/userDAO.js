function userDAO(db) {
  this._db = db;
}

userDAO.prototype.save = async function(app, data, res) {
  const UserSchema = app.api.models.schemas.User;
  const User = this._db.Mongoose.model("user", UserSchema, "user");

  const usr = new User(data);

  usr
    .save()
    .then(() => {
      res
        .status(200)
        .json({
          status: 1,
          message: "User created successfully",
          result: { name: usr.name, email: usr.email }
        });
      app.config.mongodb.close();
    })
    .catch(err =>
      res.status(500).json({ status: 0, message: err.message, result: null })
    );
};

userDAO.prototype.findAll = function(app, res) {
  const UserSchema = app.api.models.schemas.User;
  const User = this._db.Mongoose.model("user", UserSchema, "user");

  User.find({}, (err, result) => {
    if (err) {
      res.status(500).json({ status: 0, message: err.message, result: null });
      return;
    }
    res.status(200).json({ status: 1, message: "ok", result });
    app.config.mongodb.close();
  });
};

userDAO.prototype.findByID = function(app, usr, res) {
  const UserSchema = app.api.models.schemas.User;
  const User = this._db.Mongoose.model("user", UserSchema, "user");

  User.findById({ _id: usr.id }, (err, result) => {
    if (err) {
      res.status(500).json({ status: 0, message: err.message, result: null });
      return;
    }
    res.status(200).json({ status: 1, message: "ok", result });
    app.config.mongodb.close();
  });
};

userDAO.prototype.alterByID = function(app, req, res) {
  const data = req.body;
  const params = req.params;

  const UserSchema = app.api.models.schemas.User;
  const User = this._db.Mongoose.model("user", UserSchema, "user");

  User.findByIdAndUpdate(params.id, data, { new: true }, (err, result) => {
    if (err) {
      res.status(500).json({ status: 0, message: err.message, result: null });
      return;
    }
    res.status(200).json({ status: 1, message: "ok", result });
    app.config.mongodb.close();
  });
};

userDAO.prototype.deleteByID = function(app, req, res) {
  const params = req.params;

  const UserSchema = app.api.models.schemas.User;
  const User = this._db.Mongoose.model("user", UserSchema, "user");

  User.findByIdAndRemove(params.id, { rawResult: true }, (err, result) => {
    if (err) {
      res.status(500).json({ status: 0, message: err.message, result: null });
      return;
    }
    res.status(200).json({ status: 1, message: "ok", result });
    app.config.mongodb.close();
  });
};

module.exports = function() {
  return userDAO;
};

/* Usuario EXEMPLO
	{
		"name": "nome",
		"email": "email@email.com",
		"password": "senha"
	}
*/
