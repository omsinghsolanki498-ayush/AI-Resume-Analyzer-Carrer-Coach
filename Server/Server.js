const express = require("express");
const cors = require("cors"); // Frontend Backend Connection
require("dotenv").config();

const ConnectedDB = require("./Config/Db"); // database

ConnectedDB();
const ResumeRoutes = require("./Routes/resumeRoutes");
const AuthRoutes = require("./Routes/AuthRoutes");
const analyzeResume = require("./Routes/AnalyzerResume");
const CarrerCoachRoute = require("./Routes/CarrerCoach");
const generateRoadmap = require("./Routes/Roadmap");
const JobRoutes = require("./Routes/Job");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI Resume Analyzer Backend Running");
});

// Middleware's
app.use("/api/auth", AuthRoutes);
app.use("/api/resume", ResumeRoutes);
app.use("/api/ai", analyzeResume);
app.use("/api/career-coach",CarrerCoachRoute);
app.use("/api/roadmap", generateRoadmap);
app.use("/api/jobs",JobRoutes);

app.listen(3002, () => {
    console.log("Server Is Running");
});
