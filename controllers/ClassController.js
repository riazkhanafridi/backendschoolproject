const ClassModel = require("../models/ClassModel");

const getAllClass = async (req, res) => {
  try {
    const data = await ClassModel.find();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

const classCreate = async (req, res) => {
  const { class_name } = req.body;
  try {
    const myClass = await ClassModel.create({
      class_name,
    });

    res.status(200).json({ message: "class created" });
  } catch (error) {
    console.error("Error creating class", error);
    res.status(500).json({ error: "Failed to create class" });
  }
};

const updateClass = async (req, res) => {
  const updatedata = req.body;
  try {
    const data = await ClassModel.findByIdAndUpdate(req.params.id, updatedata, {
      new: true,
    });

    res.status(200).json({ message: "update class successfully......!" });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ error: "Failed to update class" });
  }
};

const deleteClass = async (req, res) => {
  try {
    const data = await ClassModel.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(400).json({ error: "class not found" });
    }
    res.status(200).json({ message: "class deleted.....!" });
  } catch (error) {
    console.error("Error deleting class", error);
    res.status(500).json({ error: "Failed to delete class" });
  }
};

module.exports = { classCreate, getAllClass, updateClass, deleteClass };
