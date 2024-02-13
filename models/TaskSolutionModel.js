const mongoose = require("mongoose");

const taskSolutionSchema = new mongoose.Schema({
  // other fields
  comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "CommentModel" },

  std_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  ass_tsk_id: { type: mongoose.Schema.Types.ObjectId, ref: "AssignTaskModel" },
  title: String,
  description: String,
  image: String,

  evaluation: String,
  solved_at: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["SUBMITED", "APPROVED", "REJECTED"],
    default: "SUBMITED",
  },
});

const TaskSolutionModel = mongoose.model(
  "TaskSolutionModel",
  taskSolutionSchema
);

module.exports = TaskSolutionModel;
