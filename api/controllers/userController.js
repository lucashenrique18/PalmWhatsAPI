module.exports.save = async (app, req, res) =>{

	const dataDisp = req.body;

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const userDAO = new app.api.models.userDAO(db);
			userDAO.save(app, dataDisp, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findAll = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const userDAO = new app.api.models.userDAO(db);
			userDAO.findAll(app, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findByID = async function(app, req, res){

	const userId = req.params;
	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const userDAO = new app.api.models.userDAO(db);
			userDAO.findByID(app, userId, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.alterByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const userDAO = new app.api.models.userDAO(db, res);
			userDAO.alterByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.deleteByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const userDAO = new app.api.models.userDAO(db, res);
			userDAO.deleteByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}