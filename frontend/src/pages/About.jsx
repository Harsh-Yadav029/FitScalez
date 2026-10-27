import React from "react";
import { Link } from "react-router-dom";
import SeoHelmet from "../components/SeoHelmet";

const About = () => {
    const aboutSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AboutPage",
                "@id": "https://fitscalez.com/about#webpage",
                url: "https://fitscalez.com/about",
                name: "About Fitscalez — Agency Story, Mission & Leadership",
            },
            {
                "@type": "LocalBusiness",
                "@id": "https://fitscalez.com/#organization",
                name: "Fitscalez",
                founder: {
                    "@type": "Person",
                    name: "Mr. Hariom Saini",
                    jobTitle: "Founder & CEO",
                },
            },
        ],
    };

    return (
        <>
            <SeoHelmet
                title="About Fitscalez — Agency Story, Mission & Leadership | Delhi"
                description="Learn about Fitscalez, our journey from 2021, technical leadership, and engineering standards for delivering high-performance web development and growth marketing."
                canonical="/about"
                schema={aboutSchema}
            />

            {/* Page Hero */}
            <div className="page-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <span>About Us</span>
                    </div>
                    <div className="badge" style={{ marginBottom: "16px" }}>Our Story</div>
                    <h1>
                        About <span className="gradient-text">Fitscalez</span>
                    </h1>
                    <p>
                        Your trusted partner for web development and digital marketing — helping Indian businesses scale to new heights since 2021.
                    </p>
                </div>
            </div>

            {/* Story Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-img-wrap animate-on-scroll">
                            <div
                                className="about-img-placeholder"
                                style={{
                                    background: "radial-gradient(circle at center, rgba(108,99,255,0.2) 0%, rgba(15,17,23,0.9) 70%)",
                                }}
                            >
                                <img
                                    src="/images/logo.png"
                                    alt="Fitscalez Agency"
                                    style={{
                                        maxWidth: "220px",
                                        height: "auto",
                                        marginBottom: "16px",
                                        filter: "drop-shadow(0 10px 25px rgba(108,99,255,0.4))",
                                    }}
                                />
                                <div className="about-img-text">Established 2021</div>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", position: "relative", textAlign: "center", padding: "0 20px" }}>
                                    Building Digital India, One Business at a Time
                                </p>
                            </div>
                            <div className="about-badge-float">
                                <div className="number">2021</div>
                                <div className="label">Founded in Delhi</div>
                            </div>
                        </div>

                        <div className="about-text animate-on-scroll delay-2">
                            <span className="section-tag">Our Journey</span>
                            <h2 className="section-title">
                                From a Vision to <span className="gradient-text">India's Top Agency</span>
                            </h2>
                            <p className="about-desc">
                                Fitscalez was born from a simple yet powerful idea — that every Indian business deserves a world-class digital presence. Founded in Delhi in 2021 by <strong>Mr. Hariom Saini</strong>, we started with a small team and a big dream: to help Indian businesses compete globally through technology and smart marketing.
                            </p>
                            <p className="about-desc">
                                Today, Fitscalez stands as one of Delhi's most trusted digital agencies. Our co-founder <strong>Ms. Anshul Sharma</strong> drives our marketing strategy, while our expert development team led by <strong>Divyansh</strong> (Contact: +91 9599433616) delivers cutting-edge web solutions that truly make a difference.
                            </p>
                            <p className="about-desc">
                                We've helped <strong>80+ businesses</strong> across PAN-India achieve measurable growth — from cutting-edge tech platforms like <a href="https://walktheplan.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary-light)" }}>Walk The Plan</a> (1:1 Scale Blueprint Projection) to luxury architecture studios like <a href="https://www.houseofsymmetry.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary-light)" }}>House of Symmetry</a> — with our comprehensive digital services including MERN Stack development, SEO, social media marketing, and business strategy.
                            </p>
                            <Link to="/contact" className="btn btn-primary" style={{ marginTop: "14px" }}>
                                Work With Us →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Counters Section */}
            <section className="counters-section">
                <div className="container">
                    <div className="counters-grid">
                        <div className="counter-item animate-on-scroll">
                            <div className="counter-icon">📅</div>
                            <div className="counter-number" data-target="3" data-suffix="+ Yrs">0 Yrs</div>
                            <div className="counter-label">In Business</div>
                        </div>
                        <div className="counter-item animate-on-scroll delay-1">
                            <div className="counter-icon">👥</div>
                            <div className="counter-number" data-target="80" data-suffix="+">0+</div>
                            <div className="counter-label">Happy Clients</div>
                        </div>
                        <div className="counter-item animate-on-scroll delay-2">
                            <div className="counter-icon">🌐</div>
                            <div className="counter-number" data-target="150" data-suffix="+">0+</div>
                            <div className="counter-label">Projects Completed</div>
                        </div>
                        <div className="counter-item animate-on-scroll delay-3">
                            <div className="counter-icon">⭐</div>
                            <div className="counter-number" data-target="5" data-suffix="★">0★</div>
                            <div className="counter-label">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-padding" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">What We Stand For</span>
                        <h2 className="section-title">
                            Our Core <span className="gradient-text">Values</span>
                        </h2>
                        <p className="section-desc">
                            These aren't just words on a wall. These are the principles that guide every decision, every project, every interaction at Fitscalez.
                        </p>
                    </div>

                    <div className="services-grid">
                        <div className="card service-card animate-on-scroll">
                            <div className="service-icon icon-purple">🎯</div>
                            <h3>Mission-Driven</h3>
                            <p>Our mission is to empower businesses with innovative digital solutions that drive sustainable growth. Every strategy we build is aligned with your specific business goals.</p>
                        </div>
                        <div className="card service-card animate-on-scroll delay-1">
                            <div className="service-icon icon-blue">💡</div>
                            <h3>Innovation First</h3>
                            <p>We constantly push boundaries and embrace the latest technologies. From AI-powered tools to cutting-edge frameworks, we ensure your business stays ahead of the curve.</p>
                        </div>
                        <div className="card service-card animate-on-scroll delay-2">
                            <div className="service-icon icon-green">🤝</div>
                            <h3>True Partnership</h3>
                            <p>We don't just work for you — we work with you. Building genuine partnerships, maintaining transparency, and celebrating your wins as our own.</p>
                        </div>
                        <div className="card service-card animate-on-scroll delay-3">
                            <div className="service-icon icon-orange">🏆</div>
                            <h3>Excellence Always</h3>
                            <p>Quality is non-negotiable. We strive for perfection in every line of code, every piece of content, every campaign — because your business deserves nothing less.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Meet the Team</span>
                        <h2 className="section-title">
                            The People Who Drive <span className="gradient-text">Your Success</span>
                        </h2>
                        <p className="section-desc">
                            A passionate team of experts — developers, marketers, designers and strategists — all dedicated to your business growth.
                        </p>
                    </div>

                    <div className="team-grid">
                        <div className="card team-card animate-on-scroll">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(255,101,132,0.2))" }}>👨‍💼</div>
                            </div>
                            <h3>Mr. Hariom Saini</h3>
                            <div className="role">Founder & CEO</div>
                            <p className="bio">Visionary leader and entrepreneur. Built Fitscalez from the ground up with a mission to democratize digital excellence for Indian businesses.</p>
                            <div className="team-social">
                                <a href="#">💼</a><a href="#">📸</a><a href="#">🐦</a>
                            </div>
                        </div>

                        <div className="card team-card animate-on-scroll delay-1">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(67,233,123,0.2), rgba(56,249,215,0.2))" }}>👩‍💼</div>
                            </div>
                            <h3>Ms. Anshul Sharma</h3>
                            <div className="role">Co-Founder & Strategy Director</div>
                            <p className="bio">Digital marketing strategist with deep expertise in brand building, content strategy, and growth marketing across diverse industries.</p>
                            <div className="team-social">
                                <a href="#">💼</a><a href="#">📸</a><a href="#">🐦</a>
                            </div>
                        </div>

                        <div className="card team-card animate-on-scroll delay-2">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(108,99,255,0.2))" }}>👨‍💻</div>
                            </div>
                            <h3>Divyansh</h3>
                            <div className="role">Lead Web Developer</div>
                            <p className="bio">MERN Stack specialist delivering fast, secure & scalable web applications. Available for direct consultations and project discussions.</p>
                            <div className="team-social">
                                <a href="tel:+919599433616">📞</a><a href="#">💼</a><a href="#">🐙</a>
                            </div>
                        </div>

                        <div className="card team-card animate-on-scroll delay-3">
                            <div className="team-avatar">
                                <div className="avatar-bg" style={{ background: "linear-gradient(135deg, rgba(251,146,60,0.2), rgba(255,101,132,0.2))" }}>🎨</div>
                            </div>
                            <h3>Design Studio</h3>
                            <div className="role">Creative & Content Team</div>
                            <p className="bio">Talented designers, content creators, video editors and photographers who craft stunning visual identities and engaging content.</p>
                            <div className="team-social">
                                <a href="#">🎨</a><a href="#">📸</a><a href="#">🐦</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Why Fitscalez</span>
                        <h2 className="section-title">
                            What Makes Us <span className="gradient-text">Different</span>
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                        <div className="card service-card animate-on-scroll">
                            <div className="service-icon icon-green">✅</div>
                            <h3>Proven Track Record</h3>
                            <p>150+ successful projects across web development, digital marketing, SEO and brand building. Our results speak louder than promises.</p>
                        </div>
                        <div className="card service-card animate-on-scroll delay-1">
                            <div className="service-icon icon-purple">🔒</div>
                            <h3>Transparent & Honest</h3>
                            <p>No hidden fees, no false promises. Clear communication, regular updates and honest advice that puts your business interests first.</p>
                        </div>
                        <div className="card service-card animate-on-scroll delay-2">
                            <div className="service-icon icon-blue">⚡</div>
                            <h3>Fast Turnaround</h3>
                            <p>We respect your time. Projects are delivered on schedule with agile processes that allow quick iteration and rapid deployment.</p>
                        </div>
                        <div className="card service-card animate-on-scroll delay-3">
                            <div className="service-icon icon-pink">💰</div>
                            <h3>Best Value for Money</h3>
                            <p>Premium quality at competitive pricing. We optimize every rupee of your budget to maximize ROI and deliver outstanding results.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="cta-section animate-on-scroll" style={{ textAlign: "center", padding: "60px 20px", background: "linear-gradient(135deg, rgba(108,99,255,0.1), rgba(255,101,132,0.1))", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                        <h2>
                            Ready to <span className="gradient-text">Work Together?</span>
                        </h2>
                        <p style={{ color: "var(--text-muted)", margin: "14px auto 30px", maxWidth: "600px", lineHeight: "1.7" }}>
                            Let's transform your vision into a digital reality. Start with a free consultation call today.
                        </p>
                        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link to="/contact" className="btn btn-primary">
                                Get a Free Proposal →
                            </Link>
                            <a href="tel:+919599433616" className="btn btn-outline">
                                Call +91 9599433616
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
