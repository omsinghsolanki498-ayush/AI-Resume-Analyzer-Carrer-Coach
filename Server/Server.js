const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ConnectedDB = require("./Config/Db");

ConnectedDB();

const ResumeRoutes = require("./Routes/resumeRoutes");
const AuthRoutes = require("./Routes/AuthRoutes");
const analyzeResume = require("./Routes/AnalyzerResume");
const CarrerCoachRoute = require("./Routes/CarrerCoach");
const generateRoadmap = require("./Routes/Roadmap");
const JobRoutes = require("./Routes/Job");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://ai-resume-analyzer-carrer-coach-smoky.vercel.app",
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI Resume Analyzer Backend Running");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/resume", ResumeRoutes);
app.use("/api/ai", analyzeResume);
app.use("/api/career-coach", CarrerCoachRoute);
app.use("/api/roadmap", generateRoadmap);
app.use("/api/jobs", JobRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server Is Running on port ${PORT}`);
});