const {
    Student,
    Event,
    Registration,
    TeamMember,
    Admin,
    Master,
    Mentor
  } = require("../../../models");
const { ResponseConstants } = require("../../../constants/ResponseConstants");



const approveDepartment = async (req, res) => {
    try { 
      const { registration_id } = req.params;
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Access denied. Admin or owner only.",
          currentRole: req.user ? req.user.role : "none",
        });
      }

      const registration = await Registration.findByPk(registration_id);
  
      if (!registration) {
        return res.status(404).json({
          message: ResponseConstants.Registration.Error.NotFound,
        });
      }
      const team_lead = await Student.findByPk(registration.team_lead_id);

      if (req.user.department !== team_lead.department) {
        return res.status(403).json({
          message: "Access denied. Admin or owner only.",
          currentRole: req.user ? req.user.role : "none",
        });
      }
  
  
      await registration.update({ approve_by_department: true });
  
      return res.status(200).json({
        message: ResponseConstants.Registration.SuccessApproval,
        registration,
      });
    }
    catch (error) {
      console.error("Error approving registration:", error);
      return res.status(500).json({
        message: ResponseConstants.Registration.Error.InternalServerError,
        error,
      });
    }
}


const rejectDepartment = async (req, res) => {
  try { 
    const { registration_id } = req.params;
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Access denied. Admin or owner only.",
          currentRole: req.user ? req.user.role : "none",
        });
      }

    const registration = await Registration.findByPk(registration_id);

    if (!registration) {
      return res.status(404).json({
        message: ResponseConstants.Registration.Error.NotFound,
      });
    }
    const team_lead = await Student.findByPk(registration.team_lead_id);

    if (req.user.department !== team_lead.department ){
      return res.status(403).json({
        message: "Access denied. Admin or owner only.",
        currentRole: req.user ? req.user.role : "none",
      });
    }

    await registration.update({ reject_by_department: true });

    return res.status(200).json({
      message: ResponseConstants.Registration.SuccessRejection,
      registration,
    });
  }
  catch (error) {
    console.error("Error rejecting registration:", error);
    return res.status(500).json({
      message: ResponseConstants.Registration.Error.InternalServerError,
      error,
    });
  }
}

const approveMaster = async (req, res) => {
  try { 
    const { registration_id } = req.params;

    if (req.user.role !== "master") {
      return res.status(403).json({
        message: "Access denied. Master only.",
        currentRole: req.user ? req.user.role : "none",
      });
    }

    const registration = await Registration.findByPk(registration_id);

    if (!registration) {
      return res.status(404).json({
        message: ResponseConstants.Registration.Error.NotFound,
      });
    }
    
    await registration.update({ approve_by_admin: true });

    return res.status(200).json({
      message: ResponseConstants.Registration.SuccessApproval,
      registration,
    });
  }
  catch (error) {
    console.error("Error approving registration:", error);
    return res.status(500).json({
      message: ResponseConstants.Registration.Error.InternalServerError,
      error,
    });
  }
}

const rejectMaster = async (req, res) => {
  try { 
    const { registration_id } = req.params;

    if (req.user.role !== "master") {
      return res.status(403).json({
        message: "Access denied. Master only.",
        currentRole: req.user ? req.user.role : "none",
      });
    }

    const registration = await Registration.findByPk(registration_id);

    if (!registration) {
      return res.status(404).json({
        message: ResponseConstants.Registration.Error.NotFound,
      });
    }
    
    await registration.update({ reject_by_admin: true });

    return res.status(200).json({
      message: ResponseConstants.Registration.SuccessRejection,
      registration,
    });
  }
  catch (error) {
    console.error("Error rejecting registration:", error);
    return res.status(500).json({
      message: ResponseConstants.Registration.Error.InternalServerError,
      error,
    });
  }
}

module.exports = { approveDepartment, rejectDepartment, approveMaster, rejectMaster };