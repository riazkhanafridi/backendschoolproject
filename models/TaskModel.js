const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolModel" },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: "ClassModel" },
  title: { type: String },
  description: { type: String },
  status: { type: Number, default: 1 },
});

const TaskModel = mongoose.model("TaskModel", taskSchema);

module.exports = TaskModel;
