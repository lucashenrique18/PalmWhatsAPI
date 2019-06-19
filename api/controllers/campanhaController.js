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

	var db = await app.config.mongodb;
	db.Run().catch(error => {
		res.status(500).json(error);
		res.end();
		return
	});
	var campaignDAO = new app.api.models.campanhaDAO(db);
	campaignDAO.saveCampaign(app, dataCamp, res);
}

module.exports.findAll = async function(app, req, res){

	var db = await app.config.mongodb;
	db.Run().catch(error => res.status(500).json(error));
	var campanhaDAO = new app.api.models.campanhaDAO(db);
	campanhaDAO.findAll(app, res);

}

module.exports.findByID = async function(app, req, res){

	var campanha = req.params;
	//tem que fazer a verificação dos dados aqui embaixo

	var db = await app.config.mongodb;
	db.Run().catch(error => res.status(500).json(error));
	var campanhaDAO = new app.api.models.campanhaDAO(db);
	campanhaDAO.findByID(app, campanha, res);

}

module.exports.alterar = async function(app, req, res){

	var campanha = req.body;

	//tem que fazer a verificação dos dados aqui embaixo

	var db = await app.config.mongodb;
	db.Run().catch(error => res.status(500).json(error));
	var campanhaDAO = new app.api.models.campanhaDAO(db, res);
	campanhaDAO.alterarCampanha(app, campanha, res);

}

module.exports.deletar = async function(app, req, res){

	var campanha = req.body;

	//tem que fazer a verificação dos dados aqui embaixo

	var db = await app.config.mongodb;

	db.Run().catch(error => res.status(500).json(error));

	var campanhaDAO = new app.api.models.campanhaDAO(db, res);

	campanhaDAO.deletarCampanha(app, campanha, res);

}