const mongoose = require("mongoose");

const subTechnicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required."]
    },
    intention: {
        type: String,
        required: [true, "Intention is required."]
    },
    answer: {
        type: String,
        required: [true, "Answer is required."]
    }
}, {
    _id: false
});

const subBehavioralQuestionShema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required."]
    },
    intention: {
        type: String,
        required: [true, "Intention is required."]
    },
    answer: {
        type: String,
        required: [true, "Answer is required."]
    }
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required."]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "severity is required."]
    }
}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is requird."]
    },
    focus: {
        type: String,
        required: [true, "Focus is required."] 
    },
    tasks: [{
        type: String,
        required: [true, "Tasks are required"]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [subTechnicalQuestionSchema],
    behavioralQuestions: [subBehavioralQuestionShema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        require: [true, "Job Title is required"]
    }
}, {
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;