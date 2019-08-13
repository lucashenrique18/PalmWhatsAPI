module.exports = function(app){
    //!! VERBOS E ROTAS ==>
    app.get('/', function (req, res) {
        res.json({
            status: 'Server is running !! \O/'
        });

    });
    app.get('/api', function (req, res) {
        res.json({
            status: 'Server is running  !! \O/'
        });

    });

}
