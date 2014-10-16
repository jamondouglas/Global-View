var google = require('../apis/google');
var instagram = require('../apis/instagram');
var twitter = require('../apis/twitter');

exports.google = function(req, res) {
  var query = req.query;
  var search = query.search + ' location:' + query.location;
  var resultAmt = query.amount || 5;
  google(search, resultAmt, function(err, newsResults) {
    if (!!err) { throw 'Erorr: ' + err; }

    var sendBack = {
      response: 'Request Received!',
      results: newsResults
    }

    res.json(sendBack)
  });
};

exports.twitter = function(req, res) {
  var query = req.query;
  var response = {
    response: 'Request Received!',
    results: query
  };
  res.json(response);
};

exports.instagram = function(req, res) {
  var query = req.query;
  var response = {
    response: 'Request Received!',
    results: query
  };
  res.json(response);
};