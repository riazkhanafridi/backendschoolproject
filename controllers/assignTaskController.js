const AssignTaskModel = require("../models/assignTaskModel");
const UserModel = require("../models/UserModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const moment = require("moment");

const getAllAssignTask = async (req, res) => {
  try {
    const data = await AssignTaskModel.find()
      .populate({
        path: "std_id",
        select: "-password", // Exclude the "password" field
      })
      .populate({
        path: "task_id",
      });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};
const getAllUsersAssignedTasks = async (req, res) => {
  try {
    const data = await AssignTaskModel.find({ std_id: req.user?.id })
      .populate({
        path: "std_id",
        select: "-password", // Exclude the "password" field
      })
      .populate({
        path: "task_id",
      });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllSchoolAssignedTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await AssignTaskModel.find({
      school_id: req.params.id,
    }).populate({
      path: "task_id",
      select: "title description", // Include only the specified fields
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

const createAssignTask = async (req, res) => {
  const { class_id, task_id, school_id } = req.body;
  try {
    // First, find all users based on the provided class_id
    const users = await UserModel.find({ class_id });

    // Use Array.map to create assign tasks for each user concurrently
    await Promise.all(
      users.map(async (user) => {
        await AssignTaskModel.create({
          std_id: user._id, // Assuming _id is the user's ObjectId
          task_id,
          school_id,
        });
      })
    );

    res.status(200).json({ message: "Task assigned" });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};
const getSingleAssignTask = async (req, res) => {
  try {
    const data = await AssignTaskModel.findById(req.params.id)
      .populate("std_id", "-password") // Exclude password field
      .populate("task_id");

    if (!data) {
      return res.status(400).json({ message: "No data found" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

const updateAssignTask = async (req, res) => {
  const updateData = req.body;
  try {
    const data = await AssignTaskModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({ message: "update it successfully", data });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "failed to update  assign task" });
  }
};

const deleteAssignTask = async (req, res) => {
  try {
    const data = await AssignTaskModel.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(400).json({ error: " assign task not found" });
    }
    res.status(200).json({ message: "assign task delete...!" });
  } catch (error) {
    console.error("error to delete  assign task", error);
    res.status(500).json({ error: "failed to delete assign task" });
  }
};

module.exports = {
  createAssignTask,
  updateAssignTask,
  deleteAssignTask,
  getAllAssignTask,
  getAllUsersAssignedTasks,
  getAllSchoolAssignedTasks,
  getSingleAssignTask,
};
