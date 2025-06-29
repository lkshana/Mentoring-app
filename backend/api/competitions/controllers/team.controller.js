const { Event, TeamMember, Registration } = require("../../../models");

const { ResponseConstants } = require("../../../constants/ResponseConstants");


const addMember = async (req, res) => {
    try {
        const { registration_id } = req.params;
        const { student_id } = req.body;

        const registration = await Registration.findByPk(registration_id);
        if (!registration) {
            return res.status(HttpStatusCodeConstants.NotFound).json({
                message: ResponseConstants.Team.Error.NotFound,
            });
        }

        const new_member = await TeamMember.create({ registration_id, student_id });
        res.status(HttpStatusCodeConstants.Created).json({
            message: ResponseConstants.Team.SuccessCreation,
        });
    } catch (error) {
        console.error("Error in adding member:", error);
        res.status(HttpStatusCodeConstants.InternalServerError).json({
            message: ResponseConstants.Team.Error.InternalServerError,
            error,
        });
    }
};

const deleteMember = async (req, res) => {
    try {
        const { team_member_id } = req.params;

        const team_member = await TeamMember.findByPk(team_member_id);
        if (!team_member) {
            return res.status(HttpStatusCodeConstants.NotFound).json({
                message: ResponseConstants.Team.Error.NotFound,
            });
        }

        await team_member.update({ is_deleted: true });

        res.status(HttpStatusCodeConstants.Ok).json({
            message: ResponseConstants.Team.SuccessDeletion,
        });
    } catch (error) {
        console.error("Error in deleting member:", error);
        res.status(HttpStatusCodeConstants.InternalServerError).json({
            message: ResponseConstants.Team.Error.InternalServerError,
            error,
        });
    }
};

module.exports = { addMember, deleteMember };