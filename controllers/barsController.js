let app     = require('../server'),
    secrets = require('../secrets'),
    rp = require('request'),
    Yelp = require('yelpv3'),
    tokenHelper = require('../helpers/tokenHelper');

let barController = {

  // The arguments we're getting from the form are: group_size,
  // distance_from_location, location, and type_of_bar
  // group_size isn't being used yet
  // type_of_bar will be used as categories (string)
  // distance_from_location will be radius (int) in meters
  // location (string) will be used if latitude (decimal) and longitude (decimal) isn't
  // we can use a sort_by argument to make the randomization less random and more intelligent
  // open_now (boolean) and open_at (int) are
  getAllBars : (req, res) => {
    var yelp = new Yelp({
      app_id: secrets.yelp.client_id,
      app_secret: secrets.yelp.client_secret
    });
    var queryString = {};
    var bars = [];

    queryString.term = req.body.term;
    queryString.radius = req.body.radius;
    // Location is only used if latitude/longitude are not use
    if (req.body.longitude !== undefined && req.body.latitude !== undefined) {
      queryString.latitude = req.body.latitude;
      queryString.longitude = req.body.longitude;
    } else {
      queryString.location = req.body.location;
    }

    yelp.search({
      term: "bar",
      radius: queryString.radius,
      longitude: queryString.longitude,
      latitude: queryString.latitude,
      limit:10
    }).then(function(data) {
      data = JSON.parse(data);
      console.log(data.businesses.length);
      res.json(data);
    }).catch(function(err) {
      console.log(err);
    });

  },

  pickRandomBar: (listOfBars) => {

  }

};

module.exports = barController;
