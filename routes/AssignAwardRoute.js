const {
  createAssignAward,
  getAllAssignAward,
  getSingleAssignAward,
  getUserAssignAwards,
} = require("../controllers/AssignAwardController");

const protect = require("../middlewares/authMiddleware");

const express = require("express");

const route = express.Router();

route.post("/assignaward", protect, createAssignAward);
route.get("/assignaward", protect, getAllAssignAward);
route.get("/getSingleAssignAward/:id", protect, getSingleAssignAward);
route.get("/user-Assignaward/", protect, getUserAssignAwards);

module.exports = route;
