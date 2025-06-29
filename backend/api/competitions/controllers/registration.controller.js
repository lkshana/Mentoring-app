const {
  Student,
  Event,
  Registration,
  Admin,
  Mentor
} = require("../../../models");

const { ResponseConstants } = require("../../../constants/ResponseConstants");

const registerEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { updates, idea_title, idea_description, members, mentor_id } =
      req.body;

    const event = await Event.findByPk(event_id);

    if (!event) {
      return res.status(404).json({
        message: ResponseConstants.Event.Error.NotFound,
      });
    }

    const student = await Student.findByPk(req.user.id);

    if (!student) {
      return res.status(404).json({
        message: ResponseConstants.User.Error.NotFound,
      });
    }

    const mentor = await Mentor.findByPk(mentor_id);

    if (!mentor) {
      return res.status(404).json({
        message: ResponseConstants.Registration.Error.MentorNotFound,
      });
    }

    //Register for a event
    const registration = await Registration.create({
      event_id: event.id,
      team_lead_id: student.id,
      mentor_id,
      updates,
      idea_title,
      idea_description,
    });
    

    return res.status(200).json({
      message: ResponseConstants.Registration.SuccessRegistration,
      registration,
    });
  } catch (error) {
    console.error("Error in Registration:", error);
    return res.status(500).json({
      message: ResponseConstants.Registration.Error.InternalServerError,
      error,
    });
  }
};

const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { updates, idea_title, idea_description, mentor_id } = req.body;

    const registration = await Registration.findByPk(id);

    if (!registration) {
      return res.status(404).json({
        message: ResponseConstants.Registration.Error.NotFound,
      });
    }

    await registration.update({
      mentor_id,
      updates,
      idea_title,
      idea_description,
    });

    return res.status(200).json({
      message: ResponseConstants.Registration.SuccessUpdate,
      registration,
    });
  } catch (error) {
    console.error("Error updating registration:", error);
    return res.status(500).json({
      message: ResponseConstants.Registration.Error.InternalServerError,
      error,
    });
  }
};



const getRegistrationsAdmin = async (req, res) => {
    const admin = await Admin.findByPk(req.user.id);
    const department = admin.department;

    //Retreiving registrations of students with the teamlead and members of same department
    const registrations = await Registration.findAll({
      include: [
        {
          model: Student,
          as: "teamLead",
          attributes: ["id", "name", "email", "reg_no", "department"],
          where: {
            department,
          },
        },
        {
            model: Mentor,
            as: "mentor",
            attributes: ["id", "name", "department"],
        }
      ],
    });

    return res.status(200).json({
      message: ResponseConstants.Registration.SuccessGet,
      registrations,
    });

}


const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    if (!registration) {
      return res.status(404).json({
        message: ResponseConstants.Registration.Error.NotFound,
      });
    }

    // Soft delete
    await registration.update({ is_deleted: true });

    return res.status(200).json({
      message: ResponseConstants.Registration.SuccessDeletion,
    });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return res.status(500).json({
      message: ResponseConstants.Registration.Error.InternalServerError,
      error,
    });
  }
}

module.exports = {
  registerEvent,
  updateRegistration,
  getRegistrationsAdmin,
  deleteRegistration,
};