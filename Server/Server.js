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

/* =========================
   CORS CONFIGURATION
========================= */

const allowedOrigins = [
  "https://ai-resume-analyzer-carrer-coach-smoky.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests without origin (Postman, server-to-server, etc.)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

/* =========================
   BODY PARSER
========================= */

app.use(express.json());

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Resume Analyzer Backend Running",
  });
});

/* =========================
   API ROUTES
========================= */

app.use("/api/auth", AuthRoutes);

app.use("/api/resume", ResumeRoutes);

app.use("/api/ai", analyzeResume);

app.use("/api/career-coach", CarrerCoachRoute);

app.use("/api/roadmap", generateRoadmap);

app.use("/api/jobs", JobRoutes);

/* =========================
   PORT
========================= */

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server Is Running on port ${PORT}`);
});