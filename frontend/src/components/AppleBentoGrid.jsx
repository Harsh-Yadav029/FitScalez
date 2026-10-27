import React from "react";
import { motion } from "framer-motion";
import { SpotlightCard, appleSpring } from "./Motion";

export const AppleBentoGrid = () => {
    return (
        <div className="apple-bento-grid">
            {/* Card 1: Enterprise MERN (Span 2) */}
            <SpotlightCard
                className="bento-card bento-card-span-2"
                spotlightColor="rgba(108, 99, 255, 0.22)"
                borderColor="rgba(108, 99, 255, 0.35)"
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div className="bento-icon-box" style={{ color: "#818CF8", background: "rgba(108, 99, 255, 0.12)", border: "1px solid rgba(108, 99, 255, 0.25)" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#00E599", background: "rgba(0, 229, 153, 0.1)", padding: "4px 12px", borderRadius: "999px", border: "1px solid rgba(0, 229, 153, 0.25)" }}>
                        ⚡ 14ms Response Time
                    </span>
                </div>

                <h3>Full-Stack MERN Web Engineering</h3>
                <p>
                    Bespoke web applications built from scratch with MongoDB, Express.js, React 19, and Node.js. 
                    Zero sluggish CMS templates — only modular, blazing-fast, and secure architectures starting from ₹25,000.
                </p>

                {/* Simulated IDE Snippet */}
                <div style={{
                    background: "rgba(0, 0, 0, 0.45)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    padding: "16px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                    color: "#94a3b8",
                    marginBottom: "20px"
                }}>
                    <span style={{ color: "#38BDF8" }}>router</span>.<span style={{ color: "#818CF8" }}>post</span>(<span style={{ color: "#FDE047" }}>"/deploy"</span>, <span style={{ color: "#00E599" }}>verifyJWT</span>, <span style={{ color: "#F472B6" }}>async</span> (req, res) =&gt; &#123;<br />
                    &nbsp;&nbsp;<span style={{ color: "#F472B6" }}>const</span> platform = <span style={{ color: "#F472B6" }}>await</span> <span style={{ color: "#38BDF8" }}>deployProductionCluster</span>(&#123; engine: <span style={{ color: "#FDE047" }}>"React 19"</span> &#125;);<br />
                    &nbsp;&nbsp;<span style={{ color: "#F472B6" }}>return</span> res.<span style={{ color: "#818CF8" }}>json</span>(<span style={{ color: "#F472B6" }}>new</span> <span style={{ color: "#00E599" }}>ApiResponse</span>(<span style={{ color: "#F59E0B" }}>200</span>, platform, <span style={{ color: "#FDE047" }}>"Built for scale"</span>));<br />
                    &#125;);
                </div>

                <div className="bento-tag-list">
                    <span className="bento-tag">React 19</span>
                    <span className="bento-tag">Node.js + Express</span>
                    <span className="bento-tag">MongoDB Replica</span>
                    <span className="bento-tag">Razorpay / Stripe</span>
                    <span className="bento-tag">REST APIs</span>
                </div>
            </SpotlightCard>

            {/* Card 2: Growth & SEO (Span 1) */}
            <SpotlightCard
                className="bento-card bento-card-span-1"
                spotlightColor="rgba(0, 229, 153, 0.22)"
                borderColor="rgba(0, 229, 153, 0.35)"
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div className="bento-icon-box" style={{ color: "#00E599", background: "rgba(0, 229, 153, 0.12)", border: "1px solid rgba(0, 229, 153, 0.25)" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#00E599", background: "rgba(0, 229, 153, 0.1)", padding: "4px 12px", borderRadius: "999px" }}>
                        #1 on Google
                    </span>
                </div>

                <h3>Technical SEO & Ranking</h3>
                <p>
                    Rank at the very top of Google searches in Delhi & across India. Core Web Vitals optimization, semantic schema markup, and authority backlink acquisition.
                </p>

                {/* Google Ranking Badge */}
                <div style={{ background: "rgba(0, 0, 0, 0.4)", padding: "14px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.06)", marginBottom: "20px" }}>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "4px" }}>https://fitscalez.com</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#38BDF8" }}>Best Web Development Agency in Delhi</div>
                    <div style={{ fontSize: "0.78rem", color: "#FBBF24", marginTop: "4px" }}>★★★★★ (4.9/5 - 82 reviews)</div>
                </div>

                <div className="bento-tag-list">
                    <span className="bento-tag">Semantic Schema</span>
                    <span className="bento-tag">Technical Audits</span>
                    <span className="bento-tag">+342% Organic Surge</span>
                </div>
            </SpotlightCard>

            {/* Card 3: Performance PPC (Span 1) */}
            <SpotlightCard
                className="bento-card bento-card-span-1"
                spotlightColor="rgba(56, 189, 248, 0.22)"
                borderColor="rgba(56, 189, 248, 0.35)"
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div className="bento-icon-box" style={{ color: "#38BDF8", background: "rgba(56, 189, 248, 0.12)", border: "1px solid rgba(56, 189, 248, 0.25)" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#38BDF8", background: "rgba(56, 189, 248, 0.1)", padding: "4px 12px", borderRadius: "999px" }}>
                        12.4x Target ROAS
                    </span>
                </div>

                <h3>Paid Ads & Performance Media</h3>
                <p>
                    Laser-targeted Google Search & Meta ad funnels. Every single rupee optimized for lowest customer acquisition cost and measurable bottom-line revenue.
                </p>

                <div className="bento-tag-list">
                    <span className="bento-tag">Google Ads</span>
                    <span className="bento-tag">Meta Ads</span>
                    <span className="bento-tag">Pixel Retargeting</span>
                </div>
            </SpotlightCard>

            {/* Card 4: UI/UX & Motion (Span 1) */}
            <SpotlightCard
                className="bento-card bento-card-span-1"
                spotlightColor="rgba(244, 114, 182, 0.22)"
                borderColor="rgba(244, 114, 182, 0.35)"
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div className="bento-icon-box" style={{ color: "#F472B6", background: "rgba(244, 114, 182, 0.12)", border: "1px solid rgba(244, 114, 182, 0.25)" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="3" y1="9" x2="21" y2="9"></line>
                            <line x1="9" y1="21" x2="9" y2="9"></line>
                        </svg>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#F472B6", background: "rgba(244, 114, 182, 0.1)", padding: "4px 12px", borderRadius: "999px" }}>
                        Apple HIG Standard
                    </span>
                </div>

                <h3>Bespoke UI/UX & Liquid Glass</h3>
                <p>
                    Human-crafted digital design systems that build prestige and high-ticket customer trust. Fluid spring micro-interactions that feel alive.
                </p>

                <div className="bento-tag-list">
                    <span className="bento-tag">Figma Systems</span>
                    <span className="bento-tag">Framer Motion</span>
                    <span className="bento-tag">Spatial Layouts</span>
                </div>
            </SpotlightCard>

            {/* Card 5: Flagship Production Platforms (Span 2) */}
            <SpotlightCard
                className="bento-card bento-card-span-2"
                spotlightColor="rgba(0, 229, 153, 0.2)"
                borderColor="rgba(0, 229, 153, 0.3)"
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div className="bento-icon-box" style={{ color: "#00E599", background: "rgba(0, 229, 153, 0.12)", border: "1px solid rgba(0, 229, 153, 0.25)" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#00E599", background: "rgba(0, 229, 153, 0.1)", padding: "4px 12px", borderRadius: "999px" }}>
                        Verified Production Work
                    </span>
                </div>

                <h3>Flagship Platforms Engineered by Fitscalez</h3>
                <p>
                    We build real, live platforms for ambitious ventures across India. Experience the precision and speed of our live client deployments:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginTop: "16px" }}>
                    <a
                        href="https://walktheplan.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "block",
                            padding: "16px 20px",
                            borderRadius: "14px",
                            background: "rgba(0, 0, 0, 0.35)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            textDecoration: "none",
                            transition: "all 0.2s ease"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                            <span style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.98rem" }}>Walk The Plan</span>
                            <span style={{ color: "#38BDF8", fontSize: "0.85rem" }}>visit ↗</span>
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: 0 }}>
                            1:1 Scale architectural projection facility. Instant slot reservation + Razorpay checkout engine.
                        </p>
                    </a>

                    <a
                        href="https://www.houseofsymmetry.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "block",
                            padding: "16px 20px",
                            borderRadius: "14px",
                            background: "rgba(0, 0, 0, 0.35)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            textDecoration: "none",
                            transition: "all 0.2s ease"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                            <span style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.98rem" }}>House of Symmetry</span>
                            <span style={{ color: "#38BDF8", fontSize: "0.85rem" }}>visit ↗</span>
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: 0 }}>
                            Luxury architectural and spatial design studio. Immersive portfolio & high-ticket inquiry funnels.
                        </p>
                    </a>
                </div>
            </SpotlightCard>
        </div>
    );
};
