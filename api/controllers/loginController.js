module.exports.login = async function(app, req, res){

	const data = req.body;
	const db = await app.config.mongodb;
	db.Run()
		.then( async () => {
			const loginDAO = new app.api.models.loginDAO(db);
			console.log(loginDAO.findUser(app, data, res));
		})
    .catch(error => res.status(500).json(error));


}