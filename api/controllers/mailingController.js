module.exports.save = async (app, req, res) =>{

	const dataMail = req.body;

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const mailingDAO = new app.api.models.mailingDAO(db);
			mailingDAO.save(app, dataMail, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findAll = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const mailingDAO = new app.api.models.mailingDAO(db);
			mailingDAO.findAll(app, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findByID = async function(app, req, res){

	const mailingId = req.params;
	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const mailingDAO = new app.api.models.mailingDAO(db);
			mailingDAO.findByID(app, mailingId, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.alterByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const mailingDAO = new app.api.models.mailingDAO(db, res);
			mailingDAO.alterByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.deleteByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const mailingDAO = new app.api.models.mailingDAO(db, res);
			mailingDAO.deleteByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}