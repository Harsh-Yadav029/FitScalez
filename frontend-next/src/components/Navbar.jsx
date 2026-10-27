"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
                <div className="nav-container">
                    <Link href="/" className="nav-logo" aria-label="Fitscalez Home">
                        <img src="/images/logo.png" alt="Fitscalez" className="logo-img" />
                    </Link>

                    <ul className="nav-links">
                        <li>
                            <Link href="/" className={pathname === "/" ? "active" : ""}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={pathname === "/about" ? "active" : ""}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className={pathname === "/services" ? "active" : ""}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/projects" className={pathname === "/projects" ? "active" : ""}>
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className={pathname.startsWith("/blog") ? "active" : ""}>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/career" className={pathname === "/career" ? "active" : ""}>
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>
                                Contact
                            </Link>
                        </li>
                    </ul>

                    <div className="nav-cta">
                        <div className="nav-phone">
                            <span>📞</span>
                            <a href="tel:+919599433616">+91 9599433616</a>
                        </div>
                        <Link href="/lead" className="btn btn-primary btn-sm">
                            Get Quote
                        </Link>
                    </div>

                    <button
                        type="button"
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
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                <Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog & Insights</Link>
                <Link href="/career" onClick={() => setMobileMenuOpen(false)}>Careers</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <a href="tel:+919599433616" className="btn btn-outline" style={{ justifyContent: "center" }}>
                        📞 Call +91 9599433616
                    </a>
                    <Link href="/lead" className="btn btn-primary" style={{ justifyContent: "center" }}>
                        🚀 Get Free Quote
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;
