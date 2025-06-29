const { Student, Achievement } = require("../../../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const studentRegister = async (req, res) => {
  try {
    const { reg_no, name, email, password } = req.body;

    if (!name || !email || !password || !reg_no) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingStudent = await Student.findOne({ where: { email } });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingRegNo = await Student.findOne({ where: { reg_no } });
    if (existingRegNo) {
      return res
        .status(400)
        .json({ message: "Registration number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await Student.create({
      reg_no,
      name,
      email,
      password: hashedPassword,
    });
    const achievement = await Achievement.create({
      type: "certificate",
      student_id: student.id,
      title: "Rising Star",
      specialization: "Upscaling",
      issued_by: "MS-CIIC",
      issued_date: "2025-04-15T00:00:00.000Z",
      approved_by_placement: true,
      approved_by_department: true,
    });

    res
      .status(201)
      .json({ message: "Student registered successfully", student });
  } catch (error) {
    console.error("Error in student registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const studentBulkCreate = async (req, res) => {
  try {
    const { students } = req.body;

    const requiredFields = ["reg_no", "name", "email", "password"];
    const invalidStudents = students.filter((student) =>
      requiredFields.some((field) => !(field in student))
    );

    if (invalidStudents.length > 0) {
      return res.status(400).json({
        message:
          "All students must have the following fields: reg_no, name, email, password",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = students.filter(
      (student) => !emailRegex.test(student.email)
    );

    if (invalidEmails.length > 0) {
      return res.status(400).json({
        message: "Invalid email format for one or more students",
      });
    }

    const createdStudents = await Student.bulkCreate(students);
    res.status(201).json({ message: "Students created successfully" });
  } catch (error) {
    console.error("Error in student bulk create:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(401).json({ message: "Invalid email, user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: student.id, reg_no: student.reg_no, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: student.id,
        email: student.email,
        name: student.name,
        role: "student",
      },
    });
  } catch (error) {
    console.error("Error in student login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const studentUpdatePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(401).json({ message: "Invalid email, user not found" });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, student.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in student update password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  studentRegister,
  studentBulkCreate,
  studentLogin,
  studentUpdatePassword,
};
