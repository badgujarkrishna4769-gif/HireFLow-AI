
import React, { useRef, useState, useEffect } from "react";
import {
    Sparkles,
    Target,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Code2,
    MessageCircle,
    CalendarDays,
    ChevronDown,
    Clock3,
    Trophy,
    Lightbulb,
} from "lucide-react";
import InterviewReportBackground from "../components/InterviewReportBackground";
import { useInterview } from "../hooks/useInterview";
import { useNavigate, useParams } from "react-router";

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

const severityStyles = {
    low: {
        badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
        dot: "bg-blue-400",
    },
    medium: {
        badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
        dot: "bg-yellow-400",
    },
    high: {
        badge: "bg-red-500/10 text-red-400 border-red-500/30",
        dot: "bg-red-400",
    },
};


const SectionHeading = ({
    icon: Icon,
    title,
    description,
    count,
}) => (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

        <div className="flex items-center gap-3">

            <div className="h-10 w-10 shrink-0 rounded-lg bg-[#D552A3]/10 flex items-center justify-center">
                <Icon size={21} className="text-[#D552A3]" />
            </div>

            <div>
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                    {title}
                </h2>

                <p className="text-xs sm:text-sm text-[#9b8ca7] mt-1">
                    {description}
                </p>
            </div>

        </div>

        {count !== undefined && (
            <span className="text-xs bg-[#35233F] text-[#DFA5D0] px-3 py-1.5 rounded-full">
                {count} Items
            </span>
        )}

    </div>
);


// Question Card
const QuestionCard = ({ item, index }) => (
    <details className="group bg-[#211832] border border-[#493352] rounded-xl overflow-hidden transition-colors hover:border-[#8C477B]">

        <summary className="list-none cursor-pointer p-4 sm:p-5 flex items-start gap-3">

            <span className="h-7 w-7 shrink-0 rounded-md bg-[#D552A3]/15 text-[#D552A3] flex items-center justify-center text-sm font-semibold">
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex-1 min-w-0">

                <h3 className="text-sm sm:text-base text-white font-medium leading-relaxed">
                    {item.question}
                </h3>

                <p className="text-xs text-[#A895B5] mt-2">
                    Click to view intention and suggested answer
                </p>

            </div>

            <ChevronDown
                size={19}
                className="text-[#A895B5] shrink-0 transition-transform duration-300 group-open:rotate-180"
            />

        </summary>


        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#493352] space-y-4">

            {/* Intention */}
            <div className="pt-3">

                <div className="flex items-center gap-2 mb-2">
                    <Target size={16} className="text-[#D552A3]" />

                    <h4 className="text-sm font-semibold text-[#DFA5D0]">
                        What the interviewer evaluates
                    </h4>
                </div>

                <p className="text-sm text-[#B8AABE] leading-relaxed pl-6">
                    {item.intention}
                </p>

            </div>


            {/* Suggested Answer */}
            <div>

                <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={16} className="text-yellow-400" />

                    <h4 className="text-sm font-semibold text-yellow-300">
                        Suggested Answer
                    </h4>
                </div>

                <p className="text-sm text-[#C4B9CD] leading-relaxed pl-6">
                    {item.answer}
                </p>

            </div>

        </div>

    </details>
);



