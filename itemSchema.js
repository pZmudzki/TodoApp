const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  content: {
    type: String,
    // require: true,
  },
  category: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", itemSchema);
