import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SeoHelmet from "../components/SeoHelmet";
import { TypeAnimation } from "react-type-animation";
import Magnet from "../components/effects/Magnet";
import BlurText from "../components/effects/BlurText";
import { FiArrowUpRight, FiTrendingUp } from "react-icons/fi";
import HomeServices from "../components/home/HomeServices";
import HomeProjects from "../components/home/Projects";
import LetsWorkTogether from "../components/home/LetsWorkTogether";

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
            <section id="Banner" className="relative pt-8 lg:pt-16 overflow-hidden pb-12 lg:pb-20">
                {/* Ambient Terracotta Glow Orbs */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute left-[-10%] top-10 h-80 w-80 rounded-full bg-[#BF4A1A]/12 blur-3xl" />
                    <div className="absolute right-[-8%] top-36 h-80 w-80 rounded-full bg-[#BF4A1A]/8 blur-3xl" />
                </div>

                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        {/* Left Column: Typography & CTAs */}
                        <div className="lg:col-span-7 bannerText">
                            <div className="inline-flex items-center gap-2 rounded-full border border-Primary/15 bg-brand px-3.5 py-1.5 shadow-sm mb-4">
                                <span className="size-2 rounded-full bg-coffee animate-pulse" />
                                <span className="font-poppins text-xs font-semibold tracking-wider uppercase text-Primary/80">
                                    #Top Digital & MERN Stack Agency in Delhi
                                </span>
                            </div>

                            <h1 className="font-soldier text-Primary text-[46px] sm:text-6xl md:text-7xl lg:text-[80px] font-bold uppercase tracking-tight leading-[0.95] mb-4">
                                We Build <span className="text-coffee">Digital Systems</span>
                                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-poppins text-second font-medium mt-2 normal-case tracking-normal">
                                    <TypeAnimation
                                        sequence={[
                                            "Websites That Convert.",
                                            1600,
                                            "Custom MERN Stack Apps.",
                                            1600,
                                            "High-ROI SEO Campaigns.",
                                            1600,
                                            "Viral Social Strategies.",
                                            1600,
                                            "Brand Identity & Media.",
                                            1600,
                                        ]}
                                        speed={50}
                                        repeat={Infinity}
                                        wrapper="span"
                                    />
                                </div>
                            </h1>

                            <div className="max-w-xl text-second/85 font-poppins text-sm sm:text-base leading-relaxed mb-8">
                                <BlurText
                                    text="Fitscalez is India's premier Web Development & Digital Marketing Agency helping businesses nationwide scale with cutting-edge MERN engineering, conversion design, and data-driven growth."
                                    delay={180}
                                    animateBy="words"
                                    direction="top"
                                />
                            </div>

                            {/* Dual Magnetic Buttons */}
                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <Magnet padding={15} disabled={false} magnetStrength={3}>
                                    <div>
                                        <Link
                                            to="/contact"
                                            className="ContactButton transition-trigger transition-link inline-flex items-center gap-3 px-7 py-3 font-poppins font-semibold text-sm lg:text-base text-Primary hover-this rounded-full shadow-sm hover:bg-coffee hover:text-brand transition-all duration-300"
                                        >
                                            Start Your Project
                                            <FiArrowUpRight className="text-lg" />
                                        </Link>
                                    </div>
                                </Magnet>

                                <Magnet padding={15} disabled={false} magnetStrength={3}>
                                    <Link
                                        to="/services"
                                        className="inline-flex items-center gap-2 px-7 py-3 font-poppins font-semibold text-sm lg:text-base text-Primary hover:text-white rounded-full border border-Primary/30 hover:bg-Primary hover:border-Primary transition-all duration-300 shadow-sm"
                                    >
                                        <span>Explore Services</span>
                                        <FiArrowUpRight className="text-base" />
                                    </Link>
                                </Magnet>
                            </div>

                            {/* Metrics Dock */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-Primary/15">
                                <div>
                                    <div className="font-soldier text-3xl sm:text-4xl font-bold text-coffee">150+</div>
                                    <div className="font-poppins text-xs font-medium text-second/75 mt-0.5">Projects Delivered</div>
                                </div>
                                <div>
                                    <div className="font-soldier text-3xl sm:text-4xl font-bold text-coffee">80+</div>
                                    <div className="font-poppins text-xs font-medium text-second/75 mt-0.5">Happy Clients</div>
                                </div>
                                <div>
                                    <div className="font-soldier text-3xl sm:text-4xl font-bold text-coffee">300%</div>
                                    <div className="font-poppins text-xs font-medium text-second/75 mt-0.5">Avg Traffic Growth</div>
                                </div>
                                <div>
                                    <div className="font-soldier text-3xl sm:text-4xl font-bold text-coffee">5★</div>
                                    <div className="font-poppins text-xs font-medium text-second/75 mt-0.5">Google Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Fitscalez Growth Engine Card Stack */}
                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative w-full max-w-[420px] select-none">
                                {/* Top-Right Floating Live Badge (Image 1 match) */}
                                <div className="absolute -top-3.5 right-4 z-20 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#12131C] px-4 py-2 shadow-md backdrop-blur-md font-poppins text-xs font-semibold text-white">
                                    <span className="size-2 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599] animate-pulse" />
                                    <span>Live Projects: 12</span>
                                </div>

                                {/* Main Dark Glass Card (Image 1 match) */}
                                <div className="rounded-[26px] border border-white/10 bg-[#12131C] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl text-white">
                                    {/* Card Header */}
                                    <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-white/10">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-[#1E1F30] text-white border border-[#2B2D42] shadow-sm flex-shrink-0">
                                            <FiTrendingUp className="text-xl text-indigo-400" />
                                        </div>
                                        <div>
                                            <div className="font-poppins text-sm font-bold text-white">Campaign Performance</div>
                                            <div className="font-poppins text-xs text-white/50">Fitscalez Growth Engine</div>
                                        </div>
                                    </div>

                                    {/* 2x2 Metric Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-5">
                                        <div className="rounded-xl border border-white/5 bg-[#1B1C2A] p-3.5">
                                            <div className="font-soldier text-2xl font-bold text-[#8B70FF] leading-none">+342%</div>
                                            <div className="font-poppins text-[11px] font-medium text-white/55 mt-1">Organic Traffic</div>
                                        </div>
                                        <div className="rounded-xl border border-white/5 bg-[#1B1C2A] p-3.5">
                                            <div className="font-soldier text-2xl font-bold text-[#8B70FF] leading-none">₹4.2L</div>
                                            <div className="font-poppins text-[11px] font-medium text-white/55 mt-1">Revenue Generated</div>
                                        </div>
                                        <div className="rounded-xl border border-white/5 bg-[#1B1C2A] p-3.5">
                                            <div className="font-soldier text-2xl font-bold text-[#8B70FF] leading-none">89%</div>
                                            <div className="font-poppins text-[11px] font-medium text-white/55 mt-1">Client Satisfaction</div>
                                        </div>
                                        <div className="rounded-xl border border-white/5 bg-[#1B1C2A] p-3.5">
                                            <div className="font-soldier text-2xl font-bold text-[#8B70FF] leading-none">12x</div>
                                            <div className="font-poppins text-[11px] font-medium text-white/55 mt-1">ROI Delivered</div>
                                        </div>
                                    </div>

                                    {/* Progress Trackers */}
                                    <div className="flex flex-col gap-3 font-poppins text-xs">
                                        <div>
                                            <div className="flex justify-between font-medium text-white/75 mb-1">
                                                <span>SEO Rankings</span>
                                                <span className="font-bold text-white/90">94%</span>
                                            </div>
                                            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                                                <div className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] to-[#FF6584]" style={{ width: "94%" }} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between font-medium text-white/75 mb-1">
                                                <span>Social Media Reach</span>
                                                <span className="font-bold text-white/90">78%</span>
                                            </div>
                                            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                                                <div className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] to-[#FF6584]" style={{ width: "78%" }} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between font-medium text-white/75 mb-1">
                                                <span>Conversion Rate</span>
                                                <span className="font-bold text-white/90">87%</span>
                                            </div>
                                            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                                                <div className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] to-[#FF6584]" style={{ width: "87%" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom-Left Floating Agency Badge (Image 1 match) */}
                                <div className="absolute -bottom-3.5 -left-3 z-20 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#12131C] px-4 py-2 shadow-md backdrop-blur-md font-poppins text-xs font-bold text-white">
                                    🏆 Top Rated Agency 2024
                                </div>
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
                                Your Growth Partner in the <span className="text-coffee">Digital Age</span>
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

            {/* ============ SERVICES SECTION (Munna Stacking Cards) ============ */}
            <HomeServices />

            {/* ============ FEATURED PROJECTS (Munna Alternating Cards) ============ */}
            <HomeProjects />

            {/* ============ PROCESS SECTION ============ */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">How We Work</span>
                        <h2 className="section-title">Our <span className="text-coffee">Proven Process</span></h2>
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
                        <h2 className="section-title">Affordable Plans for <span className="text-coffee">Every Business</span></h2>
                        <p className="section-desc">No hidden fees. No surprises. Clear pricing that delivers maximum value for your investment.</p>
                    </div>

                    <div className="pricing-grid">
                        <div className="card pricing-card">
                            <div className="pricing-header-top"><div className="pricing-tag">Starter</div></div>
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
                            <div className="pricing-header-top"><div className="popular-badge">🔥 Most Popular</div></div>
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
                            <div className="pricing-header-top"><div className="pricing-tag">Growth</div></div>
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
                        <h2 className="section-title">What Our <span className="text-coffee">Clients Say</span></h2>
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
                        <h2 className="section-title">The <span className="text-coffee">Experts</span> Behind Your Growth</h2>
                        <p className="section-desc">Passionate professionals dedicated to making your business succeed in the digital world.</p>
                    </div>

                    <div className="team-grid">
                        <div className="card team-card animate-on-scroll">
                            <div className="team-avatar">
                                <div className="avatar-bg">👨‍💼</div>
                            </div>
                            <h3>Mr. Hariom Saini</h3>
                            <div className="role">Founder & CEO</div>
                            <p className="bio">Visionary entrepreneur with expertise in business strategy and digital transformation. Built Fitscalez to empower Indian businesses online.</p>
                            <div className="team-social">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
                            </div>
                        </div>

                        <div className="card team-card animate-on-scroll delay-1">
                            <div className="team-avatar">
                                <div className="avatar-bg">👩‍💼</div>
                            </div>
                            <h3>Ms. Anshul Sharma</h3>
                            <div className="role">Partner & Strategy Director</div>
                            <p className="bio">Expert in digital marketing strategy and brand development. Drives growth for clients with data-driven insights and creative solutions.</p>
                            <div className="team-social">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
                            </div>
                        </div>

                        <div className="card team-card animate-on-scroll delay-2">
                            <div className="team-avatar">
                                <div className="avatar-bg">👨‍💻</div>
                            </div>
                            <h3>Divyansh</h3>
                            <div className="role">Lead Web Developer</div>
                            <p className="bio">
                                MERN Stack expert specializing in building fast, scalable and stunning web applications.
                                <span className="block mt-1.5 font-medium">Contact: <a href="tel:+919599433616" className="text-coffee font-semibold whitespace-nowrap hover:underline">+91 9599433616</a></span>
                            </p>
                            <div className="team-social">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
                                <a href="tel:+919599433616" aria-label="Call Divyansh">📞</a>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">🐙</a>
                            </div>
                        </div>

                        <div className="card team-card animate-on-scroll delay-3">
                            <div className="team-avatar">
                                <div className="avatar-bg">🎨</div>
                            </div>
                            <h3>Creative Team</h3>
                            <div className="role">Design & Content</div>
                            <p className="bio">Our talented designers, content creators and video editors work together to create stunning visual identities and engaging content.</p>
                            <div className="team-social">
                                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">🎨</a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">🏀</a>
                                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" aria-label="Behance">📸</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ FAQ ACCORDION ============ */}
            <section className="section-padding" id="faq">
                <div className="container" style={{ maxWidth: "860px" }}>
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Got Questions?</span>
                        <h2 className="section-title">Frequently Asked <span className="text-coffee">Questions</span></h2>
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

            {/* ============ MUNNA KINETIC CTA SECTION ============ */}
            <LetsWorkTogether />
        </>
    );
};

export default Home;
