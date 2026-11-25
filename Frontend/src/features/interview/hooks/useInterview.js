import {generateInterviewReport, getInterviewReportById, getAllInterviewReport} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = ()=> {
    const context = useContext(InterviewContext);
    const {interviewId} = useParams();

    if(!context) {
        throw new Error("useInterview must be used within an InterviewProvider.")
    }

    const { loading, setLoading, report, setReport, reports, setReports} = context;

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true);
        
        try{
            const response = await generateInterviewReport({jobDescription, selfDescription, resumeFile});
            setReport(response.interviewReport);
            return response.interviewReport;
        }catch(err) {
            console.log(err);
            return null;
        }finally {
            setLoading(false);
        }
    }

    const getReportById = async (interviewId)=> {
        setLoading(true);

        try {
            const response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
            return response.interviewReport;
        }catch(err) {
            console.log("Error: ", err);
            setReport(null);
            return null;
        }finally {
            setLoading(false);
        }
    }

    const getAllReports = async()=> {
        setLoading(true);

        try {
            const response = await getAllInterviewReport();
            setReports(response.interviewReport);
            return response.interviewReport;
        }catch(err) {
            console.log("Error: ", err);
            setReports([]);
        }finally {
            setLoading(false);
        }

        return response.intervieReport;
    }

    useEffect(()=> {
        if(interviewId) {
            getReportById(interviewId);
        }else {
            getAllReports();
        }
    }, [interviewId])
    
    return { loading, report, reports, generateReport, getReportById, getAllReports }
}
