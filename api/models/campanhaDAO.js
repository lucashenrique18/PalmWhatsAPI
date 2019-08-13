function campaignDAO(db) {
	this._db = db;
}

campaignDAO.prototype.save = function(app, data, res){

	const CampaignSchema = app.api.models.schemas.Campaign;
	const Campaign = this._db.Mongoose.model('campaign', CampaignSchema, 'campaign');

	const camp = new Campaign(data)

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

	const data = req.body;
	const params = req.params;

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

	const params = req.params;

	const CampaignSchema = app.api.models.schemas.Campaign;
	const Campaign = this._db.Mongoose.model('campaign', CampaignSchema, 'campaign');

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