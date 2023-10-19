const mongoose = require("mongoose");

// products schema ======================================================

const productsSchema = new mongoose.Schema({
  id: {
    type: String,
    index: true,
    unique: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  subcategory_id: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
  },
  long_description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  creation_date: {
    type: Number,
    timestamps: true,
  },
  discount_price: {
    type: Number,
    timestamps: true,
  },
  options: {
    type: Array,
    timestamps: true,
  },
  active: {
    type: Boolean,
  },
});

const products = mongoose.model("Products", productsSchema);

module.exports = products;
