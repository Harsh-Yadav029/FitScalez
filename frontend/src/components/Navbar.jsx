import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiHome,
    FiUser,
    FiTag,
    FiBriefcase,
    FiLayers,
    FiMail,
    FiBookOpen,
    FiZap,
    FiArrowRight,
    FiX,
    FiPhoneCall,
    FiGlobe,
} from "react-icons/fi";
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

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
        setMenuOpen(false);
    }, [location.pathname]);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const handleNavClick = (path) => {
        setMenuOpen(false);
        if (path.includes("#")) {
            const [basePath, hash] = path.split("#");
            if (location.pathname === basePath) {
                const el = document.getElementById(hash);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            } else {
                navigate(path);
                setTimeout(() => {
                    const el = document.getElementById(hash);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 300);
            }
        } else {
            navigate(path);
        }
    };

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    const menuGrid = [
        [
            { label: "Home", path: "/", icon: FiHome },
            { label: "About Us", path: "/about", icon: FiUser },
        ],
        [
            { label: "Pricing", path: "/services#Pricing", icon: FiTag },
            { label: "Projects", path: "/projects", icon: FiLayers },
        ],
        [
            { label: "Services", path: "/services", icon: FiBriefcase },
            { label: "Contact", path: "/contact", icon: FiMail },
        ],
        [
            { label: "Blogs", path: "/blog", icon: FiBookOpen },
            { label: "Careers", path: "/career", icon: FiZap },
        ],
    ];

    return (
        <>
            {/* ================= FIXED TOP NAVBAR ================= */}
            <header className="sticky top-0 z-[100] w-full transition-all duration-300">
                <div
                    className={`w-full transition-all duration-300 ${
                        scrolled
                            ? "bg-[#E5E3DC]/95 backdrop-blur-md border-b border-Primary/10 shadow-[0_4px_20px_rgba(22,22,22,0.06)]"
                            : "bg-[#E5E3DC]/90 backdrop-blur-sm border-b border-Primary/10"
                    }`}
                >
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] sm:h-[76px] flex items-center justify-between gap-4">
                        {/* Left Side: Brand Title */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 hover:opacity-90 transition group shrink-0"
                        >
                            <span className="font-soldier text-2xl sm:text-3xl font-bold tracking-wider text-Primary group-hover:text-coffee transition-colors">
                                FITSCALEZ
                            </span>
                            <span className="hidden sm:inline font-poppins text-[11px] font-medium text-second/60">
                                | based in Delhi
                            </span>
                        </Link>

                        {/* Center: Desktop Quick Navigation Links */}
                        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-8 font-soldier text-base xl:text-lg tracking-wider">
                            {[
                                { label: "HOME", path: "/" },
                                { label: "ABOUT", path: "/about" },
                                { label: "SERVICES", path: "/services" },
                                { label: "PROJECTS", path: "/projects" },
                                { label: "BLOG", path: "/blog" },
                                { label: "CAREER", path: "/career" },
                            ].map((link, idx, arr) => {
                                const active = isActive(link.path);
                                return (
                                    <Link
                                        key={link.label}
                                        to={link.path}
                                        className={`transition-colors flex items-center gap-2 ${
                                            active
                                                ? "text-coffee font-bold"
                                                : "text-Primary/75 hover:text-coffee"
                                        }`}
                                    >
                                        <span>{link.label}</span>
                                        {idx < arr.length - 1 && (
                                            <span className="text-Primary/20 text-xs">·</span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Side: Action CTA Button & Mobile Menu Toggle */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            {/* Contact CTA Button */}
                            <Link
                                to="/contact"
                                className="px-4.5 sm:px-6 py-2 sm:py-2.5 bg-coffee text-white rounded-full font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-Primary transition-all duration-300 shadow-sm hover:shadow-md shrink-0 group cursor-pointer"
                            >
                                <span>Contact Us</span>
                                <FiArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                            </Link>

                            {/* Mobile Hamburger Menu Toggle (Only on mobile/tablet) */}
                            <button
                                type="button"
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm select-none ${
                                    menuOpen
                                        ? "bg-coffee text-white shadow-coffee/20 scale-105"
                                        : "bg-Primary text-brand hover:bg-coffee hover:text-white"
                                }`}
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                            >
                                <div className="flex flex-col gap-1.5 w-4 justify-center items-center">
                                    <span
                                        className={`h-[2px] w-full bg-current transition-all duration-300 ${
                                            menuOpen ? "rotate-45 translate-y-[8px]" : ""
                                        }`}
                                    />
                                    <span
                                        className={`h-[2px] w-full bg-current transition-all duration-300 ${
                                            menuOpen ? "opacity-0" : ""
                                        }`}
                                    />
                                    <span
                                        className={`h-[2px] w-full bg-current transition-all duration-300 ${
                                            menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
                                        }`}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ================= INTERACTIVE MEGA FLYOUT PANEL ================= */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop Blur Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
                        />

                        {/* Dropdown Card Modal */}
                        <motion.div
                            initial={{ opacity: 0, y: -24, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -18, scale: 0.98 }}
                            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-[76px] sm:top-[86px] right-3 sm:right-6 md:right-8 z-[120] w-[calc(100vw-24px)] sm:w-[500px] max-h-[85vh] overflow-y-auto rounded-[24px] md:rounded-[28px] border border-white/15 bg-[#141414] p-6 sm:p-8 text-brand shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
                            style={{ scrollbarWidth: "thin" }}
                        >
                            {/* Panel Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                                <span className="flex items-center gap-2 font-poppins text-xs font-bold uppercase tracking-widest text-coffee">
                                    <span className="w-2 h-2 rounded-sm bg-coffee" />
                                    MENU
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(false)}
                                    className="p-1 text-white/50 hover:text-white transition cursor-pointer"
                                    aria-label="Close"
                                >
                                    <FiX className="text-lg" />
                                </button>
                            </div>

                            {/* 2-Column Bordered Navigation Grid */}
                            <div className="border border-white/12 rounded-2xl overflow-hidden bg-black/20">
                                {menuGrid.map((row, rowIndex) => (
                                    <div
                                        key={rowIndex}
                                        className={`grid grid-cols-2 ${
                                            rowIndex < menuGrid.length - 1
                                                ? "border-b border-white/12"
                                                : ""
                                        }`}
                                    >
                                        {row.map((item, colIndex) => {
                                            const IconComp = item.icon;
                                            const active = isActive(item.path);

                                            return (
                                                <button
                                                    key={item.label}
                                                    type="button"
                                                    onClick={() => handleNavClick(item.path)}
                                                    className={`p-3.5 sm:p-4 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                                                        colIndex === 0
                                                            ? "border-r border-white/12"
                                                            : ""
                                                    } ${
                                                        active
                                                            ? "bg-coffee/20 text-coffee font-bold"
                                                            : "text-brand/85 hover:bg-white/5 hover:text-coffee"
                                                    }`}
                                                >
                                                    <IconComp
                                                        className={`text-base shrink-0 ${
                                                            active
                                                                ? "text-coffee"
                                                                : "text-brand/50"
                                                        }`}
                                                    />
                                                    <span className="font-poppins text-xs sm:text-sm font-semibold truncate">
                                                        {item.label}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>

                            {/* Editorial Typography Headline */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <h3 className="font-soldier text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight text-white tracking-tight">
                                    Let's Explore <br />
                                    <span className="text-coffee">more Fitscalez</span>
                                </h3>
                                <p className="mt-2 font-poppins text-xs text-brand/60 leading-relaxed max-w-sm">
                                    Web development, custom MERN applications, and SEO growth engines engineered for scale.
                                </p>
                            </div>

                            {/* Social Media & Contact Row */}
                            <div className="mt-6 pt-5 border-t border-white/10">
                                <span className="flex items-center gap-2 font-poppins text-[10px] font-bold uppercase tracking-widest text-coffee mb-3">
                                    <span className="w-1.5 h-1.5 rounded-sm bg-coffee" />
                                    Social Media & Connect
                                </span>

                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-2.5">
                                        <a
                                            href="https://twitter.com/fitscalez"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-xs text-brand/80 hover:bg-coffee hover:text-white hover:border-coffee transition-all"
                                            aria-label="Twitter / X"
                                        >
                                            <FaXTwitter />
                                        </a>
                                        <a
                                            href="https://linkedin.com/company/fitscalez"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-xs text-brand/80 hover:bg-coffee hover:text-white hover:border-coffee transition-all"
                                            aria-label="LinkedIn"
                                        >
                                            <FaLinkedinIn />
                                        </a>
                                        <a
                                            href="https://instagram.com/fitscalez"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-xs text-brand/80 hover:bg-coffee hover:text-white hover:border-coffee transition-all"
                                            aria-label="Instagram"
                                        >
                                            <FaInstagram />
                                        </a>
                                        <a
                                            href="https://wa.me/919599433616"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-xs text-brand/80 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"
                                            aria-label="WhatsApp"
                                        >
                                            <FaWhatsapp />
                                        </a>
                                    </div>

                                    <a
                                        href="tel:+919599433616"
                                        className="font-poppins text-xs font-bold text-coffee hover:underline flex items-center gap-1.5"
                                    >
                                        <FiPhoneCall />
                                        <span>+91 9599433616</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
