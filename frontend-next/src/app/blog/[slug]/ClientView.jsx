"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { blogService } from "@/services/api.service";
import articlesData from "@/data/articles.json";

const getStaticPost = (slug) => {
    const staticArticle = articlesData.find((a) => a.slug === slug);
    if (!staticArticle) return { blog: null, related: [] };

    const blog = {
        _id: staticArticle.slug,
        slug: staticArticle.slug,
        title: staticArticle.title,
        description: staticArticle.metaDesc || staticArticle.summary,
        category: staticArticle.category,
        readTime: staticArticle.readTime || "6 min read",
        views: staticArticle.views || 420,
        createdAt: staticArticle.date || "Sep 2026",
        author: {
            name: staticArticle.author || "Divyansh",
            role: staticArticle.authorRole || "Lead Web Developer",
        },
        content: staticArticle.contentHtml || `<p>${staticArticle.summary}</p>`,
    };

    const related = articlesData
        .filter((a) => a.slug !== slug && a.category === staticArticle.category)
        .slice(0, 3)
        .map((r) => ({
            _id: r.slug,
            slug: r.slug,
            title: r.title,
            category: r.category,
            readTime: r.readTime,
        }));

    return { blog, related };
};

const BlogPostClient = ({ initialSlug }) => {
    const params = useParams();
    const slug = initialSlug || params?.slug;

    const initialData = getStaticPost(slug);
    const [blog, setBlog] = useState(initialData.blog);
    const [relatedBlogs, setRelatedBlogs] = useState(initialData.related);
    const [loading, setLoading] = useState(!initialData.blog);
    const [error, setError] = useState(initialData.blog ? "" : "Article not found");

    useEffect(() => {
        if (!slug) return;
        const local = getStaticPost(slug);
        if (local.blog) {
            setBlog(local.blog);
            setRelatedBlogs(local.related);
            setLoading(false);
            setError("");
        }

        const fetchArticle = async () => {
            try {
                const res = await blogService.getBlogBySlug(slug);
                if (res.data?.blog) {
                    setBlog(res.data.blog);
                    setRelatedBlogs(res.data.relatedBlogs || []);
                    setLoading(false);
                    setError("");
                }
            } catch (err) {
                if (!local.blog) {
                    setError("The requested article could not be loaded.");
                    setLoading(false);
                }
            }
        };

        fetchArticle();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [slug]);

    if (loading) {
        return (
            <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div>Loading article...</div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="container" style={{ minHeight: "70vh", padding: "160px 0", textAlign: "center" }}>
                <h2>Article Not Found</h2>
                <p style={{ color: "var(--text-muted)", marginTop: "10px" }}>The requested article could not be loaded.</p>
                <Link href="/blog" className="btn btn-primary" style={{ marginTop: "20px" }}>
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <article style={{ padding: "140px 0 60px" }}>
            <div className="container" style={{ maxWidth: "860px" }}>
                <div style={{ marginBottom: "20px" }}>
                    <Link href="/blog" style={{ color: "var(--primary-light)", textDecoration: "none", fontSize: "0.9rem" }}>
                        ← Back to all articles
                    </Link>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--primary-light)", fontWeight: "600", textTransform: "uppercase" }}>
                        {blog.category}
                    </span>
                    <span>•</span>
                    <span>⏳ {blog.readTime}</span>
                    <span>•</span>
                    <span>👁️ {blog.views} views</span>
                </div>

                <h1 style={{ fontSize: "2.4rem", lineHeight: "1.3", marginBottom: "20px" }}>
                    {blog.title}
                </h1>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: "30px", fontSize: "0.9rem" }}>
                    <div>
                        <strong>{blog.author?.name || "Divyansh"}</strong>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{blog.author?.role || "Lead Web Developer"}</div>
                    </div>
                </div>

                {/* Article Content */}
                <div
                    className="blog-content"
                    style={{ lineHeight: "1.8", color: "var(--text)", fontSize: "1.05rem" }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Related Articles */}
                {relatedBlogs.length > 0 && (
                    <div style={{ marginTop: "60px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
                        <h3>Related Articles</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginTop: "20px" }}>
                            {relatedBlogs.map((rel) => (
                                <div key={rel._id} className="card" style={{ padding: "20px" }}>
                                    <span style={{ fontSize: "0.75rem", color: "var(--primary-light)" }}>{rel.category}</span>
                                    <h4 style={{ margin: "8px 0" }}>
                                        <Link href={`/blog/${rel.slug}`} style={{ color: "var(--text)", textDecoration: "none" }}>
                                            {rel.title}
                                        </Link>
                                    </h4>
                                    <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>⏳ {rel.readTime}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
};

export default BlogPostClient;
