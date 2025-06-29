const Achievement = require("../models/Achievement");
const { Leave, OD, Student, Project } = require("../models/index");

const isAdmin = (req, res, next) => {
  // req.user is set by the auth middleware
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required.",
      currentRole: "none",
    });
  }

  // If user is authenticated but not an admin
  if (req.user.role !== "admin" && req.user.role !== "master") {
    return res.status(403).json({
      message: "Access denied. Admin only.",
      currentRole: req.user ? req.user.role : "none",
    });
  }
  next();
};

const isMaster = (req, res, next) => {
  // req.user is set by the auth middleware
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required.",
      currentRole: "none",
    });
  }

  // If user is authenticated but not an admin
  if (req.user.role !== "master") {
    return res.status(403).json({
      message: "Access denied. Master only.",
      currentRole: req.user ? req.user.role : "none",
    });
  }
  next();
};


const isAdminOrOwner  = async (req, res, next) => {
  // req.user is set by the auth middleware
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required.",
      currentRole: "none",
    });
  }
  const achievement = await Achievement.findByPk(req.params.id);
  if (!achievement) {
    return res.status(404).json({ message: "Achievement not found" });
  }
  if (req.user.role !== "admin" && req.user.role !== "master" && req.user.id !== achievement.student_id) {
    return res.status(403).json({
      message: "Access denied. Admin or owner only.",
      currentRole: req.user ? req.user.role : "none",
    });
  }
  
  next();
};

const sameDept = async (req, res, next) => {
  // req.user is set by the auth middleware
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required.",
      currentRole: "none",
    });
  }
  if (req.user.role !== "master" && req.user.department !== req.params.department) {
    console.log(req.user)
    return res.status(403).json({
      message: "Access denied. Admin or owner only.",
      currentRole: req.user ? req.user.role : "none",
    });
  }
  
  next();
};


module.exports = {
  isAdmin,
  isMaster,
  sameDept,
  isAdminOrOwner
};
