const mongoose = require("mongoose");
// Customer =============================================

const customerSchema = new mongoose.Schema({
  id: {
    type: String,
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
  valid_account: {
    type: Boolean,
  },
  active: {
    type: Boolean,
  },
});

const customers = mongoose.model("Customers", customerSchema);

module.exports = customers;
