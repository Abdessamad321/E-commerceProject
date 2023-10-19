const mongoose = require("mongoose");
// users schema ======================================================

const usersSchema = new mongoose.Schema({
  id: {
    type: String,
    index: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
  },
  user_name: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  last_login: {
    type: Date,
    timestamps: true,
  },
  active: {
    type: Boolean,
  },
  refreshTokens:[{refreshTkn :{type: String}}]
},{timestamps: true});

const users = mongoose.model("Users", usersSchema);

module.exports = users;
