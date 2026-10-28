import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Navigation */}
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
                <div className="nav-container">
                    <Link to="/" className="nav-logo" aria-label="Fitscalez Home">
                        <img src="/images/logo.png" alt="Fitscalez" className="logo-img" />
                    </Link>

                    <ul className="nav-links" role="navigation">
                        <li><Link to="/" className={isActive("/") ? "active" : ""}>Home</Link></li>
                        <li><Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link></li>
                        <li><Link to="/services" className={isActive("/services") ? "active" : ""}>Services</Link></li>
                        <li><Link to="/projects" className={isActive("/projects") ? "active" : ""}>Projects</Link></li>
                        <li><Link to="/blog" className={isActive("/blog") ? "active" : ""}>Blog</Link></li>
                        <li><Link to="/career" className={isActive("/career") ? "active" : ""}>Careers</Link></li>
                        <li><Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link></li>
                    </ul>

                    <div className="nav-cta">
                        <div className="nav-phone">
                            <span>📞</span>
                            <a href="tel:+919599433616">+91 9599433616</a>
                        </div>
                        <Link to="/contact" className="btn btn-primary btn-sm">Get Quote</Link>
                    </div>

                    <button
                        className={`hamburger ${mobileOpen ? "open" : ""}`}
                        id="hamburger"
                        aria-label="Toggle menu"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className={`mobile-nav ${mobileOpen ? "open" : ""}`} id="mobileNav">
                <div className="mobile-nav-brand">
                    <img src="/images/logo.png" alt="Fitscalez" className="logo-img-mobile" />
                </div>
                <Link to="/" className={isActive("/") ? "active" : ""}>🏠 Home</Link>
                <Link to="/about" className={isActive("/about") ? "active" : ""}>👥 About Us</Link>
                <Link to="/services" className={isActive("/services") ? "active" : ""}>⚡ Services</Link>
                <Link to="/projects" className={isActive("/projects") ? "active" : ""}>💼 Projects</Link>
                <Link to="/blog" className={isActive("/blog") ? "active" : ""}>📝 Blog</Link>
                <Link to="/career" className={isActive("/career") ? "active" : ""}>🚀 Careers</Link>
                <Link to="/contact" className={isActive("/contact") ? "active" : ""}>📞 Contact</Link>
                <a href="tel:+919599433616" style={{ color: "var(--accent2)", marginTop: "8px" }}>
                    📱 +91 9599433616 (Divyansh)
                </a>
            </div>
        </>
    );
};

export default Navbar;
