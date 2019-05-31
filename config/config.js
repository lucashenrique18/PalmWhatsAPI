const express = require('express'),
    bodyParser = require('body-parser'),
    consign = require('consign'),
    expressValidator = require('express-validator');

var app = express();

//body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(expressValidator());

consign()
    .include('./config/mongodb.js')
    .then('./api/controllers')
    .then('./api/models')
    .then('./api/routes')
    .into(app);

module.exports = app;