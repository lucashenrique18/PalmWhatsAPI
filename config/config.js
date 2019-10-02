const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    consign = require('consign');

var app = express();

// utilizando o cors
app.use(cors({origin: 'http://localhost:3000'}));

//body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


consign()
    .include('./config/mongodb.js')
    .then('./api/utils')
    .then('./api/routes')
    .then('./api/controllers')
    .then('./api/models')
    .then('./log')
    .into(app);

module.exports = app;