let app     = require('../server'),
    secrets = require('../secrets'),
    rp      = require('request');

let tokenHelper = {

  // We should cache this access token at some point
  getYelpToken : (callback) => {
    var options = {
      method: 'POST',
      url: 'https://api.yelp.com/oauth2/token',
      content_type: 'x-www-form-urlencoded',
      body: "grant_type=client_credentials&client_id=" + secrets.yelp.client_id + "&client_secret=" + secrets.yelp.client_secret
    };

    rp.post(options, function (err, response, body) {
      if (err) {return callback(err);}
      callback(null, JSON.parse(body).access_token);
    });

    // rp(options)
    //   .then(function(data) {
    //     console.log(JSON.parse(data).access_token);
    //     return JSON.parse(data).access_token;
    //   }).catch(function(err) {
      //   return console.error("Error refreshing Yelp token:", err);
      // });
  }
};

module.exports = tokenHelper;
