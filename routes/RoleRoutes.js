const {
  roleCreate,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../controllers/RoleController");
const protect = require("../middlewares/authMiddleware");
const express = require("express");
const routes = express.Router();

routes.post("/role", protect, roleCreate);
routes.get("/getallroles", protect, getAllRoles);
routes.patch("/roleupdate/:id", protect, updateRole);
routes.delete("/roledelete/:id", protect, deleteRole);

module.exports = routes;
