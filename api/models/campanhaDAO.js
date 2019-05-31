function campaignDAO(db) {
	this._db = db;
}

campaignDAO.prototype.saveCampaign = function(app, dataCamp, res){

	const Campaign = this._db.Mongoose.model('campaign', this._db.CampaignSchema, 'campaign');

	const camp = new Campaign({
		name: dataCamp.name,
		description: dataCamp.description,
		mailings: dataCamp.mailingsId, //! aqui tem que colocar os id de mailings baseados nessa campanha
		company: dataCamp.companyId, //! aqui tem que colocar os id da empresa dessa campanha
		confDefault: dataCamp.confDefaultId, //! aqui tem que colocar os id das configurações do envio
		type: dataCamp.type,
	});

	camp.save()
		.then(() => {
			res.json('REGISTRO CAMPANHA REALIZADO - ' + camp);
			app.config.mongodb.close();
			res.end();
		})
		.catch(() => {
			res.status(500).json({ error: err.message });
            res.end();
         	return;
		})

}

campaignDAO.prototype.consultarCampanha = function(app, res){

	const Campaign = this._db.Mongoose.model('campaign', this._db.CampaignSchema, 'campaign');

	Campaign.find({}, function(err, result){
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

campaignDAO.prototype.consultarCampanhaByID = function(app, campanha, res){

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

campaignDAO.prototype.alterarCampanha = function(app, campanha, res){

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

campaignDAO.prototype.deletarCampanha = function(app, campanha, res){

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
	return campaignDAO;
}