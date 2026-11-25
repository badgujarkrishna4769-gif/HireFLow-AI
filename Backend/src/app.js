const express = require("express");
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");
const cookiesParser = require("cookie-parser");
const cors = require("cors");

const app = express();
 
//using middlewares
app.use(express.json())
app.use(cookiesParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//using all routes
app.use("/api/auth", authRouter);   
app.use("/api/interview", interviewRouter);

module.exports = app;