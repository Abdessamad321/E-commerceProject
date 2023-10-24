const mongoose = require("mongoose");
// Customer =============================================

const customerSchema = new mongoose.Schema({
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
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  last_login: {
    type: Number,
    timestamps: true,
  },
  valid_account: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
  },
},{timestamps: true});

const customers = mongoose.model("Customers", customerSchema);

module.exports = customers;
