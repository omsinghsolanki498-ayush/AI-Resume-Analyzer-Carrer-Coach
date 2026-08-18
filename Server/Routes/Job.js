const express = require("express");

const router = express.Router();

const authmiddleware =
    require("../Middleware/AuthMiddleware");

const {
    getJobRecommendations,
} = require("../Controllers/JobController");


router.get(
    "/recommendations",
    authmiddleware,
    getJobRecommendations
);


module.exports = router;