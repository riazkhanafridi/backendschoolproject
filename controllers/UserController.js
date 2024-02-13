const UserModel = require("../models/UserModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { default: mongoose } = require("mongoose");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "riazkhanafridi96@gmail.com",
    pass: "bmyw zeew nbsn ecvp",
  },
});

const getOneStudentInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })

      .select("name email")
      .populate("role_id")
      .populate("class_id")
      .populate("school_id");

    res.json({
      status: "success",
      user,
    });
  } catch (error) {
    console.error("Error:", error);

    res.json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await UserModel.find()
      .select("name email")
      .populate("role_id")
      .populate("class_id")
      .populate("school_id");

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error:", error);

    res.json({
      status: "fail",
      message: error.message,
    });
  }
};
//Assign student to a teacher
const assignStdToTeacher = async (req, res) => {
  const { teacher_id } = req.body;
  try {
    // Update the user with the specified teacher_id
    await UserModel.findByIdAndUpdate(
      { _id: req.params.id }, // Assuming the user ID is passed as a route parameter
      { teacher_id: teacher_id } // Correct field name: teacher_id
    );

    res.status(200).json({ message: "User assigned to teacher" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get students assigned to a specific teacher

const getAssignedStudents = async (req, res) => {
  try {
    // Assuming the field in your User model that stores teacher_id is named 'teacher_id'
    const assignedStudents = await UserModel.find(
      { teacher_id: req.params.id },
      { password: 0 } // Excluding password from the response
    );

    res.status(200).json({
      status: "success",
      length: assignedStudents.length,
      data: assignedStudents,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password, role_id } = req.body;
  try {
    const user = await UserModel.findOne({ email, role_id }).populate(
      "role_id"
    );
    if (!user) {
      return res.json({ status: "fail", message: "Wrong credentials" });
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.json({ status: "fail", message: "Wrong credentials" });
    }

    const id = user.id; // Retrieve the id from the user object

    const token = jwt.sign({ id }, "my-new-secrete-key-riaz-khan", {
      expiresIn: "1h",
    });

    res.status(200).json({ data: user, token });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const userCreate = async (req, res) => {
  const { name, email, password, school_id, role_id, class_id } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const userData = {
    name,
    email,
    password: hashPassword,
    school_id,
    role_id,
    class_id,
  };
  try {
    const data = await UserModel.create(userData);
    res.status(200).json({ message: "Registeration successfully done....!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.send({ Status: "User not existed" });
    }

    const token = jwt.sign({ id: user._id }, "my-new-secrete-key-riaz-khan", {
      expiresIn: "1d",
    });

    // Modify the token as needed for security reasons

    const resetLink = `http://localhost:3000/api/reset-password/${token}`;

    var mailOptions = {
      from: "riazkhanafridi96@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        return res.send({ Status: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        return res.send({ Status: "Success" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ Status: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const token = req.params.token;
  try {
    // Verify the reset token
    const userData = jwt.verify(token, "my-new-secrete-key-riaz-khan");
    console.log("userData:", userData);

    if (!userData) {
      return res.status(400).send("Invalid token");
    }

    // Find the user with the provided reset token
    const user = await UserModel.findOne({ _id: userData.id });
    console.log("user:", user);

    if (!user) {
      return res.json({ status: "fail", message: "Invalid reset token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process the request" });
  }
};
//update user

const UpdateUser = async (req, res) => {
  const updateData = req.body;
  console.log(updateData);
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "user update successfully...!" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "failed to update user" });
  }
};

//deleteuser

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(400).json({ error: "user not found" });
    }
    res.status(200).json({ message: "user deleted successfully.....!" });
  } catch (error) {
    console.error("error deleting user", error);

    res.status(500).json({ error: "failed to delete user" });
  }
};
const logOutUser = async (req, res) => {
  try {
    // Clear the "token" cookie
    res.cookie("token", null, {
      expires: new Date(0), // Set expiration to the past to immediately expire the cookie
      httpOnly: true,
    });

    // Log information about the current user
    console.log("Logging out user:");

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    // Handle any errors that may occur during the logout process
    console.error("Error during logout:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllUsers,
  getOneStudentInfo,
  userCreate,
  UpdateUser,
  deleteUser,
  loginUser,
  forgotPassword,
  resetPassword,
  assignStdToTeacher,
  getAssignedStudents,
  logOutUser,
};
