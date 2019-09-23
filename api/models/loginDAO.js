function loginDAO(db) {
	this._db = db;
}

loginDAO.prototype.findUser = async function(app, data, res){

	const UserSchema = app.api.models.schemas.User;
	const User = this._db.Mongoose.model('user', UserSchema, 'user');

	let resultado = await User.findOne({email: data.email},
		(err, result) => {
			if(err){
				res.status(500).json({error: err.message});
				return;
			}
			if(result === null){
				res.json({message: 'User is not exists'});
				return;
			}
		}
	);

	app.config.mongodb.close();
	return resultado;

}

module.exports = function(){
	return loginDAO;
}