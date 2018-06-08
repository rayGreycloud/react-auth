const jwt = require('jwt-simple');
const User = require('../models/User.js');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();

  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp
    },
    config.secret
  );
}

exports.signin = function(req, res, next) {
  // User already verified - send token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // input verification
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'Both email and password are required' });
  }

  // Look for user with given email
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    // If found, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    // If not found, create user
    const user = new User({
      email: email,
      password: password
    });
    // Save to db
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      // Respond to request
      return res.json({ token: tokenForUser(user) });
    });
  });
};
