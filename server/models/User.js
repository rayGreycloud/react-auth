const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Create a model class
const ModelClass = mongoose.model('user', UserSchema);

// Export the model
module.exports = ModelClass;
