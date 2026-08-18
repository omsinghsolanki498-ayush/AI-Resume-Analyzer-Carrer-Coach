const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    originalName: {
        type: String,
        required: true,
    },

    cloudinaryUrl: {
        type: String,
        required: true,
    },

    cloudinaryPublicId: {
        type: String,
        required: true,
    },

    extractedText: {
        type: String,
        default: "",
    },

    atsScore: {
        type: Number,
        default: 0,
    },

    skills: {
        type: [String],
        default: [],
    },

    summary: {
        type: String,
        default: "",
    },

    weaknesses: {
        type: [String],
        default: [],
    },

    suggestions: {
        type: [String],
        default: [],
    },

    analyzedAt: {
        type: Date,
        default: null,
    },

    reason: {
        type: String,
        default: "",
    },

    jobRoleMatch: {
        role: {
            type: String,
            default: "",
        },
    },

    score: {
        type: Number,
        default: 0,
    },

   

    missingSkills: {
        type: [String],
        default: [],
    },

    experienceLevel: {
        type: String,
        default: "",
    },

    strengths: {
        type: [String],
        default: [],
    },
},
    {
        timestamps: true,

    });

module.exports =
    mongoose.models.Resume || mongoose.model("Resume", resumeSchema);