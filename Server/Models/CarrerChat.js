const mongoose = require("mongoose");

const carrerChatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: false,
        },

        targetRole: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true,
        },

        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.models.CarrerChat ||
    mongoose.model("CarrerChat", carrerChatSchema);