"use client";

import React, { useState } from "react";
import { leadService } from "@/services/api.service";
import { getLeadTelemetryContext } from "@/services/tracker.service";

const ContactForm = ({ source = "contact_page", onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const telemetry = await getLeadTelemetryContext();
            await leadService.createLead({
                ...formData,
                source,
                ...telemetry,
            });
            setSuccess(true);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message || "Failed to submit form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="form-success" style={{ display: "block" }}>
                <div className="success-icon">🎉</div>
                <h3>Message Sent Successfully!</h3>
                <p>
                    Thank you for reaching out! Divyansh or our team will contact you within 24 hours. For urgent queries, call{" "}
                    <a href="tel:+919599433616" style={{ color: "var(--primary-light)" }}>
                        +91 9599433616
                    </a>.
                </p>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginTop: "20px", marginInline: "auto" }}
                    onClick={() => {
                        setSuccess(false);
                        setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            company: "",
                            service: "",
                            budget: "",
                            message: "",
                        });
                    }}
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} id="contactForm">
            {error && (
                <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "8px", color: "#f87171", marginBottom: "16px", fontSize: "0.88rem" }}>
                    {error}
                </div>
            )}

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="name@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+91 9999999999"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company / Business</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="service">Service Interested In *</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} required>
                    <option value="">Select a service...</option>
                    <option value="web-dev">💻 Web Development (MERN Stack)</option>
                    <option value="website">🌐 Business Website (₹25,000)</option>
                    <option value="ecommerce">🛒 E-Commerce Development</option>
                    <option value="seo">🔍 SEO Services</option>
                    <option value="social-media">📱 Social Media Marketing</option>
                    <option value="ppc">💰 Paid Advertising (PPC)</option>
                    <option value="video">🎬 Video Production</option>
                    <option value="branding">🎨 Brand Identity Design</option>
                    <option value="marketing">📈 Complete Digital Marketing Package</option>
                    <option value="other">Other / Custom Requirement</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="budget">Approximate Budget</label>
                <select id="budget" name="budget" value={formData.budget} onChange={handleChange}>
                    <option value="">Select your budget range...</option>
                    <option value="under-25k">Under ₹25,000</option>
                    <option value="25k-50k">₹25,000 - ₹50,000</option>
                    <option value="50k-1l">₹50,000 - ₹1 Lakh</option>
                    <option value="1l-3l">₹1 Lakh - ₹3 Lakh</option>
                    <option value="3l-above">₹3 Lakh and above</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="message">Tell Us About Your Project *</label>
                <textarea
                    id="message"
                    name="message"
                    placeholder="Describe your project, goals, timeline and any specific requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <button type="submit" className="form-submit" disabled={loading}>
                {loading ? "Sending..." : "🚀 Send Message"}
            </button>

            <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "16px" }}>
                Or call directly:{" "}
                <a href="tel:+919599433616" style={{ color: "var(--primary-light)" }}>
                    +91 9599433616 (Divyansh)
                </a>
            </p>
        </form>
    );
};

export default ContactForm;
