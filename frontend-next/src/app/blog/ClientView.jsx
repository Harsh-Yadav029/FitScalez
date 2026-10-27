"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// SeoHelmet replaced by Next.js metadata
import { blogService } from "@/services/api.service";

import articlesData from "@/data/articles.json";

const categories = [
    { label: "All Topics (14)", value: "all" },
    { label: "ðŸ’» Web Dev", value: "Web Development" },
    { label: "âš¡ Technology", value: "Technology" },
    { label: "ðŸ” SEO", value: "SEO" },
    { label: "ðŸ“ˆ Marketing", value: "Digital Marketing" },
    { label: "ðŸ›’ E-Commerce", value: "E-commerce" },
    { label: "ðŸ“± Mobile Apps", value: "Mobile Apps" },
    { label: "ðŸŽ¨ Creative", value: "Creative Production" },
    { label: "ðŸ“Š BI & Analytics", value: "Business Intelligence" },
    { label: "ðŸš€ Strategy", value: "Growth & Strategy" },
];

// Helper to filter static articles
const filterStaticArticles = (category, search) => {
    return articlesData
        .map((a, index) => ({
            _id: a.slug || String(index),
            slug: a.slug,
            title: a.title,
            description: a.summary || a.metaDesc,
            category: a.category,
            readTime: a.readTime || "5 min read",
            author: { name: a.author || "Divyansh" },
            authorRole: a.authorRole || "Lead Web Developer",
            date: a.date || "Sep 2026",
            createdAt: a.date || "2026-09-01",
        }))
        .filter((article) => {
            const matchesCat =
                category === "all" ||
                !category ||
                article.category?.toLowerCase() === category.toLowerCase();

            const q = (search || "").toLowerCase().trim();
            const matchesSearch =
                !q ||
                article.title.toLowerCase().includes(q) ||
                article.description.toLowerCase().includes(q) ||
                article.category.toLowerCase().includes(q);

            return matchesCat && matchesSearch;
        });
};

