import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiArrowUpRight, FiPhoneCall, FiMail } from "react-icons/fi";
import Magnet from "./effects/Magnet";

const Footer = () => {
    return (
        <>
            {/* ============ EDITORIAL AGENCY FOOTER ============ */}
            <footer className="pt-16 lg:pt-24 pb-10 border-t-2 border-Primary/15 bg-brand text-Primary relative overflow-hidden">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-Primary/10">
                        {/* Column 1: Brand & Bio */}
                        <div className="lg:col-span-4 flex flex-col items-start">
                            <Magnet padding={20} magnetStrength={2}>
                                <Link to="/" className="flex items-center gap-3 mb-4 hover-this">
                                    <img 
                                        src="/images/logo.png" 
                                        alt="Fitscalez" 
                                        className="w-11 h-11 object-contain rounded-lg"
                                    />
                                    <span className="font-soldier text-4xl font-bold tracking-wider text-Primary">
                                        FITSCALEZ
                                    </span>
                                </Link>
                            </Magnet>

                            <p className="font-poppins text-xs sm:text-sm text-second/80 max-w-sm leading-relaxed mb-6">
                                India's premier Web Development & Digital Marketing Agency. We engineer high-performance MERN Stack applications and high-ROI growth systems for ambitious brands.
                            </p>

                            <div className="font-poppins text-xs text-second/75 space-y-1.5 mb-6">
                                <p className="flex items-center gap-2">
                                    <span className="font-bold text-Primary">Headquarters:</span> 24, Shri Ram Road, Civil Lines, Delhi-110054
                                </p>
                                <p className="flex items-center gap-2">
                                    <FiPhoneCall className="text-coffee text-sm" />
                                    <a href="tel:+919599433616" className="hover:text-coffee font-semibold text-Primary">+91 9599433616 (Divyansh)</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <FiMail className="text-coffee text-sm" />
                                    <a href="mailto:fitscalezofficial@gmail.com" className="hover:text-coffee text-Primary">fitscalezofficial@gmail.com</a>
                                </p>
                            </div>

                            {/* Social Magnets */}
                            <div className="flex items-center gap-4">
                                <Magnet padding={15} magnetStrength={2}>
                                    <a 
                                        href="https://linkedin.com/company/fitscalez" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        aria-label="LinkedIn"
                                        className="size-9 rounded-full border border-Primary/20 flex items-center justify-center text-sm text-Primary hover:bg-coffee hover:text-brand hover:border-coffee transition-all hover-this"
                                    >
                                        <FaLinkedinIn />
                                    </a>
                                </Magnet>
                                <Magnet padding={15} magnetStrength={2}>
                                    <a 
                                        href="https://instagram.com/fitscalez" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        aria-label="Instagram"
                                        className="size-9 rounded-full border border-Primary/20 flex items-center justify-center text-sm text-Primary hover:bg-coffee hover:text-brand hover:border-coffee transition-all hover-this"
                                    >
                                        <FaInstagram />
                                    </a>
                                </Magnet>
                                <Magnet padding={15} magnetStrength={2}>
                                    <a 
                                        href="https://facebook.com/fitscalez" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        aria-label="Facebook"
                                        className="size-9 rounded-full border border-Primary/20 flex items-center justify-center text-sm text-Primary hover:bg-coffee hover:text-brand hover:border-coffee transition-all hover-this"
                                    >
                                        <FaFacebookF />
                                    </a>
                                </Magnet>
                                <Magnet padding={15} magnetStrength={2}>
                                    <a 
                                        href="https://twitter.com/fitscalez" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        aria-label="Twitter"
                                        className="size-9 rounded-full border border-Primary/20 flex items-center justify-center text-sm text-Primary hover:bg-coffee hover:text-brand hover:border-coffee transition-all hover-this"
                                    >
                                        <FaXTwitter />
                                    </a>
                                </Magnet>
                                <Magnet padding={15} magnetStrength={2}>
                                    <a 
                                        href="https://wa.me/919599433616" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        aria-label="WhatsApp"
                                        className="size-9 rounded-full border border-Primary/20 flex items-center justify-center text-sm text-Primary hover:bg-coffee hover:text-brand hover:border-coffee transition-all hover-this"
                                    >
                                        <FaWhatsapp />
                                    </a>
                                </Magnet>
                            </div>
                        </div>

                        {/* Column 2: Services */}
                        <div className="lg:col-span-3">
                            <h3 className="font-soldier text-4xl sm:text-5xl text-Primary font-bold uppercase tracking-wide mb-6">
                                SERVICES
                            </h3>
                            <ul className="flex flex-col gap-3 font-poppins text-xs sm:text-sm text-second/85 font-medium">
                                <li>
                                    <Link to="/services" className="hover:text-coffee hover-brown transition-colors inline-flex items-center gap-1.5">
                                        MERN Stack Applications <FiArrowUpRight className="opacity-40 text-xs" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/services" className="hover:text-coffee hover-brown transition-colors inline-flex items-center gap-1.5">
                                        Custom Web Development <FiArrowUpRight className="opacity-40 text-xs" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/services" className="hover:text-coffee hover-brown transition-colors inline-flex items-center gap-1.5">
                                        High-ROI SEO Services <FiArrowUpRight className="opacity-40 text-xs" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/services" className="hover:text-coffee hover-brown transition-colors inline-flex items-center gap-1.5">
                                        Social Media Marketing <FiArrowUpRight className="opacity-40 text-xs" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/services" className="hover:text-coffee hover-brown transition-colors inline-flex items-center gap-1.5">
                                        Performance Paid Ads (PPC) <FiArrowUpRight className="opacity-40 text-xs" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/services" className="hover:text-coffee hover-brown transition-colors inline-flex items-center gap-1.5">
                                        Commercial Video Production <FiArrowUpRight className="opacity-40 text-xs" />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Company Pages */}
                        <div className="lg:col-span-2">
                            <h3 className="font-soldier text-4xl sm:text-5xl text-Primary font-bold uppercase tracking-wide mb-6">
                                COMPANY
                            </h3>
                            <ul className="flex flex-col gap-3 font-poppins text-xs sm:text-sm text-second/85 font-medium">
                                <li>
                                    <Link to="/" className="hover:text-coffee hover-brown transition-colors">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="hover:text-coffee hover-brown transition-colors">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/projects" className="hover:text-coffee hover-brown transition-colors">Our Projects</Link>
                                </li>
                                <li>
                                    <Link to="/blog" className="hover:text-coffee hover-brown transition-colors">Blog & News</Link>
                                </li>
                                <li>
                                    <Link to="/career" className="hover:text-coffee hover-brown transition-colors">Careers</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="hover:text-coffee hover-brown transition-colors">Contact Us</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Contact Action */}
                        <div className="lg:col-span-3">
                            <h3 className="font-soldier text-4xl sm:text-5xl text-Primary font-bold uppercase tracking-wide mb-6">
                                LET'S TALK
                            </h3>
                            <p className="font-poppins text-xs sm:text-sm text-second/80 mb-5 leading-relaxed">
                                Have an ambitious vision for your website or growth campaign? Get in touch with our team today.
                            </p>
                            
                            <Magnet padding={15} magnetStrength={3}>
                                <div className="magnetic-btn">
                                    <Link 
                                        to="/contact" 
                                        className="group inline-flex items-center justify-between gap-3 w-full rounded-2xl border border-Primary/15 bg-Primary p-4 font-poppins text-xs font-semibold uppercase text-brand hover-this hover:bg-coffee transition-all duration-300"
                                    >
                                        <span>Start A Conversation</span>
                                        <span className="flex size-7 items-center justify-center rounded-full bg-brand text-Primary group-hover:rotate-45 transition duration-300">
                                            <FiArrowUpRight />
                                        </span>
                                    </Link>
                                </div>
                            </Magnet>

                            <div className="mt-4 pt-4 border-t border-Primary/10 font-poppins text-xs text-second/70">
                                <div>Mon - Fri: 9:00 AM – 6:30 PM</div>
                                <div className="text-coffee font-semibold mt-1">24/7 WhatsApp Response Guaranteed</div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Copyright & Legal Links */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-poppins text-xs text-second/70">
                        <p>© {new Date().getFullYear()} <span className="font-bold text-Primary">Fitscalez</span>. All rights reserved. Crafted in Delhi, India.</p>
                        <div className="flex items-center gap-6">
                            <Link to="/privacy" className="hover:text-coffee transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-coffee transition-colors">Terms of Service</Link>
                            <Link to="/sitemap" className="hover:text-coffee transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
