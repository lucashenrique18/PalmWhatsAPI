module.exports.save = async (app, req, res) =>{

	const dataDisp = req.body;

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const historyDAO = new app.api.models.historyDAO(db);
			historyDAO.save(app, dataDisp, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findAll = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const historyDAO = new app.api.models.historyDAO(db);
			historyDAO.findAll(app, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findByID = async function(app, req, res){

	const historyId = req.params;
	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const historyDAO = new app.api.models.historyDAO(db);
			historyDAO.findByID(app, historyId, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.alterByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const historyDAO = new app.api.models.historyDAO(db, res);
			historyDAO.alterByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.deleteByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const historyDAO = new app.api.models.historyDAO(db, res);
			historyDAO.deleteByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}