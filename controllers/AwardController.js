const AwardModel = require("../models/AwardModel");

// Create Award
createAward = async (req, res) => {
  try {
    const data = await AwardModel.create({
      ...req.body,
      image: req.file?.filename,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all Awards
getAllAward = async (req, res) => {
  try {
    const data = await AwardModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get single Award
getSingleAward = async (req, res) => {
  try {
    const data = await AwardModel.findById(req.params.id);
    if (!data)
      return res
        .status(400)
        .json({ message: "No data found with id " + req.params.id });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update Award
updateAward = async (req, res) => {
  try {
    const data = await AwardModel.findById(req.params.id);
    if (!data)
      return res
        .status(400)
        .json({ message: "No data found with id " + req.params.id });

    const updateData = await AwardModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: req.file?.filename },
      { new: true }
    );
    res.status(200).json({ message: "Data updated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete Award
deleteAward = async (req, res) => {
  try {
    const data = await AwardModel.findById(req.params.id);
    if (!data)
      return res
        .status(400)
        .json({ message: "No data found with id " + req.params.id });

    await AwardModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Data deleted" });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAward,
  deleteAward,
  getAllAward,
  getSingleAward,
  updateAward,
};
