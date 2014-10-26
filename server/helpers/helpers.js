/**
* @module helpers
*/
var queryGoogle = require('../apis/queryGoogle');
var queryInstagram = require('../apis/queryInstagram');
var queryTwitter = require('../apis/queryTwitter');
var _ = require('lodash');

/**
* Receives GET requests from /api/google
* @function
* @memberof module:helpers
* @alias exports.google
* @param {object} req Request Parameter from GET Request
* @param {object} res Response Parameter from GET Request
* @returns {json} Sends Client a JSON Object containing an Array of Google News Stories
*/
exports.google = function(req, res) {
  var query = req.query;
  query.amount = query.amount || 5;
  queryGoogle(query.query, query.location, query.amount, function(err, newsResults) {
    if (!!err) { throw 'Error: ' + err; }

    var sendBack = {
      result: 'Request Received!',
      data: newsResults
    };

    res.json(sendBack)
  });
};

/**
* Receives GET requests from /api/twitter
* @function
* @memberof module:helpers
* @alias exports.twitter
* @param {object} req Request Parameter from GET Request
* @param {object} res Response Parameter from GET Request
* @returns {json} Sends Client a JSON Object containing an Array of Tweets
*/
exports.twitterTrendingCities = function(req,res){
  queryTwitter.getAvailableTrendingCities(function(err,trendingCities){
     if(!!err){ throw 'Error: '+ err;}
    var response = {
      status:200,
      result: 'Request Received!',
      data: trendingCities
    };  
    res.end(JSON.stringify(response));  
  });
};


exports.twitter = function(req, res) {
  var query = req.query;
  queryTwitter.getAvailableTrendingCities(function(err,trendingCities){
    if(!!err){ throw 'Error: '+ err;}
    var woeid = queryTwitter.getCityId(query,trendingCities);
    if(Array.isArray(woeid)){
      queryTwitter.getClosestTrendingCity(query,function(err,data){
        //console.log(data);
        if(!!err){ 'Error: ' + err;}
        queryTwitter.getTrendingTopics(data[0]['woeid'],function(err,trendingTopics){
          if(!!err){ throw 'Error: '+err;}
          queryTwitter.getTweetsForTrendObjects(trendingTopics,function(err,tweets){        
            var response = {
              status:200,
              result: 'Request Received!',
              data: tweets
            };
            res.end(JSON.stringify(response));      
          })
        }); 
      });
    }else{
        queryTwitter.getTrendingTopics(woeid,function(err,trendingTopics){
          if(!!err){ throw 'Error: '+err;}
          queryTwitter.getTweetsForTrendObjects(trendingTopics,function(err,tweets){        
            var response = {
              status:200,
              result: 'Request Received!',
              data: tweets
            };
            res.end(JSON.stringify(response));      
          })
        });      
    }
  });
};


exports.getCityList = function(req,res){
  var result = '';
  queryTwitter.getAvailableTrendingCities(function(err,data){
    result = data;
    _.map(cityList, function(city,val,cityList){
      var woeid = queryTwitter.getCityId(city,result);
      city['woeid'] = woeid;
    }); 
    console.log(cityList);
    // _.map(cityList,function(city,index,listOfCities){
    //   queryTwitter.getTrendingTopics(city.woeid,function(err,arrayOfTrends){
    //     city['trends'] = arrayOfTrends;
    //   });
    //   var response = {
    //     status:200,
    //     result: 'Request Received!',               
    //     data:cityList
    //   };
    //   res.end(JSON.stringify(response));
    // });
  });  
}
/**
* Receives GET requests from /api/instagram
* @function
* @memberof module:helpers
* @alias exports.instagram
* @param {object} req Request Parameter from GET Request
* @param {object} res Response Parameter from GET Request
* @returns {json} Sends Client a JSON Object containing an Array of Instagram Photos
*/

exports.instagram = function(req, res) {
  var query = req.query;
  var qParams = {
    lat: query.lat,
    lng: query.lng,
    minDate: query.min_timestamp,
    maxDate: query.max_timestamp,
    distance: query.distance,
    query: query.query,
    callType: 'query' // 'query' OR 'location'
  };

     queryInstagram(qParams,function(err,photos) {
//   queryInstagram(query.lat,query.lng,query.min_timestamp,query.max_timestamp,query.distance,query.query,function(err,photos) {
    if(!!err) { throw 'Error: ' + err; }
    var response = {
      result: 'Request Received!',
      data: photos
    };
    res.json(response);
  });
};

var cityList = [
  {
    city: 'New Orleans',
    state: 'LA',
    img: 'new-orleans.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Francisco',
    state: 'CA',
    img: 'san-francisco.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'New York',
    state: 'NY',
    img: 'new-york-city.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Los Angeles',
    state: 'CA',
    img: 'los-angeles.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Minneapolis',
    state: 'MN',
    img: 'minneapolis.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Washington',
    state: 'WASHINGTON DC',
    img: 'washington-dc.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Seattle',
    state: 'WA',
    img: 'seattle.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Antonio',
    state: 'TX',
    img: 'san-antonio.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Chicago',
    state: 'IL',
    img: 'chicago.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Miami',
    state: 'FL',
    img: 'miami.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Portland',
    state: 'OR',
    img: 'portland.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Austin',
    state: 'TX',
    img: 'austin.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Diego',
    state: 'CA',
    img: 'san-diego.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'St. Louis',
    state: 'MO',
    img: 'st-louis.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Las Vegas',
    state: 'NV',
    img: 'las-vegas.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Denver',
    state: 'CO',
    img: 'denver.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'New Orleans',
    state: 'LA',
    img: 'new-orleans.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Francisco',
    state: 'CA',
    img: 'san-francisco.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'New York City',
    state: 'NY',
    img: 'new-york-city.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Los Angeles',
    state: 'CA',
    img: 'los-angeles.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Minneapolis',
    state: 'MN',
    img: 'minneapolis.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Washington D.C.',
    state: 'WASHINGTON DC',
    img: 'washington-dc.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Seattle',
    state: 'WA',
    img: 'seattle.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Antonio',
    state: 'TX',
    img: 'san-antonio.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Chicago',
    state: 'IL',
    img: 'chicago.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Miami',
    state: 'FL',
    img: 'miami.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Portland',
    state: 'OR',
    img: 'portland.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Austin',
    state: 'TX',
    img: 'austin.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Diego',
    state: 'CA',
    img: 'san-diego.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'St. Louis', 
    state: 'MO',
    img: 'st-louis.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  }
];
