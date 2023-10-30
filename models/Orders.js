const mongoose = require("mongoose");
// ORDERS schema ======================================================

const ordersSchema = new mongoose.Schema({
  id: {
    type: String,
    index: true,
    unique: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  order_items: {
    type: Array,
    required: true,
  },
  order_date: {
    type: Number,
    required: true,
  },
  cart_total_price: {
    type: Number,
  },
  status: {
    type: String,
  },
});

const orders = mongoose.model("Orders", ordersSchema);

module.exports = orders;

