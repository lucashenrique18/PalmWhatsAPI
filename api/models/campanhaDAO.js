function campanhaDAO(db) {
	this._db = db;
}

campanhaDAO.prototype.registrarCampanha = function(app, campanha, res){

	const Campanha = this._db.Mongoose.model('campanha', this._db.CampanhaSchema, 'campanha');
	const campanha1 = new Campanha({
		name: campanha.titulo,
		amont: campanha.quantidade
	});

	campanha1.save(async function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
		res.json(campanha1);
		app.config.mongodb.close();
		//se quiser fechar a conexão --> await app.config.mongodb.close();
        res.end();
    });

}

campanhaDAO.prototype.consultarCampanha = function(app, res){

	const Campanha = this._db.Mongoose.model('campanha', this._db.CampanhaSchema, 'campanha');

	Campanha.find({}, function(err, result){
		if(err){
			res.status(500).json({ error: err.message });
			res.end();
			return;
		}
		res.json(result);
		app.config.mongodb.close();
		res.end();
	});

}

campanhaDAO.prototype.consultarCampanhaByID = function(app, campanha, res){

	const Campanha = this._db.Mongoose.model('campanha', this._db.CampanhaSchema, 'campanha');

	Campanha.find({_id : this._db.Mongoose.Types.ObjectId(campanha.id)}, function (err, result) {
		if(err){
			res.status(500).json({ error: err.message });
			res.end();
			return;
		}
		res.json(result);
		app.config.mongodb.close();
		res.end();
	});

}

campanhaDAO.prototype.alterarCampanha = function(app, campanha, res){

	const Campanha = this._db.Mongoose.model('campanha', this._db.CampanhaSchema, 'campanha');
	const campanha1 = new Campanha({
		name: campanha.titulo,
		amont: campanha.quantidade
	});

	campanha1.save(async function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
		res.json(campanha1);
		app.config.mongodb.close();
		//se quiser fechar a conexão --> await app.config.mongodb.close();
        res.end();
    });

}

campanhaDAO.prototype.deletarCampanha = function(app, campanha, res){

	const Campanha = this._db.Mongoose.model('campanha', this._db.CampanhaSchema, 'campanha');
	const campanha1 = new Campanha({
		name: campanha.titulo,
		amont: campanha.quantidade
	});

	campanha1.save(async function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
		res.json(campanha1);
		app.config.mongodb.close();
		//se quiser fechar a conexão --> await app.config.mongodb.close();
        res.end();
    });

}


module.exports = function(){
	return campanhaDAO;
}