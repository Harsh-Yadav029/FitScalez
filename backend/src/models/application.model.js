import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
    {
        job: {
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: false,
        },
        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: [true, "Applicant name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Applicant email is required"],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, "Applicant phone number is required"],
            trim: true,
        },
        portfolioUrl: {
            type: String,
            trim: true,
            default: "",
        },
        experience: {
            type: String,
            default: "Fresher",
        },
        coverLetter: {
            type: String,
            trim: true,
            default: "",
        },
        resumeUrl: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["submitted", "reviewing", "shortlisted", "rejected", "hired"],
            default: "submitted",
        },
    },
    {
        timestamps: true,
    }
);

export const Application = mongoose.model("Application", applicationSchema);
