const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
});

const ClassModel = mongoose.model("ClassModel", classSchema);

module.exports = ClassModel;
