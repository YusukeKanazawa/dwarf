/**
 * @fileoverview issue model.
 * @author Yusuke Kanazawa
 */ 

var request = require('request');
var config = require('config');
exports.url = config.couchdb.url + '/' + config.couchdb.db;
exports.create = function(title, labels, body){
  var data = {
    "type":"issue",
    "title": title,
	"labels": labels,
	"state": "closed",
	"milestone": null,
	"created_at": "2015-10-07T16:01:18Z",
    "updated_at": "2015-10-08T13:27:53Z",
	"closed_at": null,
	"body": body
  };
  console.log(data);
  request.post({
    uri: this.url,
    body: data,
    json: true
  }, function(error, res, body){
    if (!error && res.statusCode == 201) {
      console.log(body);
    } else {
      console.log('error: '+ res.statusCode);
    }
  });
};

exports.list =  function(callback){
  var options = {
    url: this.url + '/_design/issue/_view/list',
    json: true
  }; 
  request.get(options, function(error, res, body){
	if (!error && res.statusCode == 200) {
      var result = body.rows;
	  callback(result);
    } else {
      console.log('error: ' + error);
    }
  });
};
exports.findById = function(id){};
