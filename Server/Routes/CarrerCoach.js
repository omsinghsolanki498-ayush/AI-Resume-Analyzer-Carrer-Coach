const express = require("express");
const router = express.Router();

const {
    carrercoachChat,
    clearchat,
    getChat,
} = require("../Controllers/CarrerCoachController");

const authmiddleware = require("../Middleware/authmiddleware");

router.get(
    "/history",
    authmiddleware,
    getChat
);

router.post(
    "/chat",
    authmiddleware,
    carrercoachChat
);

router.delete(
    "/history",
    authmiddleware,
    clearchat
);

module.exports = router;