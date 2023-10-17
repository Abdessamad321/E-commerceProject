const mongoose = require("mongoose");
//Subcategories schema =========================================

const subcategoriesSchema = new mongoose.Schema({
  id: {
    type: String,
    index: true,
    unique: true,
  },
  subcategory_name: {
    type: String,
  },
  category_id: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});

const subcategories = mongoose.model("Subcategories", subcategoriesSchema);

module.exports = subcategories;
