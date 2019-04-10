module.exports.registrar = function(app, req, res){

	var dados = req.body;
	var conn = app.config.mongodb;

	conn();


	/*
	var conn = app.config.mongo.mongodb();

	const dbName = 'whatsdb';
	const db = conn.database.db(dbName);

	db.connect(function (err) {
		if (err)
			res.status(500).json('ERROR CONECTION -- ' + err);
		else {
			console.log('Connected successfully to MONGODB server')
			const db = database.db(dbName);
			let collection = db.collection('campanha');
			collection.insertOne(dados, function (err, records) {
				if (err)
					res.json('ERROR INSERTONE -- ' + err);
				else
					res.json(records.insertedCount + " -- dado inserido");
			});
		}
	});
	*/

}