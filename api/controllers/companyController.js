module.exports.save = async (app, req, res) =>{

	const dataComp = req.body;

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const companyDAO = new app.api.models.companyDAO(db);
			companyDAO.save(app, dataComp, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findAll = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const companyDAO = new app.api.models.companyDAO(db);
			companyDAO.findAll(app, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findByID = async function(app, req, res){

	const companyId = req.params;
	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const companyDAO = new app.api.models.companyDAO(db);
			companyDAO.findByID(app, companyId, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.alterByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const companyDAO = new app.api.models.companyDAO(db, res);
			companyDAO.alterByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.deleteByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const companyDAO = new app.api.models.companyDAO(db, res);
			companyDAO.deleteByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}