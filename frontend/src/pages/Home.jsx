import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SeoHelmet from "../components/SeoHelmet";
import {
    FadeIn,
    StaggerContainer,
    StaggerItem,
    SpotlightCard,
    CountUp,
    appleSpring,
} from "../components/Motion";

const Home = () => {
    // Typewriter effect state
    const [typedText, setTypedText] = useState("Web Development");
    const phrases = [
        "Web Development",
        "Digital Marketing",
        "SEO Optimization",
        "Social Media",
        "Brand Strategy",
        "Video Production",
    ];

    useEffect(() => {
        let phraseIndex = 0;
        let charIndex = phrases[0].length;
        let isDeleting = true;
        let timeout;

        const type = () => {
            const current = phrases[phraseIndex];
            if (isDeleting) {
                charIndex--;
                setTypedText(current.substring(0, charIndex) || "\u00A0");
            } else {
                charIndex++;
                setTypedText(current.substring(0, charIndex));
            }

            if (!isDeleting && charIndex === current.length) {
                timeout = setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 2200);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                timeout = setTimeout(type, 200);
                return;
            }

            timeout = setTimeout(type, isDeleting ? 40 : 80);
        };

        timeout = setTimeout(type, 2200);
        return () => clearTimeout(timeout);
    }, []);

    // FAQ Accordion State
    const [openFaq, setOpenFaq] = useState(null);
    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    // Scroll animations observer for backward compatibility
    useEffect(() => {
        const animatedElements = document.querySelectorAll(".animate-on-scroll");
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animated");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);

    const fullHomeSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://fitscalez.com/#website",
                url: "https://fitscalez.com",
                name: "Fitscalez",
                description: "Fitscalez is India's leading Web Development & Digital Marketing Agency based in Delhi.",
            },
            {
                "@type": "LocalBusiness",
                "@id": "https://fitscalez.com/#organization",
                name: "Fitscalez",
                telephone: "+91-9599433616",
                email: "fitscalezofficial@gmail.com",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "24, Shri Ram Road, Civil Lines",
                    addressLocality: "Delhi",
                    addressRegion: "Delhi",
                    postalCode: "110054",
                    addressCountry: "IN",
                },
                aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "82",
                },
            },
        ],
    };

    return (
        <>
            <SeoHelmet
                title="Fitscalez — Best Web Development & Digital Marketing Agency in Delhi, India"
                description="Fitscalez is India's premier agency delivering custom MERN stack web development, high-ROI SEO, social media marketing, and brand strategies."
                canonical="/"
                schema={fullHomeSchema}
            />

            {/* ============ HERO SECTION ============ */}
            <section className="hero" id="home">
                <div className="hero-bg"></div>
                <div className="hero-grid"></div>

                <div className="hero-content">
                    <div className="hero-text">
                        <FadeIn delay={0.05} className="hero-badge">
                            <span className="badge">#TOP DIGITAL AGENCY IN DELHI</span>
                        </FadeIn>

                        <FadeIn delay={0.15}>
                            <h1 className="hero-title">
                                <span className="line1">We Build</span>
                                <span className="gradient-text line2" id="typedText">
                                    {typedText}
                                </span>
                                <span className="line2">That Converts</span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.25}>
                            <p className="hero-subtitle">
                                Fitscalez is a premium <strong>Web Development & Digital Marketing Agency</strong> helping businesses across
                                India grow online. From MERN Stack apps to SEO & Social Media — we scale your brand with precision.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.35} className="hero-actions">
                            <Link to="/contact" className="btn btn-primary">
                                🚀 Start Your Project
                            </Link>
                            <Link to="/services" className="btn btn-outline">
                                View Services →
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.45} className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-number">
                                    <CountUp value={150} suffix="+" />
                                </span>
                                <span className="stat-label">Projects Delivered</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">
                                    <CountUp value={80} suffix="+" />
                                </span>
                                <span className="stat-label">Happy Clients</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">5★</span>
                                <span className="stat-label">Avg Rating</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">
                                    <CountUp value={3} suffix="+" />
                                </span>
                                <span className="stat-label">Years Exp.</span>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Hero Visual Card Stack */}
                    <FadeIn delay={0.2} direction="left" className="hero-visual">
                        <div className="hero-card-stack float-animation">
                            <motion.div
                                whileHover={{ y: -8, scale: 1.01 }}
                                transition={appleSpring}
                                className="glass-card hero-main-card"
                            >
                                <div className="card-header">
                                    <div className="card-header-icon" aria-hidden="true">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="20" x2="18" y2="10" strokeWidth="2.5"></line>
                                            <line x1="12" y1="20" x2="12" y2="14" strokeWidth="2.5"></line>
                                            <line x1="6" y1="20" x2="6" y2="17" strokeWidth="2.5"></line>
                                            <polyline points="4 14 10 8 14 12 20 5"></polyline>
                                            <polyline points="15 5 20 5 20 10"></polyline>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="card-title">Campaign Performance</div>
                                        <div className="card-sub">Fitscalez Growth Engine</div>
                                    </div>
                                </div>

                                <div className="metric-grid">
                                    <div className="metric-item">
                                        <div className="metric-value">
                                            <CountUp value={342} prefix="+" suffix="%" />
                                        </div>
                                        <div className="metric-label">Organic Traffic</div>
                                    </div>
                                    <div className="metric-item">
                                        <div className="metric-value"><span className="currency-symbol">₹</span>4.2L</div>
                                        <div className="metric-label">Revenue Generated</div>
                                    </div>
                                    <div className="metric-item">
                                        <div className="metric-value">
                                            <CountUp value={89} suffix="%" />
                                        </div>
                                        <div className="metric-label">Client Satisfaction</div>
                                    </div>
                                    <div className="metric-item">
                                        <div className="metric-value">
                                            <CountUp value={12} suffix="x" />
                                        </div>
                                        <div className="metric-label">ROI Delivered</div>
                                    </div>
                                </div>

                                <div className="progress-list">
                                    <div className="progress-item">
                                        <div className="progress-label">
                                            <span>SEO Rankings</span>
                                            <span>94%</span>
                                        </div>
                                        <div className="progress-bar">
                                            <motion.div
                                                className="progress-fill"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "94%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, ease: "easeOut" }}
                                            ></motion.div>
                                        </div>
                                    </div>
                                    <div className="progress-item">
                                        <div className="progress-label">
                                            <span>Social Media Reach</span>
                                            <span>78%</span>
                                        </div>
                                        <div className="progress-bar">
                                            <motion.div
                                                className="progress-fill"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "78%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
                                            ></motion.div>
                                        </div>
                                    </div>
                                    <div className="progress-item">
                                        <div className="progress-label">
                                            <span>Conversion Rate</span>
                                            <span>87%</span>
                                        </div>
                                        <div className="progress-bar">
                                            <motion.div
                                                className="progress-fill"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "87%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                                            ></motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={appleSpring}
                                className="floating-badge floating-badge-1"
                            >
                                <div className="dot"></div>
                                Live Projects: 12
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={appleSpring}
                                className="floating-badge floating-badge-2"
                            >
                                🏆 Top Rated Agency 2024
                            </motion.div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ============ MARQUEE SECTION ============ */}
            <div className="marquee-section">
                <div className="marquee-label">Trusted by growing businesses across India</div>
                <div className="marquee-track" role="list">
                    <div className="marquee-item">📐 Walk The Plan</div>
                    <div className="marquee-item">🏛️ House of Symmetry</div>
                    <div className="marquee-item">⚡ TechStartup India</div>
                    <div className="marquee-item">🌿 GreenLeaf Organics</div>
                    <div className="marquee-item">🏪 QuickShop Delhi</div>
                    <div className="marquee-item">💊 MedCare Solutions</div>
                    <div className="marquee-item">🏗️ BuildRight Infra</div>
                    <div className="marquee-item">🎓 EduPrime Academy</div>
                    {/* Duplicate loop */}
                    <div className="marquee-item">📐 Walk The Plan</div>
                    <div className="marquee-item">🏛️ House of Symmetry</div>
                    <div className="marquee-item">⚡ TechStartup India</div>
                    <div className="marquee-item">🌿 GreenLeaf Organics</div>
                    <div className="marquee-item">🏪 QuickShop Delhi</div>
                    <div className="marquee-item">💊 MedCare Solutions</div>
                    <div className="marquee-item">🏗️ BuildRight Infra</div>
                    <div className="marquee-item">🎓 EduPrime Academy</div>
                </div>
            </div>

            {/* ============ COUNTERS SECTION ============ */}
            <section className="counters-section">
                <div className="container">
                    <div className="counters-grid">
                        <FadeIn delay={0.05} className="counter-item">
                            <div className="counter-icon">🌐</div>
                            <div className="counter-number">
                                <CountUp value={150} suffix="+" />
                            </div>
                            <div className="counter-label">Websites Launched</div>
                        </FadeIn>
                        <FadeIn delay={0.15} className="counter-item">
                            <div className="counter-icon">📈</div>
                            <div className="counter-number">
                                <CountUp value={300} suffix="%" />
                            </div>
                            <div className="counter-label">Avg Traffic Growth</div>
                        </FadeIn>
                        <FadeIn delay={0.25} className="counter-item">
                            <div className="counter-icon">😊</div>
                            <div className="counter-number">
                                <CountUp value={80} suffix="+" />
                            </div>
                            <div className="counter-label">Happy Clients</div>
                        </FadeIn>
                        <FadeIn delay={0.35} className="counter-item">
                            <div className="counter-icon">⭐</div>
                            <div className="counter-number">
                                <CountUp value={98} suffix="%" />
                            </div>
                            <div className="counter-label">Satisfaction Rate</div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ============ ABOUT SECTION ============ */}
            <section className="section-padding" id="about">
                <div className="container">
                    <div className="about-grid">
                        <FadeIn direction="right" className="about-img-wrap">
                            <div className="about-img-placeholder">
                                <div className="about-img-icon">🚀</div>
                                <div className="about-img-text">Fitscalez</div>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", position: "relative" }}>
                                    Digital. IT. Cyber Tech Solutions
                                </p>
                            </div>
                            <div className="about-badge-float">
                                <div className="number">3+</div>
                                <div className="label">Years of Excellence</div>
                            </div>
                        </FadeIn>

                        <FadeIn direction="left" className="about-text">
                            <span className="section-tag">About Fitscalez</span>
                            <h2 className="section-title">
                                Your Growth Partner in the <span className="gradient-text">Digital Age</span>
                            </h2>
                            <p className="about-desc">
                                Fitscalez was founded with a bold vision — to redefine how businesses grow online. We are a Delhi-based
                                premium <strong>Web Development & Digital Marketing Agency</strong> serving clients across PAN-India and
                                global markets.
                            </p>
                            <p className="about-desc">
                                Led by <strong>Mr. Hariom Saini</strong> (Founder) and our expert team including <strong>Divyansh</strong> (Lead Web Developer, +91 9599433616), we combine cutting-edge technology, data-driven strategy, and creative excellence to deliver results that truly move the needle.
                            </p>

                            <div className="about-values">
                                <div className="value-item">
                                    <span className="value-icon">🎯</span>
                                    <div className="value-text">
                                        <h4>Mission-Driven</h4>
                                        <p>Every strategy we build is aligned with your business goals</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <span className="value-icon">💡</span>
                                    <div className="value-text">
                                        <h4>Innovative</h4>
                                        <p>Always adopting the latest technology and trends</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <span className="value-icon">🤝</span>
                                    <div className="value-text">
                                        <h4>Collaborative</h4>
                                        <p>We work as an extension of your team</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <span className="value-icon">🏆</span>
                                    <div className="value-text">
                                        <h4>Excellence</h4>
                                        <p>Quality and precision in every deliverable</p>
                                    </div>
                                </div>
                            </div>

                            <Link to="/about" className="btn btn-primary" style={{ marginTop: "24px" }}>
                                Know More About Us →
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ============ SERVICES SECTION ============ */}
            <section className="section-padding" id="services" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <FadeIn className="section-header">
                        <span className="section-tag">What We Do</span>
                        <h2 className="section-title">Services That Scale Your <span className="gradient-text">Business</span></h2>
                        <p className="section-desc">From stunning websites to viral marketing campaigns — we have everything your business needs to dominate online.</p>
                    </FadeIn>

                    <div className="services-grid">
                        <SpotlightCard className="service-card" spotlightColor="rgba(108, 99, 255, 0.22)">
                            <div className="service-icon icon-purple">💻</div>
                            <h3>MERN Stack Web Development</h3>
                            <p>Full-stack web applications using MongoDB, Express, React & Node.js. Fast, scalable, modern websites starting from ₹25,000.</p>
                            <div className="service-features">
                                <span className="service-feature">Custom Web Design & Development</span>
                                <span className="service-feature">E-commerce & Portal Solutions</span>
                                <span className="service-feature">API Integration & Backend</span>
                                <span className="service-feature">Mobile Responsive & SEO Ready</span>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="service-card" spotlightColor="rgba(255, 101, 132, 0.22)">
                            <div className="service-icon icon-pink">📱</div>
                            <h3>Social Media Marketing</h3>
                            <p>Create, Connect, Convert — our strategic social media approach builds genuine audiences and turns followers into loyal paying customers.</p>
                            <div className="service-features">
                                <span className="service-feature">Content Strategy & Creation</span>
                                <span className="service-feature">Community Management</span>
                                <span className="service-feature">Influencer Partnerships</span>
                                <span className="service-feature">Instagram, Facebook, LinkedIn</span>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="service-card" spotlightColor="rgba(67, 233, 123, 0.22)">
                            <div className="service-icon icon-green">🔍</div>
                            <h3>SEO & Search Rankings</h3>
                            <p>Rank #1 on Google with our proven SEO strategies. Keyword research, on-page optimization, technical SEO & quality link building.</p>
                            <div className="service-features">
                                <span className="service-feature">Keyword Research & Planning</span>
                                <span className="service-feature">On-Page & Technical SEO</span>
                                <span className="service-feature">Link Building Campaigns</span>
                                <span className="service-feature">Monthly Reporting</span>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="service-card" spotlightColor="rgba(56, 189, 248, 0.22)">
                            <div className="service-icon icon-blue">💰</div>
                            <h3>Paid Ads (PPC)</h3>
                            <p>ROI-driven advertising campaigns on Google, Facebook, Instagram & LinkedIn. Every rupee spent generates maximum returns.</p>
                            <div className="service-features">
                                <span className="service-feature">Google Ads Management</span>
                                <span className="service-feature">Facebook & Instagram Ads</span>
                                <span className="service-feature">LinkedIn Advertising</span>
                                <span className="service-feature">Performance Analytics</span>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="service-card" spotlightColor="rgba(251, 146, 60, 0.22)">
                            <div className="service-icon icon-orange">🎬</div>
                            <h3>Video Production & Editing</h3>
                            <p>Turning moments into masterpieces. Professional video editing that blends storytelling with stunning visuals for maximum impact.</p>
                            <div className="service-features">
                                <span className="service-feature">Commercial Video Production</span>
                                <span className="service-feature">Social Media Reels & Shorts</span>
                                <span className="service-feature">Motion Graphics & Animation</span>
                                <span className="service-feature">Color Grading & Post-Production</span>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="service-card" spotlightColor="rgba(56, 249, 215, 0.22)">
                            <div className="service-icon icon-teal">📊</div>
                            <h3>Business Growth Strategy</h3>
                            <p>Data-driven market research and business intelligence that reveals untapped opportunities and empowers visionary decisions.</p>
                            <div className="service-features">
                                <span className="service-feature">Market Analysis & Research</span>
                                <span className="service-feature">Competitor Intelligence</span>
                                <span className="service-feature">Growth Planning & Roadmap</span>
                                <span className="service-feature">Business Consulting</span>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="service-card" spotlightColor="rgba(239, 68, 68, 0.22)">
                            <div className="service-icon icon-red">📧</div>
                            <h3>Email Marketing</h3>
                            <p>Targeted email campaigns that nurture leads, retain customers and drive conversions with personalized automation workflows.</p>
                            <div className="service-features">
                                <span className="service-feature">Campaign Design & Copywriting</span>
                                <span className="service-feature">List Management & Segmentation</span>
                                <span className="service-feature">Automated Drip Campaigns</span>
                                <span className="service-feature">Analytics & A/B Testing</span>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="service-card" spotlightColor="rgba(234, 179, 8, 0.22)">
                            <div className="service-icon icon-yellow">📸</div>
                            <h3>Product Shoots & Content</h3>
                            <p>High-quality product photography and creative content production that showcases your brand with clarity, style and impact.</p>
                            <div className="service-features">
                                <span className="service-feature">Professional Product Photography</span>
                                <span className="service-feature">Brand Content Strategy</span>
                                <span className="service-feature">Lifestyle Shoots</span>
                                <span className="service-feature">Catalog & E-commerce Shoots</span>
                            </div>
                        </SpotlightCard>
                    </div>

                    <div style={{ textAlign: "center", marginTop: "48px" }}>
                        <Link to="/services" className="btn btn-primary">
                            View All Services →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============ FEATURED PROJECTS ============ */}
            <section className="section-padding" id="portfolio">
                <div className="container">
                    <FadeIn className="section-header">
                        <span className="section-tag">Featured Work</span>
                        <h2 className="section-title">Client Projects That <span className="gradient-text">Deliver Impact</span></h2>
                        <p className="section-desc">Take a look at some of our live, production web applications and digital platforms engineered for ambitious businesses.</p>
                    </FadeIn>

                    <div className="projects-grid">
                        {/* Walk The Plan */}
                        <SpotlightCard className="project-card" spotlightColor="rgba(0, 229, 153, 0.16)">
                            <div className="project-image">
                                <img
                                    src="/images/project-walktheplan.jpg"
                                    alt="Walk The Plan"
                                    onError={(e) => { e.target.src = "/images/og-image.jpg"; }}
                                />
                                <div className="project-live-badge"><span className="live-dot"></span> Live Project</div>
                                <a href="https://walktheplan.in" target="_blank" rel="noopener noreferrer" className="project-overlay">
                                    <span className="project-overlay-btn">Explore Live Site ↗</span>
                                </a>
                            </div>
                            <div className="project-body">
                                <div className="project-cat">Web Application • Tech Innovation</div>
                                <h3>Walk The Plan — 1:1 Blueprint Projection</h3>
                                <p>Groundbreaking web platform developed for India's 1:1 scale architectural projection experience center. Features online slot reservation and Razorpay payment integration.</p>
                                <div className="project-tags">
                                    <span className="project-tag">React.js</span>
                                    <span className="project-tag">Razorpay</span>
                                    <span className="project-tag">Vite</span>
                                    <span className="project-tag">TailwindCSS</span>
                                </div>
                                <div style={{ marginTop: "18px" }}>
                                    <a href="https://walktheplan.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                        Visit walktheplan.in ↗
                                    </a>
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* House of Symmetry */}
                        <SpotlightCard className="project-card" spotlightColor="rgba(108, 99, 255, 0.18)">
                            <div className="project-image">
                                <img
                                    src="/images/project-houseofsymmetry.jpg"
                                    alt="House of Symmetry"
                                    onError={(e) => { e.target.src = "/images/og-image.jpg"; }}
                                />
                                <div className="project-live-badge"><span className="live-dot"></span> Live Project</div>
                                <a href="https://www.houseofsymmetry.in" target="_blank" rel="noopener noreferrer" className="project-overlay">
                                    <span className="project-overlay-btn">Explore Live Site ↗</span>
                                </a>
                            </div>
                            <div className="project-body">
                                <div className="project-cat">Luxury Architecture • Portfolio</div>
                                <h3>House of Symmetry — Architecture & Design</h3>
                                <p>Bespoke digital presence crafted for an elite architectural studio. Immersive spatial portfolio, balanced visual geometry, and optimized high-ticket client inquiry funnels.</p>
                                <div className="project-tags">
                                    <span className="project-tag">Architecture</span>
                                    <span className="project-tag">UI/UX Design</span>
                                    <span className="project-tag">SEO Optimized</span>
                                    <span className="project-tag">Responsive</span>
                                </div>
                                <div style={{ marginTop: "18px" }}>
                                    <a href="https://www.houseofsymmetry.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                        Visit houseofsymmetry.in ↗
                                    </a>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>

                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <Link to="/projects" className="btn btn-outline">
                            Explore All Projects →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============ PROCESS SECTION ============ */}
            <section className="section-padding">
                <div className="container">
                    <FadeIn className="section-header">
                        <span className="section-tag">How We Work</span>
                        <h2 className="section-title">Our <span className="gradient-text">Proven Process</span></h2>
                        <p className="section-desc">A streamlined 5-step approach that ensures quality, transparency and results every single time.</p>
                    </FadeIn>

                    <StaggerContainer className="process-steps">
                        <StaggerItem className="process-step">
                            <div className="step-number">01</div>
                            <h3>Discovery Call</h3>
                            <p>We understand your business, goals, target audience and competition through a deep-dive consultation.</p>
                        </StaggerItem>
                        <StaggerItem className="process-step">
                            <div className="step-number">02</div>
                            <h3>Strategy & Plan</h3>
                            <p>Our experts craft a customized strategy with clear milestones, deliverables and expected outcomes.</p>
                        </StaggerItem>
                        <StaggerItem className="process-step">
                            <div className="step-number">03</div>
                            <h3>Design & Build</h3>
                            <p>We design, develop and create — with regular updates and your feedback integrated at every step.</p>
                        </StaggerItem>
                        <StaggerItem className="process-step">
                            <div className="step-number">04</div>
                            <h3>Launch & Deploy</h3>
                            <p>After rigorous testing, we launch your project live and ensure everything runs perfectly.</p>
                        </StaggerItem>
                        <StaggerItem className="process-step">
                            <div className="step-number">05</div>
                            <h3>Grow & Optimize</h3>
                            <p>We monitor performance, optimize continuously and scale what works to maximize your ROI.</p>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* ============ PRICING HIGHLIGHTS ============ */}
            <section className="section-padding" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <FadeIn className="section-header">
                        <span className="section-tag">Transparent Pricing</span>
                        <h2 className="section-title">Affordable Plans for <span className="gradient-text">Every Business</span></h2>
                        <p className="section-desc">No hidden fees. No surprises. Clear pricing that delivers maximum value for your investment.</p>
                    </FadeIn>

                    <div className="pricing-grid">
                        <SpotlightCard className="pricing-card" spotlightColor="rgba(255, 255, 255, 0.12)">
                            <div className="pricing-tag">Starter</div>
                            <div className="pricing-name">Business Website</div>
                            <div className="pricing-price">
                                <span className="price-amount">₹25K</span>
                                <span className="price-period">one-time</span>
                            </div>
                            <p className="pricing-desc">Perfect for startups and small businesses looking to establish a professional online presence.</p>
                            <ul className="pricing-features">
                                <li className="pricing-feature"><span className="check">✓</span> 5-7 Page Responsive Website</li>
                                <li className="pricing-feature"><span className="check">✓</span> Modern UI/UX Design</li>
                                <li className="pricing-feature"><span className="check">✓</span> Basic SEO Setup</li>
                                <li className="pricing-feature"><span className="check">✓</span> Contact Form Integration</li>
                                <li className="pricing-feature"><span className="check">✓</span> Google Analytics Setup</li>
                                <li className="pricing-feature"><span className="check no">✕</span> E-commerce Features</li>
                            </ul>
                            <Link to="/contact" className="btn btn-outline" style={{ width: "100%", justifyContent: "center", borderRadius: "8px" }}>
                                Get Started →
                            </Link>
                        </SpotlightCard>

                        <SpotlightCard className="pricing-card featured" spotlightColor="rgba(108, 99, 255, 0.28)" borderColor="rgba(108, 99, 255, 0.45)">
                            <div className="popular-badge">🔥 Most Popular</div>
                            <div className="pricing-name">Full-Stack MERN App</div>
                            <div className="pricing-price">
                                <span className="price-amount">₹49K</span>
                                <span className="price-period">starting</span>
                            </div>
                            <p className="pricing-desc">Complete MERN Stack web application with database, authentication, admin panel and all features.</p>
                            <ul className="pricing-features">
                                <li className="pricing-feature"><span className="check">✓</span> Custom React Frontend</li>
                                <li className="pricing-feature"><span className="check">✓</span> Node.js + Express Backend</li>
                                <li className="pricing-feature"><span className="check">✓</span> MongoDB Database</li>
                                <li className="pricing-feature"><span className="check">✓</span> User Authentication & Roles</li>
                                <li className="pricing-feature"><span className="check">✓</span> Admin Dashboard</li>
                                <li className="pricing-feature"><span className="check">✓</span> API Integration & Deployment</li>
                            </ul>
                            <Link to="/contact" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", borderRadius: "8px" }}>
                                Start Project →
                            </Link>
                        </SpotlightCard>

                        <SpotlightCard className="pricing-card" spotlightColor="rgba(255, 255, 255, 0.12)">
                            <div className="pricing-tag">Growth</div>
                            <div className="pricing-name">Digital Marketing</div>
                            <div className="pricing-price">
                                <span className="price-amount">₹15K</span>
                                <span className="price-period">/month</span>
                            </div>
                            <p className="pricing-desc">Complete digital marketing management — SEO, social media, ads and content creation for consistent growth.</p>
                            <ul className="pricing-features">
                                <li className="pricing-feature"><span className="check">✓</span> Social Media Management (3 platforms)</li>
                                <li className="pricing-feature"><span className="check">✓</span> 20 Posts / Month</li>
                                <li className="pricing-feature"><span className="check">✓</span> SEO Optimization</li>
                                <li className="pricing-feature"><span className="check">✓</span> Monthly Performance Report</li>
                                <li className="pricing-feature"><span className="check">✓</span> Ad Campaign Management</li>
                                <li className="pricing-feature"><span className="check">✓</span> Dedicated Account Manager</li>
                            </ul>
                            <Link to="/contact" className="btn btn-outline" style={{ width: "100%", justifyContent: "center", borderRadius: "8px" }}>
                                Get Started →
                            </Link>
                        </SpotlightCard>
                    </div>

                    <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "32px", fontSize: "0.9rem" }}>
                        💬 Need a custom quote? <a href="tel:+919599433616" style={{ color: "var(--primary-light)" }}>Call Divyansh: +91 9599433616</a> or <Link to="/contact" style={{ color: "var(--primary-light)" }}>send us a message</Link>
                    </p>
                </div>
            </section>

            {/* ============ TESTIMONIALS ============ */}
            <section className="section-padding">
                <div className="container">
                    <FadeIn className="section-header">
                        <span className="section-tag">Client Love</span>
                        <h2 className="section-title">What Our <span className="gradient-text">Clients Say</span></h2>
                        <p className="section-desc">Real results. Real businesses. Real growth stories from clients who trusted Fitscalez.</p>
                    </FadeIn>

                    <div className="testimonials-grid">
                        <SpotlightCard className="testimonial-card" spotlightColor="rgba(108, 99, 255, 0.16)">
                            <div className="stars">★★★★★</div>
                            <p className="testimonial-text">"Fitscalez built our entire e-commerce platform from scratch using MERN Stack. The website is blazing fast, looks premium and our sales have doubled since launch. Highly recommend Divyansh and the team!"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">R</div>
                                <div>
                                    <div className="author-name">Rahul Sharma</div>
                                    <div className="author-company">CEO, FashionWave India</div>
                                </div>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="testimonial-card" spotlightColor="rgba(0, 229, 153, 0.14)">
                            <div className="stars">★★★★★</div>
                            <p className="testimonial-text">"Our organic traffic grew by 400% in just 6 months with Fitscalez's SEO strategy. We now rank #1 for all our target keywords in Delhi. The ROI has been absolutely incredible!"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">P</div>
                                <div>
                                    <div className="author-name">Priya Kapoor</div>
                                    <div className="author-company">Founder, MedCare Solutions</div>
                                </div>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="testimonial-card" spotlightColor="rgba(56, 189, 248, 0.16)">
                            <div className="stars">★★★★★</div>
                            <p className="testimonial-text">"The social media campaigns Fitscalez ran for us increased our Instagram followers from 2K to 50K in 4 months. Our brand engagement has never been better. Professional team that truly delivers!"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">A</div>
                                <div>
                                    <div className="author-name">Amit Gupta</div>
                                    <div className="author-company">Marketing Head, GreenLeaf Organics</div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* ============ TEAM SECTION ============ */}
            <section className="section-padding" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <FadeIn className="section-header">
                        <span className="section-tag">Our Team</span>
                        <h2 className="section-title">The <span className="gradient-text">Experts</span> Behind Your Growth</h2>
                        <p className="section-desc">Passionate professionals dedicated to making your business succeed in the digital world.</p>
                    </FadeIn>

                    <div className="team-grid">
                        <SpotlightCard className="team-card" spotlightColor="rgba(108, 99, 255, 0.18)">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(255,101,132,0.2))" }}>👨‍💼</div>
                            </div>
                            <h3>Mr. Hariom Saini</h3>
                            <div className="role">Founder & CEO</div>
                            <p className="bio">Visionary entrepreneur with expertise in business strategy and digital transformation. Built Fitscalez to empower Indian businesses online.</p>
                            <div className="team-social">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="team-card" spotlightColor="rgba(67, 233, 123, 0.18)">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(67,233,123,0.2), rgba(56,249,215,0.2))" }}>👩‍💼</div>
                            </div>
                            <h3>Ms. Anshul Sharma</h3>
                            <div className="role">Partner & Strategy Director</div>
                            <p className="bio">Expert in digital marketing strategy and brand development. Drives growth for clients with data-driven insights and creative solutions.</p>
                            <div className="team-social">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="team-card" spotlightColor="rgba(56, 189, 248, 0.2)">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(108,99,255,0.2))" }}>👨‍💻</div>
                            </div>
                            <h3>Divyansh</h3>
                            <div className="role">Lead Web Developer</div>
                            <p className="bio">MERN Stack expert specializing in building fast, scalable and stunning web applications. Contact: <a href="tel:+919599433616" style={{ color: "var(--primary-light)" }}>+91 9599433616</a></p>
                            <div className="team-social">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
                                <a href="tel:+919599433616" aria-label="Call Divyansh">📞</a>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">🐙</a>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="team-card" spotlightColor="rgba(251, 146, 60, 0.18)">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(251,146,60,0.2), rgba(255,101,132,0.2))" }}>🎨</div>
                            </div>
                            <h3>Creative Team</h3>
                            <div className="role">Design & Content</div>
                            <p className="bio">Our talented designers, content creators and video editors work together to create stunning visual identities and engaging content.</p>
                            <div className="team-social">
                                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">🎨</a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">🏀</a>
                                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" aria-label="Behance">📸</a>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* ============ FAQ ACCORDION ============ */}
            <section className="section-padding" id="faq">
                <div className="container" style={{ maxWidth: "860px" }}>
                    <FadeIn className="section-header">
                        <span className="section-tag">Got Questions?</span>
                        <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
                        <p className="section-desc">Got questions about our web development and marketing services? We have answers.</p>
                    </FadeIn>

                    <div className="faq-grid">
                        {[
                            {
                                q: "What web development and digital marketing services does Fitscalez offer in Delhi?",
                                a: "Fitscalez offers full-stack MERN (MongoDB, Express, React, Node.js) web development, custom business websites, search engine optimization (SEO), social media marketing, paid ads (Google Ads & Meta Ads), video production, and business growth consulting for Indian and international businesses.",
                            },
                            {
                                q: "How much does a custom website cost with Fitscalez?",
                                a: "Our custom business websites start at ₹25,000 for a 5–7 page modern responsive website with basic SEO. Full-stack MERN web applications with database architecture, user authentication, and admin dashboards start from ₹49,000. Contact Divyansh at +91 9599433616 for a transparent quote.",
                            },
                            {
                                q: "Why is MERN Stack the best choice for web development?",
                                a: "MERN Stack (MongoDB, Express.js, React.js, Node.js) offers unmatched rendering speed, rock-solid security, and modular scalability. Unlike sluggish CMS templates, custom MERN applications load instantly, deliver superior user experience, and rank significantly higher on Google Core Web Vitals.",
                            },
                            {
                                q: "Can Fitscalez help my business rank on Page 1 of Google?",
                                a: "Yes! We implement comprehensive on-page SEO, high-authority link acquisition, and technical optimization tailored for Google's latest algorithms. Our clients typically achieve a 200% to 400% surge in qualified organic search traffic within 3 to 6 months.",
                            },
                            {
                                q: "How do I contact Fitscalez or hire Divyansh for a web development project?",
                                a: "You can directly call or WhatsApp Lead Web Developer Divyansh at +91 9599433616, email us at fitscalezofficial@gmail.com, or fill out our online inquiry form. We provide free consultations and project estimates within 24 hours.",
                            },
                            {
                                q: "Does Fitscalez work with clients outside Delhi?",
                                a: "Absolutely! While our head office is located in Civil Lines, Delhi, we successfully serve clients across PAN-India (Mumbai, Bengaluru, Pune, Hyderabad, Jaipur) and globally through seamless remote collaboration, video meetings, and WhatsApp updates.",
                            },
                        ].map((faq, idx) => (
                            <div
                                key={idx}
                                className={`faq-item ${openFaq === idx ? "open" : ""}`}
                                style={{
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    border: openFaq === idx ? "1px solid rgba(108, 99, 255, 0.45)" : "1px solid rgba(255, 255, 255, 0.08)",
                                    transition: "border-color 0.3s ease, background 0.3s ease",
                                    marginBottom: "14px",
                                    background: openFaq === idx ? "rgba(24, 27, 40, 0.85)" : "rgba(18, 20, 29, 0.6)",
                                    backdropFilter: "blur(16px)",
                                }}
                            >
                                <button
                                    type="button"
                                    className="faq-question"
                                    onClick={() => toggleFaq(idx)}
                                    aria-expanded={openFaq === idx}
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        background: "none",
                                        border: "none",
                                        color: "inherit",
                                        cursor: "pointer",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "20px 24px",
                                        fontFamily: "inherit",
                                    }}
                                >
                                    <span style={{ fontSize: "1.05rem", fontWeight: 600, paddingRight: "16px" }}>{faq.q}</span>
                                    <motion.span
                                        animate={{ rotate: openFaq === idx ? 180 : 0 }}
                                        transition={{ duration: 0.25 }}
                                        style={{ display: "inline-block", fontSize: "0.85rem", color: "var(--primary-light)", flexShrink: 0 }}
                                    >
                                        ▼
                                    </motion.span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <div style={{ padding: "0 24px 22px 24px", color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                                                <p style={{ margin: 0 }}>{faq.a}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ CTA BANNER SECTION ============ */}
            <section className="section-padding">
                <div className="container">
                    <FadeIn className="cta-section">
                        <h2>Ready to <span className="gradient-text">Scale Your Business?</span></h2>
                        <p>Join 80+ businesses that have transformed their online presence with Fitscalez. Let's build something extraordinary together.</p>
                        <div className="cta-actions">
                            <Link to="/contact" className="btn btn-primary">🚀 Start Your Project</Link>
                            <Link to="/services" className="btn btn-outline">View All Services</Link>
                        </div>
                        <div className="cta-contact-strip">
                            <a href="tel:+919599433616">📞 +91 9599433616</a>
                            <div className="divider"></div>
                            <a href="mailto:fitscalezofficial@gmail.com">✉️ fitscalezofficial@gmail.com</a>
                            <div className="divider"></div>
                            <a href="https://wa.me/919599433616" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </>
    );
};

export default Home;
