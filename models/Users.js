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
  },
  role: {
    type: String,
  },
  user_name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Number,
    timestamps: true,
  },
  last_login: {
    type: Number,
    timestamps: true,
  },
  last_update: {
    type: Number,
    timestamps: true,
  },
  active: {
    type: Boolean,
  },
});

const users = mongoose.model("Users", usersSchema);

module.exports = users;
