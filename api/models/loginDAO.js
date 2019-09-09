function loginDAO(db) {
	this._db = db;
}

loginDAO.prototype.findUser = function(app, data, res){

	const UserSchema = app.api.models.schemas.User;
	const User = this._db.Mongoose.model('user', UserSchema, 'user');

	User.find({email: data.email, password: data.password},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
				return;
			}
      return result;
      app.config.mongodb.close();
		}
	);

}

module.exports = function(){
	return loginDAO;
}