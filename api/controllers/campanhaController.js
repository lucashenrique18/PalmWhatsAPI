module.exports.registrar = async function(app, req, res){

	var dados = req.body;
	var db = await app.config.mongodb;

	db.Run();
	const Campanha = db.Mongoose.model('campanha', db.CampanhaSchema, 'campanha');
	const campanha1 = new Campanha({
		name: dados.titulo,
		amont: dados.quantidade   // assign the _id from the person
	});

	campanha1.save(async function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
		res.json(campanha1);
		//se quiser fechar a conexão --> await app.config.mongodb.close();
        res.end();
    });

}