import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SeoHelmet from "../components/SeoHelmet";

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

    // Scroll animations and counter observer
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

        // Counter animation
        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute("data-target"), 10);
            const suffix = el.getAttribute("data-suffix") || "";
            const duration = 1800;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current) + suffix;
            }, 16);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll(".counter-number[data-target]").forEach((el) => {
            counterObserver.observe(el);
        });

        return () => {
            observer.disconnect();
            counterObserver.disconnect();
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
                        <div className="hero-badge animate-on-scroll">
                            <span className="badge">#1 Digital Agency in Delhi</span>
                        </div>

                        <h1 className="hero-title animate-on-scroll delay-1">
                            <span className="line1">We Build</span>
                            <span className="gradient-text line2" id="typedText">
                                {typedText}
                            </span>
                            <span className="line2">That Converts</span>
                        </h1>

                        <p className="hero-subtitle animate-on-scroll delay-2">
                            Fitscalez is a premium <strong>Web Development & Digital Marketing Agency</strong> helping businesses across
                            India grow online. From MERN Stack apps to SEO & Social Media — we scale your brand with precision.
                        </p>

                        <div className="hero-actions animate-on-scroll delay-3">
                            <Link to="/contact" className="btn btn-primary">
                                🚀 Start Your Project
                            </Link>
                            <Link to="/services" className="btn btn-outline">
                                View Services →
                            </Link>
                        </div>

                        <div className="hero-stats animate-on-scroll delay-4">
                            <div className="stat-item">
                                <span className="stat-number">150+</span>
                                <span className="stat-label">Projects Delivered</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">80+</span>
                                <span className="stat-label">Happy Clients</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">5★</span>
                                <span className="stat-label">Avg Rating</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">3+</span>
                                <span className="stat-label">Years Exp.</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Visual Card Stack */}
                    <div className="hero-visual animate-on-scroll delay-2">
                        <div className="hero-card-stack float-animation">
                            <div className="glass-card hero-main-card">
                                <div className="card-header">
                                    <img
                                        src="/images/logo.png"
                                        alt="Fitscalez"
                                        style={{ width: "36px", height: "36px", borderRadius: "8px", flexShrink: 0 }}
                                    />
                                    <div>
                                        <div className="card-title">Campaign Performance</div>
                                        <div className="card-sub">Fitscalez Growth Engine</div>
                                    </div>
                                </div>

                                <div className="metric-grid">
                                    <div className="metric-item">
                                        <div className="metric-value">+342%</div>
                                        <div className="metric-label">Organic Traffic</div>
                                    </div>
                                    <div className="metric-item">
                                        <div className="metric-value">₹4.2L</div>
                                        <div className="metric-label">Revenue Generated</div>
                                    </div>
                                    <div className="metric-item">
                                        <div className="metric-value">89%</div>
                                        <div className="metric-label">Client Satisfaction</div>
                                    </div>
                                    <div className="metric-item">
                                        <div className="metric-value">12x</div>
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
                                            <div className="progress-fill" style={{ width: "94%" }}></div>
                                        </div>
                                    </div>
                                    <div className="progress-item">
                                        <div className="progress-label">
                                            <span>Social Media Reach</span>
                                            <span>78%</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: "78%" }}></div>
                                        </div>
                                    </div>
                                    <div className="progress-item">
                                        <div className="progress-label">
                                            <span>Conversion Rate</span>
                                            <span>87%</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: "87%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="floating-badge floating-badge-1">
                                <div className="dot"></div>
                                Live Projects: 12
                            </div>

                            <div className="floating-badge floating-badge-2">
                                🏆 Top Rated Agency 2024
                            </div>
                        </div>
                    </div>
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
                        <div className="counter-item animate-on-scroll">
                            <div className="counter-icon">🌐</div>
                            <div className="counter-number" data-target="150" data-suffix="+">0+</div>
                            <div className="counter-label">Websites Launched</div>
                        </div>
                        <div className="counter-item animate-on-scroll delay-1">
                            <div className="counter-icon">📈</div>
                            <div className="counter-number" data-target="300" data-suffix="%">0%</div>
                            <div className="counter-label">Avg Traffic Growth</div>
                        </div>
                        <div className="counter-item animate-on-scroll delay-2">
                            <div className="counter-icon">😊</div>
                            <div className="counter-number" data-target="80" data-suffix="+">0+</div>
                            <div className="counter-label">Happy Clients</div>
                        </div>
                        <div className="counter-item animate-on-scroll delay-3">
                            <div className="counter-icon">⭐</div>
                            <div className="counter-number" data-target="98" data-suffix="%">0%</div>
                            <div className="counter-label">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ ABOUT SECTION ============ */}
            <section className="section-padding" id="about">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-img-wrap animate-on-scroll">
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
                        </div>

                        <div className="about-text animate-on-scroll delay-2">
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
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SERVICES SECTION ============ */}
            <section className="section-padding" id="services" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">What We Do</span>
                        <h2 className="section-title">Services That Scale Your <span className="gradient-text">Business</span></h2>
                        <p className="section-desc">From stunning websites to viral marketing campaigns — we have everything your business needs to dominate online.</p>
                    </div>

                    <div className="services-grid">
                        <div className="card service-card">
                            <div className="service-icon icon-purple">💻</div>
                            <h3>MERN Stack Web Development</h3>
                            <p>Full-stack web applications using MongoDB, Express, React & Node.js. Fast, scalable, modern websites starting from ₹25,000.</p>
                            <div className="service-features">
                                <span className="service-feature">Custom Web Design & Development</span>
                                <span className="service-feature">E-commerce & Portal Solutions</span>
                                <span className="service-feature">API Integration & Backend</span>
                                <span className="service-feature">Mobile Responsive & SEO Ready</span>
                            </div>
                        </div>

                        <div className="card service-card">
                            <div className="service-icon icon-pink">📱</div>
                            <h3>Social Media Marketing</h3>
                            <p>Create, Connect, Convert — our strategic social media approach builds genuine audiences and turns followers into loyal paying customers.</p>
                            <div className="service-features">
                                <span className="service-feature">Content Strategy & Creation</span>
                                <span className="service-feature">Community Management</span>
                                <span className="service-feature">Influencer Partnerships</span>
                                <span className="service-feature">Instagram, Facebook, LinkedIn</span>
                            </div>
                        </div>

                        <div className="card service-card">
                            <div className="service-icon icon-green">🔍</div>
                            <h3>SEO & Search Rankings</h3>
                            <p>Rank #1 on Google with our proven SEO strategies. Keyword research, on-page optimization, technical SEO & quality link building.</p>
                            <div className="service-features">
                                <span className="service-feature">Keyword Research & Planning</span>
                                <span className="service-feature">On-Page & Technical SEO</span>
                                <span className="service-feature">Link Building Campaigns</span>
                                <span className="service-feature">Monthly Reporting</span>
                            </div>
                        </div>

                        <div className="card service-card">
                            <div className="service-icon icon-blue">💰</div>
                            <h3>Paid Ads (PPC)</h3>
                            <p>ROI-driven advertising campaigns on Google, Facebook, Instagram & LinkedIn. Every rupee spent generates maximum returns.</p>
                            <div className="service-features">
                                <span className="service-feature">Google Ads Management</span>
                                <span className="service-feature">Facebook & Instagram Ads</span>
                                <span className="service-feature">LinkedIn Advertising</span>
                                <span className="service-feature">Performance Analytics</span>
                            </div>
                        </div>

                        <div className="card service-card">
                            <div className="service-icon icon-orange">🎬</div>
                            <h3>Video Production & Editing</h3>
                            <p>Turning moments into masterpieces. Professional video editing that blends storytelling with stunning visuals for maximum impact.</p>
                            <div className="service-features">
                                <span className="service-feature">Commercial Video Production</span>
                                <span className="service-feature">Social Media Reels & Shorts</span>
                                <span className="service-feature">Motion Graphics & Animation</span>
                                <span className="service-feature">Color Grading & Post-Production</span>
                            </div>
                        </div>

                        <div className="card service-card">
                            <div className="service-icon icon-teal">📊</div>
                            <h3>Business Growth Strategy</h3>
                            <p>Data-driven market research and business intelligence that reveals untapped opportunities and empowers visionary decisions.</p>
                            <div className="service-features">
                                <span className="service-feature">Market Analysis & Research</span>
                                <span className="service-feature">Competitor Intelligence</span>
                                <span className="service-feature">Growth Planning & Roadmap</span>
                                <span className="service-feature">Business Consulting</span>
                            </div>
                        </div>

                        <div className="card service-card">
                            <div className="service-icon icon-red">📧</div>
                            <h3>Email Marketing</h3>
                            <p>Targeted email campaigns that nurture leads, retain customers and drive conversions with personalized automation workflows.</p>
                            <div className="service-features">
                                <span className="service-feature">Campaign Design & Copywriting</span>
                                <span className="service-feature">List Management & Segmentation</span>
                                <span className="service-feature">Automated Drip Campaigns</span>
                                <span className="service-feature">Analytics & A/B Testing</span>
                            </div>
                        </div>

                        <div className="card service-card">
                            <div className="service-icon icon-yellow">📸</div>
                            <h3>Product Shoots & Content</h3>
                            <p>High-quality product photography and creative content production that showcases your brand with clarity, style and impact.</p>
                            <div className="service-features">
                                <span className="service-feature">Professional Product Photography</span>
                                <span className="service-feature">Brand Content Strategy</span>
                                <span className="service-feature">Lifestyle Shoots</span>
                                <span className="service-feature">Catalog & E-commerce Shoots</span>
                            </div>
                        </div>
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
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Featured Work</span>
                        <h2 className="section-title">Client Projects That <span className="gradient-text">Deliver Impact</span></h2>
                        <p className="section-desc">Take a look at some of our live, production web applications and digital platforms engineered for ambitious businesses.</p>
                    </div>

                    <div className="projects-grid">
                        {/* Walk The Plan */}
                        <div className="card project-card">
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
                        </div>

                        {/* House of Symmetry */}
                        <div className="card project-card">
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
                        </div>
                    </div>

                    <div style={{ textAlign: "center", marginTop: "40px" }} className="animate-on-scroll">
                        <Link to="/projects" className="btn btn-outline">
                            Explore All Projects →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============ PROCESS SECTION ============ */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">How We Work</span>
                        <h2 className="section-title">Our <span className="gradient-text">Proven Process</span></h2>
                        <p className="section-desc">A streamlined 5-step approach that ensures quality, transparency and results every single time.</p>
                    </div>

                    <div className="process-steps">
                        <div className="process-step animate-on-scroll">
                            <div className="step-number">01</div>
                            <h3>Discovery Call</h3>
                            <p>We understand your business, goals, target audience and competition through a deep-dive consultation.</p>
                        </div>
                        <div className="process-step animate-on-scroll delay-1">
                            <div className="step-number">02</div>
                            <h3>Strategy & Plan</h3>
                            <p>Our experts craft a customized strategy with clear milestones, deliverables and expected outcomes.</p>
                        </div>
                        <div className="process-step animate-on-scroll delay-2">
                            <div className="step-number">03</div>
                            <h3>Design & Build</h3>
                            <p>We design, develop and create — with regular updates and your feedback integrated at every step.</p>
                        </div>
                        <div className="process-step animate-on-scroll delay-3">
                            <div className="step-number">04</div>
                            <h3>Launch & Deploy</h3>
                            <p>After rigorous testing, we launch your project live and ensure everything runs perfectly.</p>
                        </div>
                        <div className="process-step animate-on-scroll delay-4">
                            <div className="step-number">05</div>
                            <h3>Grow & Optimize</h3>
                            <p>We monitor performance, optimize continuously and scale what works to maximize your ROI.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ PRICING HIGHLIGHTS ============ */}
            <section className="section-padding" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Transparent Pricing</span>
                        <h2 className="section-title">Affordable Plans for <span className="gradient-text">Every Business</span></h2>
                        <p className="section-desc">No hidden fees. No surprises. Clear pricing that delivers maximum value for your investment.</p>
                    </div>

                    <div className="pricing-grid">
                        <div className="card pricing-card">
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
                        </div>

                        <div className="card pricing-card featured">
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
                        </div>

                        <div className="card pricing-card">
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
                        </div>
                    </div>

                    <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "32px", fontSize: "0.9rem" }} className="animate-on-scroll">
                        💬 Need a custom quote? <a href="tel:+919599433616" style={{ color: "var(--primary-light)" }}>Call Divyansh: +91 9599433616</a> or <Link to="/contact" style={{ color: "var(--primary-light)" }}>send us a message</Link>
                    </p>
                </div>
            </section>

            {/* ============ TESTIMONIALS ============ */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Client Love</span>
                        <h2 className="section-title">What Our <span className="gradient-text">Clients Say</span></h2>
                        <p className="section-desc">Real results. Real businesses. Real growth stories from clients who trusted Fitscalez.</p>
                    </div>

                    <div className="testimonials-grid">
                        <div className="card testimonial-card">
                            <div className="stars">★★★★★</div>
                            <p className="testimonial-text">"Fitscalez built our entire e-commerce platform from scratch using MERN Stack. The website is blazing fast, looks premium and our sales have doubled since launch. Highly recommend Divyansh and the team!"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">R</div>
                                <div>
                                    <div className="author-name">Rahul Sharma</div>
                                    <div className="author-company">CEO, FashionWave India</div>
                                </div>
                            </div>
                        </div>

                        <div className="card testimonial-card">
                            <div className="stars">★★★★★</div>
                            <p className="testimonial-text">"Our organic traffic grew by 400% in just 6 months with Fitscalez's SEO strategy. We now rank #1 for all our target keywords in Delhi. The ROI has been absolutely incredible!"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">P</div>
                                <div>
                                    <div className="author-name">Priya Kapoor</div>
                                    <div className="author-company">Founder, MedCare Solutions</div>
                                </div>
                            </div>
                        </div>

                        <div className="card testimonial-card">
                            <div className="stars">★★★★★</div>
                            <p className="testimonial-text">"The social media campaigns Fitscalez ran for us increased our Instagram followers from 2K to 50K in 4 months. Our brand engagement has never been better. Professional team that truly delivers!"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">A</div>
                                <div>
                                    <div className="author-name">Amit Gupta</div>
                                    <div className="author-company">Marketing Head, GreenLeaf Organics</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ TEAM SECTION ============ */}
            <section className="section-padding" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Our Team</span>
                        <h2 className="section-title">The <span className="gradient-text">Experts</span> Behind Your Growth</h2>
                        <p className="section-desc">Passionate professionals dedicated to making your business succeed in the digital world.</p>
                    </div>

                    <div className="team-grid">
                        <div className="card team-card">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(255,101,132,0.2))" }}>👨‍💼</div>
                            </div>
                            <h3>Mr. Hariom Saini</h3>
                            <div className="role">Founder & CEO</div>
                            <p className="bio">Visionary entrepreneur with expertise in business strategy and digital transformation. Built Fitscalez to empower Indian businesses online.</p>
                        </div>

                        <div className="card team-card">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(67,233,123,0.2), rgba(56,249,215,0.2))" }}>👩‍💼</div>
                            </div>
                            <h3>Ms. Anshul Sharma</h3>
                            <div className="role">Partner & Strategy Director</div>
                            <p className="bio">Expert in digital marketing strategy and brand development. Drives growth for clients with data-driven insights and creative solutions.</p>
                        </div>

                        <div className="card team-card">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(108,99,255,0.2))" }}>👨‍💻</div>
                            </div>
                            <h3>Divyansh</h3>
                            <div className="role">Lead Web Developer</div>
                            <p className="bio">MERN Stack expert specializing in building fast, scalable and stunning web applications. Contact: <a href="tel:+919599433616" style={{ color: "var(--primary-light)" }}>+91 9599433616</a></p>
                        </div>

                        <div className="card team-card">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(251,146,60,0.2), rgba(255,101,132,0.2))" }}>🎨</div>
                            </div>
                            <h3>Creative Team</h3>
                            <div className="role">Design & Content</div>
                            <p className="bio">Our talented designers, content creators and video editors work together to create stunning visual identities and engaging content.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ FAQ ACCORDION ============ */}
            <section className="section-padding" id="faq">
                <div className="container" style={{ maxWidth: "860px" }}>
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Got Questions?</span>
                        <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
                        <p className="section-desc">Got questions about our web development and marketing services? We have answers.</p>
                    </div>

                    <div className="faq-grid animate-on-scroll">
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
                            >
                                <div
                                    className="faq-question"
                                    onClick={() => toggleFaq(idx)}
                                >
                                    <span>{faq.q}</span>
                                    <span className="faq-arrow">▼</span>
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

            {/* ============ CTA BANNER SECTION ============ */}
            <section className="section-padding">
                <div className="container">
                    <div className="cta-section animate-on-scroll">
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
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
