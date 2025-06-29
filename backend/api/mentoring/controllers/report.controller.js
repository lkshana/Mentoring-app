const { Report, Project } = require("../../../models/index");
const { ResponseConstants } = require("../../../constants/ResponseConstants");

const createReport = async (req, res) => {
    try {
        const { project_id } = req.params;
        const { title, content } = req.body;
        const project = await Project.findByPk(project_id);
        if (!project) {
            return res.status(404).json({
                message: ResponseConstants.Project.Error.NotFound,
            });
        }
        
        const newReport = await Report.create({
            project_id,
            title,
            content,
        });
        return res.status(201).json({
            message: ResponseConstants.Report.SuccessCreation,
            newReport,
        });
       
    } catch (error) {
        console.error("Error creating report:", error);
        return res.status(500).json({
            message: ResponseConstants.Report.Error.InternalServerError,
            error,
        });
    }
};

const updateReport = async (req, res) => {
    try {
        const { report_id } = req.params;
        const { title, content } = req.body;
        const report = await Report.findByPk(report_id);
        if (!report) {
            return res.status(404).json({
                message: ResponseConstants.Report.Error.NotFound,
            });
        }
        await report.update({
            title,
            content,
        });
        return res.status(200).json({
            message: ResponseConstants.Report.SuccessUpdate,
            report,
        });
    } catch (error) {
        console.error("Error updating report:", error);
        return res.status(500).json({
            message: ResponseConstants.Report.Error.InternalServerError,
            error,
        });
    }
};

const deleteReport = async (req, res) => {
    try {
        const { report_id } = req.params;
        const report = await Report.findByPk(report_id);
        if (!report) {
            return res.status(404).json({
                message: ResponseConstants.Report.Error.NotFound,
            });
        }
        await report.update({
            is_deleted: true,
        });

        return res.status(200).json({
            message: ResponseConstants.Report.SuccessDeletion,
        });
    } catch (error) {
        console.error("Error deleting report:", error);
        return res.status(500).json({
            message: ResponseConstants.Report.Error.InternalServerError,
            error,
        });
    }
};

module.exports = {
    createReport,
    updateReport,
    deleteReport,
};