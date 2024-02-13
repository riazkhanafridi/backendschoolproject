const {
  createAward,
  deleteAward,
  getAllAward,
  getSingleAward,
  updateAward,
} = require("../controllers/AwardController");
const protect = require("../middlewares/authMiddleware");
const multer = require("multer");
const express = require("express");

const route = express.Router();
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    callback(null, `img-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});
const uploadFile = multer({
  storage: storage,
});

route.get("/award", protect, getAllAward);
route.get("/award/:id", protect, getSingleAward);

route.post("/award", protect, uploadFile.single("image"), createAward);
route.put("/award/:id", protect, uploadFile.single("image"), updateAward);
route.delete("/award/:id", protect, deleteAward);

module.exports = route;
