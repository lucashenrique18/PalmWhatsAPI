function nodesDAO(db) {
	this._db = db;
}


nodesDAO.prototype.save = function(app, data, res){

	const NodesSchema = app.api.models.schemas.Nodes;
	const Nodes = this._db.Mongoose.model('nodes', NodesSchema, 'nodes');

	const nodes = new Nodes(data)

	nodes.save()
		.then(() => {
			res.json('REGISTRO CONFIGURAÇÃO DE ENVIO REALIZADA - ' + nodes);
			app.config.mongodb.close();
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		})

}

nodesDAO.prototype.findAll = function(app, res){

	const NodesSchema = app.api.models.schemas.Nodes;
	const Nodes = this._db.Mongoose.model('nodes', NodesSchema, 'nodes');

	Nodes.find({},
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

nodesDAO.prototype.findByID = function(app, nodes, res){

	const NodesSchema = app.api.models.schemas.Nodes;
	const Nodes = this._db.Mongoose.model('nodes', NodesSchema, 'nodes');

	Nodes.findById({'_id': nodes.id},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
			}
			res.json(result);
			app.config.mongodb.close();
		}
	);

}

nodesDAO.prototype.alterByID = function(app, req, res){

	const data = req.body;
	const params = req.params;

	const NodesSchema = app.api.models.schemas.Nodes;
	const Nodes = this._db.Mongoose.model('nodes', NodesSchema, 'nodes');

	Nodes.findByIdAndUpdate(params.id, data, {new:true},
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

nodesDAO.prototype.deleteByID = function(app, req, res){

	const params = req.params;

	const NodesSchema = app.api.models.schemas.Nodes;
	const Nodes = this._db.Mongoose.model('nodes', NodesSchema, 'nodes');

	Nodes.findByIdAndRemove(params.id, {rawResult: true},
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
	return nodesDAO;
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