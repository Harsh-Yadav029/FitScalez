import React, { useState } from "react";
import { Link } from "react-router-dom";
import SeoHelmet from "../components/SeoHelmet";
import { FadeIn } from "../components/Motion";

// Shared Apple-Grade Hero Header
const LegalHero = ({ badge, titlePrefix, titleAccent, subtitle, lastUpdated }) => (
    <section
        style={{
            position: "relative",
            padding: "130px 24px 60px",
            textAlign: "center",
            overflow: "hidden",
            background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(108, 99, 255, 0.18) 0%, transparent 70%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
    >
        <div style={{ maxWidth: "880px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "100px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", backdropFilter: "blur(12px)", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "20px" }}>
                <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
                <span>›</span>
                <span style={{ color: "var(--primary-light)" }}>{titlePrefix} {titleAccent}</span>
            </div>

            <div style={{ marginBottom: "16px" }}>
                <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: "50px", background: "rgba(0, 229, 153, 0.12)", border: "1px solid rgba(0, 229, 153, 0.3)", color: "var(--emerald)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {badge}
                </span>
            </div>

            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 16px", lineHeight: 1.1 }}>
                {titlePrefix} <span className="gradient-text">{titleAccent}</span>
            </h1>

            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "620px", margin: "0 auto 24px", lineHeight: 1.6 }}>
                {subtitle}
            </p>

            {lastUpdated && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "var(--text-dim)", background: "rgba(255, 255, 255, 0.03)", padding: "5px 14px", borderRadius: "100px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                    <span>⏱️</span>
                    <span>{lastUpdated}</span>
                    <span>•</span>
                    <span>5 min read</span>
                </div>
            )}
        </div>
    </section>
);

// ==========================================
// 1. PRIVACY POLICY PAGE
// ==========================================
export const Privacy = () => {
    const [activeSection, setActiveSection] = useState("info");

    const sections = [
        { id: "info", label: "1. Information We Collect" },
        { id: "usage", label: "2. How We Use Data" },
        { id: "cookies", label: "3. Cookies & Analytics" },
        { id: "thirdparty", label: "4. Third-Party Integrations" },
        { id: "security", label: "5. Security & Protection" },
        { id: "rights", label: "6. Your Data Rights" },
        { id: "contact", label: "7. Contact Compliance" },
    ];

    const scrollTo = (id) => {
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) {
            const offset = 100;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <>
            <SeoHelmet
                title="Privacy Policy — Fitscalez | Web Development & Digital Marketing Agency Delhi"
                description="Fitscalez Privacy Policy: How we collect, safeguard, and responsibly process your personal information with zero-spam and encryption standards."
                canonical="/privacy"
            />

            <LegalHero
                badge="🛡️ Data Security & Trust"
                titlePrefix="Privacy"
                titleAccent="Policy"
                subtitle="We value your privacy as much as our own. Learn how Fitscalez collects, uses, and safeguards your business and personal information."
                lastUpdated="Last Updated: October 2026"
            />

            <section style={{ padding: "60px 24px 100px", background: "var(--bg)" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "280px 1fr", gap: "48px", alignItems: "start" }} className="legal-layout-grid">
                    {/* Sticky Table of Contents */}
                    <aside style={{ position: "sticky", top: "100px", padding: "24px", borderRadius: "20px", background: "rgba(14, 18, 32, 0.65)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.08)" }} className="legal-sidebar">
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-dim)", marginBottom: "16px" }}>
                            Contents
                        </div>
                        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            {sections.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => scrollTo(s.id)}
                                    style={{
                                        textAlign: "left",
                                        padding: "10px 14px",
                                        borderRadius: "10px",
                                        fontSize: "0.88rem",
                                        fontWeight: activeSection === s.id ? 600 : 500,
                                        cursor: "pointer",
                                        border: "none",
                                        background: activeSection === s.id ? "rgba(108, 99, 255, 0.15)" : "transparent",
                                        color: activeSection === s.id ? "#fff" : "var(--text-muted)",
                                        borderLeft: activeSection === s.id ? "3px solid var(--emerald)" : "3px solid transparent",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </nav>

                        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "8px" }}>Questions about data?</div>
                            <a href="mailto:fitscalezofficial@gmail.com" style={{ fontSize: "0.85rem", color: "var(--emerald)", textDecoration: "none", fontWeight: 600 }}>
                                ✉️ fitscalezofficial@gmail.com
                            </a>
                        </div>
                    </aside>

                    {/* Main Legal Content Card */}
                    <div style={{ padding: "40px", borderRadius: "24px", background: "rgba(13, 17, 30, 0.65)", backdropFilter: "blur(24px)", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)", lineHeight: 1.8 }}>
                        {/* Quick Trust Highlights Banner */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "40px" }}>
                            <div style={{ padding: "18px", borderRadius: "14px", background: "rgba(0, 229, 153, 0.06)", border: "1px solid rgba(0, 229, 153, 0.2)" }}>
                                <div style={{ fontSize: "1.2rem", marginBottom: "6px" }}>🔒 Zero-Spam Policy</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>We never sell, rent, or trade your contact info or project details to third parties.</div>
                            </div>
                            <div style={{ padding: "18px", borderRadius: "14px", background: "rgba(108, 99, 255, 0.06)", border: "1px solid rgba(108, 99, 255, 0.2)" }}>
                                <div style={{ fontSize: "1.2rem", marginBottom: "6px" }}>⚡ SSL & Encryption</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>All client communications and data in transit are strictly encrypted via 256-bit TLS/SSL.</div>
                            </div>
                        </div>

                        <p style={{ fontSize: "1.05rem", color: "var(--text-light)", marginBottom: "32px" }}>
                            At <strong>Fitscalez</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting the privacy and confidentiality of our clients, website visitors, and partners. This Privacy Policy outlines how your data is handled when you interact with our website <a href="https://fitscalez.com" style={{ color: "var(--primary-light)", textDecoration: "none" }}>fitscalez.com</a> and our digital engineering services.
                        </p>

                        <div id="info" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>1.</span> Information We Collect
                            </h2>
                            <p style={{ color: "var(--text-muted)" }}>To deliver high-impact web development and marketing campaigns, we collect only necessary project information:</p>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }} className="legal-subgrid">
                                <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                    <h3 style={{ fontSize: "0.95rem", color: "var(--primary-light)", margin: "0 0 8px" }}>Direct Information</h3>
                                    <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "0.88rem", color: "var(--text-muted)" }}>
                                        <li>Full Name & Business Name</li>
                                        <li>Official Email & WhatsApp/Phone</li>
                                        <li>Existing Domain & Project Briefs</li>
                                        <li>Target Audiences & Budget Parameters</li>
                                    </ul>
                                </div>
                                <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                    <h3 style={{ fontSize: "0.95rem", color: "var(--primary-light)", margin: "0 0 8px" }}>Automatic Telemetry</h3>
                                    <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "0.88rem", color: "var(--text-muted)" }}>
                                        <li>IP Address & Geographical Country</li>
                                        <li>Browser Type & Device Specifications</li>
                                        <li>Pages Navigated & Session Duration</li>
                                        <li>Referral Source (Google, LinkedIn, etc.)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id="usage" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>2.</span> How We Use Your Data
                            </h2>
                            <p style={{ color: "var(--text-muted)" }}>We use your information exclusively for valid business purposes:</p>
                            <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                <li style={{ marginBottom: "8px" }}><strong>Execution & Delivery:</strong> Architecting custom web platforms, developing MERN backends, executing SEO audits, and configuring ad funnels.</li>
                                <li style={{ marginBottom: "8px" }}><strong>Communication & Milestones:</strong> Scheduling kickoff calls, delivering staging preview links, and coordinating approvals over WhatsApp/Email.</li>
                                <li style={{ marginBottom: "8px" }}><strong>Performance Analytics:</strong> Monitoring core web vitals and user journeys to continuously improve site speed and UX.</li>
                            </ul>
                        </div>

                        <div id="cookies" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>3.</span> Cookies & Tracking Technologies
                            </h2>
                            <p style={{ color: "var(--text-muted)" }}>
                                We use first-party session cookies and Google Analytics 4 tags to assess site traffic and interaction velocity. These cookies store anonymous tokens and never harvest personal credentials or passwords. You can disable cookies at any time via your browser settings.
                            </p>
                        </div>

                        <div id="thirdparty" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>4.</span> Third-Party Service Providers
                            </h2>
                            <p style={{ color: "var(--text-muted)" }}>
                                We partner only with verified, enterprise-grade vendors who satisfy strict security frameworks:
                            </p>
                            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
                                <span style={{ padding: "6px 14px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)", fontSize: "0.85rem", color: "#fff" }}>💳 Razorpay (PCI-DSS Level 1)</span>
                                <span style={{ padding: "6px 14px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)", fontSize: "0.85rem", color: "#fff" }}>📊 Google Analytics (GA4)</span>
                                <span style={{ padding: "6px 14px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)", fontSize: "0.85rem", color: "#fff" }}>💬 WhatsApp Business API</span>
                                <span style={{ padding: "6px 14px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)", fontSize: "0.85rem", color: "#fff" }}>☁️ Render & Cloudflare Edge</span>
                            </div>
                        </div>

                        <div id="security" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>5.</span> Data Security & Architecture
                            </h2>
                            <p style={{ color: "var(--text-muted)" }}>
                                All data stored by Fitscalez is isolated within password-protected MongoDB clusters with encrypted automated backups. We implement least-privilege RBAC (Role-Based Access Control) to ensure your company assets are never accessed by unauthorized personnel.
                            </p>
                        </div>

                        <div id="rights" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>6.</span> Your Rights & Data Portability
                            </h2>
                            <p style={{ color: "var(--text-muted)" }}>
                                You have the absolute right to request an export of any personal information we retain regarding your account, request corrections, or request immediate deletion from our CRM and communication logs.
                            </p>
                        </div>

                        <div id="contact" style={{ scrollMarginTop: "120px", padding: "28px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(108, 99, 255, 0.08) 0%, rgba(0, 229, 153, 0.05) 100%)", border: "1px solid rgba(108, 99, 255, 0.2)" }}>
                            <h2 style={{ fontSize: "1.3rem", color: "#fff", fontWeight: 700, margin: "0 0 12px" }}>
                                7. Contacting Our Privacy Officer
                            </h2>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", margin: "0 0 16px" }}>
                                For any data requests, compliance audits, or privacy inquiries, contact our management team directly:
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.9rem", color: "var(--text-light)" }}>
                                <div>🏢 <strong>Fitscalez Digital Agency</strong></div>
                                <div>📍 24, Shri Ram Road, Civil Lines, Delhi - 110054, India</div>
                                <div>✉️ Email: <a href="mailto:fitscalezofficial@gmail.com" style={{ color: "var(--emerald)", textDecoration: "none" }}>fitscalezofficial@gmail.com</a></div>
                                <div>📞 Direct Line: <a href="tel:+919599433616" style={{ color: "var(--primary-light)", textDecoration: "none" }}>+91 9599433616</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// ==========================================
