import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Lead } from "../models/lead.model.js";

const createLead = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        phone,
        company,
        service,
        budget,
        message,
        source,
        deviceId,
        visitCount,
        isReturning,
        location,
        device,
        journey,
    } = req.body;

    if (!name || !email || !phone || !service || !message) {
        throw new ApiError(400, "Name, email, phone, service, and message are required fields");
    }

    const lead = await Lead.create({
        name,
        email,
        phone,
        company: company || "",
        service,
        budget: budget || "",
        message,
        source: source || "contact_page",
        deviceId: deviceId || "",
        visitCount: visitCount || 1,
        isReturning: isReturning || false,
        location: location || null,
        device: device || null,
        journey: journey || [],
    });

    return res
        .status(201)
        .json(new ApiResponse(201, lead, "Your inquiry has been submitted successfully"));
});

const getAllLeads = asyncHandler(async (req, res) => {
    const { status, service, page = 1, limit = 20, search } = req.query;

    const query = {};

    if (status) {
        query.status = status;
    }

    if (service) {
        query.service = service;
    }

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { company: { $regex: search, $options: "i" } },
        ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const leads = await Lead.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const totalLeads = await Lead.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                leads,
                total: totalLeads,
                page: parseInt(page),
                totalPages: Math.ceil(totalLeads / parseInt(limit)),
            },
            "Leads fetched successfully"
        )
    );
});

const getLeadById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
        throw new ApiError(404, "Lead not found");
    }

    return res.status(200).json(new ApiResponse(200, lead, "Lead fetched successfully"));
});

const updateLeadStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["new", "contacted", "qualified", "closed"].includes(status)) {
        throw new ApiError(400, "Invalid or missing status field");
    }

    const lead = await Lead.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );

    if (!lead) {
        throw new ApiError(404, "Lead not found");
    }

    return res.status(200).json(new ApiResponse(200, lead, "Lead status updated successfully"));
});

const deleteLead = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
        throw new ApiError(404, "Lead not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Lead deleted successfully"));
});

export { createLead, getAllLeads, getLeadById, updateLeadStatus, deleteLead };
