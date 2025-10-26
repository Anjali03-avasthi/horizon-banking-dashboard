const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,  // Hashed
  balance: { type: Number, default: 1000 },  // Default balance for testing
});
module.exports = mongoose.model('User', userSchema);