const {
  createComment,
  getAllComment,
  updateComment,
  deleteComment,
  getSingleComment,
} = require("../controllers/CommentController");
const protect = require("../middlewares/authMiddleware");

const express = require("express");
const routes = express.Router();

routes.post("/comment", protect, createComment);
routes.get("/getallcomments", protect, getAllComment);
routes.get("/comment/:id", protect, getSingleComment);
routes.patch("/updatecomment/:id", protect, updateComment);
routes.delete("/deletecomment/:id", protect, deleteComment);

module.exports = routes;
