function queueDAO(db) {
	this._db = db;
}


queueDAO.prototype.save = function(app, data, res){

	const QueueSchema = app.api.models.schemas.Queue;
	const Queue = this._db.Mongoose.model('queue', QueueSchema, 'queue');

	const queue = new Queue(data)

	queue.save()
		.then(() => {
			res.json('REGISTRO CONFIGURAÇÃO DE ENVIO REALIZADA - ' + queue);
			app.config.mongodb.close();
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		})

}

queueDAO.prototype.findAll = function(app, res){

	const QueueSchema = app.api.models.schemas.Queue;
	const Queue = this._db.Mongoose.model('queue', QueueSchema, 'queue');

	Queue.find({},
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

queueDAO.prototype.findByID = function(app, queue, res){

	const QueueSchema = app.api.models.schemas.Queue;
	const Queue = this._db.Mongoose.model('queue', QueueSchema, 'queue');

	Queue.findById({'_id': queue.id},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
			}
			res.json(result);
			app.config.mongodb.close();
		}
	);

}

queueDAO.prototype.alterByID = function(app, req, res){

	const data = req.body;
	const params = req.params;

	const QueueSchema = app.api.models.schemas.Queue;
	const Queue = this._db.Mongoose.model('queue', QueueSchema, 'queue');

	Queue.findByIdAndUpdate(params.id, data, {new:true},
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

queueDAO.prototype.deleteByID = function(app, req, res){

	const params = req.params;

	const QueueSchema = app.api.models.schemas.Queue;
	const Queue = this._db.Mongoose.model('queue', QueueSchema, 'queue');

	Queue.findByIdAndRemove(params.id, {rawResult: true},
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
	return queueDAO;
}


/* CONFIG DE ENVIO EXEMPLO

	name: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  description: String,
  dispatch: Schema.Types.ObjectId,
  campaign: Schema.Types.ObjectId,
  status: {type: Boolean, required: true, default: true}

*/