import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountUp, appleSpring } from "./Motion";

export const HeroCommandCenter = () => {
    const [activeTab, setActiveTab] = useState("architecture");

    const tabs = [
        { id: "architecture", label: "⚡ Web Architecture" },
        { id: "growth", label: "📈 Growth & Revenue" },
        { id: "flagship", label: "🏛️ Flagship Platforms" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: appleSpring }}
            className="hero-command-center"
        >
            {/* Window Chrome */}
            <div className="command-header-mac">
                <div className="mac-dots">
                    <span className="mac-dot red"></span>
                    <span className="mac-dot yellow"></span>
                    <span className="mac-dot green"></span>
                </div>
                <div className="command-title-badge">
                    <span style={{ color: "#00E599", marginRight: "6px" }}>●</span>
                    fitscalez.engine // production_v3.4
                </div>
                <div style={{ display: "flex", gap: "6px", alignItems: "center", fontSize: "0.75rem", color: "#64748b" }}>
                    <span>DELHI</span>
                    <span>•</span>
                    <span>60 FPS</span>
                </div>
            </div>

            {/* Interactive Tabs */}
            <div className="command-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`cmd-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content Panels */}
            <div className="command-body">
                <AnimatePresence mode="wait">
                    {activeTab === "architecture" && (
                        <motion.div
                            key="architecture"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}
                        >
                            {/* Score Card */}
                            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    Google Lighthouse Score
                                </div>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "12px" }}>
                                    <span style={{ fontSize: "2.4rem", fontWeight: 800, color: "#00E599", fontFamily: "var(--font-display)" }}>
                                        <CountUp value={100} duration={1.2} />
                                    </span>
                                    <span style={{ color: "#94a3b8", fontSize: "1rem" }}>/100</span>
                                </div>
                                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                    <span style={{ fontSize: "0.75rem", background: "rgba(0, 229, 153, 0.12)", color: "#00E599", padding: "3px 8px", borderRadius: "4px" }}>Performance</span>
                                    <span style={{ fontSize: "0.75rem", background: "rgba(0, 229, 153, 0.12)", color: "#00E599", padding: "3px 8px", borderRadius: "4px" }}>SEO</span>
                                    <span style={{ fontSize: "0.75rem", background: "rgba(0, 229, 153, 0.12)", color: "#00E599", padding: "3px 8px", borderRadius: "4px" }}>A11y</span>
                                </div>
                            </div>

                            {/* Core Vitals Latency */}
                            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    Render Latency
                                </div>
                                <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#38BDF8", fontFamily: "var(--font-display)", marginBottom: "12px" }}>
                                    0.14<span style={{ fontSize: "1.1rem", fontWeight: 500, color: "#94a3b8" }}>s FCP</span>
                                </div>
                                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
                                    React 19 SSR + Zero CLS + Instant hydration
                                </div>
                            </div>

                            {/* Tech Stack Spec */}
                            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    Full-Stack Foundation
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                                        <span style={{ color: "#e2e8f0" }}>Frontend</span>
                                        <span style={{ color: "#38BDF8" }}>React 19 • Framer Motion</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                                        <span style={{ color: "#e2e8f0" }}>Backend</span>
                                        <span style={{ color: "#00E599" }}>Node.js • Express</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                                        <span style={{ color: "#e2e8f0" }}>Database</span>
                                        <span style={{ color: "#F59E0B" }}>MongoDB Replica Cluster</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "growth" && (
                        <motion.div
                            key="growth"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}
                        >
                            {/* Revenue Processed */}
                            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    Client Pipeline Scaled
                                </div>
                                <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#00E599", fontFamily: "var(--font-display)", marginBottom: "8px" }}>
                                    ₹<CountUp value={4.2} duration={1} />M+
                                </div>
                                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
                                    Razorpay + Stripe e-commerce & slot reservations
                                </div>
                            </div>

                            {/* Organic Surge */}
                            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    Organic Search Surge
                                </div>
                                <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#818CF8", fontFamily: "var(--font-display)", marginBottom: "8px" }}>
                                    +<CountUp value={342} duration={1.2} />%
                                </div>
                                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
                                    Average 6-month qualified organic traffic growth
                                </div>
                            </div>

                            {/* Verified Rating */}
                            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                                <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    Client Trust Score
                                </div>
                                <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#FBBF24", fontFamily: "var(--font-display)", marginBottom: "8px" }}>
                                    4.9 ★
                                </div>
                                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
                                    Based on 82 verified client reviews across PAN India
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "flagship" && (
                        <motion.div
                            key="flagship"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
                        >
                            {/* Walk The Plan */}
                            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "22px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                    <div style={{ fontSize: "0.75rem", background: "rgba(0, 229, 153, 0.12)", color: "#00E599", padding: "3px 8px", borderRadius: "999px" }}>
                                        ● Production Live
                                    </div>
                                    <a
                                        href="https://walktheplan.in"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#38BDF8", fontSize: "0.82rem", textDecoration: "none", fontWeight: 600 }}
                                    >
                                        walktheplan.in ↗
                                    </a>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#FFFFFF", marginBottom: "6px" }}>
                                    Walk The Plan — 1:1 Scale Tech
                                </div>
                                <p style={{ fontSize: "0.84rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                                    India's first 1:1 blueprint projection facility. Instant slot scheduling and Razorpay checkout engine.
                                </p>
                            </div>

                            {/* House of Symmetry */}
                            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "22px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                    <div style={{ fontSize: "0.75rem", background: "rgba(0, 229, 153, 0.12)", color: "#00E599", padding: "3px 8px", borderRadius: "999px" }}>
                                        ● Production Live
                                    </div>
                                    <a
                                        href="https://www.houseofsymmetry.in"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#38BDF8", fontSize: "0.82rem", textDecoration: "none", fontWeight: 600 }}
                                    >
                                        houseofsymmetry.in ↗
                                    </a>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#FFFFFF", marginBottom: "6px" }}>
                                    House of Symmetry — Luxury Studio
                                </div>
                                <p style={{ fontSize: "0.84rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                                    Minimalist architectural portfolio. Spatial geometry, high-ticket client inquiry conversion funnels.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
