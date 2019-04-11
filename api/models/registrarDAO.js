function registroDAO(connection) { 
	this._connection = connection; 
}

registroDAO.prototype.registrarCampanha = function(campanha){



}

module.exports = function(){
	return registroDAO;
}