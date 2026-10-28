import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            {/* ============ FOOTER ============ */}
            <footer>
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <Link to="/" className="footer-logo" aria-label="Fitscalez Home">
                                <img src="/images/logo.png" alt="Fitscalez" className="logo-img-footer" />
                            </Link>
                            <p>
                                India's premium Web Development & Digital Marketing Agency. We help businesses grow online with innovative
                                technology and data-driven marketing strategies.
                            </p>
                            <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", marginBottom: "16px" }}>
                                📍 24, Shri Ram Road, Civil Lines, Delhi-110054<br />
                                📞 <a href="tel:+919599433616" style={{ color: "var(--primary-light)" }}>+91 9599433616</a> (Divyansh)<br />
                                ✉️ <a href="mailto:fitscalezofficial@gmail.com" style={{ color: "var(--primary-light)" }}>fitscalezofficial@gmail.com</a>
                            </p>
                            <div className="footer-social">
                                <a href="https://instagram.com/fitscalez" target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
                                <a href="https://facebook.com/fitscalez" target="_blank" rel="noopener noreferrer" title="Facebook">👥</a>
                                <a href="https://linkedin.com/company/fitscalez" target="_blank" rel="noopener noreferrer" title="LinkedIn">💼</a>
                                <a href="https://twitter.com/fitscalez" target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
                                <a href="https://wa.me/919599433616" target="_blank" rel="noopener noreferrer" title="WhatsApp">💬</a>
                            </div>
                        </div>

                        <div className="footer-col">
                            <h4>Services</h4>
                            <ul>
                                <li><Link to="/services">Web Development</Link></li>
                                <li><Link to="/services">MERN Stack Apps</Link></li>
                                <li><Link to="/services">SEO Services</Link></li>
                                <li><Link to="/services">Social Media Marketing</Link></li>
                                <li><Link to="/services">Paid Advertising</Link></li>
                                <li><Link to="/services">Video Production</Link></li>
                                <li><Link to="/services">Email Marketing</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/projects">Our Projects</Link></li>
                                <li><Link to="/blog">Blog & Insights</Link></li>
                                <li><Link to="/career">Careers</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
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
                            <div style={{ marginTop: "20px", padding: "16px", background: "rgba(108,99,255,0.08)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
                                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "8px" }}>Mon-Fri: 9AM - 6PM</p>
                                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "8px" }}>Saturday: 10AM - 4PM</p>
                                <p style={{ fontSize: "0.78rem", color: "var(--primary-light)", fontWeight: 600 }}>24/7 WhatsApp Support</p>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} <span>Fitscalez</span>. All rights reserved. Built with ❤️ in Delhi, India.</p>
                        <div className="footer-bottom-links">
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/terms">Terms of Service</Link>
                            <Link to="/sitemap">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* WhatsApp Float */}
            <a
                href="https://wa.me/919599433616?text=Hi%20Fitscalez!%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-float"
                title="Chat on WhatsApp"
                aria-label="WhatsApp"
            >
                💬
            </a>

            {/* Scroll to Top */}
            <button
                className="scroll-top"
                id="scrollTop"
                aria-label="Scroll to top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                ↑
            </button>
        </>
    );
};

export default Footer;
