const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On save hook, encrypt password
userSchema.pre('save', function(next) {
  // Get access to user model
  const user = this;
  // Generate salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    // Hash password
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      // Set db password to hashed password
      user.password = hash;
      next();
    });
  });
});

// Create a model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
