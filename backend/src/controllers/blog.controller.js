import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pre-load local articles for instant fallback when MongoDB is offline/empty
let localArticlesCache = [];
try {
    const rawData = fs.readFileSync(path.join(__dirname, "../../../articles_data.json"), "utf8");
    localArticlesCache = JSON.parse(rawData);
} catch (e) {
    console.warn("Could not preload articles_data.json:", e.message);
}

const getStaticFallbackBlogs = (category, search, page = 1, limit = 50) => {
    let filtered = localArticlesCache.map((a, i) => ({
        _id: a.slug || String(i),
        title: a.title,
        slug: a.slug,
        description: a.summary || a.metaDesc,
        category: a.category,
        readTime: a.readTime || "5 min read",
        coverImage: "images/og-image.jpg",
        author: { name: a.author || "Divyansh" },
        createdAt: a.date || "2026-09-01",
    }));

    if (category && category.toLowerCase() !== "all") {
        filtered = filtered.filter(
            (b) => b.category && b.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (search) {
        const q = search.toLowerCase().trim();
        filtered = filtered.filter(
            (b) =>
                (b.title && b.title.toLowerCase().includes(q)) ||
                (b.description && b.description.toLowerCase().includes(q)) ||
                (b.category && b.category.toLowerCase().includes(q))
        );
    }

    const total = filtered.length;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginated = filtered.slice(skip, skip + parseInt(limit));

    return {
        blogs: paginated,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
    };
};

const getAllBlogs = asyncHandler(async (req, res) => {
    const { category, search, page = 1, limit = 50 } = req.query;

    // If MongoDB is not connected, instantly return cached static articles
    if (mongoose.connection.readyState !== 1) {
        const fallback = getStaticFallbackBlogs(category, search, page, limit);
        return res
            .status(200)
            .json(new ApiResponse(200, fallback, "Blogs retrieved successfully (local fallback)"));
    }

    const query = { published: true };

    if (category && category !== "All") {
        query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { tags: { $in: [new RegExp(search, "i")] } },
        ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const blogs = await Blog.find(query)
        .select("-content")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const totalBlogs = await Blog.countDocuments(query);

    // If database connected but empty, serve articles_data.json
    if (totalBlogs === 0 && (!category || category === "all") && !search) {
        const fallback = getStaticFallbackBlogs(category, search, page, limit);
        return res
            .status(200)
            .json(new ApiResponse(200, fallback, "Blogs retrieved successfully"));
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                blogs,
                total: totalBlogs,
                page: parseInt(page),
                totalPages: Math.ceil(totalBlogs / parseInt(limit)),
            },
            "Blogs retrieved successfully"
        )
    );
});

const getBlogBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    // If MongoDB is not connected, check local fallback articles
    if (mongoose.connection.readyState !== 1) {
        const article = localArticlesCache.find((a) => a.slug === slug);
        if (!article) {
            throw new ApiError(404, "Blog article not found");
        }

        const relatedBlogs = localArticlesCache
            .filter((a) => a.slug !== slug && a.category === article.category)
            .slice(0, 3)
            .map((r) => ({
                title: r.title,
                slug: r.slug,
                description: r.summary || r.metaDesc,
                category: r.category,
                readTime: r.readTime,
            }));

        const formattedBlog = {
            title: article.title,
            slug: article.slug,
            description: article.metaDesc || article.summary,
            content: article.contentHtml || `<p>${article.summary}</p>`,
            category: article.category,
            readTime: article.readTime,
            author: { name: article.author || "Divyansh", role: article.authorRole || "Lead Web Developer" },
            views: 420,
            createdAt: article.date || "Sep 2026",
        };

        return res.status(200).json(
            new ApiResponse(200, { blog: formattedBlog, relatedBlogs }, "Blog article fetched successfully")
        );
    }

    const blog = await Blog.findOneAndUpdate(
        { slug, published: true },
        { $inc: { views: 1 } },
        { new: true }
    );

    if (!blog) {
        throw new ApiError(404, "Blog article not found");
    }

    // Also fetch 3 related posts in the same category
    const relatedBlogs = await Blog.find({
        category: blog.category,
        slug: { $ne: blog.slug },
        published: true,
    })
        .select("title slug description category readTime coverImage createdAt")
        .limit(3);

    return res.status(200).json(
        new ApiResponse(
            200,
            { blog, relatedBlogs },
            "Blog article fetched successfully"
        )
    );
});

const createBlog = asyncHandler(async (req, res) => {
    const {
        title,
        slug,
        description,
        content,
        category,
        readTime,
        coverImage,
        author,
        tags,
        published,
        seo,
    } = req.body;

    if (!title || !slug || !description || !content || !category) {
        throw new ApiError(400, "Title, slug, description, content, and category are required");
    }

    const existingBlog = await Blog.findOne({ slug: slug.toLowerCase() });
    if (existingBlog) {
        throw new ApiError(409, "A blog with this slug already exists");
    }

    const blog = await Blog.create({
        title,
        slug: slug.toLowerCase(),
        description,
        content,
        category,
        readTime: readTime || "5 min read",
        coverImage: coverImage || "images/og-image.jpg",
        author: author || undefined,
        tags: tags || [],
        published: published !== undefined ? published : true,
        seo: seo || undefined,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, blog, "Blog article created successfully"));
});

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    return res.status(200).json(new ApiResponse(200, blog, "Blog updated successfully"));
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Blog deleted successfully"));
});

export { getAllBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };
