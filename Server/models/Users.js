const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
// users schema ======================================================

const usersSchema = new mongoose.Schema({
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
    default:true
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
},{timestamps: true});

const users = mongoose.model("Users", usersSchema);

module.exports = users;