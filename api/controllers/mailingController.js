module.exports.save = async (app, req, res) =>{

	var dataMail = req.body;

	var db = await app.config.mongodb;
	db.Run()
		.then( () => {
			var mailignDAO = new app.api.models.mailignDAO(db);
			mailignDAO.saveMailing(app, dataMail, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findAll = async function(app, req, res){

	var db = await app.config.mongodb;
	db.Run()
		.then( () => {
			var campanhaDAO = new app.api.models.campanhaDAO(db);
			campanhaDAO.findAll(app, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.findByID = async function(app, req, res){

	var campanha = req.params;
	var db = await app.config.mongodb;
	db.Run()
		.then( () => {
			var campanhaDAO = new app.api.models.campanhaDAO(db);
			campanhaDAO.findByID(app, campanha, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.alterByID = async function(app, req, res){

	var db = await app.config.mongodb;
	db.Run()
		.then( () => {
			var campanhaDAO = new app.api.models.campanhaDAO(db, res);
			campanhaDAO.alterByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}

module.exports.deleteByID = async function(app, req, res){

	var db = await app.config.mongodb;
	db.Run()
		.then( () => {
			var campanhaDAO = new app.api.models.campanhaDAO(db, res);
			campanhaDAO.deleteByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}