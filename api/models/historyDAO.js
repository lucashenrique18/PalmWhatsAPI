function historyDAO(db) {
	this._db = db;
}


historyDAO.prototype.save= function(app, data, res){

	const HistorySchema = app.api.models.schemas.History;
	const History = this._db.Mongoose.model('history', HistorySchema, 'history');

	const hist = new History(data)

	hist.save()
		.then(() => {
			res.json('REGISTRO DE HISTÓRICO DE ENVIO REALIZADA - ' + hist);
			app.config.mongodb.close();
		})
		.catch(() => {
			res.status(500).json({ error: err.message });
		})

}

historyDAO.prototype.findAll = function(app, res){

	const HistorySchema = app.api.models.schemas.History;
	const History = this._db.Mongoose.model('history', HistorySchema, 'history');

	History.find({},
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

historyDAO.prototype.findByID = function(app, hist, res){

	const HistorySchema = app.api.models.schemas.History;
	const History = this._db.Mongoose.model('history', HistorySchema, 'history');

	History.findById({'_id': hist.id},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
			}
			res.json(result);
			app.config.mongodb.close();
		}
	);

}

historyDAO.prototype.alterByID = function(app, req, res){

	const data = req.body;
	const params = req.params;

	const HistorySchema = app.api.models.schemas.History;
	const History = this._db.Mongoose.model('history', HistorySchema, 'history');

	History.findByIdAndUpdate(params.id, data, {new:true},
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

historyDAO.prototype.deleteByID = function(app, req, res){

	const params = req.params;

	const HistorySchema = app.api.models.schemas.History;
	const History = this._db.Mongoose.model('history', HistorySchema, 'history');

	History.findByIdAndRemove(params.id, {rawResult: true},
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
	return historyDAO;
}


/* Historico de Envio EXEMPLO


*/