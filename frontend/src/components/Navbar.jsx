import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/career" },
    { name: "Contact", path: "/contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    // Close menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const isActive = (itemPath) => {
        if (itemPath === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(itemPath);
    };

    return (
        <>
            <header className="navbar-wrapper">
                <nav
                    className={`apple-navbar ${scrolled ? "scrolled" : ""}`}
                    id="navbar"
                >
                    <div className="nav-container">
                        {/* Logo */}
                        <Link to="/" className="nav-logo" aria-label="Fitscalez Home">
                            <motion.img
                                src="/images/logo.png"
                                alt="Fitscalez"
                                className="logo-img"
                                whileHover={{ scale: 1.04 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            />
                        </Link>

                        {/* Navigation Links with Framer Motion Sliding Active Pill */}
                        <ul className="nav-links">
                            {navItems.map((item) => {
                                const active = isActive(item.path);
                                return (
                                    <li key={item.path} style={{ position: "relative" }}>
                                        <Link
                                            to={item.path}
                                            className={`nav-link-item ${active ? "active" : ""}`}
                                        >
                                            <span style={{ position: "relative", zIndex: 2 }}>
                                                {item.name}
                                            </span>
                                            {active && (
                                                <motion.span
                                                    layoutId="activeNavPill"
                                                    className="active-pill-indicator"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 420,
                                                        damping: 30,
                                                    }}
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* CTA Cluster */}
                        <div className="nav-cta">
                            <a
                                href="tel:+919599433616"
                                className="nav-phone-pill"
                                aria-label="Call Fitscalez at +91 9599433616"
                            >
                                <span className="phone-pulse-dot" />
                                <span>+91 9599433616</span>
                            </a>

                            <motion.div
                                whileHover={{ scale: 1.04, y: -1 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <Link to="/contact" className="btn btn-primary btn-sm nav-quote-btn">
                                    Get Quote
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile Hamburger Button */}
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
            </header>

            {/* Mobile Navigation Drawer with AnimatePresence */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className="mobile-nav-apple"
                    >
                        <div className="mobile-nav-links">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`mobile-nav-item ${isActive(item.path) ? "active" : ""}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mobile-nav-footer">
                            <a href="tel:+919599433616" className="nav-phone-pill mobile-phone-pill">
                                <span className="phone-pulse-dot" />
                                <span>Call +91 9599433616</span>
                            </a>
                            <Link
                                to="/contact"
                                className="btn btn-primary"
                                style={{ justifyContent: "center" }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                🚀 Get Free Quote
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
