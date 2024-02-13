const {
  userCreate,
  UpdateUser,
  deleteUser,
  loginUser,
  getAllUsers,
  getOneStudentInfo,
  forgotPassword,
  resetPassword,
  assignStdToTeacher,
  getAssignedStudents,
  logOutUser,
} = require("../controllers/UserController");
const protect = require("../middlewares/authMiddleware");
const restrict = require("../middlewares/roleMiddleware");

const express = require("express");

const route = express.Router();
route.post("/signup", userCreate);
route.post("/login", loginUser);
route.get("/logout", logOutUser);
route.post("/forget-password", forgotPassword);
route.post("/reset-password/:token", resetPassword);
route.patch("/users/:id/assign-teacher", assignStdToTeacher);
route.get("/getstdassign-teacher/:id", getAssignedStudents);

route.get("/getuserinfo/:id", protect, restrict("admin"), getOneStudentInfo);
route.get("/getallusers", protect, restrict("admin"), getAllUsers);
route.patch("/update/:id", protect, restrict("admin"), UpdateUser);
route.delete("/delete/:id", protect, restrict("admin"), deleteUser);

module.exports = route;
