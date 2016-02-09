/**
 * http://usejsdoc.org/
 */
var issues = require('../models/issues');
exports.index = function(req, res) {
	// if (req.accepts('text/html')) {
	// res.contentType('text/html');
	// res.send('<!DOCTYPE HTML><html><body>BODY</body></html>');
	// } else {
	
	issues.list(function(body){
		res.contentType('application/json');
		res.send(body);
	});
	
	// }
};

exports.create = function(req, res) {
  if (req.contentType == 'application/x-www-form-urlencoded'){
		/**
		 * @todo
		 */
  }else{
    var body = req.body;
    console.log(body);
    issues.create(body.title, body.labels, body.body);
    res.sendStatus(201);
  }
};