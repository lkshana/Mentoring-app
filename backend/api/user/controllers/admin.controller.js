const { Admin } = require("../../../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminRegister = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      department,
    });
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error in admin registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email, user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin.id, name: admin.name, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        department: admin.department,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminUpdatePassword = async (req, res) => {
  try {
    console.log(req.body);
    const { email, oldPassword, newPassword } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in admin password update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// This should be connected with the routes and frontend..
const getStudentsByDepartment = async (req, res) => {
  try {
    const { department } = req.user.department;
    const students = await Student.findAll({
      where: {
        department,
      },
    });
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "Students not found" });
    }
    res.status(200).json({ students });
  } catch (error) {
    console.error("Error in fetching students by department:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
  adminUpdatePassword,
};
