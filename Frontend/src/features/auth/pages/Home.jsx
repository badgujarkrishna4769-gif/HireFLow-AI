import React from "react";
import NavBar from "../components/NavBar";
import InterviewReportBackground from "../../interview/components/InterviewReportBackground";

const Home = ()=> {
    return (
        <main className="min-h-screen w-full bg-[#1B1B1B] overflow-hidden">
            <NavBar />
            <div className="background fixed inset-0 pointer-events-none">
                <InterviewReportBackground />
            </div>
        </main>
    )
}

export default Home;