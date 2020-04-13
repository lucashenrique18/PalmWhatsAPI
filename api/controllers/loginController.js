module.exports.login = async function(app, req, res){

	const bcrypt = require('bcrypt');
	const jwt = require('jsonwebtoken');

	const data = req.body;
	const db = await app.config.mongodb;

	db.Run()
		.then( async () => {
			const loginDAO = new app.api.models.loginDAO(db);
			const resultado = await loginDAO.findUser(app, data, res);

			bcrypt.compare(data.password, resultado.password)
				.then(match => {
					if(match){
						const payload = { user: data.email };
						const options = {expiresIn: '3h'};
						const secret = process.env.JWT_SECRET;
						const token = jwt.sign(payload, secret, options);
						res.json({jwt: {token: token, expiresIn: options.expiresIn}});
					}
					else
						res.status(401).json({message: 'Authentication error'});
				})
				.catch(err => {
					res.status(500).json({error: err})
				})

		})
    .catch(error => res.status(500).json(error));

}