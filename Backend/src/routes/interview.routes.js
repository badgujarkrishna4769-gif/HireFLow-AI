const express = require("express");;
const authMiddleware = require("../middlewares/auth.middleware");
const interviewRouter = express.Router();
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

/**
 * @route POST /api/interview
 * @description generate interview repost on the basis of - candidate resume, self description and job description
 * @access private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController);

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId,
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController);


/** 
 * @route GET /api/interview/report
 * @description get al interview report,
 * @access private
*/
interviewRouter.get("/report", authMiddleware.authUser, interviewController.getAllInterviewReport);


module.exports = interviewRouter