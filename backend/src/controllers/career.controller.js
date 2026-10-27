import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

import mongoose from "mongoose";

const defaultRolesData = [
    {
        _id: "default-1",
        title: "Full Stack Web Developer (MERN)",
        department: "Engineering",
        type: "Full-Time",
        location: "Delhi (Hybrid)",
        salaryRange: "₹3.5L - ₹7L/year",
        experience: "1-3 Years Experience",
        description: "Build and maintain modern web applications using React.js, Node.js, Express and MongoDB. Collaborate with designers and clients to deliver pixel-perfect solutions.",
        isOpen: true,
    },
    {
        _id: "default-2",
        title: "Digital Marketing Specialist",
        department: "Marketing",
        type: "Full-Time",
        location: "Delhi (Hybrid)",
        salaryRange: "₹2.5L - ₹5L/year",
        experience: "1-2 Years Experience",
        description: "Manage SEO campaigns, social media accounts and paid advertising for 10+ client accounts. Strong analytical mindset and creative thinking required.",
        isOpen: true,
    },
    {
        _id: "default-3",
        title: "SEO & Content Marketing Specialist",
        department: "Marketing",
        type: "Full-Time",
        location: "Remote / Delhi",
        salaryRange: "₹2L - ₹4L/year",
        experience: "1+ Year Experience",
        description: "Drive organic growth through keyword research, on-page SEO, link building and compelling content creation. Experience with Ahrefs/SEMrush is a plus.",
        isOpen: true,
    },
    {
        _id: "default-4",
        title: "UI/UX Designer",
        department: "Design",
        type: "Full-Time",
        location: "Delhi (Hybrid)",
        salaryRange: "₹2.5L - ₹5L/year",
        experience: "1-3 Years Experience",
        description: "Create stunning user interfaces and experiences using Figma. Strong portfolio with both web and mobile design required. Knowledge of design systems is a plus.",
        isOpen: true,
    },
    {
        _id: "default-5",
        title: "Video Editor & Content Creator",
        department: "Creative",
        type: "Full-Time / Freelance",
        location: "Delhi / Remote",
        salaryRange: "₹1.8L - ₹4L/year",
        experience: "Fresher/Experienced",
        description: "Edit engaging videos for social media, YouTube and commercial use. Proficiency in Premiere Pro and After Effects required. Creative storytelling is key.",
        isOpen: true,
    },
    {
        _id: "default-6",
        title: "Business Development Executive",
        department: "Sales",
        type: "Full-Time",
        location: "Delhi",
        salaryRange: "₹2L - ₹5L + Commission",
        experience: "1+ Year Experience",
        description: "Drive business growth by acquiring new clients in web development and digital marketing. Strong communication, networking and sales skills essential.",
        isOpen: true,
    },
];

const getAllJobs = asyncHandler(async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res
            .status(200)
            .json(new ApiResponse(200, defaultRolesData, "Open jobs fetched successfully (fallback)"));
    }

    const jobs = await Job.find({ isOpen: true }).sort({ createdAt: -1 });

    if (jobs.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(200, defaultRolesData, "Open jobs fetched successfully"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, jobs, "Open jobs fetched successfully"));
});

const getJobById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
        throw new ApiError(404, "Job position not found");
    }

    return res.status(200).json(new ApiResponse(200, job, "Job fetched successfully"));
});

const createJob = asyncHandler(async (req, res) => {
    const {
        title,
        department,
        type,
        location,
        experience,
        salaryRange,
        description,
        requirements,
        responsibilities,
    } = req.body;

    if (!title || !department || !description) {
        throw new ApiError(400, "Title, department, and description are required fields");
    }

    const job = await Job.create({
        title,
        department,
        type: type || "Full-time",
        location: location || "Delhi, India (Hybrid)",
        experience: experience || "1-3 years",
        salaryRange: salaryRange || "Competitive",
        description,
        requirements: requirements || [],
        responsibilities: responsibilities || [],
        isOpen: true,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, job, "Job created successfully"));
});

const applyForJob = asyncHandler(async (req, res) => {
    const { job, jobTitle, name, email, phone, portfolioUrl, experience, coverLetter } = req.body;

    if (!jobTitle || !name || !email || !phone) {
        throw new ApiError(400, "Job title, name, email, and phone are required");
    }

    let resumeUrl = "";
    if (req.file) {
        resumeUrl = `/temp/${req.file.filename}`;
    }

    const application = await Application.create({
        job: job || null,
        jobTitle,
        name,
        email,
        phone,
        portfolioUrl: portfolioUrl || "",
        experience: experience || "Fresher",
        coverLetter: coverLetter || "",
        resumeUrl,
        status: "submitted",
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                application,
                "Your application has been received! Our HR team will reach out within 48 hours."
            )
        );
});

const getAllApplications = asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) {
        query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const applications = await Application.find(query)
        .populate("job", "title department")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Application.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                applications,
                total,
                page: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
            "Applications fetched successfully"
        )
    );
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["submitted", "reviewing", "shortlisted", "rejected", "hired"].includes(status)) {
        throw new ApiError(400, "Invalid application status");
    }

    const application = await Application.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, application, "Application status updated successfully"));
});

export {
    getAllJobs,
    getJobById,
    createJob,
    applyForJob,
    getAllApplications,
    updateApplicationStatus,
};
