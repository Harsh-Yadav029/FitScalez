import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { Job } from "../models/job.model.js";

dotenv.config({
    path: "./.env",
});

const articlesDataPath = path.resolve("../articles_data.json");
const blogDirPath = path.resolve("../blog");

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fitscalez");
        console.log("Connected to MongoDB for seeding...");

        // 1. Seed Blogs
        if (fs.existsSync(articlesDataPath)) {
            const rawArticles = JSON.parse(fs.readFileSync(articlesDataPath, "utf-8"));
            console.log(`Found ${rawArticles.length} articles to seed.`);

            for (const article of rawArticles) {
                let htmlContent = article.summary || "";
                const htmlFilePath = path.join(blogDirPath, `${article.slug}.html`);

                if (fs.existsSync(htmlFilePath)) {
                    const fullHtml = fs.readFileSync(htmlFilePath, "utf-8");
                    const articleMatch = fullHtml.match(/<article[\s\S]*?<\/article>/i);
                    if (articleMatch) {
                        htmlContent = articleMatch[0];
                    }
                }

                await Blog.findOneAndUpdate(
                    { slug: article.slug },
                    {
                        title: article.title,
                        slug: article.slug,
                        description: article.metaDesc || article.summary,
                        content: htmlContent,
                        category: article.category || "General",
                        readTime: article.readTime || "5 min read",
                        author: {
                            name: article.author || "Divyansh",
                            role: article.authorRole || "Lead Web Developer",
                            avatar: "",
                        },
                        tags: article.secondaryKeywords ? article.secondaryKeywords.split(",").map((s) => s.trim()) : [],
                        published: true,
                        seo: {
                            metaTitle: article.metaTitle || article.title,
                            metaDescription: article.metaDesc || article.summary,
                            keywords: article.secondaryKeywords ? article.secondaryKeywords.split(",").map((s) => s.trim()) : [],
                        },
                    },
                    { upsert: true, new: true }
                );
                console.log(`  Seeded blog: ${article.slug}`);
            }
        }

        // 2. Seed Initial Careers/Jobs
        const defaultJobs = [
            {
                title: "Full-Stack MERN Developer",
                department: "Engineering",
                type: "Full-time",
                location: "Delhi, India (Hybrid)",
                experience: "1-3 years",
                salaryRange: "₹3,50,000 - ₹6,50,000 / year",
                description: "We are seeking a talented MERN Stack Developer proficient in React, Node.js, Express, and MongoDB to build performant web applications and custom client portals.",
                requirements: [
                    "Strong proficiency in JavaScript (ES6+), React.js, and Node.js.",
                    "Experience with MongoDB, schema design, and RESTful API architecture.",
                    "Knowledge of modern CSS, responsive web design, and Git version control."
                ],
                responsibilities: [
                    "Develop and maintain modern client web applications.",
                    "Build scalable backend services and database models.",
                    "Collaborate with designers to deliver pixel-perfect user experiences."
                ],
                isOpen: true,
            },
            {
                title: "SEO & Performance Marketing Specialist",
                department: "Marketing",
                type: "Full-time",
                location: "Delhi, India (Hybrid)",
                experience: "1-3 years",
                salaryRange: "₹3,00,000 - ₹5,50,000 / year",
                description: "Drive high-converting organic and paid campaigns for growing e-commerce and B2B clients.",
                requirements: [
                    "Proven track record in Technical SEO, on-page, and link building.",
                    "Experience managing Google Ads and Meta (FB/IG) campaigns.",
                    "Familiarity with Google Analytics 4, Search Console, and Tag Manager."
                ],
                responsibilities: [
                    "Perform keyword research and on-page optimization.",
                    "Manage paid search and social campaigns with strict ROI tracking.",
                    "Generate monthly performance reports and optimization insights."
                ],
                isOpen: true,
            }
        ];

        for (const job of defaultJobs) {
            await Job.findOneAndUpdate(
                { title: job.title },
                job,
                { upsert: true, new: true }
            );
            console.log(`  Seeded job: ${job.title}`);
        }

        console.log("\nDatabase seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error during database seeding:", error);
        process.exit(1);
    }
};

seedDatabase();
