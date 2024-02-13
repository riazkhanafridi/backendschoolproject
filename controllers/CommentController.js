const CommentModel = require("../models/CommentModel");
const TaskSolutionModel = require("../models/TaskSolutionModel");
const UserModel = require("../models/UserModel");

// get all Comment
const getAllComment = async (req, res) => {
  try {
    const data = await CommentModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};
// get single Comment
const getSingleComment = async (req, res) => {
  try {
    const data = await CommentModel.findById(req.params.id)
      .populate({
        path: "user_id",
        select: "name email",
      })
      .populate({
        path: "task_sol_id",
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

// create Comment
const createComment = async (req, res) => {
  try {
    const data = await CommentModel.create({
      ...req.body,
      user_id: req.user?.id,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};
const updateComment = async (req, res) => {
  const updateData = req.body;
  try {
    const data = await CommentModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({ message: "update it comment successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "failed to update  comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const data = await CommentModel.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(400).json({ error: "  not found comment" });
    }
    res.status(200).json({ message: "comment delete...!" });
  } catch (error) {
    console.error("error to delete  comment", error);
    res.status(500).json({ error: "failed to delete comment" });
  }
};

module.exports = {
  createComment,
  getAllComment,
  updateComment,
  deleteComment,
  getSingleComment,
};
