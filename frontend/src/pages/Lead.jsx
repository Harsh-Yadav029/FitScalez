import React, { useState } from "react";
import SeoHelmet from "../components/SeoHelmet";
import { leadService } from "../services/api.service";
import { getLeadTelemetryContext } from "../services/tracker.service";

const Lead = () => {
    const [step, setStep] = useState(1);
    const [projectType, setProjectType] = useState("");
    const [budget, setBudget] = useState("");
    const [timeline, setTimeline] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const telemetry = await getLeadTelemetryContext();
            await leadService.createLead({
                name,
                email,
                phone,
                company,
                service: projectType || "Custom Project",
                budget: budget || "Not specified",
                message: `Timeline: ${timeline}. Details: ${message}`,
                source: "lead_funnel",
                ...telemetry,
            });
            setSuccess(true);
        } catch (err) {
            setError(err.message || "Failed to submit lead");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SeoHelmet
                title="Get a Custom Project Estimate — Fitscalez Free Proposal Funnel"
                description="Use our interactive project builder to get an accurate cost estimate and technical roadmap for your web application or marketing campaign."
                canonical="/lead"
            />

            <section className="hero" style={{ minHeight: "45vh", padding: "140px 0 40px" }}>
                <div className="container" style={{ textAlign: "center" }}>
                    <div className="hero-badge" style={{ marginInline: "auto" }}>
                        <span>⚡ 2-Minute Project Estimator</span>
                    </div>
                    <h1 className="hero-title" style={{ fontSize: "2.4rem" }}>
                        Tell Us About Your Project & <span className="gradient-text">Get an Instant Scope</span>
                    </h1>
                </div>
            </section>

            <section className="section-padding" style={{ paddingTop: 0 }}>
                <div className="container" style={{ maxWidth: "700px" }}>
                    <div className="card" style={{ padding: "40px" }}>
                        {success ? (
                            <div style={{ textAlign: "center", padding: "30px 0" }}>
                                <div style={{ fontSize: "3.5rem" }}>🎉</div>
                                <h2 style={{ marginTop: "14px" }}>Project Scope Received!</h2>
                                <p style={{ color: "var(--text-muted)", marginTop: "10px", lineHeight: "1.7" }}>
                                    Thank you, <strong>{name}</strong>! We are currently analyzing your specifications. Divyansh or our senior engineering team will get back to you with a tailored roadmap within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Step Indicator */}
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", borderBottom: "1px solid var(--border)", paddingBottom: "16px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                                    <span style={{ color: step >= 1 ? "var(--primary-light)" : "inherit", fontWeight: step === 1 ? "700" : "400" }}>1. Service</span>
                                    <span style={{ color: step >= 2 ? "var(--primary-light)" : "inherit", fontWeight: step === 2 ? "700" : "400" }}>2. Budget</span>
                                    <span style={{ color: step >= 3 ? "var(--primary-light)" : "inherit", fontWeight: step === 3 ? "700" : "400" }}>3. Contact Info</span>
                                </div>

                                {error && (
                                    <div style={{ padding: "10px", background: "rgba(239,68,68,0.15)", color: "#f87171", borderRadius: "6px", marginBottom: "16px", fontSize: "0.85rem" }}>
                                        {error}
                                    </div>
                                )}

                                {step === 1 && (
                                    <div>
                                        <h3 style={{ marginBottom: "14px" }}>What primary service are you looking for?</h3>
                                        <div style={{ display: "grid", gap: "10px" }}>
                                            {[
                                                "💻 Custom MERN Web Application",
                                                "🌐 Business Corporate Website",
                                                "🛒 High-Converting E-Commerce Store",
                                                "🔍 Technical SEO & Organic Ranking",
                                                "📈 Google & Meta Performance Advertising",
                                                "🎨 Brand Identity & UI/UX Redesign",
                                            ].map((serviceOption) => (
                                                <button
                                                    key={serviceOption}
                                                    type="button"
                                                    onClick={() => {
                                                        setProjectType(serviceOption);
                                                        setStep(2);
                                                    }}
                                                    className="btn btn-outline"
                                                    style={{ textAlign: "left", justifyContent: "flex-start", padding: "14px 20px" }}
                                                >
                                                    {serviceOption}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div>
                                        <h3 style={{ marginBottom: "14px" }}>What is your estimated investment range?</h3>
                                        <div style={{ display: "grid", gap: "10px" }}>
                                            {[
                                                "Under ₹25,000",
                                                "₹25,000 - ₹50,000",
                                                "₹50,000 - ₹1,00,000",
                                                "₹1,00,000 - ₹3,00,000",
                                                "₹3,00,000 and above",
                                            ].map((budgetOption) => (
                                                <button
                                                    key={budgetOption}
                                                    type="button"
                                                    onClick={() => {
                                                        setBudget(budgetOption);
                                                        setStep(3);
                                                    }}
                                                    className="btn btn-outline"
                                                    style={{ textAlign: "left", justifyContent: "flex-start", padding: "14px 20px" }}
                                                >
                                                    💰 {budgetOption}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn"
                                            style={{ marginTop: "14px", color: "var(--text-muted)" }}
                                            onClick={() => setStep(1)}
                                        >
                                            ← Back to Step 1
                                        </button>
                                    </div>
                                )}

                                {step === 3 && (
                                    <form onSubmit={handleFinalSubmit}>
                                        <h3 style={{ marginBottom: "14px" }}>Where should we send your custom proposal?</h3>

                                        <div className="form-group">
                                            <label>Full Name *</label>
                                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Rahul Verma" />
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Email Address *</label>
                                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="rahul@company.com" />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number *</label>
                                                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9999999999" />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Company / Organization</label>
                                                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Verma Enterprise" />
                                            </div>
                                            <div className="form-group">
                                                <label>Target Timeline</label>
                                                <select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                                                    <option value="Immediately (Within 2 weeks)">Immediately (Within 2 weeks)</option>
                                                    <option value="1 month">1 month</option>
                                                    <option value="1-3 months">1-3 months</option>
                                                    <option value="Flexible">Flexible</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Any specific requirements or features? *</label>
                                            <textarea rows={3} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Briefly describe what you would like to build..." />
                                        </div>

                                        <button type="submit" className="form-submit" disabled={loading}>
                                            {loading ? "Generating Roadmap..." : "🚀 Submit & Get Proposal"}
                                        </button>

                                        <button
                                            type="button"
                                            className="btn"
                                            style={{ marginTop: "14px", color: "var(--text-muted)", width: "100%", justifyContent: "center" }}
                                            onClick={() => setStep(2)}
                                        >
                                            ← Back to Step 2
                                        </button>
                                    </form>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Lead;
