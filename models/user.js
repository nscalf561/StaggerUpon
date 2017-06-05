let mongoose  = require('mongoose'),
    bcrypt    = require('bcryptjs'),
    Schema    = mongoose.Schema;

let UserSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true //Sanitizes input of whitespace
  },
  password: {
    type: String,
    required: true
  },
  role: { //Investor or Entrepreneur
    type: String
  },
  about: {
    picture: String, //TODO how do you store pictures
    bio: String,
    markets: [String],
    education: [{
      schoolName: String,
      degree: String,
      graduationYear: String,
    }]
  },
  entrepreneurStatus: Boolean,
  investorStatus: Boolean,
  //if investor status is true
  advisorToCompanies: [String], //pointers to companies
  previousInvestments: [String], //pointers to companies
  lookingForFundingSupport: Boolean
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
        bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
        user.password = hash;
          next();
        });
    });
  } else {
      return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
      cb(null, isMatch);
  });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;
