const axios = require("axios");
const Resume = require("../Models/Resume");


// ==========================================
// GET JOB RECOMMENDATIONS
// ==========================================

const getJobRecommendations = async (req, res) => {
    try {

        const userId = req.user.id;

        // ======================================
        // GET LATEST RESUME
        // ======================================

        const resume = await Resume.findOne({
            user: userId,
        }).sort({
            createdAt: -1,
        });

        if (!resume) {
            return res.status(404).json({
                message:
                    "Please upload and analyze your resume first.",
            });
        }


        // ======================================
        // RESUME DATA
        // ======================================

        const skills = Array.isArray(resume.skills)
            ? resume.skills
            : [];

        const missingSkills =
            Array.isArray(resume.missingSkills)
                ? resume.missingSkills
                : [];

        const experienceLevel =
            resume.experienceLevel ||
            "Beginner";

        const targetRole =
            resume.jobRoleMatch?.role ||
            "Full Stack Developer";


        // ======================================
        // CHECK API KEY
        // ======================================

        if (!process.env.OPENROUTER_API_KEY) {
            return res.status(500).json({
                message:
                    "OPENROUTER_API_KEY is missing.",
            });
        }


        // ======================================
        // AI PROMPT
        // ======================================

        const prompt = `
You are an expert technical recruiter and career advisor.

Analyze the candidate's resume information and recommend
the most suitable job roles.

Candidate Information:

Target Role:
${targetRole}

Experience Level:
${experienceLevel}

Current Skills:
${skills.join(", ") || "None"}

Missing Skills:
${missingSkills.join(", ") || "None"}

ATS Score:
${resume.atsScore || 0}

Create 5 suitable job recommendations.

For each job include:

- job title
- match percentage
- why the candidate is suitable
- required skills
- missing skills
- preparation advice

Match percentage should be between 0 and 100.

Return ONLY valid JSON.

Use exactly this structure:

{
    "targetRole": "${targetRole}",
    "recommendations": [
        {
            "title": "Full Stack Developer",
            "match": 85,
            "reason": "Good match because...",
            "requiredSkills": [
                "React",
                "Node.js",
                "MongoDB"
            ],
            "missingSkills": [
                "Docker"
            ],
            "preparation": [
                "Learn Docker",
                "Build one production project"
            ]
        }
    ]
}
`;


        // ======================================
        // OPENROUTER
        // ======================================

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
                            "You are an expert recruiter. Return valid JSON only.",
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


        // ======================================
        // GET AI RESPONSE
        // ======================================

        let aiText =
            response.data?.choices?.[0]
                ?.message?.content;


        if (!aiText) {
            return res.status(500).json({
                message:
                    "AI did not return job recommendations.",
            });
        }


        // ======================================
        // CLEAN JSON
        // ======================================

        aiText = aiText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();


        // ======================================
        // PARSE JSON
        // ======================================

        let jobs;

        try {

            jobs = JSON.parse(aiText);

        } catch (error) {

            console.log(
                "JOB JSON ERROR:",
                aiText
            );

            return res.status(500).json({
                message:
                    "AI returned invalid job data.",
            });
        }


        // ======================================
        // SEND RESPONSE
        // ======================================

        return res.status(200).json({
            jobs,
        });


    } catch (error) {

        console.log(
            "================================"
        );

        console.log(
            "JOB RECOMMENDATION ERROR:"
        );

        console.log(
            error.response?.data ||
            error.message
        );

        console.log(
            "================================"
        );


        return res.status(500).json({
            message:
                error.response?.data?.error?.message ||
                error.message ||
                "Failed to generate job recommendations.",
        });
    }
};


module.exports = {
    getJobRecommendations,
};