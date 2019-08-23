module.exports.save = async (app, req, res) =>{

	const dataCamp = req.body;

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const campaignDAO = new app.api.models.campaignDAO(db);
			campaignDAO.save(app, dataCamp, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findAll = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const campaignDAO = new app.api.models.campaignDAO(db);
			campaignDAO.findAll(app, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findByID = async function(app, req, res){

	const campaign = req.params;
	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const campaignDAO = new app.api.models.campaignDAO(db);
			campaignDAO.findByID(app, campaign, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.alterByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const campaignDAO = new app.api.models.campaignDAO(db);
			campaignDAO.alterByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.deleteByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const campaignDAO = new app.api.models.campaignDAO(db, res);
			campaignDAO.deleteByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}