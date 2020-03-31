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
		.catch((err) => {
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

/* !! Json de campaign de teste
{
	"name": "teste4",
	"description": "descricaqqwo sadsacampaign testewwww",
	"mailingsId": ["5cd6e340128ce08132e6f1cb","5cd6e485dd0caa2c44a682ef"],
	"companyId": "5cd6e340128ce08132e6f1cb",
	"confDefaultId": "5cd6e340128ce08132e6f1cb",
	"type": "marketing"
}
*/