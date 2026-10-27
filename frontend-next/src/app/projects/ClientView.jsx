"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// SeoHelmet replaced by Next.js metadata

const Projects = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Re-trigger scroll animations whenever filter category changes
    useEffect(() => {
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll("#projectsGrid .project-card");
            elements.forEach((el) => {
                el.classList.add("animated");
            });
        }, 10);
        return () => clearTimeout(timer);
    }, [selectedCategory]);

    const projectsData = [
        {
            category: "web",
            badge: "Live Project",
            image: "/images/project-walktheplan.jpg",
            catText: "Web App â€¢ Tech Innovation",
            title: "Walk The Plan â€” 1:1 Blueprint Projection",
            desc: "High-performance web platform built for India's groundbreaking 1:1 life-size architectural projection facility. Features online studio slot booking, interactive walkthrough showcase, and seamless Razorpay payment integration.",
            metric: "âš¡ Razorpay Integrated â€¢ ðŸŒ 1:1 Scale Tech",
            tags: ["React.js", "Razorpay", "Vite", "TailwindCSS", "Booking System"],
            link: "https://walktheplan.in",
            btnText: "Visit walktheplan.in â†—",
            external: true,
        },
        {
            category: "web",
            badge: "Live Project",
            image: "/images/project-houseofsymmetry.jpg",
            catText: "Luxury Architecture â€¢ Portfolio",
            title: "House of Symmetry â€” Architecture & Design",
            desc: "Ultra-luxurious, minimalist digital portfolio designed and engineered for an elite architectural and interior design firm. Delivers immersive spatial storytelling, ultra-fast imagery loading, and high-conversion client consultation inquiries.",
            metric: "ðŸ›ï¸ Luxury Spatial Design â€¢ ðŸ“ˆ High-End Leads",
            tags: ["Architectural Web", "UI/UX Design", "SEO Optimized", "Mobile Responsive"],
            link: "https://www.houseofsymmetry.in",
            btnText: "Visit houseofsymmetry.in â†—",
            external: true,
        },
        {
            category: "web",
            icon: "ðŸ›’",
            bg: "linear-gradient(135deg, rgba(108,99,255,0.3), rgba(56,189,248,0.2))",
            catText: "Web Development",
            title: "FashionWave E-Commerce Platform",
            desc: "Complete MERN Stack e-commerce platform for a fashion brand with 5000+ products, Razorpay integration and custom admin dashboard.",
            metric: "+180% Revenue â€¢ +320% Organic Traffic",
            tags: ["React.js", "Node.js", "MongoDB", "Razorpay"],
        },
        {
            category: "marketing",
            icon: "ðŸ“±",
            bg: "linear-gradient(135deg, rgba(255,101,132,0.3), rgba(251,146,60,0.2))",
            catText: "Social Media Marketing",
            title: "GreenLeaf Organics â€” Brand Growth",
            desc: "Multi-platform social media campaign that grew Instagram from 2K to 50K followers in 4 months, increasing brand awareness by 300%.",
            metric: "2K â†’ 50K Followers â€¢ +300% Engagement",
            tags: ["Instagram", "Facebook", "Content Strategy"],
        },
        {
            category: "video",
            icon: "ðŸŽ¬",
            bg: "linear-gradient(135deg, rgba(67,233,123,0.3), rgba(56,249,215,0.2))",
            catText: "Video Production",
            title: "MedCare Corporate Brand Film",
            desc: "High-quality 5-minute corporate film showcasing MedCare's values and services, leading to 40% improvement in brand perception scores.",
            metric: "+40% Brand Score â€¢ 2M+ Views",
            tags: ["Video Production", "Motion Graphics", "Storytelling"],
        },
        {
            category: "seo",
            icon: "ðŸ”",
            bg: "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(108,99,255,0.2))",
            catText: "SEO Optimization",
            title: "BuildRight Infra â€” Local SEO Domination",
            desc: "Comprehensive SEO strategy that pushed BuildRight to #1 position for 25+ target keywords in Delhi NCR. Organic traffic grew by 400%.",
            metric: "+400% Organic Traffic â€¢ #1 on Google",
            tags: ["SEO", "Local SEO", "Link Building"],
        },
        {
            category: "web",
            icon: "ðŸ“š",
            bg: "linear-gradient(135deg, rgba(234,179,8,0.3), rgba(251,146,60,0.2))",
            catText: "Web Development",
            title: "EduPrime â€” Learning Management System",
            desc: "Full-featured LMS platform with course management, video streaming, payment integration and student analytics dashboard built with MERN.",
            metric: "5000+ Students â€¢ â‚¹15L Revenue",
            tags: ["React.js", "Node.js", "MongoDB", "LMS"],
        },
        {
            category: "branding",
            icon: "ðŸŽ¨",
            bg: "linear-gradient(135deg, rgba(239,68,68,0.3), rgba(255,101,132,0.2))",
            catText: "Brand Identity",
            title: "AutoGuru India â€” Complete Rebrand",
            desc: "Full brand identity overhaul â€” new logo, brand guidelines, website redesign and social media branding that doubled brand recognition.",
            metric: "+200% Brand Recognition â€¢ Premium Perception",
            tags: ["Logo Design", "Brand Guidelines", "UI/UX"],
        },
        {
            category: "marketing",
            icon: "ðŸ’°",
            bg: "linear-gradient(135deg, rgba(56,249,215,0.3), rgba(67,233,123,0.2))",
            catText: "Paid Advertising",
            title: "FinWise Advisors â€” Lead Gen Campaign",
            desc: "Google & Facebook PPC campaigns for a financial advisory firm that generated 500+ qualified leads per month at â‚¹120 cost-per-lead.",
            metric: "500+ Leads/Month â€¢ 12x ROI",
            tags: ["Google Ads", "Facebook Ads", "Lead Gen"],
        },
        {
            category: "web",
            icon: "ðŸ¥",
            bg: "linear-gradient(135deg, rgba(108,99,255,0.4), rgba(255,101,132,0.3))",
            catText: "Web Development",
            title: "HealthFirst â€” Doctor Booking App",
            desc: "React Native + Node.js app enabling patients to book doctor appointments online with real-time availability, video consultation and e-prescriptions.",
            metric: "10K+ Downloads â€¢ 4.8â˜… Rating",
            tags: ["React Native", "Node.js", "Healthcare"],
        },
        {
            category: "seo",
            icon: "ðŸª",
            bg: "linear-gradient(135deg, rgba(251,146,60,0.3), rgba(234,179,8,0.2))",
            catText: "SEO + Content Marketing",
            title: "QuickShop Delhi â€” E-commerce SEO",
            desc: "Comprehensive e-commerce SEO strategy including product page optimization, category pages and blog content that drove 350% traffic growth.",
            metric: "+350% Traffic â€¢ +220% Revenue",
            tags: ["E-commerce SEO", "Content Marketing", "Technical SEO"],
        },
    ];

    const filtered = selectedCategory === "all"
        ? projectsData
        : projectsData.filter((p) => p.category === selectedCategory);

    return (
        <>
            

            {/* Page Hero */}
            <div className="page-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span>â€º</span>
                        <span>Projects</span>
                    </div>
                    <div className="badge" style={{ marginBottom: "16px" }}>Our Work</div>
                    <h1>
                        Our <span className="gradient-text">Projects</span>
                    </h1>
                    <p>
                        Real projects, real results. Explore how we've helped 80+ businesses transform their online presence and achieve measurable growth.
                    </p>
                </div>
            </div>

            {/* Filter Buttons */}
            <section style={{ padding: "60px 0 0" }}>
                <div className="container">
                    <div className="tab-buttons animate-on-scroll">
                        {[
                            { id: "all", label: "All Projects" },
                            { id: "web", label: "ðŸ’» Web Dev" },
                            { id: "marketing", label: "ðŸ“ˆ Marketing" },
                            { id: "seo", label: "ðŸ” SEO" },
                            { id: "video", label: "ðŸŽ¬ Video" },
                            { id: "branding", label: "ðŸŽ¨ Branding" },
                        ].map((btn) => (
                            <button
                                key={btn.id}
                                className={`tab-btn ${selectedCategory === btn.id ? "active" : ""}`}
                                onClick={() => setSelectedCategory(btn.id)}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section style={{ padding: "20px 0 100px" }}>
                <div className="container">
                    <div className="projects-grid" id="projectsGrid">
                        {filtered.map((proj, idx) => (
                            <div key={idx} className="card project-card animate-on-scroll">
                                <div className="project-image">
                                    {proj.image ? (
                                        <>
                                            <img
                                                src={proj.image}
                                                alt={proj.title}
                                                onError={(e) => { e.target.src = "/images/og-image.jpg"; }}
                                            />
                                            {proj.badge && (
                                                <div className="project-live-badge">
                                                    <span className="live-dot"></span> {proj.badge}
                                                </div>
                                            )}
                                            {proj.link && (
                                                <a
                                                    href={proj.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-overlay"
                                                    aria-label={`Visit ${proj.title}`}
                                                >
                                                    <span className="project-overlay-btn">Visit Live Site â†—</span>
                                                </a>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className="project-image-bg"
                                                style={{ background: proj.bg || "rgba(108,99,255,0.15)" }}
                                            >
                                                {proj.icon || "ðŸ“‚"}
                                            </div>
                                            <div className="project-overlay">
                                                <span className="project-overlay-btn">View Project â†—</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="project-body">
                                    <div className="project-cat">{proj.catText}</div>
                                    <h3>
                                        {proj.link ? (
                                            <a
                                                href={proj.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: "inherit", textDecoration: "none" }}
                                            >
                                                {proj.title}
                                            </a>
                                        ) : (
                                            proj.title
                                        )}
                                    </h3>
                                    <p>{proj.desc}</p>
                                    <div style={{ display: "flex", gap: "8px", marginBottom: "12px", fontSize: "0.82rem", color: "var(--accent2)" }}>
                                        <span>{proj.metric}</span>
                                    </div>
                                    <div className="project-tags">
                                        {proj.tags.map((t, i) => (
                                            <span key={i} className="project-tag">{t}</span>
                                        ))}
                                    </div>
                                    {proj.link && (
                                        <div style={{ marginTop: "16px" }}>
                                            <a
                                                href={proj.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary btn-sm"
                                                style={{ fontSize: "0.82rem", padding: "7px 16px" }}
                                            >
                                                {proj.btnText}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <div className="cta-section animate-on-scroll" style={{ textAlign: "center", padding: "60px 20px" }}>
                        <h2>
                            Want to See Your Project <span className="gradient-text">Here?</span>
                        </h2>
                        <p style={{ color: "var(--text-muted)", margin: "14px auto 30px", maxWidth: "600px", lineHeight: "1.7" }}>
                            Let's collaborate and create something extraordinary together. Join our growing list of successful clients.
                        </p>
                        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/contact" className="btn btn-primary">
                                ðŸš€ Start Your Project
                            </Link>
                            <Link href="/services" className="btn btn-outline">
                                View All Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Projects;

