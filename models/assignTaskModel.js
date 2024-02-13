const mongoose = require("mongoose");

const assignTaskSchema = new mongoose.Schema({
  std_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: "TaskModel" },
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolModel" },
  description: { type: String },
  assigned_at: { type: Date, default: Date.now },
  status: { type: Number, default: 1 },
});

const AssignTaskModel = mongoose.model("AssignTaskModel", assignTaskSchema);

module.exports = AssignTaskModel;
