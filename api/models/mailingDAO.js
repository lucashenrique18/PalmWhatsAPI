const mongoose = require('mongoose');

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
		})
		.catch((err) => {
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
		}
	);

}

mailingDAO.prototype.findContacts = async function(app, req, res){

	const { binded, qtd } = req.query
	const { id } = req.params

	const objetctId = mongoose.Types.ObjectId(id);

	const MailingSchema = app.api.models.schemas.Mailing;
	const Mailing = this._db.Mongoose.model('mailing', MailingSchema, 'mailing');


	const result = await Mailing.aggregate(
		[
			{$match: {"_id": objetctId}},
			{$unwind:"$contacts"},
			{$match: {"contacts.binded": binded == 'true'}},
			{$limit : parseInt(qtd)},
			{$group:{_id:'$_id', contacts:{$push:'$contacts'}}}
		]
	)
	res.json(result);

}

mailingDAO.prototype.insertContacts = function(app, req, res){

	const params = req.params;
	const data = req.body

	const MailingSchema = app.api.models.schemas.Mailing;
	const Mailing = this._db.Mongoose.model('mailing', MailingSchema, 'mailing');

	Mailing.updateOne(
		{_id: params.id},
		{$push: {contacts: data}},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
				return;
			}
			res.json(result);
		}
	)

}

mailingDAO.prototype.alterContactById = function(app, req, res){

	const data = req.body;
	const params = req.params;

	const MailingSchema = app.api.models.schemas.Mailing;
	const Mailing = this._db.Mongoose.model('mailing', MailingSchema, 'mailing');

	Mailing.updateOne(
		{_id: params.id, "contacts._id": data.idContact},
		{$set: {"contacts.$.binded": data.binded}},
		(err, result) => {
			if(err){
				res.status(500).json({ error: err.message });
				return;
			}
			res.json(result);
		}
	)

	// {
	// 	name: String,
	// 	cpf: String,
	// 	phone: { type: [Number], required: true },
	// 	binded: {
	// 		type: Boolean,
	// 		default: false
	// 	},
	// 	wchecked: {
	// 		dateChecked: Date,
	// 		verified: {
	// 			type: Boolean,
	// 			default: false
	// 		}
	// 	},
	// 	statusSend: {
	// 		type: Number,
	// 		default: 0
	// 	},
	// 	keyfield: [String]
	// }

}

mailingDAO.prototype.deleteContactById = function(app, req, res){

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
	]
	"campaign": "5ce87e3f234ac95f5955e784"
}
*/