let app     = require('../server'),
    secrets = require('../secrets'),
    request = require('request');

let barController = {

  getAllBars : (req, res) => {

    // Hit yelp fusion api, /business/search with the parameters
    // locations, radius,
    var queryString = {};
    var bars = [];
    // The arguments we're getting from the form are: group_size,
      //distance_from_location, location, and type_of_bar
    // group_size isn't being used yet
    // distance_from_location will be radius in meters, so we have to convert
    //location will be used if latitude and longitude isn't

    queryString.term = req.body.term;
    queryString.raidus = req.body.radius;
    // Location is only used if latitude/longitude are not use
    if (req.body.longitude !== undefined && req.body.latitude !== undefined) {
      queryString.latitude = req.body.latitude;
      queryString.longitude = req.body.longitude;
    } else {
      queryString.location = req.body.location;
    }

    request.get({url:'https://api.yelp.com/v3/businesses/search',
      form: queryString,
      headers: {
        'Authorization': 'Bearer ' + getYelpToken()
      }}, function (err, httpResponse, body) {
        if (err) {
          return console.error("Error getting the list of bars from Yelp:", err);
        }
        // return pickRandomBar(body.businesses);
        bars = body.businesses;
        return bars;
      });


  },

  getYelpToken : (req, res) => {
    request.post({url: 'https://api.yelp.com/oauth2/token', form: {
      "grant_type": "client_credentials",
      "client_id": secrets.yelp.client_id,
      "client_secret": secrets.yelp.client_secret}},
      function (err, httpResponse, body) {
        if (err) {
          return console.error("Error refreshing Yelp token:", err);
        }
        if (body.access_token) {
          console.log("Yelp token successfully refreshed");
        } else {
          console.log("No error OR access_token present!");
        }
        return body.access_token;
      });
  },

  pickRandomBar: (listOfBars) => {

  }

};

module.exports = barController;
