let app     = require('../server'),
    User    = require('../models/user');

let userController = {

  //TODO this will need to move to be a session, here for testing CRUD
  createUser : (req, res) => {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    newUser.save((err) => {
      if (err) {
        res.status(500).send(); //TODO propogate error
        console.log(`There was an error creating a new user: ${err}`);
      }
      res.json({success: true, msg: 'Successfully created a new user', user: newUser});
    });
  },

  index : (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).send(); //TODO propogate errors
        console.log(`There was an error getting the index of users: ${err}`);
      }
      res.json({users: users});
    });
  },

  findUserById : (req, res) => {
    User.findOne({_id: req.params.id}, (err, user) => {
      if (err) {
        res.status(500).send(); //TODO propogate errors
        console.log(`There was an error getting the user by id: ${err}`);
      }
      res.json({user: user});
    });
  },

  updateUser : (req, res) => {
    User.findOne({_id: req.params.id}, (err, user) => {
      if (err) {
        res.status(500).send(); //TODO propgate errors
        console.log(`There was an error getting the user to update: ${err}`);
      }

      //TODO add sanitization for the updates, ie check if name is a string
      if (req.body.name) { user.name = req.body.name; }
      if (req.body.email) { user.email = req.body.email; }
      if (req.body.password) { user.password = req.body.password; } //TODO probably dont do this at all here
      User.update({_id: req.params.id}, user, (err, user) => {
        if (err) {
          res.status(500).send(); //TODO propgate error
          console.log(`There was an error updating the user: ${err}`);
        }
        res.json({user: user});
      });
    });
  },

  deleteUserById : (req, res) => {
    User.remove({_id: req.params.id}, (err) => {
      if (err) {
        res.status(500).send(); //TODO propogate errors
        console.log(`There was an error deleting the user by id (${req.params.id}): ${err}`);
      }
      res.json({message: "User deleted"});
    });
  }

};

module.exports = userController;
