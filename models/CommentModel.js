const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  task_sol_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskSolutionModel",
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
});

const CommentModel = mongoose.model("CommentModel", commentSchema);

module.exports = CommentModel;
