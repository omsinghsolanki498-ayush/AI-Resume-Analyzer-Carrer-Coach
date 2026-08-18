const axios = require("axios");
const Resume = require("../Models/Resume");


// ==========================================
// GENERATE ROADMAP
// ==========================================

const generateRoadmap = async (req, res) => {
    try {

        const userId = req.user.id;

        // Get latest resume
        const resume = await Resume.findOne({
            user: userId,
        }).sort({
            createdAt: -1,
        });

        // Resume not found
        if (!resume) {
            return res.status(404).json({
                message:
                    "Please upload and analyze your resume first.",
            });
        }

        // Resume data
        const skills = Array.isArray(resume.skills)
            ? resume.skills
            : [];

        const missingSkills = Array.isArray(
            resume.missingSkills
        )
            ? resume.missingSkills
            : [];

        const experienceLevel =
            resume.experienceLevel || "Beginner";

        const targetRole =
            resume.jobRoleMatch?.role ||
            "Full Stack Developer";

        // Check API key
        if (!process.env.OPENROUTER_API_KEY) {
            return res.status(500).json({
                message:
                    "OPENROUTER_API_KEY is missing.",
            });
        }

        // AI Prompt
        const prompt = `
You are an expert career mentor.

Create a personalized 90-day learning roadmap.

Target Role:
${targetRole}

Experience Level:
${experienceLevel}

Current Skills:
${skills.join(", ") || "None"}

Missing Skills:
${missingSkills.join(", ") || "None"}

Create a practical roadmap divided into:

1. First 30 Days
2. Days 31-60
3. Days 61-90

For each phase include:
- skills to learn
- topics to study
- projects to build
- interview preparation
- expected outcome

Return ONLY valid JSON.

Use exactly this format:

{
    "targetRole": "${targetRole}",
    "duration": "90 Days",
    "phases": [
        {
            "title": "First 30 Days",
            "weeks": [
                {
                    "week": "Week 1",
                    "focus": "Topic",
                    "tasks": [
                        "Task 1",
                        "Task 2"
                    ]
                }
            ],
            "goal": "Goal of this phase"
        }
    ]
}
`;

        // OpenRouter request
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model:
                    process.env.AI_MODEL ||
                    "openai/gpt-3.5-turbo",

                messages: [
                    {
                        role: "system",
                        content:
                            "You are an expert AI career mentor. Return valid JSON only.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type":
                        "application/json",

                    "HTTP-Referer":
                        process.env.CLIENT_URL ||
                        "http://localhost:5173",

                    "X-Title":
                        "AI Resume Analyzer Career Coach",
                },
            }
        );

        // Get AI response
        let aiText =
            response.data?.choices?.[0]
                ?.message?.content;

        if (!aiText) {
            return res.status(500).json({
                message:
                    "AI did not generate roadmap.",
            });
        }

        // Clean markdown JSON
        aiText = aiText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // Convert string to JSON
        let roadmap;

        try {
            roadmap = JSON.parse(aiText);
        } catch (error) {

            console.log(
                "ROADMAP JSON ERROR:"
            );

            console.log(aiText);

            return res.status(500).json({
                message:
                    "AI returned invalid roadmap data.",
            });
        }

        // Send response
        return res.status(200).json({
            roadmap,
        });

    } catch (error) {

        console.log(
            "=============================="
        );

        console.log(
            "ROADMAP ERROR:"
        );

        console.log(
            error.response?.data ||
            error.message
        );

        console.log(
            "=============================="
        );

        return res.status(500).json({
            message:
                error.response?.data?.error?.message ||
                error.message ||
                "Failed to generate roadmap.",
        });
    }
};


module.exports = {
    generateRoadmap,
};