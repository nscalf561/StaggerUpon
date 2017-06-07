let express             = require('express'),
    router              = express.Router(),
    path                = require('path'),
    apiController       = require('../controllers/apiController'),
    userController      = require('../controllers/userController'),
    sessionsController  = require('../controllers/sessionsController'),
    barsController      = require('../controllers/barsController'),
    mongoose			      = require('mongoose'),
    User				        = mongoose.model('User');

// serve angular front end files from root path
router.use('/', express.static('app', { redirect:false }));

// rewrite virtual urls to angular app to enable refreshing of internal pages
router.get('*', function (req, res) {
  res.sendFile(path.resolve('public/index.html'));
});

router.route('/api')
  .get(apiController.index);

router.route('/')
  .get((req, res) => {
    res.render('home', {layout: 'index'});
  });

// Registration
router.route('/signup')
  .post(sessionsController.signup);

// route to authenticate a user
router.route('/authenticate')
  .post(sessionsController.authenticate);

router.route('/api/getAllBars')
  .post(barsController.getAllBars);

// Users
router.route('/api/users')
  .get(userController.index)
  .post(userController.createUser)
;

router.route('/api/users/:id')
  .get(userController.findUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUserById)
;

module.exports = router;
