module.exports.registrar = async function(app, req, res){

	var dados = req.body;
	var db = await app.config.mongodb;

	const Story = db.Mongoose.model('Story', db.StorySchema, 'Story');
	const story1 = new Story({
		title: 'Casino Royale',
		author: 'Daniel Craig'   // assign the _id from the person
	});

	story1.save(function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(story1);
        res.end();
    });


	/*const Person = mongoose.model('Person', personSchema);

	const author = new Person({
		_id: new mongoose.Types.ObjectId(),
		name: 'Ian Fleming',
		age: 50
	});

	author.save(function(err, docs){
		if (err) return handleError(err);
		else{
			res.status(200).json(docs)
		}
	});
*/

}