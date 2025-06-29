const {
  Project,
  Student,
  Mentor,
  Project_update,
  Report,
  Feedback,
  TeamMember,
} = require("../../../models/index");

const { ResponseConstants } = require("../../../constants/ResponseConstants");

const createProject = async (req, res) => {
  try {
    const { mentor_id, title, description, github_url } = req.body;
    const created_by = req.user.id;
    const project = await Project.create({
      mentor_id,
      created_by,
      title,
      description,
      github_url,
    });
    return res.status(200).json({
      message: ResponseConstants.Project.SuccessCreation,
      project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, github_url } = req.body;
    const updatedProject = await Project.update(
      { title, description, github_url },
      { where: { project_id: id } }
    );
    return res.status(200).json({
      message: ResponseConstants.Project.SuccessUpdate,
      updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByPk(id);

    deletedProject.is_deleted = true;

    await deletedProject.save();

    return res.status(200).json({
      message: ResponseConstants.Project.SuccessDeletion,
      deletedProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        is_deleted: 0,
      },
      include: [
        {
          model: Student,
          as: "creator",
          required: false, // include project even if no creator found
        },
        {
          model: Mentor,
          as: "mentor",
          required: false, // include project even if no mentor found
        },
        {
          model: Student,
          as: "projectMembers",
          through: { attributes: [] },
          required: false, // include project even if no members found
        },
        {
          model: Project_update,
          as: "updates",
          required: false,
        },
        {
          model: Report,
          as: "reports",
          required: false,
        },
        {
          model: Feedback,
          as: "feedbacks",
          required: false,
        },
      ],
    });

    if (!projects.length) {
      console.log("No projects found with is_deleted = 0");
    } else {
      console.log(`Found ${projects.length} projects.`);
    }

    return res.status(200).json({
      message: ResponseConstants.Project.SuccessGet,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error: error.message || error,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        {
          model: Student,
          as: "creator", // correct alias for the student who created the project
          required: false,
        },
        {
          model: Mentor,
          as: "mentor",
          required: false,
        },
       
        {
          model: Project_update,
          as: "updates",
          required: false,
        },
        {
          model: Report,
          as: "reports",
          required: false,
        },
        {
          model: Feedback,
          as: "feedbacks", // plural alias based on previous info
          required: false,
          include: [
            {
              model: Student,
              as: "student", // correct alias for the student who provided feedback
              required: false,
              attributes: [
                "id",
                "name",
                "email",
                "department",
                "year",
                "profile_picture",
              ],
            },
            {
              model: Mentor,
              as: "mentor", // correct alias for the mentor who provided feedback
              required: false,
              attributes: ["mentor_id", "name", "email", "department"],
            },
          ],
        },
      ],
    });

    if (!project) {
      return res.status(404).json({
        message: ResponseConstants.Project.Error.NotFound,
      });
    }

    return res.status(200).json({
      message: ResponseConstants.Project.SuccessGetById,
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error: error.message || error,
    });
  }
};

const getProjectByStudentId = async (req, res) => {
  try {
    const { created_by } = req.params;
    const project = await Project.findAll({
      where: { created_by },
      include: [
        {
          model: Student,
          as: "creator", // corrected alias for the student who created the project
          required: false,
        },
        {
          model: Mentor,
          as: "mentor",
          required: false,
        },
        {
          model: Student,
          as: "projectMembers", // if you want to include members as well (optional)
          through: { attributes: [] },
          required: false,
        },
        {
          model: Project_update,
          as: "updates",
          required: false,
        },
        {
          model: Report,
          as: "reports",
          required: false,
        },
        {
          model: Feedback,
          as: "feedbacks", // plural alias for feedback association
          required: false,
        },
      ],
    });

    return res.status(200).json({
      message: ResponseConstants.Project.SuccessGetById,
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error: error.message || error,
    });
  }
};


const getMentorProjects = async (req, res) => {
  try {
    console.log(req.user)
    const mentor_id  = req.user.id;
    const projects = await Project.findAll({
      where: { mentor_id },
      include: [
        {
          model: Student,
          as: "creator", // corrected alias for student who created the project
          required: false,
        },
        {
          model: Mentor,
          as: "mentor",
          required: false,
        },
        {
          model: Student,
          as: "projectMembers", // include project members if needed
          through: { attributes: [] },
          required: false,
        },
        {
          model: Project_update,
          as: "updates",
          required: false,
        },
        {
          model: Report,
          as: "reports",
          required: false,
        },
        {
          model: Feedback,
          as: "feedbacks", // plural alias for feedbacks association
          required: false,
        },
      ],
    });

    return res.status(200).json({
      message: ResponseConstants.Project.SuccessGet,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error: error.message || error,
    });
  }
};

const getProjectsByMentorId = async (req, res) => {
  try {
    const { mentor_id } = req.params;
    const projects = await Project.findAll({
      where: { mentor_id },
      include: [
        {
          model: Student,
          as: "creator", // corrected alias for student who created the project
          required: false,
        },
        {
          model: Mentor,
          as: "mentor",
          required: false,
        },
        {
          model: Student,
          as: "projectMembers", // include project members if needed
          through: { attributes: [] },
          required: false,
        },
        {
          model: Project_update,
          as: "updates",
          required: false,
        },
        {
          model: Report,
          as: "reports",
          required: false,
        },
        {
          model: Feedback,
          as: "feedbacks", // plural alias for feedbacks association
          required: false,
        },
      ],
    });

    return res.status(200).json({
      message: ResponseConstants.Project.SuccessGet,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error: error.message || error,
    });
  }
};

const getRecentProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["created_at", "DESC"]],
      limit: 5,
      include: [
        {
          model: Mentor,
          as: "mentor", // corrected alias for student who created the project
          required: false,
        },
      ],
    });
    return res.status(200).json({
      message: ResponseConstants.Project.SuccessGet,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error,
    });
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjectByStudentId,
  getProjectsByMentorId,
  getMentorProjects,
  getRecentProjects,
};
