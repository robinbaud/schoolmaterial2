const mongoose = require("mongoose");

const materielSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Material", materielSchema);
