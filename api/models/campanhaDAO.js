

function campaignDAO(db) {
	this._db = db;
}

campaignDAO.prototype.saveCampaign = function(app, data, res){

	const CampaignSchema = app.api.models.schemas.Campaign;
	const Campaign = this._db.Mongoose.model('campaign', CampaignSchema, 'campaign');

	const camp = new Campaign(data)

	// const camp = new Campaign({
	// 	name: data.name,
	// 	description: data.description,
	// 	mailings: data.mailingsId, //! aqui tem que colocar os id de mailings baseados nessa campanha
	// 	company: data.companyId, //! aqui tem que colocar os id da empresa dessa campanha
	// 	confDefault: data.confDefaultId, //! aqui tem que colocar os id das configurações do envio
	// 	type: data.type,
	// });

	camp.save()
		.then(() => {
			res.json('REGISTRO CAMPANHA REALIZADO - ' + camp);
			app.config.mongodb.close();
		})
		.catch(() => {
			res.status(500).json({ error: err.message });
		})

}

campaignDAO.prototype.findAll = function(app, res){

	const CampaignSchema = app.api.models.schemas.Campaign;
	const Campaign = this._db.Mongoose.model('campaign', CampaignSchema, 'campaign');

	Campaign.find({},
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

campaignDAO.prototype.findByID = function(app, camp, res){

	const CampaignSchema = app.api.models.schemas.Campaign;
	const Campaign = this._db.Mongoose.model('campaign', CampaignSchema, 'campaign');

	Campaign.findById({'_id': camp.id},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
			}
			res.json(result);
			app.config.mongodb.close();
		}
	);

}

campaignDAO.prototype.alterByID = function(app, req, res){

	var data = req.body;
	var params = req.params;

	const CampaignSchema = app.api.models.schemas.Campaign;
	const Campaign = this._db.Mongoose.model('campaign', CampaignSchema, 'campaign');

	Campaign.findByIdAndUpdate(params.id, data, {new:true},
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

campaignDAO.prototype.deleteByID = function(app, req, res){

	var params = req.params;

	const CampaignSchema = app.api.models.schemas.Campaign;
	const Campaign = this._db.Mongoose.model('campaign', CampaignSchema, 'campaign');

	console.log(params.id);

	Campaign.findByIdAndRemove(params.id, {rawResult: true},
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
	return campaignDAO;
}