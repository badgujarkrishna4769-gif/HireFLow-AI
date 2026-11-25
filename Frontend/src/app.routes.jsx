import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import { Protected } from "./features/auth/components/Protected";
import CreateInterviewReport from "./features/interview/pages/CreateInterviewReport";
import InterviewReport from "./features/interview/pages/InterviewReport";
import Home from "./features/auth/pages/Home";

export const router = createBrowserRouter([
    {
        path: "/interview-report/:interviewId",
        element: <InterviewReport />
    },
    {
        path: "/interview-report",
        element: <Protected ><CreateInterviewReport /></Protected>
        // element: <CreateInterviewReport />
    },
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])