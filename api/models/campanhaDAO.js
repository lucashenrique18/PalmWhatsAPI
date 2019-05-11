function campanhaDAO(db) {
	this._db = db;
}

campanhaDAO.prototype.registrarCampanha = function(app, dadosCampanha, res){

	const Campanha = this._db.Mongoose.model('campaignSchema', this._db.CampaignSchema, 'campaignSchema');

	console.log(dadosCampanha);

	const campanha1 = new Campanha({
		name: dadosCampanha.name,
		description: dadosCampanha.description,
		mailings: dadosCampanha.mailingsId, //! aqui tem que colocar os id de mailings baseados nessa campanha
		company: dadosCampanha.companyId, //! aqui tem que colocar os id da empresa dessa campanha
		confDefault: dadosCampanha.confDefaultId, //! aqui tem que colocar os id das configurações do envio
		type: dadosCampanha.type,
	});

	console.log(dadosCampanha);
	console.log(campanha1);

	campanha1.save(async function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
		res.json('REGISTRO CAMPANHA REALIZADO - ' + campanha1);
		app.config.mongodb.close();
        res.end();
    });

}

campanhaDAO.prototype.consultarCampanha = function(app, res){

	const Campanha = this._db.Mongoose.model('campaignSchema', this._db.CampaignSchema, 'campaignSchema');

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

	const Campanha = this._db.Mongoose.model('campaignSchema', this._db.CampaignSchema, 'campaignSchema');

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

	campanha1.save(async function (err) {//! aqui não é save é pra alterar
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
		res.json(campanha1);
		app.config.mongodb.close();
        res.end();
    });

}

campanhaDAO.prototype.deletarCampanha = function(app, campanha, res){

	const Campanha = this._db.Mongoose.model('campanha', this._db.CampanhaSchema, 'campanha');
	const campanha1 = new Campanha({
		name: campanha.titulo,
		amont: campanha.quantidade
	});

	campanha1.save(async function (err) { //! aqui não é save tbm é pra deletar
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
		res.json(campanha1);
		app.config.mongodb.close();
        res.end();
    });

}


module.exports = function(){
	return campanhaDAO;
}