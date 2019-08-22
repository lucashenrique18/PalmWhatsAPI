module.exports.save = async (app, req, res) =>{

	const dataDisp = req.body;

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const dispatchDAO = new app.api.models.dispatchDAO(db);
			dispatchDAO.save(app, dataDisp, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findAll = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const dispatchDAO = new app.api.models.dispatchDAO(db);
			dispatchDAO.findAll(app, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findByID = async function(app, req, res){

	const dispatchId = req.params;
	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const dispatchDAO = new app.api.models.dispatchDAO(db);
			dispatchDAO.findByID(app, dispatchId, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.alterByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const dispatchDAO = new app.api.models.dispatchDAO(db, res);
			dispatchDAO.alterByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.deleteByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const dispatchDAO = new app.api.models.dispatchDAO(db, res);
			dispatchDAO.deleteByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}