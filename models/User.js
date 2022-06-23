const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  email: {
    unique: true,
    type: String,
  },
  token: String,
  salt: String,
  hash: String,
});

module.exports = User;
