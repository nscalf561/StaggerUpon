let app       = require('../server'),
    secrets   = require('../secrets'),
    Yelp      = require('yelpv3'),
    barsHelper = require('../helpers/barsHelper');

let barController = {

  // The arguments we're getting from the form are: group_size,
  // distance_from_location, location, and type_of_bar
  // group_size isn't being used yet
  // type_of_bar will be used as categories (string)
  // distance_from_location will be radius (int) in meters
  // location (string) will be used if latitude (decimal) and longitude (decimal) isn't
  // we can use a sort_by argument to make the randomization less random and more intelligent
  // open_now (boolean) and open_at (int) are
  getRandomBar : (req, res) => {
    const YELP = new Yelp({
      app_id: secrets.yelp.client_id,
      app_secret: secrets.yelp.client_secret
    });
    const METERS_PER_MILE = 1609.34;
    var queryString = {};

    queryString.term = req.body.term;
    queryString.radius = Math.round(req.body.radius * METERS_PER_MILE);
    // Location is only used if latitude/longitude are not use
    if (req.body.longitude !== undefined && req.body.latitude !== undefined) {
      queryString.latitude = req.body.latitude;
      queryString.longitude = req.body.longitude;
    } else {
      queryString.location = req.body.location;
    }

    // should give option to search by when you're going out --- open_now and open_at
    // do we want a hot_and_new tag?
    // how about a price limit?
    YELP.search({
      term: (queryString.term || "bar"), // this may be cocktail bars, or whatever
      radius: queryString.radius,
      longitude: queryString.longitude,
      latitude: queryString.latitude,
      limit:10
    }).then(function(data) {
      data = JSON.parse(data);
      // var businessesArr = Array.from(data.businesses);
      var businessesLen = data.businesses.length;
      var ranNum = Math.round(Math.random()* (businessesLen - 1) + 1);
      var selectedBar = data.businesses[ranNum];
      var bar = {
        name: selectedBar.name,
        image_url: selectedBar.image_url,
        coordinates: selectedBar.coordinates,
        location: selectedBar.location,
        distance: (selectedBar.distance * 1609.34), //this is returned in meters
        price: selectedBar.price
      };
      res.json(bar);
    }).catch(function(err) {
      console.error(err);
    });

  }

};

module.exports = barController;
