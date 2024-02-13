const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SchoolModel",
    required: true,
  },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }, // Self-reference for teacher-student relationship
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoleModel",
    required: true,
  },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: "ClassModel" },
  name: { type: String, required: true },
  mobile_no: { type: String, match: /^[0-9]{10}$/ }, // Assuming a 10-digit mobile number
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  academic_year: { type: Date, default: Date.now },
  profile: { type: String },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  status: { type: Number, default: 1, enum: [0, 1] }, // Assuming status is either 0 or 1
});

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
