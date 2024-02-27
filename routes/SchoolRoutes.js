const {
  createSchools,
  getAllSchools,
  updateSchool,
  deleteSchool,
  getAllSchoolsTeachers,
  getAllSchoolsStudents,
} = require("../controllers/SchoolController");
const protect = require("../middlewares/authMiddleware");
const restrict = require("../middlewares/roleMiddleware");
const express = require("express");
const routes = express.Router();

routes.post("/school", protect, restrict("admin"), createSchools);
routes.get("/teachers", protect, restrict("admin"), getAllSchoolsTeachers);
routes.get("/students", protect, restrict("admin"), getAllSchoolsStudents);
routes.get("/getallschools", protect, restrict("admin"), getAllSchools);
routes.patch("/updateschool/:id", protect, restrict("admin"), updateSchool);
routes.delete("/deleteschool/:id", protect, restrict("admin"), deleteSchool);

module.exports = routes;

// `/teachers?school_id=${user.school_id}&&role_id=${user.role_id}`
