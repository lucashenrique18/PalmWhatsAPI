module.exports.login = async function(app, req, res){

	const bcrypt = require('bcrypt');

	const data = req.body;
	const db = await app.config.mongodb;
	db.Run()
		.then( async () => {
			const loginDAO = new app.api.models.loginDAO(db);
			const resultado = await loginDAO.findUser(app, data, res);

			bcrypt.compare(data.password, resultado.password)
				.then(match => {
					if(match)
						res.json(resultado);
					else
						res.status(401).json({message: 'Authentication error'});
				})
				.catch(err => {
					res.status(500).json({error: err})
				})

		})
    .catch(error => res.status(500).json(error));

}