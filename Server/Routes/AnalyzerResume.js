const express = require("express");

const router = express.Router();
const {analyzeResume} = require("../Controllers/AnalyzeResume");

const authmiddleware = require("../Middleware/AuthMiddleware");

router.post("/analyze",authmiddleware,analyzeResume);

module.exports = router;