// 2. TERMS OF SERVICE PAGE
// ==========================================
export const Terms = () => {
    const [activeSection, setActiveSection] = useState("engagement");

    const sections = [
        { id: "engagement", label: "1. Scope of Engagement" },
        { id: "payments", label: "2. Payment Milestones" },
        { id: "ownership", label: "3. IP & Code Ownership" },
        { id: "warranty", label: "4. 30-Day Launch Warranty" },
        { id: "revisions", label: "5. Revisions & Turnaround" },
        { id: "liability", label: "6. Limitation of Liability" },
        { id: "contact", label: "7. Inquiries & Notices" },
    ];

    const scrollTo = (id) => {
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) {
            const offset = 100;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <>
            <SeoHelmet
                title="Terms of Service — Fitscalez | Web Development & Digital Marketing Agency Delhi"
                description="Fitscalez Terms of Service: Transparent client agreements, 50/50 milestone payments, 100% IP code ownership transfer, and post-launch support."
                canonical="/terms"
            />

            <LegalHero
                badge="⚖️ Transparent Agreements"
                titlePrefix="Terms of"
                titleAccent="Service"
                subtitle="Clear, fair, and modern service conditions governing our bespoke web engineering and digital marketing engagements."
                lastUpdated="Last Updated: October 2026"
            />

            <section style={{ padding: "60px 24px 100px", background: "var(--bg)" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "280px 1fr", gap: "48px", alignItems: "start" }} className="legal-layout-grid">
                    {/* Sticky Table of Contents */}
                    <aside style={{ position: "sticky", top: "100px", padding: "24px", borderRadius: "20px", background: "rgba(14, 18, 32, 0.65)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.08)" }} className="legal-sidebar">
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-dim)", marginBottom: "16px" }}>
                            Contents
                        </div>
                        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            {sections.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => scrollTo(s.id)}
                                    style={{
                                        textAlign: "left",
                                        padding: "10px 14px",
                                        borderRadius: "10px",
                                        fontSize: "0.88rem",
                                        fontWeight: activeSection === s.id ? 600 : 500,
                                        cursor: "pointer",
                                        border: "none",
                                        background: activeSection === s.id ? "rgba(108, 99, 255, 0.15)" : "transparent",
                                        color: activeSection === s.id ? "#fff" : "var(--text-muted)",
                                        borderLeft: activeSection === s.id ? "3px solid var(--emerald)" : "3px solid transparent",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </nav>

                        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "8px" }}>Need custom contractual terms?</div>
                            <Link to="/contact" style={{ fontSize: "0.85rem", color: "var(--emerald)", textDecoration: "none", fontWeight: 600 }}>
                                🚀 Talk to Founders →
                            </Link>
                        </div>
                    </aside>

                    {/* Main Legal Content Card */}
                    <div style={{ padding: "40px", borderRadius: "24px", background: "rgba(13, 17, 30, 0.65)", backdropFilter: "blur(24px)", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)", lineHeight: 1.8 }}>
                        {/* Quick Service Commitments */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "40px" }}>
                            <div style={{ padding: "18px", borderRadius: "14px", background: "rgba(0, 229, 153, 0.06)", border: "1px solid rgba(0, 229, 153, 0.2)" }}>
                                <div style={{ fontSize: "1.2rem", marginBottom: "6px" }}>🏆 100% Code Ownership</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Upon balance settlement, you own full intellectual property and source code repositories.</div>
                            </div>
                            <div style={{ padding: "18px", borderRadius: "14px", background: "rgba(108, 99, 255, 0.06)", border: "1px solid rgba(108, 99, 255, 0.2)" }}>
                                <div style={{ fontSize: "1.2rem", marginBottom: "6px" }}>🛡️ 30-Day Free Warranty</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Every web project includes 30 days of complimentary bug resolution and uptime verification.</div>
                            </div>
                        </div>

                        <p style={{ fontSize: "1.05rem", color: "var(--text-light)", marginBottom: "32px" }}>
                            These Terms of Service (&quot;Terms&quot;) define the engagement terms between <strong>Fitscalez</strong> (&quot;Agency,&quot; &quot;we,&quot; or &quot;us&quot;) and the client (&quot;Client,&quot; &quot;you&quot;). By commissioning a project, signing a quotation, or paying an advance deposit, you acknowledge and agree to these terms.
                        </p>

                        <div id="engagement" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>1.</span> Scope of Engagement
                            </h2>
                            <p style={{ color: "var(--text-muted)" }}>
                                Fitscalez provides custom web development, MERN application engineering, UI/UX prototyping, search engine optimization (SEO), and digital marketing management. All project deliverables and timeline milestones are established in a formal Statement of Work (SOW) or invoice agreed before kickoff.
                            </p>
                        </div>

                        <div id="payments" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>2.</span> Payment Milestones & Currency
                            </h2>
                            <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", marginBottom: "16px" }}>
                                <ul style={{ paddingLeft: "20px", margin: 0, color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                    <li style={{ marginBottom: "10px" }}><strong>50% Advance Milestone:</strong> Required prior to sprint planning, architecture setup, or design prototyping.</li>
                                    <li style={{ marginBottom: "10px" }}><strong>50% Final Settlement:</strong> Payable upon staging environment approval, before production DNS pointing or code repository handover.</li>
                                    <li style={{ marginBottom: "10px" }}><strong>Accepted Gateways:</strong> Direct Bank Transfer (NEFT/RTGS/IMPS), UPI, or Razorpay credit/debit channels.</li>
                                    <li><strong>Currency:</strong> Quoted in Indian Rupees (₹ INR) for domestic clients, or USD ($) for international partners.</li>
                                </ul>
                            </div>
                        </div>

                        <div id="ownership" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>3.</span> Intellectual Property & Source Code
                            </h2>
                            <p style={{ color: "var(--text-muted)" }}>
                                Unlike locked-in proprietary website builders, Fitscalez champions full client sovereignty. Following 100% invoice settlement, all custom frontend components, backend controllers, database schemas, and tailored visual assets belong entirely to the Client.
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                                *Fitscalez retains the right to display the completed non-confidential project in our portfolio and marketing case studies unless a strict mutual NDA is executed.
                            </p>
                        </div>

                        <div id="warranty" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>4.</span> 30-Day Post-Launch Warranty
                            </h2>
                            <p style={{ color: "var(--text-muted)" }}>
                                We stand firmly behind the code we ship. Fitscalez guarantees <strong>30 days of complimentary post-deployment support</strong> covering functional bug repairs, mobile responsiveness adjustments, and server deployment stability at zero additional cost.
                            </p>
                        </div>

                        <div id="revisions" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>5.</span> Client Revisions & Timelines
                            </h2>
                            <p style={{ color: "var(--text-muted)" }}>
                                Projects include up to two comprehensive rounds of revisions during the UI design and staging preview phases. New features or integrations requested outside the agreed scope are quoted transparently as addendum milestones.
                            </p>
                        </div>

                        <div id="liability" style={{ scrollMarginTop: "120px", marginBottom: "40px" }}>
                            <h2 style={{ fontSize: "1.45rem", color: "#fff", fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--emerald)" }}>6.</span> Limitation of Liability
                            </h2>
                            <p style={{ color: "var(--text-muted)" }}>
                                In no event shall Fitscalez or its developers be held liable for indirect, incidental, or third-party service outages (e.g. cloud host failures, domain registry lapses, or ad platform policy suspensions). The total aggregate liability shall not exceed the fees paid by the client for the specific service module.
                            </p>
                        </div>

                        <div id="contact" style={{ scrollMarginTop: "120px", padding: "28px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(108, 99, 255, 0.08) 0%, rgba(0, 229, 153, 0.05) 100%)", border: "1px solid rgba(108, 99, 255, 0.2)" }}>
                            <h2 style={{ fontSize: "1.3rem", color: "#fff", fontWeight: 700, margin: "0 0 12px" }}>
                                7. Legal Jurisdiction & Notices
                            </h2>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", margin: "0 0 16px" }}>
                                These terms shall be governed by and construed in accordance with the laws of the National Capital Territory of Delhi, India.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.9rem", color: "var(--text-light)" }}>
                                <div>🏢 <strong>Fitscalez Digital Agency</strong></div>
                                <div>📍 24, Shri Ram Road, Civil Lines, Delhi - 110054, India</div>
                                <div>✉️ Email: <a href="mailto:fitscalezofficial@gmail.com" style={{ color: "var(--emerald)", textDecoration: "none" }}>fitscalezofficial@gmail.com</a></div>
                                <div>📞 Phone: <a href="tel:+919599433616" style={{ color: "var(--primary-light)", textDecoration: "none" }}>+91 9599433616</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// ==========================================
// 3. VISUAL SITEMAP PAGE
// ==========================================
export const Sitemap = () => {
    const sitemapCategories = [
        {
            title: "Core Platform",
            badge: "Primary",
            color: "#6c63ff",
            links: [
                { path: "/", title: "Home", desc: "Main landing page with interactive command center and engineering showcase." },
                { path: "/about", title: "About Fitscalez", desc: "Our founding story, engineering ethos, team, and 2021-2026 track record." },
                { path: "/contact", title: "Contact Studio", desc: "Direct consultation booking, Delhi office address, and WhatsApp hotline." },
                { path: "/lead", title: "Quick Quote / Free Audit", desc: "Instant project estimation and technical website audit request." },
            ],
        },
        {
            title: "Capabilities & Services",
            badge: "Solutions",
            color: "#00E599",
            links: [
                { path: "/services", title: "All Services Overview", desc: "Comprehensive suite of digital marketing and web engineering services." },
                { path: "/services#web", title: "Custom Web Development", desc: "High-performance websites built with modern responsive stacks." },
                { path: "/services#mern", title: "MERN Stack Web Applications", desc: "Scalable full-stack apps with React, Node, Express, and MongoDB." },
                { path: "/services#seo", title: "High-ROI SEO Optimization", desc: "On-page, technical, and local Delhi/PAN-India ranking strategies." },
                { path: "/services#marketing", title: "Social Media & Meta Ads", desc: "Data-driven audience targeting, creative funnels, and ROI tracking." },
            ],
        },
        {
            title: "Work & Knowledge",
            badge: "Showcase",
            color: "#38BDF8",
            links: [
                { path: "/projects", title: "Client Case Studies & Projects", desc: "Portfolio of delivered web apps, e-commerce stores, and brands scaled." },
                { path: "/blog", title: "Engineering & Marketing Blog", desc: "Guides, industry insights, and architectural deep-dives by our team." },
                { path: "/career", title: "Careers & Join Us", desc: "Open developer, marketing, and design opportunities at Fitscalez." },
            ],
        },
        {
            title: "Legal & Technical Architecture",
            badge: "Compliance",
            color: "#FB923C",
            links: [
                { path: "/privacy", title: "Privacy Policy", desc: "How we collect, protect, and respect client data and telemetry." },
                { path: "/terms", title: "Terms of Service", desc: "Milestone agreements, 100% IP ownership transfer, and warranties." },
                { path: "/sitemap.xml", title: "XML Machine Sitemap (Crawler)", desc: "Standard XML feed for Googlebot and search indexers." },
            ],
        },
    ];

    return (
        <>
            <SeoHelmet
                title="Sitemap — Fitscalez | Web Development & Digital Marketing Agency Delhi"
                description="Visual navigation directory and complete sitemap of all Fitscalez web pages, client services, case studies, blogs, and legal documents."
                canonical="/sitemap"
            />

            <LegalHero
                badge="🗺️ Architecture & Directory"
                titlePrefix="Visual"
                titleAccent="Sitemap"
                subtitle="Complete structural blueprint and navigation index for all pages, capabilities, and resources on Fitscalez."
                lastUpdated="Current Index: October 2026"
            />

            <section style={{ padding: "60px 24px 100px", background: "var(--bg)" }}>
                <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
                    {/* Top Machine Feed Banner */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "16px",
                            padding: "20px 28px",
                            borderRadius: "16px",
                            background: "rgba(108, 99, 255, 0.08)",
                            border: "1px solid rgba(108, 99, 255, 0.25)",
                            marginBottom: "40px",
                        }}
                    >
                        <div>
                            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                                🤖 Looking for search engine XML crawler data?
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                                Standard Googlebot-compliant sitemap schema is hosted live at <code style={{ color: "var(--emerald)", background: "rgba(0,0,0,0.3)", padding: "2px 6px", borderRadius: "4px" }}>/sitemap.xml</code>
                            </div>
                        </div>
                        <a
                            href="/sitemap.xml"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: "10px 20px",
                                borderRadius: "10px",
                                background: "rgba(255, 255, 255, 0.08)",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                color: "#fff",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <span>Open sitemap.xml</span>
                            <span>↗</span>
                        </a>
                    </div>

                    {/* Category Sections */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: "32px" }} className="sitemap-grid">
                        {sitemapCategories.map((cat, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: "32px",
                                    borderRadius: "20px",
                                    background: "rgba(13, 17, 30, 0.65)",
                                    backdropFilter: "blur(20px)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "16px" }}>
                                    <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "#fff" }}>
                                        {cat.title}
                                    </h2>
                                    <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "100px", background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}35` }}>
                                        {cat.badge}
                                    </span>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    {cat.links.map((link, lIdx) => (
                                        <div
                                            key={lIdx}
                                            style={{
                                                padding: "14px 18px",
                                                borderRadius: "12px",
                                                background: "rgba(255, 255, 255, 0.02)",
                                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                                transition: "all 0.2s ease",
                                            }}
                                        >
                                            {link.path.startsWith("/") && !link.path.endsWith(".xml") ? (
                                                <Link
                                                    to={link.path}
                                                    style={{
                                                        fontSize: "1.02rem",
                                                        fontWeight: 600,
                                                        color: "var(--primary-light)",
                                                        textDecoration: "none",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                    }}
                                                >
                                                    {link.title} <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>→</span>
                                                </Link>
                                            ) : (
                                                <a
                                                    href={link.path}
                                                    style={{
                                                        fontSize: "1.02rem",
                                                        fontWeight: 600,
                                                        color: "var(--emerald)",
                                                        textDecoration: "none",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                    }}
                                                >
                                                    {link.title} <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>↗</span>
                                                </a>
                                            )}
                                            <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                                                {link.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
