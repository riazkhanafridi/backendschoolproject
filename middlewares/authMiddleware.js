const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token = req.headers["token"];

  try {
    if (!token) return res.json({ message: "no token found" });
    if (token) {
      const valid = jwt.verify(token, "my-new-secrete-key-riaz-khan");

      const user = await User.findById(valid?.id);

      req.user = user;
      next();
    }
  } catch (error) {
    res.json({ message: error });
  }
};
module.exports = protect;
