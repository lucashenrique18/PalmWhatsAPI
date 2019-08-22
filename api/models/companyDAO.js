function companyDAO(db) {
	this._db = db;
}


companyDAO.prototype.save= function(app, data, res){

	const CompanySchema = app.api.models.schemas.Company;
	const Company = this._db.Mongoose.model('company', CompanySchema, 'company');

	const comp = new Company(data)

	comp.save()
		.then(() => {
			res.json('REGISTRO EMPRESA REALIZADO - ' + comp);
			app.config.mongodb.close();
		})
		.catch(() => {
			res.status(500).json({ error: err.message });
		})

}

companyDAO.prototype.findAll = function(app, res){

	const CompanySchema = app.api.models.schemas.Company;
	const Company = this._db.Mongoose.model('company', CompanySchema, 'company');

	Company.find({},
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

companyDAO.prototype.findByID = function(app, comp, res){

	const CompanySchema = app.api.models.schemas.Company;
	const Company = this._db.Mongoose.model('company', CompanySchema, 'company');

	Company.findById({'_id': comp.id},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
			}
			res.json(result);
			app.config.mongodb.close();
		}
	);

}

companyDAO.prototype.alterByID = function(app, req, res){

	const data = req.body;
	const params = req.params;

	const CompanySchema = app.api.models.schemas.Company;
	const Company = this._db.Mongoose.model('company', CompanySchema, 'company');

	Company.findByIdAndUpdate(params.id, data, {new:true},
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

companyDAO.prototype.deleteByID = function(app, req, res){

	const params = req.params;

	const CompanySchema = app.api.models.schemas.Company;
	const Company = this._db.Mongoose.model('company', CompanySchema, 'company');

	Company.findByIdAndRemove(params.id, {rawResult: true},
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
	return companyDAO;
}

/* Exemplo de Company
{
	"name": "Talkeen teste",
	"description": "Teste da talkeen",
	"active": true,
	"credits": 500,
	"campaignMax": 10,
	"simultaneosSend": 1000,
	"manualSend": false
}
*/