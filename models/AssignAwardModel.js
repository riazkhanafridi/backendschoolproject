const mongoose = require("mongoose");

const assignAwardSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  award_id: { type: mongoose.Schema.Types.ObjectId, ref: "AwardModel" },
});

const AssignAwardModel = mongoose.model("AssignAwardModel", assignAwardSchema);

module.exports = AssignAwardModel;
