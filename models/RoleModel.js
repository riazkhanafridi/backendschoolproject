const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role_name: { type: String, required: true, unique: true },
  status: { type: Number, default: 1 },
});

const RoleModel = mongoose.model("RoleModel", roleSchema);

module.exports = RoleModel;
