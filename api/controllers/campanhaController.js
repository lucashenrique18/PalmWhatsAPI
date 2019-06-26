module.exports.save = async (app, req, res) =>{

	var dataCamp = req.body;

	req.assert('name', 'O nome da campanha é obrigatório | atributo: name').notEmpty();
	req.assert('companyId', 'É necessario o id da empresa | atributo: companyId').notEmpty();
	req.assert('type', 'O campo tipo é obrigatório e está vazio | atributo: type').notEmpty();

	const err = req.validationErrors();
	if(err){
		res.status(400).json(err)
		return
	}
	//tem q ver aqui em cima

	var db = await app.config.mongodb;
	db.Run()
		.then( () => {
			var campaignDAO = new app.api.models.campanhaDAO(db);
			campaignDAO.saveCampaign(app, dataCamp, res);
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