const { Master } = require("../../../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const masterRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingMaster = await Master.findOne({ where: { email } });
    if (existingMaster) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const master = await Master.create({
      name,
      email,
      role,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Master registered successfully", master });
  } catch (error) {
    console.error("Error in Master registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const masterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const master = await Master.findOne({ where: { email } });
    if (!master) {
      return res.status(401).json({ message: "Invalid email, user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, master.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: master.id, name: master.name, email: master.email, role: "master" },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,

      user: {
        id: master.id,
        email: master.email,
        name: master.name,
        role: "master",
      },
    });
  } catch (error) {
    console.error("Error in Master login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const masterUpdatePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const master = await Master.findOne({ where: { email } });
    if (!master) {
      return res.status(404).json({ message: "Master not found" });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      master.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await master.update({ password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in Master update password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  masterRegister,
  masterLogin,
  masterUpdatePassword,
};
