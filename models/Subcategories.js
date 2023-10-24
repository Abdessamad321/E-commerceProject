const mongoose = require("mongoose");
//Subcategories schema =========================================

const subcategoriesSchema = new mongoose.Schema({
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

const Subcategories = mongoose.model("Subcategories", subcategoriesSchema);

module.exports = Subcategories;
