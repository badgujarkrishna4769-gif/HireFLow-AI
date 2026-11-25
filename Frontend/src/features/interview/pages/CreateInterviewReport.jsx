
import React, { useState } from "react";
import InterviewReportBackground from "../components/InterviewReportBackground";
import { Sparkles, Upload, FileText, X, Luggage, FileUser, CircleUserRound, Info } from "lucide-react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import NavBar from "../../auth/components/NavBar";

const CreateInterviewReport = () => {
    const {loading, generateReport, reports} = useInterview();

    const [resumeFile, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const navigate = useNavigate();


    const handleResumeChange = (e) => {
        let resume = e.target.files[0];

        if (!resume) return;

        if (resume.type !== "application/pdf") {
            alert("Please upload a PDF file.");
            e.target.value = "";
            return;
        }

        if (resume.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5 MB.");
            e.target.value = "";
            return;
        }

        setResume(resume);
    };

    const removeResume = () => {
        setResume(null);
        document.getElementById("resume").value = "";
    };

    const handleGenerateReport = async()=> {
        if(!resumeFile || !jobDescription) {
            alert("please fill the job description and provide resume.")
            return;
        }
        const data = await generateReport({jobDescription, selfDescription, resumeFile});
        navigate(`/interview-report/${data._id}`);
    }
    
    // const handleReportRoute = async()=> {

    // }
    return (
        <main className="create-interview-report-page min-h-screen w-full flex flex-col justify-center items-center bg-black relative overflow-x-hidden pt-[max(70px,6.5vw)] pb-[30px]">

            {/* Background */}
            <div className="background fixed inset-0 pointer-events-none">
                <InterviewReportBackground />
            </div>

            <NavBar />
            {/* Main Container */}
            <div className="relative bg-[#21183291] backdrop-blur-[8px] w-full max-w-[1000px] min-w-0 border border-[#D552A3] rounded-xl sm:rounded-2xl flex flex-col z-30 py-6 px-4 sm:py-8 sm:px-6 md:px-8">

                <div className="heading w-full self-center flex flex-col items-center mb-7 sm:mb-9 pb-5 border-b border-b-[#7F5D99]">

                    <h1 className="text-center text-3xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight font-medium mb-3">
                        Your{" "}
                        <span className="text-[#FF3F7F]">
                            AI-Powered
                        </span>{" "}
                        Interview Blueprint.
                    </h1>

                    <p className="max-w-[550px] text-[#b0a0ba] text-xs sm:text-sm md:text-base leading-tight text-center">
                        Get an AI-powered analysis of your job fit,
                        skill gaps, interview questions, and a
                        personalized preparation plan.
                    </p>
                </div>

                <div className="input-cont grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                    <div className="left-input flex flex-col gap-5">

                        {/* Job Description */}
                        <div className="input-group flex flex-col gap-2">

                            <label
                                htmlFor="jobDescription"
                                className="text-xl sm:text-base md:text-lg font-medium text-white flex items-center gap-2"
                            >
                                <Luggage className="mr-[10px]" color="#FFE2E2"/>
                                Job Description
                                <span className="text-[#FF3F7F] text-xs font-medium">
                                    * Required
                                </span>
                            </label>

                            <textarea
                                name="jobDescription"
                                id="jobDescription"
                                placeholder="Enter job description here..."
                                required
                                onChange={(e)=> {setJobDescription(e.target.value)}}
                                className="h-[150px] sm:h-[180px] w-full resize-none bg-[#1a002c] border border-[#633779] rounded-lg p-3 text-sm sm:text-base text-white placeholder:text-[#a18eaf] outline-none focus:border-[#D552A3] transition-colors duration-300"
                            />
                        </div>

                        {/* Self Description */}
                        <div className="input-group flex flex-col gap-2">

                            <label
                                htmlFor="selfDescription"
                                className="text-xl sm:text-base md:text-lg font-medium text-white flex items-center gap-2"
                            >
                                <FileUser className="mr-[10px]" color="#FFE2E2"/>
                                Self Description
                                <span className="text-[#a18eaf] text-xs font-normal">
                                    Optional
                                </span>
                            </label>

                            <textarea
                                name="selfDescription"
                                id="selfDescription"
                                onChange={(e)=> {setSelfDescription(e.target.value)}}
                                placeholder="Describe your skills, experience, projects, and strengths..."
                                className="h-[150px] sm:h-[180px] w-full resize-none bg-[#1a002c] border border-[#633779] rounded-lg p-3 text-sm sm:text-base text-white placeholder:text-[#a18eaf] outline-none focus:border-[#D552A3] transition-colors duration-300"
                            />
                        </div>

                    </div>

                    <div className="right-input flex flex-col gap-5 md:justify-between">
                        {/* Resume Upload */}
                        <div className="input-group flex flex-col gap-2">

                            <label className="text-xl sm:text-base md:text-lg font-medium text-white flex items-center gap-2">
                                <FileText className="mr-[10px]"/>
                                Upload Resume
                                <span className="text-[#FF3F7F] text-xs font-medium">
                                    * Required
                                </span>
                            </label>

                            <label
                                htmlFor="resume"
                                className="group relative min-h-[220px] sm:min-h-[200px] w-full bg-[#111] border-2 border-dashed border-[#555] rounded-xl flex flex-col justify-center items-center gap-4 p-5 cursor-pointer transition-all duration-300 hover:border-[#D552A3] hover:bg-[#D552A3]/5"
                            >
                                <input
                                    type="file"
                                    name="resume"
                                    id="resume"
                                    accept=".pdf,application/pdf"
                                    className="hidden"
                                    required
                                    onChange={handleResumeChange}
                                />
                                <div className="h-14 w-14 shrink-0 rounded-xl bg-[#222] flex items-center justify-center group-hover:bg-[#D552A3]/15 transition-colors duration-300">
                                    <Upload
                                        size={28}
                                        className="text-[#D552A3]"
                                    />
                                </div>
                                <div className="flex flex-col items-center gap-2 text-center">

                                    <h3 className="text-white text-base sm:text-lg font-medium">
                                        {resumeFile ? "Resume Selected" : "Upload your resume"}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-[#999]">
                                        Drag and drop your PDF here or
                                        <span className="text-[#D552A3] ml-1 group-hover:underline">
                                            browse files
                                        </span>
                                    </p>

                                </div>

                                <span className="text-xs text-[#777]">
                                    PDF files only · Maximum 5 MB
                                </span>

                            </label>

                            {resumeFile && (
                                <div className="flex items-center justify-between gap-3 bg-[#290044] border border-[#7F5D99] rounded-lg p-3">

                                    <div className="flex items-center gap-2 min-w-0">
                                        <FileText
                                            size={22}
                                            className="text-[#D552A3] shrink-0"
                                        />

                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm text-white truncate">
                                                {resumeFile.name}
                                            </span>

                                            <span className="text-xs text-[#999]">
                                                {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={removeResume}
                                        className="text-[#aaa] hover:text-red-400 transition-colors shrink-0"
                                        aria-label="Remove resume"
                                    >
                                        <X size={20} />
                                    </button>

                                </div>
                            )}

                        </div>

                        <div className="w-full flex items-start gap-3 p-3 sm:p-4 bg-[#1B2B4B]/90 border border-[#45618F] rounded-xl shadow-sm">   
                            <Info
                                size={21}
                                className="text-[#60A5FA] shrink-0 mt-[2px]"
                            />
                            <p className="text-[#B9D3FF] text-xs sm:text-sm leading-relaxed">
                                Either a{" "}
                                <span className="text-white font-semibold">
                                    Resume
                                </span>{" "}
                                or a{" "}
                                <span className="text-white font-semibold">
                                    Self Description
                                </span>{" "}
                                is required to generate a personalized plan.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleGenerateReport}
                            disabled={loading}
                            className={`generate-btn min-h-[48px] sm:min-h-[54px] w-full ${loading ? "bg-[#972148]" : "bg-[#e92e6d]"} text-white text-xl sm:text-base md:text-lg font-medium flex justify-center items-center rounded-lg cursor-pointer active:scale-[0.98] px-3`}
                        >
                            <Sparkles
                                size={21}
                                className="mr-2 shrink-0"
                            />

                            <span>  
                                {loading ? "Generating Report..." : "Generate Interview Report"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {
                reports.length > 0 && (
                    <div className="generated-reports relative bg-[#21183291] backdrop-blur-[8px] flex flex-col gap-[1rem] w-full max-w-[1000px] min-w-0 border border-[#D552A3] rounded-xl sm:rounded-2xl z-30 mt-[20px] p-[2rem]">
                        <h1 className="generated-report-heading flex items-center gap-[1rem] text-[1.3rem] leading-tight border-b border-[#7F5D99] pb-[1rem] shrink-0">
                            <FileText />
                            Previously generated reports.
                        </h1>

                        <div className="report-list w-full min-w-0 overflow-x-auto scrollbar-thin scrollbar-thumb-black overflow-y-hidden pl-[20px]">
                            <div className=" flex w-max gap-5 px-1 py-2">
                
                                {reports.map((report) => (
                                    <div
                                        key={report._id}
                                        className="report group flex h-[150px] w-[280px] shrink-0 cursor-pointer flex-col justify-between rounded-xl border border-[#e92e6d] bg-[#2f1142] p-5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#b32252] hover:bg-[#311144]"
                                        onClick={() => navigate(`/interview-report/${report._id}`)}
                                    >
                                        <div className="flex flex-col gap-2">
                                            <span className="report-title line-clamp-1 text-lg font-semibold tracking-wide">
                                                {report.title}
                                            </span>
                                            <span className="text-sm text-white/50">
                                                Created on:{" "}
                                                {new Date(report.createdAt).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-white/50">
                                                Match Score
                                            </span>
                                            <span className="text-xl font-bold text-[#e92e6d]">
                                                {report.matchScore}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }            

            { loading &&
                 (
                    <div className="h-screen w-screen opacity-100 bg-black/50 backdrop-blur-[5px] flex justify-center items-center fixed top-0 left-0 z-99">
                        <div className="animate-fade-in flex gap-[1rem] justify-center items-center">
                            <Sparkles className=""/>
                            <span className="text-[1.5rem]">Generating interview report...</span>
                        </div>
                    </div>
                )
            }
        </main>
    );
};

export default CreateInterviewReport;
