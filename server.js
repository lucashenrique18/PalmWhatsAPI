var app = require('./config/config');

const port = 60540;
app.listen(port);

console.log('Servidor está está escutando http://localhost:' + port);