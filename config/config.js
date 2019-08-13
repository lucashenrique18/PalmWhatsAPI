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
    .then('./api/routes')
    .then('./api/controllers')
    .then('./api/models')
    .then('./log')
    .into(app);

module.exports = app;