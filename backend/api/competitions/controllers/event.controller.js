const { Event, Master, Registration, TeamMember } = require("../../../models"); 
const { ResponseConstants } = require("../../../constants/ResponseConstants");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      event_date,
      poster,
      link,
      event_type,
      category,
    } = req.body;

    const created_by = req.user.id;

    if (
      !title ||
      !description ||
      !event_date ||
      !poster ||
      !link ||
      !created_by
    ) {
      return res.status(400).json({
        message: ResponseConstants.Event.Error.AllFieldsRequired,
      });
    }

    const newEvent = await Event.create({
      title,
      description,
      event_date,
      poster,
      link,
      event_type,
      category,
      created_by,
    });

    return res.status(201).json({
      message: ResponseConstants.Event.SuccessCreation,
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      message: ResponseConstants.Event.Error.InternalServerError,
      error,
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: Master,
          as: "creator",
          attributes: ["id", "name", "email"], // adjust fields
        },
      ],
    });

    return res.status(200).json({
      message: ResponseConstants.Event.SuccessGet,
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      message: ResponseConstants.Event.Error.InternalServerError,
      error,
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id, {
      include: {
        model: Master,
        as: "creator",
        attributes: ["id", "name", "email"],
      },
    });

    if (!event) {
      return res.status(404).json({
        message: ResponseConstants.Event.Error.NotFound,
      });
    }

    return res.status(200).json({
      message: ResponseConstants.Event.SuccessGetById,
      event,
    });
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return res.status(500).json({
      message: ResponseConstants.Event.Error.InternalServerError,
      error,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      event_date,
      poster,
      link,
      event_type,
      category,
    } = req.body;

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({
        message: ResponseConstants.Event.Error.NotFound,
      });
    }

    await event.update({
      title,
      description,
      event_date,
      poster,
      link,
      event_type,
      category,
    });

    return res.status(200).json({
      message: ResponseConstants.Event.SuccessUpdate,
      event,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({
      message: ResponseConstants.Event.Error.InternalServerError,
      error,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({
        message: ResponseConstants.Event.Error.NotFound,
      });
    }

    // Soft delete
    await event.update({ is_deleted: true });

    return res.status(200).json({
      message: ResponseConstants.Event.SuccessDeletion,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({
      message: ResponseConstants.Event.Error.InternalServerError,
      error,
    });
  }
};

const getAllEventsMaster = async (req, res) => {
  try {
    const events = await Event.findAll(
      {
        include: [
          {
            model: Master,
            as: "creator",
            attributes: ["id", "name", "email"], // adjust fields
          },
          {
            model: Registration,
            as: "registrations",
            include: [
              {
                model: Student,
                as: "teamLead",
                attributes: ["id", "name", "email", "reg_no", "department"],
              },
              {
                model: Mentor,
                as: "mentor",
                attributes: ["id", "name", "department"],
              }
            ]
          }
        ],
      }
    );
    return res.status(200).json({
      message: ResponseConstants.Event.SuccessGet,
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      message: ResponseConstants.Event.Error.InternalServerError,
      error,
    });
  }
};
const getRegistrations = async (req, res) => {

  try{
    const { id } = req.params;
    
    const registrations = await Registration.findAll({
      include: [
        {
          model: Student,
          as: "teamLead",
          attributes: ["id", "name", "email", "reg_no", "department"],
        },
        {
          model: Mentor,
          as: "mentor",
          attributes: ["id", "name", "department"],
        }
      ],
      where: {
        event_id: id
      }
    });

    return res.status(200).json({
      message: ResponseConstants.Registration.SuccessGet,
      registrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return res.status(500).json({
      message: ResponseConstants.Registration.Error.InternalServerError,
      error,
    });
  }

}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getAllEventsMaster,
  getRegistrations
};