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

routes.post("/assigntask", protect, restrict("admin"), createAssignTask);
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
  restrict("admin"),
  updateAssignTask
);
routes.delete(
  "/assignTaskdelete/:id",
  protect,
  restrict("admin"),
  deleteAssignTask
);

module.exports = routes;
