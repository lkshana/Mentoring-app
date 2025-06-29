const { Admin, Student, Achievement, Master } = require("../../../models");
const {
  organizeAchievementsStudent,
} = require("../../portfolio/controllers/achievement.controller");
const { Op, literal } = require("sequelize");

const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.user.id,
      },
    });
    const achievements = await Achievement.findAll({
      where: {
        student_id: req.user.id,
      },
    });

    student.dataValues.achievements = organizeAchievementsStudent(achievements); // Add achievements
    res.status(200).json({
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStudentProfileAdmin = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.id,
      },
    });
    const achievements = await Achievement.findAll({
      where: {
        student_id: req.params.id,
      },
    });

    student.dataValues.achievements = organizeAchievementsStudent(achievements); // Add achievements
    res.status(200).json({
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        id: req.user.id,
      },
    });

    const students = await Student.findAll({
      where: {
        department: admin.department,
      },
      attributes: [
        "id",
        "name",
        "year",
        "section",
        "reg_no",
        "email",
        "profile_picture",
      ],
      include: [
        {
          model: Achievement,
          as: "studentAchievements",
        },
      ],
    });

    const not_approved_achievements = await Achievement.findAll({
      order: [["issued_date", "DESC"]],
      where: {
        approved_by_department: false,
      },
      include: [
        {
          model: Student,
          as: "achievementStudent",
          attributes: ["id", "name", "email", "department"],
          where: { department: admin.department }, // you might pass `department` as a variable from req.params or similar
        },
      ],
    });

    var all_achievements = 0;

    students.forEach((student) => {
      student.dataValues.total_achievements =
        student.studentAchievements.length;
      all_achievements += student.studentAchievements.length;
    });

    students.sort(
      (a, b) =>
        b.dataValues.total_achievements - a.dataValues.total_achievements
    );

    admin.dataValues.achievements = all_achievements;
    admin.dataValues.not_approved_achievements =
      not_approved_achievements.length;
    admin.dataValues.approved_achievements =
      all_achievements - not_approved_achievements.length;
    const top_students = students.slice(0, 5);
    const recent_achievements = not_approved_achievements.slice(0, 5);

    res.status(200).json({
      admin,
      top_students,
      recent_achievements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMasterProfile = async (req, res) => {
  try {
    const master = await Master.findOne({
      where: {
        id: req.user.id,
      },
    });

    const students = await Student.findAll({
      attributes: [
        "id",
        "name",
        "year",
        "department",
        "section",
        "reg_no",
        "email",
        "profile_picture",
      ],
      include: [
        {
          model: Achievement,
          as: "studentAchievements",
        },
      ],
    });

    const not_approved_achievements = await Achievement.findAll({
      order: [["issued_date", "DESC"]],
      where: {
        [Op.or]: [
          { approved_by_department: false },
          { approved_by_placement: false },
        ],
      },
      include: [
        {
          model: Student,
          as: "achievementStudent",
          attributes: ["id", "name", "email", "department"],
        },
      ],
    });

    var all_achievements = 0;

    students.forEach((student) => {
      student.dataValues.total_achievements =
        student.studentAchievements.length;
      all_achievements += student.studentAchievements.length;
    });

    students.sort(
      (a, b) =>
        b.dataValues.total_achievements - a.dataValues.total_achievements
    );

    master.dataValues.achievements = all_achievements;
    master.dataValues.not_approved_achievements =
      not_approved_achievements.length;
    master.dataValues.approved_achievements =
      all_achievements - not_approved_achievements.length;
    const top_students = students.slice(0, 20);
    const recent_achievements = not_approved_achievements.slice(0, 20);

    res.status(200).json({
      master,
      top_students,
      recent_achievements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateStudentProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const {
      name,
      gender,
      fathers_name,
      date_of_birth,
      residential_address,
      mobile,
      parents_mobile_no,
      aadhar_card_no,
      department,
      year,
      section,
      cgpa,
      bio,
      portfolio,
      github_profile,
      linkedin_profile,
      profile_picture,
    } = req.body;

    const student = await Student.findOne({
      where: {
        id,
      },
    });
    student.name = name;
    student.gender = gender;
    student.fathers_name = fathers_name;
    student.date_of_birth = date_of_birth;
    student.residential_address = residential_address;
    student.mobile = mobile;
    student.parents_mobile_no = parents_mobile_no;
    student.aadhar_card_no = aadhar_card_no;
    student.department = department;
    student.year = year;
    student.section = section;
    student.cgpa = cgpa;
    student.bio = bio;
    student.portfolio = portfolio;
    student.github_profile = github_profile;
    student.linkedin_profile = linkedin_profile;
    student.profile_picture = profile_picture;

    await student.save();

    res.status(200).json({
      message: "Student profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { department } = req.body;

    const admin = await Admin.findOne({
      where: {
        id,
      },
    });
    admin.department = department;
    await admin.save();

    res.status(200).json({
      message: "Admin profile updated successfully",
    });
  } catch (error) {
    console.error({ message: "Error updating admin profile: ", error });
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getStudentProfile,
  getStudentProfileAdmin,
  getAdminProfile,
  getMasterProfile,
  updateStudentProfile,
  updateAdminProfile,
};
