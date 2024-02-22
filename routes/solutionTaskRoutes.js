const {
  submitTaskSolution,

  updateSolutionTask,
  deleteSolutionTask,
  getAllTaskSolution,
  getSingleTaskSolution,
  getUsersTaskSolution,
  getUsersRejectedTaskSolution,
  getUsersApprovedTaskSolution,
  approveTaskSolution,
  rejectTaskSolution,
} = require("../controllers/TaskSolutionController");
const protect = require("../middlewares/authMiddleware");
const restrict = require("../middlewares/roleMiddleware");
const multer = require("multer");
const express = require("express");
const routes = express.Router();
const storage = multer.diskStorage({
  destination: "upload",
  filename: (req, file, callback) => {
    callback(null, `img-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});
const uploadFile = multer({
  storage: storage,
});

routes.post(
  "/assigntasksolution",
  protect,

  uploadFile.single("image"),
  submitTaskSolution
);

routes.get("/getAllTaskSolution", protect, getAllTaskSolution);
routes.get("/getSingleTaskSolution/:id", protect, getSingleTaskSolution);
routes.get("/user-task-solution/:id", protect, getUsersTaskSolution);

routes.get(
  "/rejected-task-solution/:id",
  protect,
  getUsersRejectedTaskSolution
);
routes.get(
  "/user-approved-task-solution/:id",
  protect,
  getUsersApprovedTaskSolution
);

routes.patch(
  "/approved-task-solution/:taskSolutionId",
  protect,
  approveTaskSolution
);
routes.patch(
  "/reject-task-solution/:taskSolutionId",
  protect,
  rejectTaskSolution
);

routes.patch(
  "/assignTaskupdatesolution/:id",
  protect,
  uploadFile.single("image"),
  updateSolutionTask
);

routes.delete("/assignTaskdeletesolution/:id", protect, deleteSolutionTask);

module.exports = routes;
