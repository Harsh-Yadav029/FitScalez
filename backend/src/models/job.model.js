import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Job title is required"],
            trim: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["Full-time", "Part-time", "Internship", "Remote"],
            default: "Full-time",
        },
        location: {
            type: String,
            default: "Delhi, India (Hybrid)",
        },
        experience: {
            type: String,
            default: "1-3 years",
        },
        salaryRange: {
            type: String,
            default: "Competitive / Market standard",
        },
        description: {
            type: String,
            required: true,
        },
        requirements: {
            type: [String],
            default: [],
        },
        responsibilities: {
            type: [String],
            default: [],
        },
        isOpen: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Job = mongoose.model("Job", jobSchema);
