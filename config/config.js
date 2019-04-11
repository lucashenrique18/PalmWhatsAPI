const express = require('express'),
    bodyParser = require('body-parser'),
    consign = require('consign');

var app = express();

//body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

consign()
    .include('./config/mongodb.js')
    .then('./api/controllers')
    .then('./api/models')
    .then('./api/routes')
    .into(app);

module.exports = app;