"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link href="/" className="footer-logo" aria-label="Fitscalez Home">
                            <img src="/images/logo.png" alt="Fitscalez" className="logo-img-footer" />
                        </Link>
                        <p>
                            India's premier Web Development & Digital Marketing Agency. Growing businesses online since 2021.
                        </p>
                        <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", marginBottom: "16px" }}>
                            📍 Delhi-110054 | 📞{" "}
                            <a href="tel:+919599433616" style={{ color: "var(--primary-light)" }}>
                                +91 9599433616
                            </a>
                        </p>
                        <div className="footer-social">
                            <a href="#" aria-label="Instagram">📸</a>
                            <a href="#" aria-label="Facebook">👥</a>
                            <a href="#" aria-label="LinkedIn">💼</a>
                            <a href="#" aria-label="Twitter">🐦</a>
                            <a href="https://wa.me/919599433616" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul>
                            <li><Link href="/services">Web Development</Link></li>
                            <li><Link href="/services">MERN Stack Apps</Link></li>
                            <li><Link href="/services">SEO Services</Link></li>
                            <li><Link href="/services">Social Media Marketing</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/projects">Projects</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/career">Careers</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Contact</h4>
                        <ul>
                            <li><a href="tel:+919599433616">📞 +91 9599433616</a></li>
                            <li><a href="tel:+919311439493">📞 +91 9311439493</a></li>
                            <li><a href="mailto:fitscalezofficial@gmail.com">✉️ fitscalezofficial@gmail.com</a></li>
                            <li><a href="https://wa.me/919599433616" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 <span>Fitscalez</span>. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                        <a href="/sitemap.xml">Sitemap</a>
                    </div>
                </div>
            </div>

            {/* Floating Quick Action Buttons */}
            <a href="https://wa.me/919599433616" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="WhatsApp">
                💬
            </a>
            <button
                type="button"
                className="scroll-top visible"
                id="scrollTop"
                aria-label="Scroll to top"
                onClick={() => typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                ↑
            </button>
        </footer>
    );
};

export default Footer;
