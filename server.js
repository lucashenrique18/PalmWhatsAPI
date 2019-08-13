var app = require('./config/config');

const log = app.log.setColors.log;
const {ERRO,ALERT,WARNING,DANGER,RUN,CALL,INFO} = app.log.tipoLog;

const port = process.env.PORT || 10101;

log(`Alocando porta ${port} para escuta do app`, CALL);

app.listen(port, (err) => {
    if(err){
        log(`Servidor não conseguiu alocar porta ${port} ---- ${err}`, ERRO)
        return;
    }
    log(`${port} alocada para o app`, RUN)
    log('Servidor está está escutando http://localhost:' + port, INFO);
})