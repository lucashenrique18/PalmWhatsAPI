function mailingDAO(db) {
	this._db = db;
}

mailingDAO.prototype.saveMailing = function(app, data, res){

    res.json('REGISTRO CAMPANHA REALIZADO - ' + data);

}



module.exports = function(){
	return mailingDAO;
}