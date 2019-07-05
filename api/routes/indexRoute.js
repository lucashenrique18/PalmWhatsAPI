module.exports = function(app){
    //!! VERBOS E ROTAS ==>
    app.get('/', function (req, res) {
        res.json({
            msg: 'Olá, estamos aqui !! \O/'
        });

    });
    app.get('/api', function (req, res) {
        res.json({
            msg: 'Olá, estamos aqui !! \O/'
        });

    });

}
