const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema)
module.exports = User;
