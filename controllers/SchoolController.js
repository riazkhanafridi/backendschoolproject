const SchoolModel = require("../models/SchoolModel");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const getAllSchools = async (req, res) => {
  try {
    const data = await SchoolModel.find();
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
const getAllSchoolsTeachers = async (req, res) => {
  try {
    const data = await UserModel.find({})
      .populate("role_id")
      .select("name email");

    res.json({
      status: "success",
      data: {
        users: data.filter((dt) => dt?.role_id?.role_name === "teacher"),
      },
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};
const getAllSchoolsStudents = async (req, res) => {
  try {
    const data = await UserModel.find({})
      .populate("role_id")
      .select("name email");

    res.json({
      status: "success",
      data: {
        users: data.filter((dt) => dt?.role_id?.role_name === "student"),
      },
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};

const createSchools = async (req, res) => {
  const body = req.body;

  const { name, user_mobile_no, user_email, password, class_id, role_id } =
    req.body;

  try {
    // Validate the request body if needed (you may want to add validation logic here)

    const userEmailExists = await UserModel.exists({ email: user_email });
    if (userEmailExists) {
      return res.status(400).json({ message: "User Email already exists." });
    }

    const school = await SchoolModel.create({
      ...body,
      add_by: req.user?.id,
    });

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      role_id, //
      name,
      school_id: school.id,
      mobile_no: user_mobile_no,
      email: user_email,
      class_id: class_id,
      password: hashPassword,
    });

    // Handle response according to your needs
    res.status(200).json({ message: "School data created successfully", user });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateSchool = async (req, res) => {
  const updatedata = req.body;
  try {
    const school = await SchoolModel.findByIdAndUpdate(
      req.params.id,
      updatedata,
      {
        new: true,
      }
    );

    res.status(200).json({ message: "school updated successfully.....!" });
  } catch (error) {
    console.error("Error updating school:", error);
    res.status(500).json({ error: "failed to update school" });
  }
};
const deleteSchool = async (req, res) => {
  try {
    const school = await SchoolModel.findByIdAndDelete(req.params.id);
    if (!school) {
      res.status(400).json({ error: "school not found" });
    }
    res.status(200).json({ data: school });
  } catch (error) {
    console.error("error to delete school", error);
    res.status(500).json({ error: "failed to delete school" });
  }
};

module.exports = {
  createSchools,
  getAllSchools,
  updateSchool,
  getAllSchoolsTeachers,
  deleteSchool,
  getAllSchoolsStudents,
};
