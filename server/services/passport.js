const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const config = require('../config');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // Verify username and password
  // If verified, call done with user
  // Else call done with false
});

// Set JWT strategy options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//  Create Jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // Search for payload user id in db
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      // If found - call done with user object
      done(null, user);
    } else {
      // If not, call done with false
      done(null, false);
    }
  });
});

// Tell passport to use the Strategy
passport.use(jwtLogin);
