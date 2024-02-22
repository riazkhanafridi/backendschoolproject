const {
  createAssignTask,
  updateAssignTask,
  deleteAssignTask,
  getAllSchoolAssignedTasks,
  getAllAssignTask,
  getAllUsersAssignedTasks,
  getSingleAssignTask,
} = require("../controllers/assignTaskController");
const protect = require("../middlewares/authMiddleware");
const restrict = require("../middlewares/roleMiddleware");
const express = require("express");
const routes = express.Router();

routes.post("/assigntask", protect, restrict("teacher"), createAssignTask);
routes.get(
  "/getallassignTask",
  protect,

  getAllAssignTask
);
routes.get(
  "/getSingleAssignTask/:id",
  protect,

  getSingleAssignTask
);
routes.get(
  "/getalluserassignTask",
  protect,

  getAllUsersAssignedTasks
);
routes.get(
  "/getallschoolassignTask/:id",
  protect,

  getAllSchoolAssignedTasks
);
routes.patch(
  "/assignTaskupdate/:id",

  protect,
  restrict("teacher"),
  updateAssignTask
);
routes.delete(
  "/assignTaskdelete/:id",
  protect,
  restrict("teacher"),
  deleteAssignTask
);

module.exports = routes;
