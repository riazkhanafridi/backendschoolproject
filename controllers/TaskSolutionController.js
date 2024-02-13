const TaskSolutionModel = require("../models/TaskSolutionModel");
const CommentModel = require("../models/CommentModel");
const AssignTaskModel = require("../models/assignTaskModel");
const TaskModel = require("../models/TaskModel");
const UserModel = require("../models/UserModel");
const mongoose = require("mongoose");

const getAllTaskSolution = async (req, res) => {
  try {
    const data = await TaskSolutionModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};
const getSingleTaskSolution = async (req, res) => {
  try {
    const data = await TaskSolutionModel.findById(req.params.id)
      .populate({
        path: "comment_id",

        model: CommentModel,
      })
      .populate({
        path: "std_id",
        model: UserModel,
      })
      .populate({
        path: "ass_tsk_id",
        model: AssignTaskModel,
        populate: {
          path: "task_id",
          model: TaskModel,
        },
      });

    if (!data) {
      return res.status(400).json({
        status: "fail",
        message: "No data found with id " + req.params.id,
      });
    } else {
      return res.status(200).json({ status: "success", data });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ status: "fail", message: error.message });
  }
};
// get pending Task
const getPendingTasks = async (req, res) => {
  try {
    // Find all assigned tasks for the user
    const assignTasks = await AssignTaskModel.find({ std_id: req.user?.id });

    // Find all task solutions for the user
    const taskSolutions = await TaskSolutionModel.find({
      std_id: req.user?.id,
    });

    // Map assigned task IDs to an array
    const assignedTaskIds = assignTasks.map((task) => task._id);

    // Filter out tasks that have corresponding solutions
    const pendingTasks = assignTasks.filter(
      (task) =>
        !taskSolutions.some(
          (solution) =>
            solution.ass_tsk_id && solution.ass_tsk_id.equals(task._id)
        )
    );

    console.log(pendingTasks);

    // Return the pending tasks
    res.status(200).json(pendingTasks);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};
// get user's TaskSolution
const getUsersTaskSolution = async (req, res) => {
  try {
    const data = await TaskSolutionModel.find({ std_id: req.params?.id });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};
// get user's Rejected TaskSolution
const getUsersRejectedTaskSolution = async (req, res) => {
  try {
    const data = await TaskSolutionModel.find({
      std_id: req.params.id,
      status: "REJECTED",
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// get user's Approved TaskSolution
const getUsersApprovedTaskSolution = async (req, res) => {
  try {
    const data = await TaskSolutionModel.find({
      std_id: req.params.id,
      status: "APPROVED",
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};
const approveTaskSolution = async (req, res) => {
  const { taskSolutionId } = req.params;
  try {
    const objectId = new mongoose.Types.ObjectId(taskSolutionId);
    console.log("Received Task Solution ID:", taskSolutionId);

    const taskSolution = await TaskSolutionModel.findById(objectId);

    console.log("Found Task Solution:", taskSolution);

    if (!taskSolution) {
      console.log("Task Solution not found");
      throw new Error("Task solution not found");
    }

    taskSolution.status = "APPROVED";
    await taskSolution.save();

    console.log("Task solution approved successfully");

    res.status(200).json({ message: "Task solution approved successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const rejectTaskSolution = async (req, res) => {
  const { taskSolutionId } = req.params;
  try {
    const objectId = new mongoose.Types.ObjectId(taskSolutionId);
    console.log("Received Task Solution ID:", taskSolutionId);

    const taskSolution = await TaskSolutionModel.findById(objectId);

    console.log("Found Task Solution:", taskSolution);

    if (!taskSolution) {
      console.log("Task Solution not found");
      throw new Error("Task solution not found");
    }

    taskSolution.status = "REJECTED";
    await taskSolution.save();

    console.log("Task solution REJECTED successfully");

    res.status(200).json({ message: "Task solution REJECTED successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const submitTaskSolution = async (req, res) => {
  const { text } = req.body;

  try {
    // Assuming you have 'image' configured as the field name in Multer
    const image = req.file?.filename;

    const data = await TaskSolutionModel.create({
      std_id: req.user?.id,
      ...req.body,
      image,
    });

    const comment = await CommentModel.create({
      task_sol_id: data.id,
      user_id: req.user?.id,
      text,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

const updateSolutionTask = async (req, res) => {
  const updateData = req.body;
  try {
    const data = await TaskSolutionModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({ message: "update it successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "failed to update  solution task" });
  }
};

const deleteSolutionTask = async (req, res) => {
  try {
    const data = await TaskSolutionModel.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(400).json({ error: " solution task not found" });
    }
    res.status(200).json({ message: "solution task delete...!" });
  } catch (error) {
    console.error("error to delete  solution task", error);
    res.status(500).json({ error: "failed to delete solution task" });
  }
};

module.exports = {
  submitTaskSolution,
  getPendingTasks,
  getAllTaskSolution,
  updateSolutionTask,
  deleteSolutionTask,
  getSingleTaskSolution,
  getUsersTaskSolution,
  getUsersRejectedTaskSolution,
  getUsersApprovedTaskSolution,
  approveTaskSolution,
  rejectTaskSolution,
};
