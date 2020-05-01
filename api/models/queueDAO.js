function queueDAO(db) {
	this._db = db;
}


queueDAO.prototype.save = function(app, data, res){

	const QueueSchema = app.api.models.schemas.Queue;
	const Queue = this._db.Mongoose.model('queue', QueueSchema, 'queue');

	const queue = new Queue(data)

	queue.save()
		.then(() => {
			res.status(200).json({ status: 1, message: "ok", result: queue });
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