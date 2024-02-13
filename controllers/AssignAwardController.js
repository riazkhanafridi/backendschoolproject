const AssignAward = require("../models/AssignAwardModel");
const TaskSolutionModel = require("../models/TaskSolutionModel");
const mongoose = require("mongoose");

const createAssignAward = async (req, res) => {
  try {
    let award_id;

    const taskSol = await TaskSolutionModel.find({
      std_id: req.user?.id,
      status: "APPROVED",
    });
    console.log("TaskSol Length:", taskSol.length);

    if (taskSol.length >= 2) {
      award_id = "65b1fe9345523e4b46bf14f7"; // Replace with the actual ObjectId
      console.log(taskSol);
    } else if (taskSol.length >= 6) {
      award_id = "65b1fe9345523e4b46bf14f7"; // Replace with the actual ObjectId
    } else if (taskSol.length >= 10) {
      award_id = "65b1fe9345523e4b46bf14f7"; // Replace with the actual ObjectId
    }

    if (award_id) {
      await AssignAward.create({
        user_id: req.user?.id,
        award_id: new mongoose.Types.ObjectId(award_id), // Convert string to ObjectId
      });

      res.status(200).json({ message: "Congratulations! You won the award." });
    } else {
      res.status(200).json({ message: "No award won yet." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllAssignAward = async (req, res) => {
  try {
    const data = await AssignAward.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};
const getSingleAssignAward = async (req, res) => {
  try {
    const data = await AssignAward.findById(req.params.id);
    if (!data) {
      res
        .status(400)
        .json({ message: `No data found with id ${req.params.id}` });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};
const getUserAssignAwards = async (req, res) => {
  try {
    const data = await AssignAward.find({ user_id: req.user?.id });
    if (!data) {
      res
        .status(400)
        .json({ message: `No data found for user ${req.user?.id}` });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAssignAward,
  getAllAssignAward,
  getSingleAssignAward,
  getUserAssignAwards,
};