const InterviewReport = () => {

    const {report, loading} = useInterview();

    if(loading) {
        return (<main>
                <h1>Loading report...</h1>
            </main>);
    }

    if(!report) {
        return (<main>
                <h1>No Interview Report found..!</h1>
            </main>);
    }
    
    

    const {
        matchScore,
        technicalQuestions,
        behavioralQuestions,
        skillGaps,
        preparationPlan,
    } = report;

    const score = Math.min(
        100,
        Math.max(0, Number(matchScore) || 0)
    );

    const gapCounts = {
        high: skillGaps.filter(
            (g) => g.severity.toLowerCase() === "high"
        ).length,

        medium: skillGaps.filter(
            (g) => g.severity.toLowerCase() === "medium"
        ).length,

        low: skillGaps.filter(
            (g) => g.severity.toLowerCase() === "low"
        ).length,
    };

    if(loading) {
        return (<main>
            <h1>Loading interview report..!</h1>
        </main>)
    }
    return (
        <>

        <main className="min-h-screen w-full flex justify-center items-center bg-black relative overflow-x-hidden py-6 px-3 sm:px-5 md:py-10">
            {/* Background */}
            <div className="background fixed inset-0 pointer-events-none">
                <InterviewReportBackground />
            </div>

            <div className="max-w-[1200px] mx-auto space-y-8 z-30">
                <header className="bg-[#00000083] backdrop-blur-[10px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-t border-[#493352] rounded-[10px] p-4 pb-6">
                    <div>
                        <div className="flex items-center gap-2 text-[#D552A3] mb-2">
                            <Sparkles size={18} />

                            <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">
                                AI Powered Analysis
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Your Interview Report
                        </h1>

                        <p className="text-sm text-[#9B8CA7] mt-2">
                            Your personalized job compatibility and preparation insights.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
                        <CheckCircle2
                            size={16}
                            className="text-green-400"
                        />
                        <span className="text-xs sm:text-sm text-green-400">
                            Analysis Complete
                        </span>
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-gradient-to-br from-[#35203D] to-[#211832] border border-[#71436E] rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-6">
                        <div
                            className="h-36 w-36 shrink-0 rounded-full flex items-center justify-center"
                            style={{
                                background: `conic-gradient(#FF3F7F ${score}%, #493352 ${score}% 100%)`,
                            }}
                        >
                            <div className="h-[118px] w-[118px] rounded-full bg-[#211832] flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-white">
                                    {score}%
                                </span>
                                <span className="text-xs text-[#B8AABE]">
                                    Match Score
                                </span>
                            </div>
                        </div>

                        <div className="text-center sm:text-left">

                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">

                                <Trophy
                                    size={19}
                                    className="text-yellow-400"
                                />

                                <h2 className="text-lg font-semibold">
                                    Job Compatibility
                                </h2>

                            </div>

                            <p className="text-sm text-[#B8AABE] leading-relaxed">
                                Your profile has a {score}% match with the provided job description based on your skills, experience, and projects.
                            </p>

                            <div className="mt-4 flex items-center gap-2 justify-center sm:justify-start text-xs text-green-400">

                                <TrendingUp size={15} />

                                Your job compatibility score

                            </div>

                        </div>

                    </div>

                    <div className="bg-[#211832] border border-[#493352] rounded-2xl p-5 sm:p-7">

                        <div className="flex items-center gap-2 mb-5">

                            <AlertCircle
                                size={20}
                                className="text-[#D552A3]"
                            />

                            <h2 className="text-lg font-semibold">
                                Skill Gap Overview
                            </h2>

                        </div>


                        <div className="grid grid-cols-3 gap-2 mb-5">

                            {[
                                {
                                    label: "High",
                                    count: gapCounts.high,
                                    color: "text-red-400",
                                    bg: "bg-red-500/10",
                                },
                                {
                                    label: "Medium",
                                    count: gapCounts.medium,
                                    color: "text-yellow-400",
                                    bg: "bg-yellow-500/10",
                                },
                                {
                                    label: "Low",
                                    count: gapCounts.low,
                                    color: "text-blue-400",
                                    bg: "bg-blue-500/10",
                                },
                            ].map((item) => (

                                <div
                                    key={item.label}
                                    className={`${item.bg} rounded-xl p-3 text-center`}
                                >

                                    <p className={`text-2xl font-bold ${item.color}`}>
                                        {item.count}
                                    </p>

                                    <p className="text-xs text-[#B8AABE] mt-1">
                                        {item.label}
                                    </p>

                                </div>

                            ))}

                        </div>


                        <div className="flex items-center justify-between border-t border-[#493352] pt-4">

                            <span className="text-sm text-[#B8AABE]">
                                Total identified gaps
                            </span>

                            <span className="text-xl font-semibold">
                                {skillGaps.length}
                            </span>

                        </div>

                    </div>

                </section>

                <section className="bg-[#1a142394] backdrop-blur-[10px] border border-[#493352] rounded-2xl p-4 sm:p-6 md:p-7">

                    <SectionHeading
                        icon={Target}
                        title="Skill Gap Analysis"
                        description="Skills you should improve to meet job requirements."
                        count={skillGaps.length}
                    />


                    {skillGaps.length > 0 ? (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                            {skillGaps.map((gap, index) => {

                                const severity =
                                    severityStyles[
                                        gap.severity.toLowerCase()
                                    ] || severityStyles.low;


                                return (

                                    <div
                                        key={index}
                                        className="bg-[#211832] border border-[#493352] rounded-xl p-4 flex flex-col gap-4"
                                    >

                                        <div className="flex items-start gap-2">

                                            <span
                                                className={`h-2 w-2 mt-1.5 rounded-full shrink-0 ${severity.dot}`}
                                            />

                                            <h3 className="text-sm font-medium text-white leading-relaxed">
                                                {gap.skill}
                                            </h3>

                                        </div>


                                        <div className="flex justify-between items-center">

                                            <span className="text-xs text-[#9B8CA7]">
                                                Improvement Priority
                                            </span>

                                            <span
                                                className={`text-xs px-2.5 py-1 rounded-full border ${severity.badge}`}
                                            >
                                                {gap.severity}
                                            </span>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    ) : (

                        <p className="text-sm text-[#9B8CA7]">
                            No skill gaps identified.
                        </p>

                    )}

                </section>

                <section className="bg-[#1a142394] backdrop-blur-[10px] border border-[#493352] rounded-2xl p-4 sm:p-6 md:p-7">

                    <SectionHeading
                        icon={Code2}
                        title="Technical Interview Questions"
                        description="Technical questions tailored to your target role and projects."
                        count={technicalQuestions.length}
                    />


                    <div className="space-y-3">

                        {technicalQuestions.map((item, index) => (

                            <QuestionCard
                                key={index}
                                item={item}
                                index={index}
                            />

                        ))}

                    </div>

                </section>

                <section className="bg-[#1a142394] backdrop-blur-[10px] border border-[#493352] rounded-2xl p-4 sm:p-6 md:p-7">

                    <SectionHeading
                        icon={MessageCircle}
                        title="Behavioral Interview Questions"
                        description="Prepare for questions about teamwork, communication, and problem-solving."
                        count={behavioralQuestions.length}
                    />


                    <div className="space-y-3">

                        {behavioralQuestions.map((item, index) => (

                            <QuestionCard
                                key={index}
                                item={item}
                                index={index}
                            />

                        ))}

                    </div>

                </section>

                <section className="bg-[#1a142394] backdrop-blur-[10px] border border-[#493352] rounded-2xl p-4 sm:p-6 md:p-7">

                    <SectionHeading
                        icon={CalendarDays}
                        title="Your Preparation Roadmap"
                        description="A structured day-by-day plan to prepare for your interview."
                        count={preparationPlan.length}
                    />


                    <div className="relative space-y-4">

                        {preparationPlan
                            .slice()
                            .sort((a, b) => a.day - b.day)
                            .map((plan, index) => (

                                <div
                                    key={index}
                                    className="relative bg-[#211832] border border-[#493352] rounded-xl p-4 sm:p-5"
                                >

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">

                                        <div className="flex items-center gap-3">

                                            <div className="h-10 w-10 shrink-0 rounded-lg bg-[#D552A3]/15 text-[#D552A3] flex items-center justify-center font-semibold">
                                                {String(plan.day).padStart(2, "0")}
                                            </div>


                                            <div>

                                                <span className="text-xs text-[#D552A3] font-medium uppercase tracking-wider">
                                                    Day {plan.day}
                                                </span>

                                                <h3 className="text-sm sm:text-base font-semibold text-white">
                                                    {plan.focus}
                                                </h3>

                                            </div>

                                        </div>


                                        <span className="sm:ml-auto text-xs text-[#9B8CA7] flex items-center gap-1">

                                            <Clock3 size={14} />

                                            Daily preparation

                                        </span>

                                    </div>



                                    {/* Preparation Tasks */}

                                    <div className="space-y-3 sm:pl-[52px]">

                                        {plan.tasks?.map((task, taskIndex) => (

                                            <div
                                                key={taskIndex}
                                                className="flex items-start gap-3"
                                            >

                                                <CheckCircle2
                                                    size={17}
                                                    className="text-[#D552A3] shrink-0 mt-[2px]"
                                                />

                                                <p className="text-sm text-[#B8AABE] leading-relaxed">
                                                    {task}
                                                </p>

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            ))}

                    </div>

                </section>

                <footer className="bg-[#00000083] backdrop-blur-[10px] text-center border border-[#493352] rounded-[10px] p-4">

                    <div className="flex items-center justify-center gap-2 text-[#D552A3] mb-2">

                        <Sparkles size={17} />

                        <span className="font-medium text-sm">
                            Your next opportunity starts with preparation.
                        </span>

                    </div>

                    <p className="text-xs text-[#766A80]">
                        Keep learning, practice consistently, and track your progress.
                    </p>

                </footer>


            </div>

        </main>
    </>
    );

};

export default InterviewReport;
