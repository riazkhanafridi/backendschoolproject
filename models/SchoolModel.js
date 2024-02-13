const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  add_by: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  school_name: { type: String, required: true },
  address: { type: String },
  phone: { type: String, maxlength: 100 },
  email: { type: String },
  status: { type: Number, default: 1 },
});

const SchoolModel = mongoose.model("SchoolModel", schoolSchema);

module.exports = SchoolModel;
