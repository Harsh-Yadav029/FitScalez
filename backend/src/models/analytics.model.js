import mongoose, { Schema } from "mongoose";

const visitorAnalyticsSchema = new Schema(
    {
        deviceId: {
            type: String,
            required: true,
            index: true,
            trim: true,
        },
        path: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            default: "",
            trim: true,
        },
        referrer: {
            type: String,
            default: "",
            trim: true,
        },
        visitNumber: {
            type: Number,
            default: 1,
        },
        isReturning: {
            type: Boolean,
            default: false,
        },
        device: {
            type: Schema.Types.Mixed,
            default: null,
        },
        location: {
            type: Schema.Types.Mixed,
            default: null,
        },
        ip: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// Expire analytics older than 90 days automatically to manage DB storage efficiently
visitorAnalyticsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 });

export const VisitorAnalytics = mongoose.model("VisitorAnalytics", visitorAnalyticsSchema);
