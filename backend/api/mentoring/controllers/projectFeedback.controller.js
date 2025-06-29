const { Feedback } = require("../../../models/index");
const { ResponseConstants } = require("../../../constants/ResponseConstants");

const createFeedback = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { content } = req.body;

    if (req.user.role === "student") {
      const student_id = req.user.id;
      const feedback = await Feedback.create({
        student_id,
        project_id,
        content,
      });
    } else if (req.user.role === "mentor") {
      const mentor_id = req.user.id;
      const feedback = await Feedback.create({
        mentor_id,
        project_id,
        content,
      });
    }

    res
      .status(201)
      .json({ message: ResponseConstants.Feedback.SuccessCreation });
  } catch (error) {
    res.status(500).json({
      message: ResponseConstants.Feedback.Error.InternalServerError,
      error: error.message,
    });
  }
};



const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.feedback_id);

    if (!feedback) {
      return res
        .status(404)
        .json({ message: ResponseConstants.Feedback.Error.NotFound });
    }
    const { content } = req.body;

    if (req.user.role === "student") {
      const student_id = req.user.id;
      await feedback.update({ student_id, content });
    } else if (req.user.role === "mentor") {
      const mentor_id = req.user.id;
      await feedback.update({ mentor_id, content });
    }
    res
      .status(200)
      .json({ message: ResponseConstants.Feedback.SuccessUpdate });
  } catch (error) {
    res.status(500).json({
      message: ResponseConstants.Feedback.Error.InternalServerError,
      error: error.message,
    });
  }
};


const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.feedback_id);
    if (!feedback) {
      return res
        .status(404)
        .json({ message:  ResponseConstants.Feedback.Error.NotFound });
    }
    await feedback.update({ is_deleted: true });

    res.status(200).json({ message: ResponseConstants.Feedback.SuccessDeletion });
  } catch (error) {
    res.status(500).json({
      ...ResponseConstants.Feedback.Error.InternalServerError,
      error: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
