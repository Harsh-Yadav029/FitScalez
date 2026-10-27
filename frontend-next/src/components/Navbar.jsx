"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
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

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/projects", label: "Work" },
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/career", label: "Careers" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: scrolled ? "12px 20px" : "20px 24px",
                transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    width: "100%",
                    maxWidth: "1240px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: scrolled ? "10px 22px" : "14px 28px",
                    borderRadius: "9999px",
                    background: scrolled
                        ? "rgba(10, 11, 15, 0.78)"
                        : "rgba(13, 15, 24, 0.55)",
                    backdropFilter: "blur(20px) saturate(190%)",
                    WebkitBackdropFilter: "blur(20px) saturate(190%)",
                    border: scrolled
                        ? "1px solid rgba(108, 99, 255, 0.28)"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: scrolled
                        ? "0 16px 36px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(108, 99, 255, 0.12)"
                        : "0 8px 24px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {/* Brand Logo */}
                <Link href="/" aria-label="Fitscalez Home" style={{ display: "flex", alignItems: "center" }}>
                    <motion.img
                        src="/images/logo.png"
                        alt="Fitscalez"
                        style={{ height: "32px", width: "auto" }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                </Link>

                {/* Desktop Nav Links */}
                <ul
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                    }}
                    className="desktop-nav"
                >
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href} style={{ position: "relative" }}>
                                <Link
                                    href={link.href}
                                    style={{
                                        display: "inline-block",
                                        padding: "8px 16px",
                                        borderRadius: "9999px",
                                        fontSize: "0.9rem",
                                        fontWeight: isActive ? "600" : "500",
                                        color: isActive ? "#ffffff" : "var(--text-muted)",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                        position: "relative",
                                        zIndex: 1,
                                    }}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                borderRadius: "9999px",
                                                background: "rgba(108, 99, 255, 0.18)",
                                                border: "1px solid rgba(108, 99, 255, 0.4)",
                                                boxShadow: "0 0 12px rgba(108, 99, 255, 0.25)",
                                                zIndex: -1,
                                            }}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right Action CTA */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Link href="/lead" style={{ textDecoration: "none" }}>
                        <motion.button
                            whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(108, 99, 255, 0.5)" }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: "8px 18px",
                                borderRadius: "9999px",
                                background: "linear-gradient(135deg, #6c63ff 0%, #ff6584 100%)",
                                color: "#ffffff",
                                fontSize: "0.86rem",
                                fontWeight: "600",
                                border: "none",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                            }}
                        >
                            <span>⚡ Estimate Project</span>
                        </motion.button>
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation menu"
                        className="mobile-menu-btn"
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--text)",
                            cursor: "pointer",
                            padding: "8px",
                            display: "none",
                            fontSize: "1.4rem",
                        }}
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: "absolute",
                            top: "76px",
                            left: "20px",
                            right: "20px",
                            background: "rgba(13, 15, 24, 0.96)",
                            backdropFilter: "blur(24px)",
                            border: "1px solid rgba(108, 99, 255, 0.25)",
                            borderRadius: "20px",
                            padding: "20px",
                            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    padding: "12px 16px",
                                    borderRadius: "12px",
                                    color: pathname === link.href ? "var(--primary-light)" : "var(--text)",
                                    background: pathname === link.href ? "rgba(108, 99, 255, 0.12)" : "transparent",
                                    textDecoration: "none",
                                    fontWeight: "600",
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                @media (max-width: 868px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .mobile-menu-btn {
                        display: block !important;
                    }
                }
            `}</style>
        </header>
    );
};

export default Navbar;
