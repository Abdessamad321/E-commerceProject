const mongoose = require("mongoose");
// Customer =============================================

const customerSchema = new mongoose.Schema({
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
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  last_login: {
    type: Date,
    timestamps: true,
  },
  valid_account: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true});

const customers = mongoose.model("Customers", customerSchema);

module.exports = customers;
