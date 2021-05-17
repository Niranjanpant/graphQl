const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
