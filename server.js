var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];

var express = require('express');

var logger = require('morgan');

var app = express();
var bodyParser = require('body-parser');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//api router
var api = require('./api/api');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/public'));
app.use('/api', api);


var mongoose = require('mongoose');
mongoose.connect(config.database.host);

app.listen(config.serverPort);
console.log("Running on port " + config.serverPort);

//exports for testing purposes:
module.exports = app;
