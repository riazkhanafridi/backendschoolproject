const RoleModel = require("../models/RoleModel");

const getAllRoles = async (req, res) => {
  try {
    const data = await RoleModel.find();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status({
      status: "fail",
      message: error,
    });
  }
};

const roleCreate = async (req, res) => {
  const { role_name } = req.body;
  try {
    const role = await RoleModel.create({
      role_name,
    });

    res.status(200).json({ message: "Role created" });
  } catch (error) {
    console.error("Error creating Role", error);
    res.status(500).json({ error: "Failed to create Role" });
  }
};

const updateRole = async (req, res) => {
  const update_data = req.body;
  try {
    const role = await RoleModel.findByIdAndUpdate(req.params.id, update_data, {
      new: true,
    });

    res.status(200).json({ message: "role updated successfully" });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: "failed to update role" });
  }
};

const deleteRole = async (req, res) => {
  try {
    const role = await RoleModel.findByIdAndDelete(req.params.id);
    if (!role) {
      res.status(400).json({ error: "role not found" });
    }
    res.status(200).json({ message: "role deleted....!" });
  } catch (error) {
    console.error("error to delete role", error);
    res.status(500).json({ error: "failed to delete role" });
  }
};

module.exports = { roleCreate, getAllRoles, updateRole, deleteRole };
