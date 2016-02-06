
/**
 * Module dependencies.
 */

var express = require('express')
  , bodyParser = require('body-parser')
  , routes = require('./routes')
  , debug = require('debug')('dwarf')
  , user = require('./routes/user')
  , issue = require('./routes/issue')
  , http = require('http');

var app = express();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.get('/users', user.list);
app.get('/issues', issue.index);
app.post('/issues', issue.create);

debug('initialized app.');
module.exports = app;
