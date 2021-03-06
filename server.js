const app = require('./config/config');

const log = app.log.setColors.log;
const {ERRO, OK, CALL, INFO} = app.log.tipoLog;

const port = process.env.PORT || process.env.APPPORT || 10101;

log(`Alocando porta ${port} para escuta do app`, CALL);

app.listen(port, (err) => {
    if(err){
        log(`Servidor não conseguiu alocar porta ${port} ---- ${err}`, ERRO)
        return;
    }
    log(`${port} alocada para o app`, OK)
    log('Servidor está está escutando http://localhost:' + port, INFO);
})