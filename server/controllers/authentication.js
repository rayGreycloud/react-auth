const User = require('../models/User.js');

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
      return res.json({ success: true });
    });
  });
};
