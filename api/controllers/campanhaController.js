module.exports.save = async (app, req, res) =>{

	const dataCamp = req.body;

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const campaignDAO = new app.api.models.campanhaDAO(db);
			campaignDAO.save(app, dataCamp, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findAll = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const campanhaDAO = new app.api.models.campanhaDAO(db);
			campanhaDAO.findAll(app, res);
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
			const campanhaDAO = new app.api.models.campanhaDAO(db);
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