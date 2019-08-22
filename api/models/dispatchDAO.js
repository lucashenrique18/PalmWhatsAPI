function dispatchDAO(db) {
	this._db = db;
}


dispatchDAO.prototype.save= function(app, data, res){

	const DispatchSchema = app.api.models.schemas.Dispatch;
	const Dispatch = this._db.Mongoose.model('dispatch', DispatchSchema, 'dispatch');

	const disp = new Dispatch(data)

	disp.save()
		.then(() => {
			res.json('REGISTRO CONFIGURAÇÃO DE ENVIO REALIZADA - ' + disp);
			app.config.mongodb.close();
		})
		.catch(() => {
			res.status(500).json({ error: err.message });
		})

}

dispatchDAO.prototype.findAll = function(app, res){

	const DispatchSchema = app.api.models.schemas.Dispatch;
	const Dispatch = this._db.Mongoose.model('dispatch', DispatchSchema, 'dispatch');

	Dispatch.find({},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
				return;
			}
			res.json(result);
			app.config.mongodb.close();
		}
	);

}

dispatchDAO.prototype.findByID = function(app, disp, res){

	const DispatchSchema = app.api.models.schemas.Dispatch;
	const Dispatch = this._db.Mongoose.model('dispatch', DispatchSchema, 'dispatch');

	Dispatch.findById({'_id': disp.id},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
			}
			res.json(result);
			app.config.mongodb.close();
		}
	);

}

dispatchDAO.prototype.alterByID = function(app, req, res){

	const data = req.body;
	const params = req.params;

	const DispatchSchema = app.api.models.schemas.Dispatch;
	const Dispatch = this._db.Mongoose.model('dispatch', DispatchSchema, 'dispatch');

	Dispatch.findByIdAndUpdate(params.id, data, {new:true},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
				return;
			}
			res.json(result);
			app.config.mongodb.close();
		}
	);

}

dispatchDAO.prototype.deleteByID = function(app, req, res){

	const params = req.params;

	const DispatchSchema = app.api.models.schemas.Dispatch;
	const Dispatch = this._db.Mongoose.model('dispatch', DispatchSchema, 'dispatch');

	Dispatch.findByIdAndRemove(params.id, {rawResult: true},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
				return;
			}
			res.json(result);
			app.config.mongodb.close();
		}
	);

}

module.exports = function(){
	return dispatchDAO;
}


/* CONFIG DE ENVIO EXEMPLO



*/