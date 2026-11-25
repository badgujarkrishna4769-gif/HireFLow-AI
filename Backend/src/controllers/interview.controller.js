const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description Controller to generate interview report based on resume, self description and job description
 */
async function generateInterviewReportController(req, res) {

    try{
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const {selfDescription, jobDescription} = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription  
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport: interviewReport
        })
    }catch(err) {
        console.log("There was an error generating interview report", err);
        res.status(500).json({
            message: "There was an error generating interview report."
        })
    }
}

/**
 * @description get interview report by interviewId
 */
async function getInterviewReportByIdController(req, res) {
    const {interviewId} = req.params;

    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id });

    if(!interviewReport) {
        return res.status(404).json({
            message: "Report not found."
        })
    }

    res.status(200).json({
        message: "Report found.",
        interviewReport
    })
}

/**
 * @description get all interview report
 */
async function getAllInterviewReport(req, res) {
    const interviewReport = await interviewReportModel.find({user: req.user.id}).sort({ createdAt: -1 }).select("-resume -selfDescription -__v -techicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "All Interview reports fetched successfully.",
        interviewReport
    })
}
module.exports = {generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReport}