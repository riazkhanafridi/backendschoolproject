const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  award: { type: String, required: true },
  level: { type: String, required: true },
  image: { type: String, required: true },
});

const AwardModel = mongoose.model("AwardModel", awardSchema);

module.exports = AwardModel;
