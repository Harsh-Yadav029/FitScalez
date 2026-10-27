import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo" aria-label="Fitscalez Home">
                            <img src="/images/logo.png" alt="Fitscalez" className="logo-img-footer" />
                        </Link>
                        <p>
                            India's premium Web Development & Digital Marketing Agency. Growing businesses online since 2021.
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
                            <a href="https://wa.me/919599433616" aria-label="WhatsApp">💬</a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul>
                            <li><Link to="/services">Web Development</Link></li>
                            <li><Link to="/services">MERN Stack Apps</Link></li>
                            <li><Link to="/services">SEO Services</Link></li>
                            <li><Link to="/services">Social Media Marketing</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/career">Careers</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Contact</h4>
                        <ul>
                            <li><a href="tel:+919599433616">📞 +91 9599433616</a></li>
                            <li><a href="tel:+919311439493">📞 +91 9311439493</a></li>
                            <li><a href="mailto:fitscalezofficial@gmail.com">✉️ fitscalezofficial@gmail.com</a></li>
                            <li><a href="https://wa.me/919599433616">💬 WhatsApp</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} <span>Fitscalez</span>. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <a href="/sitemap.xml">Sitemap</a>
                    </div>
                </div>
            </div>

            {/* Floating Quick Action Buttons */}
            <a href="https://wa.me/919599433616" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="WhatsApp">
                💬
            </a>
            <button
                className="scroll-top visible"
                id="scrollTop"
                aria-label="Scroll to top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                ↑
            </button>
        </footer>
    );
};

export default Footer;
