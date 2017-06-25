let app     = require('../server'),
    secrets = require('../secrets');

let barHelper = {

  createUberDeeplink: (dropoffLat, dropoffLong, yelp_location='') => {
    let uberObj = {
      pickup: {
        latitude: dropoffLat,
        longitude: dropoffLong
      },
      formatted_address: yelp_location,
      product_id: '',       // what type of ride, pool, uberx, etc.  cant be used with pickup=my_location
      link_text: '',        // trip branding
      partner_deeplink: ''  //trip branding
    };

    let universal_deeplink = 'https://m.uber.com/ul/?client_id' +
      secrets.uber.client_id + '&action=setPickup&dropoff[latitude]=' +
      dropoffLat + '&dropoff[longitude]=' + dropoffLong + '&pickup=my_location';

    return {universal_deeplink:universal_deeplink};
  },



};

module.exports = barHelper;
