const { Achievement, Student } = require("../../../models");

require("dotenv").config();

const createAchievement = async (req, res) => {
  try {
    const { type, student_id, title, specialization, issued_by, issued_date } = req.body;

    const achievement = await Achievement.create({
      type,
      student_id,
      title,
      specialization,
      issued_by,
      issued_date,
    });

    res
      .status(201)
      .json({ message: "Achievement created successfully", achievement });
  } catch (error) {
    console.error("Error in creating achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// While editing a new popup should open with loading the previous data
// and then the user can edit and save it again
const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      type,
      title,
      specialization,
      issued_by,
      issued_date,
    } = req.body; 
    console.log(id);

    const achievement = await Achievement.findByPk(id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    await achievement.update({
      name,
      description,
      type,
      title,
      specialization,
      issued_by,
      issued_date,
      approved_by_department: false,
      approved_by_placement: false,
    });

    res.status(200).json({ message: "Achievement updated successfully", achievement });
  } catch (error) {
    console.error("Error in updating achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findByPk(id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    await achievement.destroy();
    res.status(200).json({ message: "Achievement deleted successfully" });
  } catch (error) {
    console.error("Error in deleting achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const organizeAchievementsStudent = (achievements) => {
  const result = {};
  achievements.forEach((achievement) => {
    const type = achievement.type;
    result[type + "s"] = result[type + "s"] || [];
    result[type + "s"].push(achievement);
  });

  result.total_achievements = achievements.length;
  result.total_number_of_certificates = result.certificates?.length ?? 0;
  result.total_number_of_internships = result.internships?.length ?? 0;
  result.total_number_of_projects = result.projects?.length ?? 0;
  result.total_number_of_online_courses = result.online_courses?.length ?? 0;
  result.total_number_of_hackathons = result.hackathons?.length ?? 0;
  result.total_number_of_paper_presentations =
    result.paper_presentations?.length ?? 0;

  return result;
};

// Group achievements by student (using student.id as key)
const groupAchievementsByStudent = (achievements) => {
  const grouped = {};

  achievements.forEach((achievement) => {
    const studentInstance = achievement.achievementStudent;
    if (!studentInstance) {
      console.log("Error with this achievement",achievement); // Skip if student is undefined
    }
    const student = studentInstance.get();
    const studentId = student.id;
        
    if (!grouped[studentId]) {
      grouped[studentId] = {
        student: {
          id: student.id,
          name: student.name,
          email: student.email,
          department: student.department,
          year: student.year,
          reg_no: student.reg_no,
          profile_picture: student.profile_picture,
        },
        achievements: [],
      };
    }
    grouped[studentId].achievements.push(achievement);
  });
  var total = 0;
  var total_certificates = 0;
  var total_internships = 0;
  var total_projects = 0;
  var total_online_courses = 0;
  var total_hackathons = 0;
  var total_paper_presentations = 0;

  const result = Object.values(grouped).map((group) => {
    const organised = organizeAchievementsStudent(group.achievements);
    // console.log(organised)
    

    total += group.achievements.length;
    total_certificates += organised.certificates?.length ?? 0;
    total_internships += organised.internships?.length ?? 0;
    total_projects += organised.projects?.length ?? 0;
    total_online_courses += organised.online_courses?.length ?? 0;
    total_hackathons += organised.hackathons?.length ?? 0;
    total_paper_presentations += organised.paper_presentations?.length ?? 0;


    return {
      student: group.student,
      achievements: organised,
      total: total
    };
  });

  const stats = {
    total_achievements: total,
    total_number_of_certificates: total_certificates,
    total_number_of_internships: total_internships,
    total_number_of_projects: total_projects,
    total_number_of_online_courses: total_online_courses,
    total_number_of_hackathons: total_hackathons,
    total_number_of_paper_presentations: total_paper_presentations,
  };

  result.push(stats);

  return result;
};

const approveAchievement = async (req, res) => {
  try {
    const { id: achievement_id } = req.params;
    if (req.user.role !== "admin" && req.user.role !== "master") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const achievement = await Achievement.findByPk(achievement_id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    if (req.user.role === "master") {
      await achievement.update({ approved_by_placement: true });
      res.status(200).json({
        message: "Achievement approved by placement cell",
        achievement,
      });
    } else {
      await achievement.update({ approved_by_department: true });
      res.status(200).json({
        message: "Achievement approved by admin",
        achievement,
      });
    }
  } catch (error) {
    console.error("Error in approving achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const rejectAchievement = async (req, res) => {
  try {
    const { id: achievement_id } = req.params;
    if (req.user.role !== "admin" && req.user.role !== "master") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const achievement = await Achievement.findByPk(achievement_id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    if (req.user.role === "master") {
      await achievement.update({ approved_by_placement: false });
      res.status(200).json({
        message: "Achievement rejected by placement cell",
        achievement,
      });
    } else {
      await achievement.update({ approved_by_department: false });
      res.status(200).json({
        message: "Achievement rejected by admin",
        achievement,
      });
    }
  } catch (error) {
    console.error("Error in rejecting achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAcheivementById = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findByPk(id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.status(200).json({ achievement });
  } catch (error) {
    console.error("Error in fetching achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAcheivementByStudentId = async (req, res, call= false, student_id) => {
  try {
    const { student_id } = req.params;
    if (call) {
      student_id = req.user.id;
    }
    const achievements = await Achievement.findAll({
      where: { student_id },
    });
    if (!achievements || achievements.length === 0) {
      return res.status(404).json({ message: "Achievements not found" });
    }

    const organizedAchievements = organizeAchievementsStudent(achievements);
    if (call) {
      return organizedAchievements;
    }
    res.status(200).json({ achievements: organizedAchievements });
  } catch (error) {
    console.error("Error in fetching achievements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const getAchievementsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    // Fetch achievements joined with Students data
    const achievements = await Achievement.findAll({
      include: [
        {
          model: Student,
          as: "achievementStudent",
          attributes: ["id", "name", "email", "department", "year","reg_no"],
          where: { department }, // you might pass `department` as a variable from req.params or similar
        },
      ],
    });

    if (!achievements || achievements.length === 0) {
      return res.status(404).json({ message: "Achievements not found" });
    }
    const result = groupAchievementsByStudent(achievements);

    res.status(200).json(achievements);
  } catch (error) {
    console.error(
      "Error fetching or organizing achievements by department:",
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
};
const getStudentsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    // Fetch achievements joined with Students data
    const achievements = await Achievement.findAll({
      include: [
        {
          model: Student,
          as: "achievementStudent",
          attributes: ["id", "name", "email", "department", "year","reg_no", "profile_picture"],
          where: { department }, // you might pass `department` as a variable from req.params or similar
        },
      ],
    });

    if (!achievements || achievements.length === 0) {
      return res.status(404).json({ message: "Achievements not found" });
    }
    const result = groupAchievementsByStudent(achievements);

    res.status(200).json(result);
  } catch (error) {
    console.error(
      "Error fetching or organizing achievements by department:",
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const achievements = await Achievement.findAll({
      include: [
        {
          model: Student,
          as: "achievementStudent",
          attributes: ["id", "name", "email", "department", "year","reg_no", "profile_picture"],
          // where: { department }, // you might pass `department` as a variable from req.params or similar
        },
      ],
    });

    if (!achievements || achievements.length === 0) {
      return res.status(404).json({ message: "Achievements not found" });
    }
    const result = groupAchievementsByStudent(achievements);

    res.status(200).json(result);
  } catch (error) {
    console.error(
      "Error fetching or organizing achievements by department:",
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAchievementsByYear = async (req, res) => {
  try {
    const { year } = req.params; // Assuming year is passed as a parameter

    // Fetch achievements joined with Students data
    const achievements = await Achievement.findAll({
      include: [
        {
          model: Student,
          as: "achievementStudent",
          attributes: ["id", "name", "email", "department", "year"],
          where: { year },
        },
      ],
    });

    if (!achievements || achievements.length === 0) {
      return res.status(404).json({ message: "Achievements not found" });
    }

    const result = groupAchievementsByStudent(achievements);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching or organizing achievements by year:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAchievementsByClass = async (req, res) => {
  try {
    const { department, year } = req.params;
    // Fetch achievements joined with Students data
    const achievements = await Achievement.findAll({
      include: [
        {
          model: Student,
          as: "achievementStudent",
          attributes: ["id", "name", "email", "department"],
          where: { department, year }, // you might pass `department` and `year` as a variable from req.params or similar
        },
      ],
    });

    if (!achievements || achievements.length === 0) {
      return res.status(404).json({ message: "Achievements not found" });
    }

    const result = groupAchievementsByStudent(achievements);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching or organizing achievements by class:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//this is so error
const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll({
      include: [
        {
          model: Student,
          attributes: ["name", "email","reg_no","department","year"],
          as: "achievementStudent",
        },
      ],
    });
    // const result = groupAchievementsByStudent(achievements);

    res
      .status(200)
      .json({ message: "Achievements fetched successfully", achievements });
  } catch (error) {
    console.error("Error in fetching achievements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createAchievement,
  updateAchievement,
  deleteAchievement,
  approveAchievement,
  rejectAchievement,
  getAcheivementById,
  getAcheivementByStudentId,
  getAchievementsByDepartment,
  getAchievementsByYear,
  getAchievementsByClass,
  getAllStudents,
  getAllAchievements,
  organizeAchievementsStudent,
  getStudentsByDepartment
};
