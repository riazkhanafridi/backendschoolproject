const {
  classCreate,
  getAllClass,
  updateClass,
  deleteClass,
} = require("../controllers/ClassController");
const protect = require("../middlewares/authMiddleware");

const express = require("express");
const routes = express.Router();

routes.post("/class", classCreate);
routes.get("/getallclass", getAllClass);
routes.patch("/classupdate/:id", protect, updateClass);
routes.delete("/classdelete/:id", protect, deleteClass);

module.exports = routes;
