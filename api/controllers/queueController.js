module.exports.save = async (app, req, res) =>{

	const dataQueue = req.body;

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const queueDAO = new app.api.models.queueDAO(db);
			queueDAO.save(app, dataQueue, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findAll = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const queueDAO = new app.api.models.queueDAO(db);
			queueDAO.findAll(app, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findByID = async function(app, req, res){

	const queueId = req.params;
	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const queueDAO = new app.api.models.queueDAO(db);
			queueDAO.findByID(app, queueId, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.alterByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const queueDAO = new app.api.models.queueDAO(db, res);
			queueDAO.alterByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.deleteByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const queueDAO = new app.api.models.queueDAO(db, res);
			queueDAO.deleteByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}