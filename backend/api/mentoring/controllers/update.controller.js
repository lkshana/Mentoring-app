const { Project_update } = require("../../../models/index");

const { ResponseConstants } = require("../../../constants/ResponseConstants");

const createProjectUpdate = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { title, description } = req.body;
    const student_id = req.user.id;

    const projectUpdate = await Project_update.create({
      project_id,
      student_id,
      title,
      description,
    });

    res
      .status(201)
      .json({
        message: ResponseConstants.Update.SuccessCreated,
        projectUpdate,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: ResponseConstants.Update.Error.InternalServerError });
  }
};

// Update a project update
const updateProjectUpdate = async (req, res) => {
  try {
    const { update_id } = req.params;
    const { title, description } = req.body;
    const student_id = req.user.id;

    const projectUpdate = await Project_update.findByPk(update_id);

    if (!projectUpdate) {
      res.status(404).json({ message: "Project update not found" });
    }
    await projectUpdate.update({ title, description });
    res
      .status(200)
      .json({ message: ResponseConstants.Update.SuccessUpdate, projectUpdate });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: ResponseConstants.Update.Error.InternalServerError });
  }
};

// Delete a project update
const deleteProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const projectUpdate = await Project_update.findByPk(id);

    if (!projectUpdate) {
      res
        .status(404)
        .json({ message: ResponseConstants.Update.Error.NotFound });
    }

    await projectUpdate.update({ is_deleted: true });
    res
      .status(200)
      .json({
        message: ResponseConstants.Update.SuccessDeletion,
        projectUpdate,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: ResponseConstants.Update.Error.InternalServerError });
  }
};

// Add a review to a project update
const createReview = async (req, res) => {
  try {
    const { update_id } = req.params;

    const { review } = req.body;

    const projectUpdate = await Project_update.findByPk(update_id);

    if (!projectUpdate) {
      res
        .status(404)
        .json({ message: ResponseConstants.Update.Error.NotFound });
    }
    await projectUpdate.update({ review, review_at: new Date() });
    res
      .status(200)
      .json({
        message: ResponseConstants.Review.SuccessCreated,
        projectUpdate,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: ResponseConstants.Review.Error.InternalServerError });
  }
};


module.exports = {
  createProjectUpdate,
  updateProjectUpdate,
  deleteProjectUpdate,
  createReview
};
