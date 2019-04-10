var app = require('./config/config');

const port = 8080;
app.listen(port);

console.log('Servidor está está escutando http://localhost:' + port);