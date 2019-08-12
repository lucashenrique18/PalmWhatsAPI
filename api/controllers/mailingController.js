module.exports.save = async (app, req, res) =>{

	const dataMail = req.body;

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const mailingDAO = new app.api.models.mailingDAO(db);
			mailingDAO.saveMailing(app, dataMail, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findAll = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const mailignDAO = new app.api.models.mailingDAO(db);
			mailignDAO.findAll(app, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findByID = async function(app, req, res){

	const campanha = req.params;
	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const campanhaDAO = new app.api.models.campanhaDAO(db);
			campanhaDAO.findByID(app, campanha, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.alterByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const campanhaDAO = new app.api.models.campanhaDAO(db, res);
			campanhaDAO.alterByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.deleteByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const campanhaDAO = new app.api.models.campanhaDAO(db, res);
			campanhaDAO.deleteByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}