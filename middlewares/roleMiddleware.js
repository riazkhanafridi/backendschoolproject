const RoleModel = require("../models/RoleModel");
const UserModel = require("../models/UserModel");

const restrict = (roles) => {
  return async (req, res, next) => {
    const findUserRole = await RoleModel.findOne(req.user?.role_id);

    if (!roles.includes(findUserRole?.role_name)) {
      return res.status(403).json({ status: "fail", message: "Forbidden" });
    }

    next();
  };
};

module.exports = restrict;
