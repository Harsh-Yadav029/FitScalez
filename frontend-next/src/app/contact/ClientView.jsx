"use client";
import React from "react";
import Link from "next/link";
// SeoHelmet replaced by Next.js metadata
import ContactForm from "@/components/ContactForm";

const Contact = () => {
    return (
        <>
            

            {/* Page Hero */}
            <div className="page-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span>â€º</span>
                        <span>Contact</span>
                    </div>
                    <div className="badge" style={{ marginBottom: "16px" }}>ðŸ“ž Let's Talk</div>
                    <h1>Get In <span className="gradient-text">Touch</span></h1>
                    <p>Ready to start your project? We'd love to hear from you. Send us a message or call us directly â€” we respond within 24 hours.</p>
                </div>
            </div>

            {/* Contact Main */}
            <section className="section-padding">
                <div className="container">
                    <div className="contact-grid">

                        {/* Contact Info */}
                        <div className="animate-on-scroll">
                            <div className="brand-badge-logo" style={{ marginBottom: "20px" }}>
                                <img src="/images/logo.png" alt="Fitscalez" />
                                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "500" }}>Delhi's Premier Agency</span>
                            </div>
                            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: "700", marginBbottom: "12px" }}>
                                Let's Build Something <span className="gradient-text">Amazing</span>
                            </h2>
                            <p className="about-desc">
                                Whether you have a clear project in mind or just want to explore possibilities â€” we're here to help. Our team will get back to you within 24 hours.
                            </p>

                            <a href="tel:+919599433616" className="contact-item" style={{ display: "flex", textDecoration: "none", marginBottom: "12px" }}>
                                <div className="contact-item-icon">ðŸ“ž</div>
                                <div className="contact-item-text" style={{ marginLeft: "14px" }}>
                                    <h4>Call Divyansh (Web Developer)</h4>
                                    <p>+91 9599433616 â€” Mon to Sat, 9AM-7PM</p>
                                </div>
                            </a>

                            <a href="tel:+919311439493" className="contact-item" style={{ display: "flex", textDecoration: "none", marginBottom: "12px" }}>
                                <div className="contact-item-icon">ðŸ“ž</div>
                                <div className="contact-item-text" style={{ marginLeft: "14px" }}>
                                    <h4>Business Enquiries</h4>
                                    <p>+91 9311439493 â€” General queries</p>
                                </div>
                            </a>

                            <a href="mailto:fitscalezofficial@gmail.com" className="contact-item" style={{ display: "flex", textDecoration: "none", marginBottom: "12px" }}>
                                <div className="contact-item-icon">âœ‰ï¸</div>
                                <div className="contact-item-text" style={{ marginLeft: "14px" }}>
                                    <h4>Email Us</h4>
                                    <p>fitscalezofficial@gmail.com</p>
                                </div>
                            </a>

                            <div className="contact-item" style={{ display: "flex", marginBottom: "12px" }}>
                                <div className="contact-item-icon">ðŸ“</div>
                                <div className="contact-item-text" style={{ marginLeft: "14px" }}>
                                    <h4>Office Address</h4>
                                    <p>24, Shri Ram Road, Civil Lines,<br />Delhi - 110054, India</p>
                                </div>
                            </div>

                            <a
                                href="https://wa.me/919599433616?text=Hi%20Fitscalez!%20I%20want%20to%20discuss%20a%20project."
                                target="_blank"
                                rel="noreferrer"
                                className="contact-item"
                                style={{
                                    display: "flex",
                                    textDecoration: "none",
                                    marginBottom: "24px",
                                    borderColor: "rgba(37,211,102,0.3)",
                                    background: "rgba(37,211,102,0.05)"
                                }}
                            >
                                <div className="contact-item-icon" style={{ background: "rgba(37,211,102,0.15)", borderColor: "rgba(37,211,102,0.3)" }}>
                                    ðŸ’¬
                                </div>
                                <div className="contact-item-text" style={{ marginLeft: "14px" }}>
                                    <h4 style={{ color: "#25d366" }}>WhatsApp Us</h4>
                                    <p>+91 9599433616 â€” Instant Response</p>
                                </div>
                            </a>

                            <div className="hours-card">
                                <h4>â° Business Hours</h4>
                                <div className="hours-row"><span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span></div>
                                <div className="hours-row"><span>Saturday</span><span>10:00 AM - 4:00 PM</span></div>
                                <div className="hours-row"><span>Sunday</span><span>Closed</span></div>
                                <div className="hours-row"><span>WhatsApp Support</span><span style={{ color: "var(--accent2)" }}>24/7</span></div>
                            </div>

                            {/* Map embed / location card */}
                            <div style={{ marginTop: "20px", borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--border)", background: "var(--card)", padding: "20px", textAlign: "center" }}>
                                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>ðŸ“</div>
                                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>24, Shri Ram Road, Civil Lines, Delhi-110054</p>
                                <a href="https://maps.google.com/?q=Civil+Lines+Delhi" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "12px", fontSize: "0.83rem", color: "var(--primary-light)", fontWeight: "500" }}>
                                    View on Google Maps â†—
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="animate-on-scroll delay-2">
                            <div className="card contact-form-card">
                                <h2>Send Us a <span className="gradient-text">Message</span></h2>
                                <ContactForm source="contact_page" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Why Contact Us / What Happens After You Contact Us */}
            <section className="section-padding" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Why Choose Us</span>
                        <h2 className="section-title">What Happens <span className="gradient-text">After You Contact Us</span></h2>
                    </div>
                    <div className="process-steps">
                        <div className="process-step animate-on-scroll">
                            <div className="step-number">01</div>
                            <h3>We Respond in 24 Hours</h3>
                            <p>Divyansh or our team will review your message and reach out within 24 hours â€” usually much faster.</p>
                        </div>
                        <div className="process-step animate-on-scroll delay-1">
                            <div className="step-number">02</div>
                            <h3>Free Strategy Call</h3>
                            <p>We schedule a 30-minute free consultation to understand your goals and discuss how we can help.</p>
                        </div>
                        <div className="process-step animate-on-scroll delay-2">
                            <div className="step-number">03</div>
                            <h3>Custom Proposal</h3>
                            <p>We prepare a detailed project proposal with scope, timeline, pricing and expected outcomes.</p>
                        </div>
                        <div className="process-step animate-on-scroll delay-3">
                            <div className="step-number">04</div>
                            <h3>We Get to Work</h3>
                            <p>Once approved, we kick off immediately with a dedicated team, regular updates and transparent delivery.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;

