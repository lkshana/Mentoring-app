/* api/user/controllers/mentor.controller.js */
const { Mentor } = require("../../../models");
const { ResponseConstants } = require("../../../constants/ResponseConstants");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ------------------------------  REGISTER  ------------------------------ */
const mentorRegister = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;   // <- include department

    // ---- validation -----------------------------------------------------
    if (!name || !email || !password || !department) {
      return res
        .status(400)
        .json({ message: ResponseConstants.User.Error.AllFieldsRequired });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: ResponseConstants.User.Error.InvalidEmail });
    }

    const existing = await Mentor.findOne({ where: { email } });
    if (existing) {
      return res
        .status(400)
        .json({ message: ResponseConstants.User.Error.ExistingUser });
    }

    // ---- create mentor --------------------------------------------------
    const hashedPassword = await bcrypt.hash(password, 10);
    const mentor = await Mentor.create({
      name,
      email,
      password: hashedPassword,
      department, // ENUM: "AI&DS" | "CSE" | "CIVIL" | "EEE" | "ECE" | "IT" | "MECH"
    });

    return res
      .status(201)
      .json({ message: ResponseConstants.User.SuccessRegistration.Mentor, mentor });
  } catch (error) {
    console.error("Error in Mentor registration:", error);
    return res
      .status(500)
      .json({ message: ResponseConstants.User.Error.InternalServerError, error });
  }
};

/* -------------------------------- LOGIN --------------------------------- */
const mentorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const mentor = await Mentor.findOne({ where: { email } });
    if (!mentor) {
      return res
        .status(401)
        .json({ message: ResponseConstants.User.Error.NotFound });
    }

    const match = await bcrypt.compare(password, mentor.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: ResponseConstants.User.Error.LoginFailed });
    }

    const token = jwt.sign(
      { id: mentor.mentor_id, name: mentor.name, email: mentor.email, role: "Mentor" },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    return res.status(200).json({
      message: ResponseConstants.User.SuccessLogin.Mentor,
      token,
      user: {
        id: mentor.mentor_id,
        name: mentor.name,
        email: mentor.email,
        role: "mentor",
      },
    });
  } catch (error) {
    console.error("Error in Mentor login:", error);
    return res
      .status(500)
      .json({ message: ResponseConstants.User.Error.InternalServerError, error });
  }
};

/* --------------------------- UPDATE PASSWORD --------------------------- */
const mentorUpdatePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const mentor = await Mentor.findOne({ where: { email } });
    if (!mentor) {
      return res
        .status(404)
        .json({ message: ResponseConstants.User.Error.NotFound });
    }

    const match = await bcrypt.compare(currentPassword, mentor.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: ResponseConstants.User.Error.LoginFailed });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await mentor.update({ password: hashedPassword });

    return res
      .status(200)
      .json({ message: ResponseConstants.User.SuccessUpdatePassword });
  } catch (error) {
    console.error("Error in Mentor update password:", error);
    return res
      .status(500)
      .json({ message: ResponseConstants.User.Error.InternalServerError, error });
  }
};

const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.findAll();
    return res.status(200).json(mentors);
  } catch (error) {
    console.error("Error in getting mentors:", error);
    return res
      .status(500)
      .json({ message: ResponseConstants.User.Error.InternalServerError, error });
  }
};

/* ----------------------------------------------------------------------- */
module.exports = {
  mentorRegister,
  mentorLogin,
  mentorUpdatePassword,
  getAllMentors,
};