const Blog = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get("category") || "all";
    const currentSearch = searchParams.get("search") || "";
    const [searchInput, setSearchInput] = useState(currentSearch);

    // Instant initial render without blank loading screen
    const [blogs, setBlogs] = useState(() => filterStaticArticles(category, currentSearch));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSearchInput(searchParams.get("search") || "");
    }, [searchParams]);

    useEffect(() => {
        // Immediately render filtered results so there's zero UI lag
        setBlogs(filterStaticArticles(category, currentSearch));

        const fetchBlogs = async () => {
            try {
                const params = {};
                if (category && category !== "all") params.category = category;
                if (currentSearch) params.search = currentSearch;

                const res = await blogService.getAllBlogs(params);
                const fetched = res.data?.blogs || [];
                if (fetched.length > 0) {
                    setBlogs(fetched);
                }
            } catch (err) {
                // Already displaying static articles immediately, no action needed
            }
        };

        fetchBlogs();
    }, [category, currentSearch]);

    // Ensure newly rendered blog cards are visible immediately
    useEffect(() => {
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll(".blog-card, .featured-blog-card");
            elements.forEach((el) => {
                el.classList.add("animated");
            });
        }, 10);
        return () => clearTimeout(timer);
    }, [blogs, category]);

    const handleCategoryClick = (catVal) => {
        if (catVal === "all") {
            searchParams.delete("category");
        } else {
            searchParams.set("category", catVal);
        }
        setSearchParams(searchParams);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            searchParams.set("search", searchInput.trim());
        } else {
            searchParams.delete("search");
        }
        setSearchParams(searchParams);
    };

    return (
        <>
            

            {/* Page Hero */}
            <div className="page-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span>â€º</span>
                        <span>Blog</span>
                    </div>
                    <div className="badge" style={{ marginBottom: "16px" }}>ðŸ“š Insights & Knowledge Hub</div>
                    <h1>Engineering & <span className="gradient-text">Growth Insights</span></h1>
                    <p>Actionable guides on website development costs, MERN stack architecture, Google SEO rankings, digital advertising ROI, and business intelligence.</p>
                </div>
            </div>

            {/* Main Content */}
            <section className="section-padding">
                <div className="container">

                    {/* Search & Filters */}
                    <div className="search-filter-box">
                        <span className="search-icon">ðŸ”</span>
                        <input
                            type="text"
                            id="articleSearch"
                            className="search-input"
                            placeholder="Search guides by keyword (e.g. pricing, SEO, custom software)..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearchSubmit(e);
                            }}
                        />
                    </div>

                    <div className="blog-filter-pills" id="categoryFilters">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                className={`filter-pill ${category === cat.value ? "active" : ""}`}
                                onClick={() => handleCategoryClick(cat.value)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Featured Blog Card */}
                    {category === "all" && !searchParams.get("search") && (
                        <div className="featured-blog-card animate-on-scroll" id="featuredPostCard">
                            <div>
                                <div className="featured-badge">ðŸ”¥ Most Popular Guide</div>
                                <div className="blog-meta" style={{ marginBottom: "12px" }}>
                                    <span>Web Development</span>
                                    <span className="dot"></span>
                                    <span>Sep 2026</span>
                                    <span className="dot"></span>
                                    <span>8 min read</span>
                                </div>
                                <h2 style={{ fontSize: "1.85rem", color: "white", marginBottom: "14px", lineHeight: "1.3" }}>
                                    <Link href="/blog/website-development-cost-in-india">
                                        How Much Does Website Development Cost in India? (2025-2026 Price Guide)
                                    </Link>
                                </h2>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: "1.7", marginBottom: "24px" }}>
                                    A transparent, comprehensive guide to website pricing in India. We break down the real costs of domain, hosting, UI/UX design, custom MERN stack engineering, and ongoing maintenance.
                                </p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <div className="author-avatar" style={{ width: "40px", height: "40px", fontSize: "0.95rem" }}>D</div>
                                        <div>
                                            <div style={{ fontSize: "0.88rem", fontWeight: "600", color: "white" }}>Divyansh</div>
                                            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>Lead Web Developer</div>
                                        </div>
                                    </div>
                                    <Link href="/blog/website-development-cost-in-india" className="btn btn-primary btn-sm">
                                        Read Complete Guide â†’
                                    </Link>
                                </div>
                            </div>

                            <div className="featured-preview-box">
                                <div style={{ fontSize: "3rem", marginBottom: "12px" }}>ðŸ’°</div>
                                <div style={{ fontSize: "1.3rem", fontWeight: "700", color: "white", marginBottom: "8px" }}>
                                    â‚¹25,000 â€“ â‚¹1,50,000+
                                </div>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "16px", textAlign: "center" }}>
                                    Realistic market breakdown for custom business websites & MERN platforms.
                                </p>
                                <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                                    <span style={{ padding: "4px 10px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", fontSize: "0.75rem", color: "var(--accent2)" }}>
                                        No Hidden Costs
                                    </span>
                                    <span style={{ padding: "4px 10px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", fontSize: "0.75rem", color: "var(--primary-light)" }}>
                                        100% Code Ownership
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Blog Cards Grid */}
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>Fetching latest articles...</div>
                    ) : blogs.length === 0 ? (
                        <div className="card" style={{ padding: "40px", textAlign: "center" }}>
                            <h3>No articles found</h3>
                            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>Try selecting another category or clearing your search query.</p>
                            <button className="btn btn-outline" style={{ marginTop: "16px" }} onClick={() => handleCategoryClick("all")}>
                                View All Articles
                            </button>
                        </div>
                    ) : (
                        <div className="blog-grid" id="articlesGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
                            {blogs.map((blog) => (
                                <div key={blog._id} className="card blog-card article-card animate-on-scroll animated">
                                    <div className="blog-body">
                                        <div className="blog-meta">
                                            <span>{blog.category}</span>
                                            <span className="dot"></span>
                                            <span>{blog.date || "Sep 2026"}</span>
                                            <span className="dot"></span>
                                            <span>{blog.readTime || "6 min read"}</span>
                                        </div>

                                        <h3>
                                            <Link to={`/blog/${blog.slug}`}>
                                                {blog.title}
                                            </Link>
                                        </h3>

                                        <p>
                                            {blog.description}
                                        </p>

                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "14px", marginTop: "auto" }}>
                                            <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
                                                By {blog.author?.name || "Divyansh"}
                                            </span>
                                            <Link to={`/blog/${blog.slug}`} className="blog-read-more">
                                                Read Article â†’
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Newsletter Signup CTA Section */}
                    <div className="cta-section animate-on-scroll animated" style={{ marginTop: "80px", padding: "60px 40px" }}>
                        <h2>
                            Get Tactical Growth Insights <span className="gradient-text">Every Week</span>
                        </h2>
                        <p style={{ maxWidth: "580px", margin: "0 auto 28px" }}>
                            Join 2,000+ Indian founders and business executives who receive our curated tech and marketing blueprints.
                        </p>
                        <form
                            style={{ display: "flex", gap: "12px", maxWidth: "480px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Thank you for subscribing to Fitscalez Insights!");
                                e.target.reset();
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Enter your business email"
                                required
                                style={{
                                    flex: "1 1 240px",
                                    padding: "14px 20px",
                                    borderRadius: "50px",
                                    background: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    color: "white",
                                    fontSize: "0.9rem",
                                    outline: "none",
                                }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
                                Subscribe â†’
                            </button>
                        </form>
                        <p style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "14px", marginBottom: "0", position: "relative" }}>
                            No spam. One actionable email every Wednesday. Unsubscribe anytime.
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Blog;

