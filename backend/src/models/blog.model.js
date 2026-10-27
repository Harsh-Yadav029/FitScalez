import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Blog title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        category: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        readTime: {
            type: String,
            default: "5 min read",
        },
        coverImage: {
            type: String,
            default: "images/og-image.jpg",
        },
        author: {
            name: { type: String, default: "Fitscalez Editorial Team" },
            role: { type: String, default: "Tech & Marketing Strategist" },
            avatar: { type: String, default: "" },
        },
        tags: {
            type: [String],
            default: [],
        },
        published: {
            type: Boolean,
            default: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        seo: {
            metaTitle: { type: String, default: "" },
            metaDescription: { type: String, default: "" },
            keywords: { type: [String], default: [] },
        },
    },
    {
        timestamps: true,
    }
);

export const Blog = mongoose.model("Blog", blogSchema);
