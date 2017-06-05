let app = require('../server');

let apiController = {
  index: (req, res) => {
    res.json({
      message: 'You made it to the api!',
      documentation_url: 'https://github.com/nscalf561/angelProperties',
      base_url: 'TBD',
      endpoints: [
        {method: 'GET', path: '/api', description: 'Document available endpoints'}
      ]
    });
  }
};

module.exports = apiController;
