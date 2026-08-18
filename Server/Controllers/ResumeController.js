const Resume = require("../Models/Resume");
const cloudinary = require("../Config/Cloudinary");
const pdfParse = require("pdf-parse");

const uploadResume = async (req, res) => {
    try {
        console.log("USER:", req.user);
        console.log("FILE:", req.file?.originalname);

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a PDF resume",
            });
        }

        // Extract PDF text
        const pdfData = await pdfParse(req.file.buffer);
        const extractedText = pdfData.text.trim();

        if (!extractedText) {
            return res.status(400).json({
                message: "Could not extract text from this PDF",
            });
        }

        console.log("PDF TEXT EXTRACTED:", extractedText.length);

        // Cloudinary upload
        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "ai-resume-analyzer/resumes",
                        resource_type: "raw",
                        public_id: `${Date.now()}-${req.file.originalname.replace(
                            /\.pdf$/i,
                            ""
                        )}`,
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                stream.end(req.file.buffer);
            });
        };

        const cloudinaryResult = await uploadToCloudinary();

        // Save to MongoDB
        const resume = await Resume.create({
            user: req.user.id,
            originalName: req.file.originalname,
            cloudinaryUrl: cloudinaryResult.secure_url,
            cloudinaryPublicId: cloudinaryResult.public_id,
            extractedText,
        });

        console.log("RESUME SAVED:", resume._id);

        return res.status(201).json({
            message: "Resume uploaded successfully",
            resume: {
                id: resume._id,
                originalName: resume.originalName,
                cloudinaryUrl: resume.cloudinaryUrl,
                extractedText: resume.extractedText,
            },
        });

    } catch (error) {
        console.error("Resume Upload Error:", error);

        return res.status(500).json({
            message: "Resume upload failed",
            error: error.message,
        });
    }
};


//  GET ALL USERS RESUME'S
const getMyResume = async (req, res) => {

    try {

        const resumes = await Resume.find({
            user: req.user.id,
        })
            .sort({ createdAt: -1 })
            .select(
                "-extractedText"
            );

        return res.status(200).json({
            message: "Resume Fetch Sucessfully",
            resumes,
        });
    } catch (error) {

        console.error("Get Resume Error", error);

        res.status(500).json({
            message: "faild to fetch",
            error: error.message,
        });
    }
}

// GET SINGLE RESUME
const getResumeId = async (req, res) => {
    try {

        const { id } = req.params;
        const resume = await Resume.findOne({
            _id: id,
            user: req.user.id,

        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",

            });
        }

        res.status(200).json({
            message: "Resume Fetch Successfully",
            resume,
        });

    } catch (error) {

        console.error("get resume error", error);

        res.status(500).json({
            message: "faild to fetch",
            error: error.message,
        });
    }
}

// =========================================
// DELETE RESUME
// =========================================

const deleteResume = async (req, res) => {

    try {

        const { id } = req.params;

        console.log("DELETE RESUME ID:", id);
        console.log("USER ID:", req.user?.id);


        if (!req.user?.id) {

            return res.status(401).json({
                message: "User not authenticated",
            });

        }


        const resume = await Resume.findOne({
            _id: id,
            user: req.user.id,
        });


        if (!resume) {

            return res.status(404).json({
                message: "Resume not found",
            });

        }


        // =====================================
        // DELETE FROM CLOUDINARY
        // =====================================

        if (resume.cloudinaryPublicId) {

            try {

                await cloudinary.uploader.destroy(
                    resume.cloudinaryPublicId,
                    {
                        resource_type: "raw",
                    }
                );

                console.log(
                    "Cloudinary file deleted"
                );

            } catch (cloudinaryError) {

                console.error(
                    "Cloudinary delete error:",
                    cloudinaryError.message
                );

                // Continue MongoDB deletion
            }
        }


        // =====================================
        // DELETE FROM MONGODB
        // =====================================

        await Resume.deleteOne({
            _id: id,
            user: req.user.id,
        });


        return res.status(200).json({

            message:
                "Resume deleted successfully",

            id,

        });

    } catch (error) {

        console.error(
            "Delete Resume Error:",
            error
        );

        return res.status(500).json({

            message:
                "Failed to delete resume",

            error:
                error.message,

        });

    }
};

module.exports = {
    uploadResume,
    getMyResume,
    getResumeId,
    deleteResume,
};