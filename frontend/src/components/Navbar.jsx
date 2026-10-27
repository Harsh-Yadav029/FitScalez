import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
                <div className="nav-container">
                    <Link to="/" className="nav-logo" aria-label="Fitscalez Home">
                        <img src="/images/logo.png" alt="Fitscalez" className="logo-img" />
                    </Link>

                    <ul className="nav-links">
                        <li>
                            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className={location.pathname === "/projects" ? "active" : ""}>
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog" className={location.pathname.startsWith("/blog") ? "active" : ""}>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="/career" className={location.pathname === "/career" ? "active" : ""}>
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
                                Contact
                            </Link>
                        </li>
                    </ul>

                    <div className="nav-cta">
                        <div className="nav-phone">
                            <span>📞</span>
                            <a href="tel:+919599433616">+91 9599433616</a>
                        </div>
                        <Link to="/contact" className="btn btn-primary btn-sm">
                            Get Quote
                        </Link>
                    </div>

                    <button
                        className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
                        id="hamburger"
                        aria-label="Toggle menu"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`} id="mobileNav">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
                <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog & Insights</Link>
                <Link to="/career" onClick={() => setMobileMenuOpen(false)}>Careers</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <a href="tel:+919599433616" className="btn btn-outline" style={{ justifyContent: "center" }}>
                        📞 Call +91 9599433616
                    </a>
                    <Link to="/contact" className="btn btn-primary" style={{ justifyContent: "center" }}>
                        🚀 Get Free Quote
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;
