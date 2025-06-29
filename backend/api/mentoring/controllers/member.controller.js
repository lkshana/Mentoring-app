const { Project, ProjectMember, Student } = require("../../../models");
const { ResponseConstants } = require("../../../constants/ResponseConstants");
const {
  HttpStatusCodeConstants,
} = require("../../../constants/HttpStatusCodeConstants");

const getProjectMembers = async (req, res) => {
  try {
    const { project_id } = req.params;
    const projectMembers = await ProjectMember.findAll({
      where: { project_id },
      include: [
        {
          model: Student,
          attributes: ["id", "name", "email", "profile_picture", "department", "year"],
          as: "student",
        },
      ]
    });
    res.status(HttpStatusCodeConstants.Ok).json({
      message: ResponseConstants.Member.SuccessRetrieval,
      members: projectMembers,
    });
  } catch (error) {
    console.error("Error in retrieving project members:", error);
    res.status(HttpStatusCodeConstants.InternalServerError).json({
      message: ResponseConstants.Member.Error.InternalServerError,
      error,
    });
  }
};

const addmember = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { email } = req.body;

    const project = await Project.findByPk(project_id);
    if (!project) {
      return res.status(HttpStatusCodeConstants.NotFound).json({
        message: ResponseConstants.Member.Error.NotFound,
      });
    }

    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(HttpStatusCodeConstants.NotFound).json({
        message: ResponseConstants.Member.Error.NotFound,
      });
    }
    const student_id = student.id;
    // Check if there is a member
    const existing_proj_member = await ProjectMember.scope("deleted").findOne({
      where: {
        project_id,
        student_id,
      },
    });
    if (existing_proj_member) {
      existing_proj_member.update({ is_deleted: false });
       res.status(HttpStatusCodeConstants.Created).json({
        message: ResponseConstants.Member.SuccessCreation,
      });
    } else {
      const existing_member = await ProjectMember.findOne({
        where: { project_id, student_id },
      });
      if (!existing_member) {
        const new_member = await ProjectMember.create({ project_id, student_id });
        res.status(HttpStatusCodeConstants.Created).json({
          message: ResponseConstants.Member.SuccessCreation,
        });

      } else {
        
        res.status(HttpStatusCodeConstants.Ok).json({
          message: ResponseConstants.Member.Error.AlreadyExists,
        });
      }
    }
  } catch (error) {
    console.error("Error in adding member:", error);
    res.status(HttpStatusCodeConstants.InternalServerError).json({
      message: ResponseConstants.Member.Error.InternalServerError,
      error,
    });
  }
};

const deletemember = async (req, res) => {
  try {
    const { project_member_id } = req.params;

    const project_member = await ProjectMember.findByPk(project_member_id);

    if (!project_member) {
      return res.status(HttpStatusCodeConstants.NotFound).json({
        message: ResponseConstants.Member.Error.NotFound,
        data: { student_id, project_id },
        project_member,
      });
    }

    await project_member.update({ is_deleted: true });

    res.status(HttpStatusCodeConstants.Ok).json({
      message: ResponseConstants.Member.SuccessDeletion,
    });
  } catch (error) {
    console.error("Error in deleting member:", error);
    res.status(HttpStatusCodeConstants.InternalServerError).json({
      message: ResponseConstants.Member.Error.InternalServerError,
      error,
    });
  }
};

module.exports = { addmember, deletemember, getProjectMembers };
