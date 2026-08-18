const express = require("express");

const router = express.Router();

const authmiddleware = require("../Middleware/AuthMiddleware");

const {generateRoadmap} = require("../Controllers/RoadmapController");

router.get("/generate",authmiddleware,generateRoadmap);

module.exports = router;