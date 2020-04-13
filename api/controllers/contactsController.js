module.exports.insertContacts = async (app, req, res) =>{

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const mailingDAO = new app.api.models.mailingDAO(db, res);
			mailingDAO.insertContacts(app, req, res);
		})
		.catch(error => res.status(500).json("" + error));

}

module.exports.findContacts = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const mailingDAO = new app.api.models.mailingDAO(db);
			mailingDAO.findContacts(app, req, res);
		})
		.catch(error => res.status(500).json("" + error));

}

// module.exports.findByID = async function(app, req, res){

// 	const mailingId = req.params;
// 	const db = await app.config.mongodb;
// 	db.Run()
// 		.then( () => {
// 			const mailingDAO = new app.api.models.mailingDAO(db);
// 			mailingDAO.findByID(app, mailingId, res);
// 		})
// 		.catch(error => res.status(500).json(error));

// }

module.exports.alterContactByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then(() => {
      const mailingDAO = new app.api.models.mailingDAO(db, res);
			mailingDAO.alterContactById(app, req, res);
		})
		.catch(error => res.status(500).json("" + error));

}

module.exports.deleteByID = async function(app, req, res){

	const db = await app.config.mongodb;
	db.Run()
		.then( () => {
			const mailingDAO = new app.api.models.mailingDAO(db, res);
			mailingDAO.deleteByID(app, req, res);
		})
		.catch(error => res.status(500).json(error));

}