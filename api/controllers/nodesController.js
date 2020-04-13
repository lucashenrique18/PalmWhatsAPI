module.exports.save = async (app, req, res) =>{

	const dataNodes = req.body;

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const nodesDAO = new app.api.models.nodesDAO(db);
			nodesDAO.save(app, dataNodes, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findAll = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const nodesDAO = new app.api.models.nodesDAO(db);
			nodesDAO.findAll(app, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findByID = async function(app, req, res){

	const nodesId = req.params;
	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const nodesDAO = new app.api.models.nodesDAO(db);
			nodesDAO.findByID(app, nodesId, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.alterByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const nodesDAO = new app.api.models.nodesDAO(db, res);
			nodesDAO.alterByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.deleteByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const nodesDAO = new app.api.models.nodesDAO(db, res);
			nodesDAO.deleteByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}