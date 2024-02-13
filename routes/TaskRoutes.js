const {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
  getSingleTask,
} = require("../controllers/TaskController");
const protect = require("../middlewares/authMiddleware");
const restrict = require("../middlewares/roleMiddleware");
const express = require("express");
const routes = express.Router();

routes.post("/task", protect, restrict("teacher"), createTask);
routes.get("/getalltasks", protect, getAllTask);
routes.get("/getSingleTask/:id", protect, getSingleTask);
routes.patch("/updatetask/:id", protect, restrict("teacher"), updateTask);
routes.delete("/deletetask/:id", protect, restrict("teacher"), deleteTask);

module.exports = routes;
