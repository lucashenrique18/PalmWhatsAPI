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

module.exports = function(){
	return mailingDAO;
}