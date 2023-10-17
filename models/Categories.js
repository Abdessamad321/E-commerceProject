const mongoose = require("mongoose");

// Categories schema  ==================================================

const categoriesSchema = new mongoose.Schema({
  id: {
    type: String,
    index: true,
    unique: true,
  },
  category_name: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});

const categories = mongoose.model("Categories", categoriesSchema);

module.exports = categories;
