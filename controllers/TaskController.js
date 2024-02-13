const TaskModel = require("../models/TaskModel");

const getAllTask = async (req, res) => {
  try {
    const data = await TaskModel.find();
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
const getSingleTask = async (req, res) => {
  try {
    const data = await TaskModel.findById(req.params.id);
    if (!data) {
      return res
        .status(400)
        .json({ message: `No data found with id ${req.params.id}` });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createTask = async (req, res) => {
  const body = req.body;

  try {
    const data = await TaskModel.create({
      ...body,
      created_by: req.user?.id, // Assuming user ID is stored in req.user?.id
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  const updateData = req.body;
  try {
    const task = await TaskModel.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "task updated sucesssfully........!" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "failed to update task" });
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(400).json({ error: "task not found" });
    }
    res.status(200).json({ message: "task deleted....!" });
  } catch (error) {
    console.error("error to delete task", error);
    res.status(500).json({ error: "failed to delete task" });
  }
};

module.exports = {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
  getSingleTask,
};
