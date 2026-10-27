import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },
        company: {
            type: String,
            trim: true,
            default: "",
        },
        service: {
            type: String,
            required: [true, "Service is required"],
            trim: true,
        },
        budget: {
            type: String,
            trim: true,
            default: "",
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
        },
        source: {
            type: String,
            enum: ["contact_page", "lead_funnel", "quote_modal", "direct"],
            default: "contact_page",
        },
        status: {
            type: String,
            enum: ["new", "contacted", "qualified", "closed"],
            default: "new",
        },
        // Visitor & Device intelligence
        deviceId: {
            type: String,
            default: "",
        },
        visitCount: {
            type: Number,
            default: 1,
        },
        isReturning: {
            type: Boolean,
            default: false,
        },
        location: {
            type: Schema.Types.Mixed,
            default: null,
        },
        device: {
            type: Schema.Types.Mixed,
            default: null,
        },
        journey: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export const Lead = mongoose.model("Lead", leadSchema);
