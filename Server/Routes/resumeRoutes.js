const express = require("express");

const upload = require("../Config/Multer");
const authMiddleware = require("../Middleware/AuthMiddleware");

const {
    uploadResume,
    getMyResume,
    getResumeId,
    deleteResume,

} = require("../Controllers/ResumeController");

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);
// get all resume(user);
router.get("/my-resumes", authMiddleware, getMyResume);

// get single resume

router.get("/:id", authMiddleware, getResumeId);

router.delete(
    "/:id",
    authMiddleware,
    deleteResume
);


module.exports = router;