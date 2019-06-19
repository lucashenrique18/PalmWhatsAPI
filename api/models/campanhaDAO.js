function campaignDAO(db) {
	this._db = db;
}

campaignDAO.prototype.saveCampaign = function(app, data, res){

	const Campaign = this._db.Mongoose.model('campaign', this._db.CampaignSchema, 'campaign');

	const camp = new Campaign({
		name: data.name,
		description: data.description,
		mailings: data.mailingsId, //! aqui tem que colocar os id de mailings baseados nessa campanha
		company: data.companyId, //! aqui tem que colocar os id da empresa dessa campanha
		confDefault: data.confDefaultId, //! aqui tem que colocar os id das configurações do envio
		type: data.type,
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

campaignDAO.prototype.findAll = function(app, res){

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

campaignDAO.prototype.findByID = function(app, camp, res){

	const Campaign = this._db.Mongoose.model('campaign', this._db.CampaignSchema, 'campaign');

	const ObjectID = this._db.Mongoose.Types.ObjectId;

	Campaign.findById({'_id': new ObjectID(camp.id)}, function (err, result) {
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

campaignDAO.prototype.alterByID = function(app, campanha, res){


}

campaignDAO.prototype.deleteByID = function(app, campanha, res){


}

module.exports = function(){
	return campaignDAO;
}