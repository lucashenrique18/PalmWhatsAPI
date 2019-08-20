function mailingDAO(db) {
	this._db = db;
}


mailingDAO.prototype.save= function(app, data, res){

	const MailingSchema = app.api.models.schemas.Mailing;
	const Mailing = this._db.Mongoose.model('mailing', MailingSchema, 'mailing');

	const mail = new Mailing(data)

	mail.save()
		.then(() => {
			res.json('REGISTRO MAILING REALIZADO - ' + mail);
			app.config.mongodb.close();
		})
		.catch(() => {
			res.status(500).json({ error: err.message });
		})

}

mailingDAO.prototype.findAll = function(app, res){

	const MailingSchema = app.api.models.schemas.Mailing;
	const Mailing = this._db.Mongoose.model('mailing', MailingSchema, 'mailing');

	Mailing.find({},
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

mailingDAO.prototype.findByID = function(app, mail, res){

	const MailingSchema = app.api.models.schemas.Mailing;
	const Mailing = this._db.Mongoose.model('mailing', MailingSchema, 'mailing');

	Mailing.findById({'_id': mail.id},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
			}
			res.json(result);
			app.config.mongodb.close();
		}
	);

}

mailingDAO.prototype.alterByID = function(app, req, res){

	const data = req.body;
	const params = req.params;

	const MailingSchema = app.api.models.schemas.Mailing;
	const Mailing = this._db.Mongoose.model('mailing', MailingSchema, 'mailing');

	Mailing.findByIdAndUpdate(params.id, data, {new:true},
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

mailingDAO.prototype.deleteByID = function(app, req, res){

	const params = req.params;

	const MailingSchema = app.api.models.schemas.Mailing;
	const Mailing = this._db.Mongoose.model('mailing', MailingSchema, 'mailing');

	Mailing.findByIdAndRemove(params.id, {rawResult: true},
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
	return mailingDAO;
}


/* !! Exemplo de Mailing
{
	"name": "Mailing de teste",
	"contact": [
		{
			"name": "Lucas",
			"cpf": 44477245882,
			"phone": [119537216116,119537216116]
		}
	],
	"message": {
		"mTxt": "Teste envio fulano"
	},
	"campaign": "5ce87e3f234ac95f5955e784"
}
*/