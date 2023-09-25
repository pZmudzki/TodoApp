const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("ItemWork", itemSchema);
module.exports = mongoose.model("ItemToday", itemSchema);
