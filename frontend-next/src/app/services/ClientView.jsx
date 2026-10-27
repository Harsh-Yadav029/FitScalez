"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// SeoHelmet replaced by Next.js metadata

const Services = () => {
    const [activeTab, setActiveTab] = useState("tab-dev");
    const [openFaq, setOpenFaq] = useState(null);

    // Whenever activeTab changes, immediately ensure newly rendered cards are visible
    useEffect(() => {
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll(".tab-content .animate-on-scroll");
            elements.forEach((el) => {
                el.classList.add("animated");
            });
        }, 10);
        return () => clearTimeout(timer);
    }, [activeTab]);

    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    const servicesSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://fitscalez.com/services#webpage",
                url: "https://fitscalez.com/services",
                name: "Full-Stack Web Development & Digital Marketing Services â€” Fitscalez",
            },
            {
                "@type": "Service",
                name: "MERN Stack Web Development",
                provider: {
                    "@type": "LocalBusiness",
                    name: "Fitscalez",
                },
            },
        ],
    };

    return (
        <>
            

            {/* Page Hero */}
            <div className="page-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span>â€º</span>
                        <span>Services</span>
                    </div>
                    <div className="badge" style={{ marginBottom: "16px" }}>What We Offer</div>
                    <h1>
                        Our <span className="gradient-text">Services</span>
                    </h1>
                    <p>
                        Comprehensive digital solutions designed to grow your business. From stunning websites to ROI-driven marketing campaigns â€” we do it all.
                    </p>
                </div>
            </div>

            {/* Services Tabs Section */}
            <section className="section-padding">
                <div className="container">
                    {/* Category Tab Buttons */}
                    <div className="tab-buttons animate-on-scroll">
                        <button
                            className={`tab-btn ${activeTab === "tab-dev" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab-dev")}
                        >
                            ðŸ’» Web Development
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "tab-marketing" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab-marketing")}
                        >
                            ðŸ“ˆ Digital Marketing
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "tab-creative" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab-creative")}
                        >
                            ðŸŽ¨ Creative Services
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "tab-strategy" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab-strategy")}
                        >
                            ðŸ“Š Business Strategy
                        </button>
                    </div>

                    {/* Tab 1: Web Development */}
                    {activeTab === "tab-dev" && (
                        <div id="tab-dev" className="tab-content active">
                            <div className="section-header">
                                <span className="section-tag">Web Development</span>
                                <h2 className="section-title">
                                    Build <span className="gradient-text">Powerful Websites</span>
                                </h2>
                                <p className="section-desc">
                                    From simple landing pages to complex MERN Stack applications â€” fast, secure and beautiful.
                                </p>
                            </div>

                            <div className="services-grid">
                                <div className="card service-card animate-on-scroll">
                                    <div className="service-icon icon-purple">ðŸ’»</div>
                                    <h3>MERN Stack Development</h3>
                                    <p>Full-stack web applications using MongoDB, Express.js, React.js and Node.js. Scalable, fast and modern. Starting from â‚¹25,000.</p>
                                    <div className="service-features">
                                        <span className="service-feature">React.js Frontend</span>
                                        <span className="service-feature">Node.js + Express Backend</span>
                                        <span className="service-feature">MongoDB Database</span>
                                        <span className="service-feature">REST API Development</span>
                                        <span className="service-feature">Authentication & Authorization</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-1">
                                    <div className="service-icon icon-blue">ðŸ›’</div>
                                    <h3>E-Commerce Development</h3>
                                    <p>Feature-rich online stores with payment gateway integration, inventory management and seamless user experience that converts visitors.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Product Catalog Management</span>
                                        <span className="service-feature">Payment Gateway (Razorpay, PayPal)</span>
                                        <span className="service-feature">Order Management System</span>
                                        <span className="service-feature">Mobile-Responsive Design</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-2">
                                    <div className="service-icon icon-green">ðŸŽ¨</div>
                                    <h3>UI/UX Design</h3>
                                    <p>User-centered design that looks stunning and converts visitors into customers. Figma designs, prototyping and implementation.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Wireframing & Prototyping</span>
                                        <span className="service-feature">Figma Design Systems</span>
                                        <span className="service-feature">User Research & Testing</span>
                                        <span className="service-feature">Conversion Rate Optimization</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-3">
                                    <div className="service-icon icon-orange">ðŸ”§</div>
                                    <h3>Website Maintenance</h3>
                                    <p>Keep your website secure, up-to-date and performing at peak level with our comprehensive maintenance and support plans.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Security Updates & Patches</span>
                                        <span className="service-feature">Performance Optimization</span>
                                        <span className="service-feature">Content Updates</span>
                                        <span className="service-feature">99.9% Uptime Monitoring</span>
                                    </div>
                                </div>
                            </div>

                            {/* Verified Live Projects Callout */}
                            <div
                                style={{
                                    marginTop: "36px",
                                    padding: "22px 28px",
                                    background: "rgba(108,99,255,0.08)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    gap: "16px",
                                }}
                                className="animate-on-scroll"
                            >
                                <div>
                                    <span style={{ color: "var(--accent2)", fontSize: "0.75rem", fontStyle: "normal", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                        ðŸš€ Verified Live Deployments
                                    </span>
                                    <p style={{ margin: "6px 0 0", fontSize: "0.95rem", color: "var(--text)" }}>
                                        See our work in action on <a href="https://walktheplan.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary-light)", fontWeight: 600, textDecoration: "underline" }}>Walk The Plan â†—</a> (1:1 Blueprint Projection) and <a href="https://www.houseofsymmetry.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary-light)", fontWeight: 600, textDecoration: "underline" }}>House of Symmetry â†—</a> (Luxury Architecture).
                                    </p>
                                </div>
                                <Link href="/projects" className="btn btn-outline btn-sm">
                                    Explore Projects â†’
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Digital Marketing */}
                    {activeTab === "tab-marketing" && (
                        <div id="tab-marketing" className="tab-content active">
                            <div className="section-header">
                                <span className="section-tag">Digital Marketing</span>
                                <h2 className="section-title">
                                    Grow Your <span className="gradient-text">Online Presence</span>
                                </h2>
                                <p className="section-desc">
                                    Proven search engine optimization, laser-targeted advertising and social engagement.
                                </p>
                            </div>

                            <div className="services-grid">
                                <div className="card service-card animate-on-scroll">
                                    <div className="service-icon icon-green">ðŸ”</div>
                                    <h3>Search Engine Optimization (SEO)</h3>
                                    <p>Rank #1 on Google with our proven SEO strategies. Comprehensive keyword research, technical SEO, content optimization and quality link building.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Keyword Research & Mapping</span>
                                        <span className="service-feature">On-Page & Technical SEO</span>
                                        <span className="service-feature">Authority Link Building</span>
                                        <span className="service-feature">Local SEO for Delhi & India</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-1">
                                    <div className="service-icon icon-pink">ðŸ“±</div>
                                    <h3>Social Media Marketing</h3>
                                    <p>Build a powerful social media presence across Instagram, Facebook, LinkedIn and Twitter. Strategic content that drives real engagement and growth.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Content Strategy & Calendar</span>
                                        <span className="service-feature">Daily/Weekly Posting</span>
                                        <span className="service-feature">Community Management</span>
                                        <span className="service-feature">Influencer Collaboration</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-2">
                                    <div className="service-icon icon-blue">ðŸ’°</div>
                                    <h3>Pay-Per-Click Advertising</h3>
                                    <p>ROI-driven ad campaigns on Google, Facebook and Instagram. Every rupee optimized for maximum conversions and lowest cost-per-acquisition.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Google Search & Display Ads</span>
                                        <span className="service-feature">Facebook & Instagram Ads</span>
                                        <span className="service-feature">Remarketing Campaigns</span>
                                        <span className="service-feature">A/B Testing & Optimization</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-3">
                                    <div className="service-icon icon-red">ðŸ“§</div>
                                    <h3>Email Marketing</h3>
                                    <p>Automated email campaigns that nurture leads and retain customers. Personalized sequences that deliver the right message at the right time.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Drip Campaign Design</span>
                                        <span className="service-feature">List Segmentation</span>
                                        <span className="service-feature">Newsletter Creation</span>
                                        <span className="service-feature">Analytics & Reporting</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Creative Services */}
                    {activeTab === "tab-creative" && (
                        <div id="tab-creative" className="tab-content active">
                            <div className="section-header">
                                <span className="section-tag">Creative Services</span>
                                <h2 className="section-title">
                                    Content That <span className="gradient-text">Captivates</span>
                                </h2>
                                <p className="section-desc">
                                    High-impact visual production, video storytelling, and brand identity design.
                                </p>
                            </div>

                            <div className="services-grid">
                                <div className="card service-card animate-on-scroll">
                                    <div className="service-icon icon-orange">ðŸŽ¬</div>
                                    <h3>Video Production & Editing</h3>
                                    <p>Professional video content that tells your brand story. From corporate films to viral social media reels â€” every frame crafted with precision.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Commercial Video Production</span>
                                        <span className="service-feature">Instagram Reels & YouTube Shorts</span>
                                        <span className="service-feature">Motion Graphics & Animation</span>
                                        <span className="service-feature">Color Grading & Audio Mix</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-1">
                                    <div className="service-icon icon-yellow">ðŸ“¸</div>
                                    <h3>Product Photography</h3>
                                    <p>High-quality product shoots that make your items irresistible. Studio and lifestyle photography for e-commerce, catalogs and marketing.</p>
                                    <div className="service-features">
                                        <span className="service-feature">E-commerce Product Shoots</span>
                                        <span className="service-feature">Lifestyle Photography</span>
                                        <span className="service-feature">360Â° Product Views</span>
                                        <span className="service-feature">Professional Photo Editing</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-2">
                                    <div className="service-icon icon-purple">âœï¸</div>
                                    <h3>Content Writing & Copywriting</h3>
                                    <p>Compelling content that ranks on Google and converts readers into customers. SEO-optimized articles, landing page copy and brand storytelling.</p>
                                    <div className="service-features">
                                        <span className="service-feature">SEO Blog Articles</span>
                                        <span className="service-feature">Website Copywriting</span>
                                        <span className="service-feature">Product Descriptions</span>
                                        <span className="service-feature">Social Media Captions</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-3">
                                    <div className="service-icon icon-teal">ðŸŽ¨</div>
                                    <h3>Brand Identity Design</h3>
                                    <p>Complete brand identity that sets you apart â€” logo design, color palette, typography, brand guidelines and visual assets.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Logo Design & Variations</span>
                                        <span className="service-feature">Brand Guidelines Manual</span>
                                        <span className="service-feature">Business Card & Stationery</span>
                                        <span className="service-feature">Social Media Branding Kit</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 4: Strategy */}
                    {activeTab === "tab-strategy" && (
                        <div id="tab-strategy" className="tab-content active">
                            <div className="section-header">
                                <span className="section-tag">Business Strategy</span>
                                <h2 className="section-title">
                                    Data-Driven <span className="gradient-text">Growth Plans</span>
                                </h2>
                                <p className="section-desc">
                                    Deep competitor insights, intelligent automation, and sustainable revenue scaling.
                                </p>
                            </div>

                            <div className="services-grid">
                                <div className="card service-card animate-on-scroll">
                                    <div className="service-icon icon-blue">ðŸ“Š</div>
                                    <h3>Market Research & Intelligence</h3>
                                    <p>Deep market analysis, competitor research and consumer insights that reveal untapped opportunities and inform smart business decisions.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Market Sizing & Analysis</span>
                                        <span className="service-feature">Competitor Deep-Dive</span>
                                        <span className="service-feature">Consumer Behavior Research</span>
                                        <span className="service-feature">Opportunity Mapping</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-1">
                                    <div className="service-icon icon-green">ðŸ“ˆ</div>
                                    <h3>Growth Strategy Consulting</h3>
                                    <p>Custom growth strategies and actionable roadmaps that help businesses scale sustainably â€” whether you're a startup or established enterprise.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Go-To-Market Strategy</span>
                                        <span className="service-feature">Revenue Growth Planning</span>
                                        <span className="service-feature">Partnership Development</span>
                                        <span className="service-feature">Performance KPI Setup</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-2">
                                    <div className="service-icon icon-purple">ðŸ“±</div>
                                    <h3>App Store Optimization (ASO)</h3>
                                    <p>Maximize your mobile app's visibility, downloads and user retention with specialized ASO strategies for Google Play and Apple App Store.</p>
                                    <div className="service-features">
                                        <span className="service-feature">App Store Keyword Research</span>
                                        <span className="service-feature">Listing Optimization</span>
                                        <span className="service-feature">Rating & Review Strategy</span>
                                        <span className="service-feature">User Acquisition Campaigns</span>
                                    </div>
                                </div>

                                <div className="card service-card animate-on-scroll delay-3">
                                    <div className="service-icon icon-pink">ðŸ¤–</div>
                                    <h3>Marketing Automation</h3>
                                    <p>Set up powerful automation workflows that nurture leads, engage customers and drive revenue on autopilot 24/7.</p>
                                    <div className="service-features">
                                        <span className="service-feature">Lead Nurturing Sequences</span>
                                        <span className="service-feature">CRM Integration</span>
                                        <span className="service-feature">Chatbot Setup</span>
                                        <span className="service-feature">Analytics Dashboard</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Pricing Section */}
            <section className="section-padding" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Pricing</span>
                        <h2 className="section-title">
                            Simple, <span className="gradient-text">Transparent Pricing</span>
                        </h2>
                        <p className="section-desc">
                            Quality work at fair prices. No hidden fees. Custom quotes available for all project sizes.
                        </p>
                    </div>

                    <div className="pricing-grid">
                        <div className="card pricing-card animate-on-scroll">
                            <div className="pricing-tag">Starter</div>
                            <div className="pricing-name">Business Website</div>
                            <div className="pricing-price">
                                <span className="price-amount">â‚¹25K</span>
                                <span className="price-period">one-time</span>
                            </div>
                            <p className="pricing-desc">Perfect for small businesses and startups needing a professional online presence.</p>
                            <ul className="pricing-features">
                                <li className="pricing-feature"><span className="check">âœ“</span> 5-7 Page Responsive Website</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> Modern UI/UX Design</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> Basic SEO Setup</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> Contact Form</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> Google Analytics</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> 1 Month Free Support</li>
                            </ul>
                            <Link href="/contact" className="btn btn-outline" style={{ width: "100%", justifyContent: "center", borderRadius: "8px" }}>
                                Get Started
                            </Link>
                        </div>

                        <div className="card pricing-card featured animate-on-scroll delay-1">
                            <div className="popular-badge">ðŸ”¥ Most Popular</div>
                            <div className="pricing-name">MERN Full Stack</div>
                            <div className="pricing-price">
                                <span className="price-amount">â‚¹49K</span>
                                <span className="price-period">starting</span>
                            </div>
                            <p className="pricing-desc">Complete web application with database, admin panel, APIs and full deployment.</p>
                            <ul className="pricing-features">
                                <li className="pricing-feature"><span className="check">âœ“</span> React.js Frontend</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> Node.js + Express API</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> MongoDB Database</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> User Auth & Roles</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> Admin Dashboard</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> Cloud Deployment</li>
                            </ul>
                            <Link href="/contact" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", borderRadius: "8px" }}>
                                Start Project
                            </Link>
                        </div>

                        <div className="card pricing-card animate-on-scroll delay-2">
                            <div className="pricing-tag">Monthly</div>
                            <div className="pricing-name">Digital Marketing</div>
                            <div className="pricing-price">
                                <span className="price-amount">â‚¹15K</span>
                                <span className="price-period">/month</span>
                            </div>
                            <p className="pricing-desc">Complete social media + SEO management for consistent monthly growth.</p>
                            <ul className="pricing-features">
                                <li className="pricing-feature"><span className="check">âœ“</span> 3 Social Platforms Managed</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> 20 Posts / Month</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> SEO Optimization</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> Monthly Analytics Report</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> Dedicated Account Manager</li>
                                <li className="pricing-feature"><span className="check">âœ“</span> Ad Campaign Management</li>
                            </ul>
                            <Link href="/contact" className="btn btn-outline" style={{ width: "100%", justifyContent: "center", borderRadius: "8px" }}>
                                Get Started
                            </Link>
                        </div>
                    </div>

                    <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "28px", fontSize: "0.9rem" }}>
                        ðŸ’¬ Custom project? <a href="tel:+919599433616" style={{ color: "var(--primary-light)" }}>Call Divyansh: +91 9599433616</a> for a personalized quote.
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding">
                <div className="container" style={{ maxWidth: "800px" }}>
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">FAQ</span>
                        <h2 className="section-title">
                            Frequently Asked <span className="gradient-text">Questions</span>
                        </h2>
                    </div>

                    <div className="faq-grid animate-on-scroll">
                        {[
                            {
                                q: "How much does a website cost at Fitscalez?",
                                a: "Our websites start from â‚¹25,000 for a basic business website. A full MERN Stack web application typically starts from â‚¹49,000. The final cost depends on features, complexity and timeline. Contact Divyansh at +91 9599433616 for a custom quote.",
                            },
                            {
                                q: "How long does it take to build a website?",
                                a: "A standard 5-7 page business website typically takes 2-3 weeks. A full-stack MERN application takes 4-8 weeks depending on features.",
                            },
                            {
                                q: "Do you provide SEO services?",
                                a: "Yes! We provide comprehensive SEO services including keyword research, on-page optimization, technical SEO, link building and monthly performance reporting. Clients typically see a 200-400% increase in organic traffic within 3-6 months.",
                            },
                            {
                                q: "Do you work with clients outside Delhi?",
                                a: "Absolutely! We work with clients across PAN-India and internationally with remote project management via video calls, email and WhatsApp.",
                            },
                            {
                                q: "What technologies do you use?",
                                a: "Our primary stack is MERN (MongoDB, Express.js, React.js, Node.js), HTML/CSS/JS, WordPress, Next.js, PostgreSQL and various payment APIs like Razorpay.",
                            },
                            {
                                q: "Do you offer post-launch support?",
                                a: "Yes! All projects include 1 month of free support after launch, followed by flexible maintenance plans starting from â‚¹3,000/month.",
                            },
                        ].map((faq, idx) => (
                            <div key={idx} className={`faq-item ${openFaq === idx ? "open" : ""}`}>
                                <div className="faq-question" onClick={() => toggleFaq(idx)}>
                                    <span>{faq.q}</span>
                                    <span className="faq-arrow">â–¼</span>
                                </div>
                                <div className="faq-answer">
                                    <div className="faq-answer-inner">
                                        <p>{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <div className="cta-section animate-on-scroll">
                        <h2>
                            Let's Build Something <span className="gradient-text">Great Together</span>
                        </h2>
                        <p>
                            Ready to take your business to the next level? Contact us today for a free consultation and project quote.
                        </p>
                        <div className="cta-actions">
                            <Link href="/contact" className="btn btn-primary">
                                ðŸš€ Start Your Project
                            </Link>
                            <a href="tel:+919599433616" className="btn btn-outline">
                                ðŸ“ž Call Now
                            </a>
                        </div>
                        <div className="cta-contact-strip">
                            <a href="tel:+919599433616">ðŸ“ž +91 9599433616 (Divyansh)</a>
                            <div className="divider"></div>
                            <a href="https://wa.me/919599433616" target="_blank" rel="noopener noreferrer">ðŸ’¬ WhatsApp Us</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;

