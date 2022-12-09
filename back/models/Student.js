const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentid: { type: Number, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
