require('colors');

const {ERRO,ALERT,WARNING,DANGER,OK,CALL,INFO} = require('./tipoLog');

const setLog = (mensagem, tipo) => {
    let corMensagem;

    switch(tipo){
        case ERRO:
            corMensagem = `[  ${tipo.toUpperCase().bgRed}  ] ${mensagem.red}`
            break
        case ALERT:
            corMensagem = `[  ${tipo.toUpperCase().bgYellow}] ${mensagem.yellow}`
            break
        case WARNING:
            corMensagem = `[  ${tipo.toUpperCase().bgCyan}  ] ${mensagem.cyan}`
            break
        case DANGER:
            corMensagem = `[  ${tipo.toUpperCase().bgMagenda}  ] ${mensagem.magenta}`
            break
        case OK:
            corMensagem = `[  ${tipo.toUpperCase().bgGreen}  ] ${mensagem.green}`
            break
        case CALL:
            corMensagem = `[  ${tipo.toUpperCase().bgBlue}  ] ${mensagem.blue} ...`
            break
        case INFO:
            corMensagem = `[  ${tipo.toUpperCase().bgCyan}  ] ${mensagem.grey}`
            break
        default:
            corMensagem = `[  ${tipo.toUpperCase().bgBlack}  ] ${mensagem.black}`
    }

    console.log(corMensagem)

}

module.exports = {log: setLog};