module.exports.registrar = async function(app, req, res){

	var campanha = req.body;
	//tem que fazer a verificação dos dados aqui embaixo

	var db = await app.config.mongodb;
	db.Run().catch(error => res.status(500).json(error));
	var campanhaDAO = new app.api.models.campanhaDAO(db, res);
	campanhaDAO.registrarCampanha(app, campanha, res);

}

module.exports.consultar = async function(app, req, res){

	//tem que fazer a verificação dos dados aqui embaixo

	var db = await app.config.mongodb;
	db.Run().catch(error => res.status(500).json(error));
	var campanhaDAO = new app.api.models.campanhaDAO(db, res);
	campanhaDAO.consultarCampanha(app, res);

}

module.exports.consultarID = async function(app, req, res){

	var campanha = req.params;
	//tem que fazer a verificação dos dados aqui embaixo

	var db = await app.config.mongodb;
	db.Run().catch(error => res.status(500).json(error));
	var campanhaDAO = new app.api.models.campanhaDAO(db, res);
	campanhaDAO.consultarCampanhaByID(app, campanha, res);

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