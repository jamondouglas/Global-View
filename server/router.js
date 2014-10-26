var helpers = require('./helpers/helpers');

exports.apiRouter = function(app) {

  app.get('/twitter', helpers.twitter);

  app.get('/twitterTrendingCities', helpers.twitterTrendingCities);

  app.get('/getCityList', helpers.getCityList);

  app.get('/googlenews', helpers.google);

  app.get('/instagram', helpers.instagram);
};