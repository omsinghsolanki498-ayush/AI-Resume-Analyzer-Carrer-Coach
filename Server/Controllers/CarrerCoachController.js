const axios = require("axios");
const Resume = require("../Models/Resume");
const CarrerChat = require("../Models/CarrerChat");

// ==========================================
// GET CHAT HISTORY
// ==========================================

const getChat = async (req, res) => {
    try {
        const userId = req.user.id;

        const chats = await CarrerChat.find({
            user: userId,
        })
            .sort({
                createdAt: 1,
            })
            .limit(100);

        return res.status(200).json({
            chats,
        });

    } catch (error) {
        console.error("GET CHAT ERROR:", error);

        return res.status(500).json({
            message: "Failed to load chat history",
        });
    }
};

// ==========================================
// CLEAR CHAT
// ==========================================

const clearchat = async (req, res) => {
    try {
        const userId = req.user.id;

        await CarrerChat.deleteMany({
            user: userId,
        });

        return res.status(200).json({
            message: "Chat history cleared successfully",
        });

    } catch (error) {
        console.error("CLEAR CHAT ERROR:", error);

        return res.status(500).json({
            message: "Failed to clear chat history",
        });
    }
};

// ==========================================
// CAREER COACH CHAT
// ==========================================

const carrercoachChat = async (req, res) => {
    try {
        const { message } = req.body;

        // ==========================================
        // VALIDATE MESSAGE
        // ==========================================

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Please enter a question",
            });
        }

        const userId = req.user.id;

        // ==========================================
        // FIND LATEST RESUME
        // ==========================================

        const resume = await Resume.findOne({
            user: userId,
        }).sort({
            createdAt: -1,
        });

        // ==========================================
        // BUILD RESUME CONTEXT
        // ==========================================

        let resumeContext =
            "User has not uploaded a resume yet.";

        if (resume) {
            resumeContext = `
================ RESUME DATA ================

Resume File:
${resume.originalName || "N/A"}

Target Role:
${resume.jobRoleMatch?.role || "Not specified"}

ATS Score:
${resume.atsScore || 0}/100

Experience Level:
${resume.experienceLevel || "Not detected"}

Skills:
${Array.isArray(resume.skills)
    ? resume.skills.join(", ")
    : "Not available"}

Summary:
${resume.summary || "Not available"}

================ AI ANALYSIS ================

Strengths:
${
    Array.isArray(resume.strengths)
        ? resume.strengths.join("\n- ")
        : "Not available"
}

Weaknesses:
${
    Array.isArray(resume.weaknesses)
        ? resume.weaknesses.join("\n- ")
        : "Not available"
}

Missing Skills:
${
    Array.isArray(resume.missingSkills)
        ? resume.missingSkills.join("\n- ")
        : "Not available"
}

Suggestions:
${
    Array.isArray(resume.suggestions)
        ? resume.suggestions.join("\n- ")
        : "Not available"
}

Job Role Match:

Role:
${resume.jobRoleMatch?.role || "Not specified"}

Score:
${resume.jobRoleMatch?.score || 0}%

Reason:
${resume.reason || "Not available"}

================================================
`;
        }

        // ==========================================
        // SAVE USER MESSAGE
        // ==========================================

        await CarrerChat.create({
            user: userId,
            resume: resume?._id,
            role: "user",
            message: message.trim(),
        });

        // ==========================================
        // GET PREVIOUS CHAT
        // ==========================================

        const previousChats = await CarrerChat.find({
            user: userId,
        })
            .sort({
                createdAt: -1,
            })
            .limit(20);

        // ==========================================
        // BUILD CHAT HISTORY
        // ==========================================

        const chatHistory = previousChats
            .reverse()
            .map((chat) => ({
                role:
                    chat.role === "assistant"
                        ? "assistant"
                        : "user",

                content: chat.message,
            }));

        // ==========================================
        // SYSTEM PROMPT
        // ==========================================

        const systemPrompt = `
You are an expert AI Career Coach.

You are helping a job seeker improve their
career and become job-ready.

You have access to their resume and AI analysis.

Your responsibilities:

1. Resume improvement
2. ATS optimization
3. Full Stack Developer preparation
4. Technical interview preparation
5. HR interview preparation
6. Missing skill recommendations
7. Learning roadmap
8. Project recommendations
9. Job search guidance
10. Career planning

IMPORTANT RULES:

- Give personalized answers.
- Use the user's resume context.
- Do not invent resume information.
- If something is missing, clearly say it.
- Give practical actionable steps.
- Prefer bullet points.
- Keep answers easy to understand.
- For technical questions, provide examples when useful.
- If the user asks for a roadmap, give a realistic step-by-step roadmap.

USER RESUME + AI ANALYSIS:

${resumeContext}
`;

        // ==========================================
        // OPENROUTER
        // ==========================================

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model:
                    process.env.AI_MODEL ||
                    "openai/gpt-3.5-turbo",

                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },

                    ...chatHistory,
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

        // ==========================================
        // GET AI RESPONSE
        // ==========================================

        const reply =
            response.data?.choices?.[0]?.message?.content;

        if (!reply) {
            return res.status(500).json({
                message: "AI did not return a response.",
            });
        }

        // ==========================================
        // SAVE AI RESPONSE
        // ==========================================

        await CarrerChat.create({
            user: userId,
            resume: resume?._id,
            role: "assistant",
            message: reply,
        });

        // ==========================================
        // SEND RESPONSE
        // ==========================================

        return res.status(200).json({
            reply,
        });

    } catch (error) {
        console.error("CAREER COACH ERROR:");

        console.error(
            error.response?.data ||
            error.message
        );

        return res.status(500).json({
            message:
                error.response?.data?.error?.message ||
                "Career Coach failed.",
        });
    }
};

module.exports = {
    carrercoachChat,
    clearchat,
    getChat,
};