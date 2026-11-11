import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiCheck, FiArrowRight } from "react-icons/fi";
import SeoHelmet from "../components/SeoHelmet";
import PageBanner from "../components/common/PageBanner";
import CategoryHoverShowcase from "../components/ui/AnimatedSlideshow";
import WorkTogetherCTA from "../components/About Me/WorkTogetherCTA";
import ExploreMyWork from "../components/common/ExploreMyWork";
import ProjectCtaSection from "../components/common/ProjectCtaSection";

const servicesData = {
    "tab-dev": {
        tag: "Web Solutions",
        title: "High-Performance",
        highlight: "Web Development",
        desc: "From conversion-optimized landing pages to complex full-stack MERN enterprise platforms — fast, secure, scalable, and responsive.",
        items: [
            {
                icon: "💻",
                title: "MERN Stack Development",
                description:
                    "Full-stack web applications using MongoDB, Express.js, React.js and Node.js. Scalable, blazing fast and modern. Starting from ₹25,000.",
                imageUrl:
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "React.js Frontend Architecture",
                    "Node.js + Express REST API Backend",
                    "MongoDB Scalable Schema Design",
                    "JWT Authentication & RBAC",
                    "Production Deployment & CI/CD",
                ],
            },
            {
                icon: "🛒",
                title: "E-Commerce Platforms",
                description:
                    "High-converting online stores with payment gateway integration, inventory management and friction-free checkout flows.",
                imageUrl:
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Product Catalog & Cart System",
                    "Razorpay & PayPal Gateway Integration",
                    "Order Management & Invoicing",
                    "Mobile-First Responsive UX",
                ],
            },
            {
                icon: "🎨",
                title: "UI/UX Design & Prototyping",
                description:
                    "User-centered interfaces that captivate visitors and convert them into loyal clients. Figma systems, wireframing and pixel-perfect builds.",
                imageUrl:
                    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Interactive Figma Prototypes",
                    "Design System & Component Kits",
                    "User Journey & Behavior Research",
                    "Conversion Rate Optimization",
                ],
            },
            {
                icon: "🔧",
                title: "Website Maintenance & Care",
                description:
                    "Keep your web applications secure, up-to-date and performing at peak speed with our ongoing maintenance and monitoring.",
                imageUrl:
                    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Continuous Security Updates",
                    "Speed & Core Web Vitals Optimization",
                    "Ongoing UI & Feature Polish",
                    "99.9% Uptime & Error Monitoring",
                ],
            },
        ],
        callout: {
            title: "🚀 Live Client Work: Walk The Plan & House of Symmetry",
            description:
                "Check out live platforms engineered by Fitscalez: 1:1 scale architectural blueprint tech & bespoke luxury interior studios.",
            links: [
                { label: "walktheplan.in ↗", href: "https://walktheplan.in" },
                { label: "houseofsymmetry.in ↗", href: "https://www.houseofsymmetry.in" },
            ],
        },
    },
    "tab-marketing": {
        tag: "Digital Marketing",
        title: "Grow Your",
        highlight: "Online Presence",
        desc: "Proven search engine optimization, precision pay-per-click advertising, and targeted organic social media growth.",
        items: [
            {
                icon: "🔍",
                title: "Search Engine Optimization (SEO)",
                description:
                    "Rank #1 on Google with data-driven SEO. Deep keyword research, technical performance tuning, on-page optimization, and authority link acquisition.",
                imageUrl:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Keyword Intent Research & Mapping",
                    "On-Page & Core Technical SEO",
                    "High-Authority Backlink Building",
                    "Local SEO for Delhi & Pan-India",
                ],
            },
            {
                icon: "📱",
                title: "Social Media Marketing",
                description:
                    "Build a magnetic social media footprint across Instagram, LinkedIn, Facebook, and Twitter that drives real business inquiries.",
                imageUrl:
                    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Content Strategy & Publishing Calendar",
                    "High-Engagement Reels & Creatives",
                    "Community & Inbound DM Management",
                    "Targeted Influencer Partnerships",
                ],
            },
            {
                icon: "💰",
                title: "Pay-Per-Click Advertising (PPC)",
                description:
                    "High-ROI paid ad campaigns on Google Search, Meta (Instagram/Facebook), and YouTube. Every rupee optimized for maximum customer acquisition.",
                imageUrl:
                    "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Google Search & Display Ad Campaigns",
                    "Meta Conversion Funnels",
                    "Audience Retargeting Sequences",
                    "Continuous A/B Creative Testing",
                ],
            },
            {
                icon: "📧",
                title: "Email & Funnel Automation",
                description:
                    "Automated email marketing sequences that nurture cold prospects and retain existing clients with personalized automated messaging.",
                imageUrl:
                    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Drip Nurture Campaign Design",
                    "Audience Segmentation & Tagging",
                    "High-Converting Sales Copy",
                    "Open & Click-Through Analytics",
                ],
            },
        ],
    },
    "tab-creative": {
        tag: "Creative Services",
        title: "Content That",
        highlight: "Captivates",
        desc: "High-impact visual production, video storytelling, professional photography, and distinctive brand identities.",
        items: [
            {
                icon: "🎬",
                title: "Video Production & Editing",
                description:
                    "High-production video content that tells your brand story. From corporate films to viral social reels, crafted with cinematic polish.",
                imageUrl:
                    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Brand Story Commercials",
                    "Instagram Reels & YouTube Shorts",
                    "Motion Graphics & Dynamic Titles",
                    "Professional Color Grading & Sound Mix",
                ],
            },
            {
                icon: "📸",
                title: "Product & Studio Photography",
                description:
                    "Crisp, studio-grade product imagery for e-commerce stores, catalogs, and marketing campaigns that elevates brand perception.",
                imageUrl:
                    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "E-Commerce Catalog Shoots",
                    "Lifestyle & Contextual Photography",
                    "360° Interactive Product Angles",
                    "High-End Retouching & Compositing",
                ],
            },
            {
                icon: "✍️",
                title: "Content Writing & Copywriting",
                description:
                    "Compelling, SEO-infused copy that ranks on Google and turns passive readers into active buyers across all touchpoints.",
                imageUrl:
                    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Rank-Winning SEO Articles",
                    "High-Ticket Landing Page Copy",
                    "Conversion-Focused Product Descriptions",
                    "Brand Storytelling & Taglines",
                ],
            },
            {
                icon: "🎨",
                title: "Brand Identity Design",
                description:
                    "Memorable visual identity systems that give your business authority — typography, custom logomarks, color palettes, and brand manuals.",
                imageUrl:
                    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Vector Logomark & Variations",
                    "Typography & Color Hierarchy",
                    "Brand Style Guidelines Manual",
                    "Stationery & Social Media Kit",
                ],
            },
        ],
    },
    "tab-strategy": {
        tag: "Business Strategy",
        title: "Data-Driven",
        highlight: "Growth Plans",
        desc: "In-depth competitor intelligence, intelligent workflow automation, and sustainable revenue roadmap design.",
        items: [
            {
                icon: "📊",
                title: "Market Research & Intelligence",
                description:
                    "Deep market analysis, competitive gap research, and consumer insights that uncover lucrative opportunities for your business.",
                imageUrl:
                    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Market Sizing & Demographic Analysis",
                    "Competitor Benchmarking & Gaps",
                    "Consumer Psychology & Friction Points",
                    "Strategic Opportunity Mapping",
                ],
            },
            {
                icon: "📈",
                title: "Growth Strategy Consulting",
                description:
                    "Customized growth frameworks and milestone roadmaps that help businesses scale profitably from local to national prominence.",
                imageUrl:
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Go-To-Market (GTM) Strategy",
                    "Revenue Diversification Planning",
                    "Key Performance Indicator (KPI) Architecture",
                    "Strategic Partnership Sourcing",
                ],
            },
            {
                icon: "📱",
                title: "App Store Optimization (ASO)",
                description:
                    "Maximize your mobile app's visibility, installs, and organic retention across both Google Play Store and Apple App Store.",
                imageUrl:
                    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "App Title & Keyword Optimization",
                    "Conversion-Optimized Icon & Screenshots",
                    "Rating & Review Acceleration Flow",
                    "Organic Install Growth Strategy",
                ],
            },
            {
                icon: "🤖",
                title: "Marketing & CRM Automation",
                description:
                    "Connect your digital funnels with smart automated workflows that capture, qualify, and route leads on autopilot 24/7.",
                imageUrl:
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
                features: [
                    "Lead Qualification Pipelines",
                    "CRM Integration (HubSpot, Zoho, Notion)",
                    "Automated WhatsApp & Email Triggers",
                    "Unified Executive Performance Dashboard",
                ],
            },
        ],
    },
};

const pricingPlans = [
    {
        tag: "Starter",
        name: "Business Website",
        price: "₹25K",
        period: "one-time",
        description:
            "Ideal for small businesses and founders wanting a sleek, modern web presence that establishes instant credibility.",
        features: [
            "5-7 Custom Designed Pages",
            "100% Mobile Responsive Layout",
            "Contact Form & WhatsApp Direct Button",
            "On-Page SEO & Google Maps Setup",
            "1 Month Post-Launch Support",
        ],
        btnLabel: "Get Started",
        featured: false,
    },
    {
        tag: "Full-Stack",
        name: "Full-Stack MERN App",
        price: "₹49K",
        period: "starting",
        popularBadge: "🔥 Most Popular",
        description:
            "For ambitious businesses needing full functionality — databases, authentication, custom APIs, payments & dedicated admin panel.",
        features: [
            "React.js Frontend + Node.js/Express Backend",
            "MongoDB Production Database Design",
            "User Authentication & Role-Based Access",
            "Custom Admin Management Dashboard",
            "Razorpay / Payment Gateway Integration",
            "3 Months Dedicated Engineering Support",
        ],
        btnLabel: "Start Project →",
        featured: true,
    },
    {
        tag: "Growth",
        name: "Growth Marketing",
        price: "₹15K",
        period: "/month",
        description:
            "Comprehensive monthly digital marketing retainer for businesses serious about continuous online customer acquisition.",
        features: [
            "Social Media Management (3 Platforms)",
            "20 Custom Brand Creatives / Month",
            "Targeted SEO & Keyword Optimization",
            "Monthly Transparent Analytics Report",
            "Dedicated Account Manager",
            "PPC Ad Campaign Setup & Optimization",
        ],
        btnLabel: "Get Started",
        featured: false,
    },
];

const faqs = [
    {
        q: "How much does a website cost at Fitscalez?",
        a: "Our custom websites start from ₹25,000 for a polished 5-7 page business website. Full-stack MERN applications with databases, authentication, and custom logic typically start from ₹49,000. Final investment depends on custom feature requirements. Contact Divyansh at +91 9599433616 for a transparent quote.",
    },
    {
        q: "How long does it take to build a website?",
        a: "A standard 5-7 page business website typically delivers in 2 to 3 weeks. Full-stack MERN applications generally take 4 to 8 weeks depending on database schemas, third-party API integrations, and admin panel complexity.",
    },
    {
        q: "Do you provide comprehensive SEO services?",
        a: "Yes! We implement complete on-page and technical SEO, high-authority link acquisition, and keyword optimization aligned with Google's latest helpful content standards. Clients typically see 200% to 400% organic growth in 3 to 6 months.",
    },
    {
        q: "Do you work with clients outside Delhi?",
        a: "Absolutely! While based in Delhi, we collaborate with clients across PAN-India (Mumbai, Bengaluru, Pune, Hyderabad, Jaipur) and internationally via Google Meet, weekly milestone dashboards, and direct WhatsApp updates.",
    },
    {
        q: "What technologies and frameworks do you use?",
        a: "Our core engineering stack is MERN (MongoDB, Express.js, React.js, Node.js), complemented by Tailwind CSS, Framer Motion, Next.js, PostgreSQL, and secure Indian payment gateways like Razorpay.",
    },
    {
        q: "Do you offer post-launch support and warranty?",
        a: "Yes! All projects include 1 to 3 months of complimentary warranty support post-deployment, covering bug fixes, speed tuning, and performance checks, followed by affordable monthly maintenance plans.",
    },
];

const Services = () => {
    const [activeTab, setActiveTab] = useState("tab-dev");
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    const currentTab = servicesData[activeTab];

    const servicesSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://fitscalez.com/services#webpage",
                url: "https://fitscalez.com/services",
                name: "Full-Stack Web Development & Digital Marketing Services — Fitscalez",
            },
            {
                "@type": "Service",
                name: "MERN Stack Web Development",
                provider: {
                    "@type": "LocalBusiness",
                    name: "Fitscalez",
                },
            },
        ],
    };

    return (
        <>
            <SeoHelmet
                title="Our Services — Web Development, SEO & Performance Marketing | Fitscalez"
                description="Comprehensive digital services designed to scale your business. MERN stack development, e-commerce, Google & Meta ads, SEO, video production and business strategy."
                canonical="/services"
                schema={servicesSchema}
            />

            <section className="my-20">
                {/* Unified Editorial PageBanner */}
                <PageBanner
                    id="ServicesBanner"
                    kicker="FITSCALEZ CAPABILITIES"
                    kickerMobile="Our Services"
                    title="OUR SERVICES"
                    description="Comprehensive digital solutions engineered for scale. From production-grade MERN web applications to ROI-driven marketing funnels — we craft digital platforms that dominate."
                    scrollTarget="#ServicesContent"
                />

                {/* Main Services Interactive Section */}
                <div id="ServicesContent" className="mt-[112px]">
                    <div className="container">
                        {/* Category Tab Buttons */}
                        <div
                            data-aos="fade-up"
                            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 p-2 rounded-2xl md:rounded-full bg-[#DFDCD5] border border-Primary/12 max-w-4xl mx-auto shadow-[0_10px_30px_rgba(22,22,22,0.04)]"
                        >
                            {[
                                { id: "tab-dev", label: "💻 Web Development" },
                                { id: "tab-marketing", label: "📈 Digital Marketing" },
                                { id: "tab-creative", label: "🎬 Creative & Video" },
                                { id: "tab-strategy", label: "📊 Business Strategy" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-5 py-2.5 rounded-full font-poppins text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                        activeTab === tab.id
                                            ? "bg-Primary text-brand shadow-[0_6px_20px_rgba(22,22,22,0.2)] scale-102"
                                            : "text-second hover:text-Primary hover:bg-black/5"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Active Tab Header */}
                        <div className="mt-14 section-header" data-aos="fade-up">
                            <span className="section-tag">{currentTab.tag}</span>
                            <h2 className="section-title">
                                {currentTab.title} <span className="text-coffee">{currentTab.highlight}</span>
                            </h2>
                            <p className="section-desc">{currentTab.desc}</p>
                        </div>

                        {/* Interactive Hover Showcase for Active Category */}
                        <div className="mt-10" data-aos="fade-up">
                            <CategoryHoverShowcase
                                key={activeTab}
                                slides={currentTab.items}
                                tag={currentTab.tag}
                                title={currentTab.title}
                                highlight={currentTab.highlight}
                            />
                        </div>

                        {/* Detailed Service Cards Grid - Munna Inverting Style */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {currentTab.items.map((item, idx) => (
                                <div
                                    key={item.title}
                                    data-aos="fade-up"
                                    data-aos-delay={idx * 80}
                                    className="group relative overflow-hidden rounded-[24px] border border-Primary/15 bg-[#DFDCD5] p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(22,22,22,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-coffee/50 hover:bg-Primary hover:shadow-[0_28px_80px_rgba(22,22,22,0.25)]"
                                >
                                    {/* Top terracotta highlight line on hover */}
                                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-coffee/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    {/* Subtle decorative background circle */}
                                    <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-Primary/10 transition-all duration-500 group-hover:scale-125 group-hover:border-brand/10" />

                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between gap-4 mb-5">
                                            <div className="w-13 h-13 rounded-xl bg-Primary text-brand border border-Primary/15 flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-105 group-hover:bg-coffee group-hover:border-coffee group-hover:text-white">
                                                {item.icon}
                                            </div>
                                            <span className="font-soldier text-3xl font-medium leading-none text-Primary/20 transition-colors duration-500 group-hover:text-brand/20">
                                                0{idx + 1}
                                            </span>
                                        </div>
                                        <h3 className="font-soldier text-2xl font-bold uppercase text-Primary mb-3 leading-snug group-hover:text-coffee transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="font-poppins text-xs sm:text-sm text-second/85 leading-relaxed mb-6 group-hover:text-brand/75 transition-colors duration-300">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Features List */}
                                    <div className="relative z-10 pt-4 border-t border-Primary/10 group-hover:border-brand/10 transition-colors duration-300">
                                        <ul className="flex flex-col gap-2 font-poppins text-xs text-second/90 group-hover:text-brand/85 transition-colors duration-300">
                                            {item.features.map((feat) => (
                                                <li key={feat} className="flex items-start gap-2">
                                                    <span className="text-coffee font-bold mt-0.5">•</span>
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Verified Live Projects Callout (if available) */}
                        {currentTab.callout && (
                            <div
                                data-aos="fade-up"
                                className="mt-10 rounded-[22px] border border-coffee/30 bg-[#DFDCD5] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_35px_rgba(191,74,26,0.08)]"
                            >
                                <div>
                                    <h4 className="font-soldier text-xl md:text-2xl font-bold uppercase text-Primary mb-1">
                                        {currentTab.callout.title}
                                    </h4>
                                    <p className="font-poppins text-xs sm:text-sm text-second/80">
                                        {currentTab.callout.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 shrink-0 flex-wrap">
                                    {currentTab.callout.links.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-Primary/20 bg-brand text-Primary font-poppins text-xs sm:text-sm font-semibold transition-all duration-200 hover:bg-Primary hover:text-brand hover:border-Primary"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Transparent Pricing Section */}
                <div id="Pricing" className="mt-[112px]">
                    <div className="container">
                        <div className="section-header" data-aos="fade-up">
                            <span className="section-tag">TRANSPARENT PRICING</span>
                            <h2 className="section-title">
                                Simple & Predictable <span className="text-coffee">Pricing</span>
                            </h2>
                            <p className="section-desc">
                                No hidden fees, no surprise invoices. Choose a plan that matches your business vision, or request a custom quote.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                            {pricingPlans.map((plan, idx) => (
                                <div
                                    key={plan.name}
                                    data-aos="fade-up"
                                    data-aos-delay={idx * 100}
                                    className={`relative rounded-[28px] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                                        plan.featured
                                            ? "bg-[#161616] text-[#E5E3DC] border-2 border-coffee shadow-[0_25px_60px_rgba(191,74,26,0.22)]"
                                            : "bg-[#DFDCD5] text-Primary border border-Primary/12 shadow-[0_15px_35px_rgba(22,22,22,0.05)]"
                                    }`}
                                >
                                    {/* Popular Badge */}
                                    {plan.popularBadge && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-coffee px-4 py-1 font-poppins text-xs font-bold uppercase tracking-wider text-white shadow-md">
                                            {plan.popularBadge}
                                        </div>
                                    )}

                                    <div>
                                        <div className="font-poppins text-xs font-bold uppercase tracking-widest text-coffee mb-2">
                                            {plan.tag}
                                        </div>
                                        <h3
                                            className={`font-soldier text-3xl font-bold uppercase mb-4 leading-tight ${
                                                plan.featured ? "text-[#E5E3DC]" : "text-Primary"
                                            }`}
                                        >
                                            {plan.name}
                                        </h3>

                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="font-soldier text-5xl font-bold text-coffee leading-none">
                                                {plan.price}
                                            </span>
                                            <span
                                                className={`font-poppins text-xs uppercase font-medium ${
                                                    plan.featured ? "text-[#E5E3DC]/70" : "text-second/70"
                                                }`}
                                            >
                                                {plan.period}
                                            </span>
                                        </div>

                                        <p
                                            className={`font-poppins text-xs sm:text-sm leading-relaxed mb-6 ${
                                                plan.featured ? "text-[#E5E3DC]/80" : "text-second/80"
                                            }`}
                                        >
                                            {plan.description}
                                        </p>

                                        {/* Features List */}
                                        <div
                                            className={`pt-6 border-t ${
                                                plan.featured ? "border-white/10" : "border-Primary/10"
                                            }`}
                                        >
                                            <ul className="flex flex-col gap-3 font-poppins text-xs sm:text-sm">
                                                {plan.features.map((feat) => (
                                                    <li key={feat} className="flex items-start gap-2.5">
                                                        <span className="text-coffee font-bold mt-0.5">✓</span>
                                                        <span
                                                            className={
                                                                plan.featured ? "text-[#E5E3DC]/90" : "text-second"
                                                            }
                                                        >
                                                            {feat}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-8 pt-6">
                                        <Link
                                            to="/contact"
                                            className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-poppins text-sm font-semibold transition-all duration-300 ${
                                                plan.featured
                                                    ? "bg-gradient-to-r from-[#BF4A1A] via-[#D45D2B] to-[#E06D3B] text-white shadow-lg shadow-coffee/30 hover:scale-102 hover:shadow-coffee/50"
                                                    : "bg-Primary text-brand hover:bg-coffee hover:text-white"
                                            }`}
                                        >
                                            <span>{plan.btnLabel}</span>
                                            <FiArrowRight className="text-base" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-center font-poppins text-xs sm:text-sm text-second/80 mt-8" data-aos="fade-up">
                            💬 Custom project requirements?{" "}
                            <a
                                href="tel:+919599433616"
                                className="text-coffee font-semibold hover:underline"
                            >
                                Call Divyansh: +91 9599433616
                            </a>{" "}
                            for an exact milestone scope.
                        </p>
                    </div>
                </div>

                {/* Interactive FAQ Section */}
                <div id="FAQ" className="mt-[112px]">
                    <div className="container max-w-4xl">
                        <div className="section-header" data-aos="fade-up">
                            <span className="section-tag">COMMON INQUIRIES</span>
                            <h2 className="section-title">
                                Frequently Asked <span className="text-coffee">Questions</span>
                            </h2>
                            <p className="section-desc">
                                Transparent answers to the most common questions founders ask before partnering with Fitscalez.
                            </p>
                        </div>

                        <div className="mt-10 flex flex-col gap-4">
                            {faqs.map((faq, idx) => {
                                const isOpen = openFaq === idx;

                                return (
                                    <div
                                        key={faq.q}
                                        data-aos="fade-up"
                                        data-aos-delay={idx * 60}
                                        className={`rounded-[20px] transition-all duration-300 overflow-hidden border ${
                                            isOpen
                                                ? "border-coffee bg-[#DFDCD5] shadow-[0_12px_30px_rgba(191,74,26,0.12)]"
                                                : "border-Primary/12 bg-[#DFDCD5] hover:border-Primary/30"
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(idx)}
                                            aria-expanded={isOpen}
                                            className="w-full p-6 text-left flex items-center justify-between gap-4 font-poppins font-semibold text-Primary text-sm sm:text-base cursor-pointer"
                                        >
                                            <span>{faq.q}</span>
                                            <span
                                                className={`w-8 h-8 rounded-full border border-Primary/15 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                                    isOpen
                                                        ? "rotate-180 bg-coffee text-white border-coffee"
                                                        : "text-Primary bg-brand"
                                                }`}
                                            >
                                                <FiChevronDown className="text-base" />
                                            </span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.28, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-6 pb-6 pt-1 font-poppins text-xs sm:text-sm text-second/85 leading-relaxed border-t border-Primary/10">
                                                        <p>{faq.a}</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Unified CTA Section */}
                <WorkTogetherCTA />

                {/* Explore Work (Project Showcase) */}
                <div className="pt-[60px]">
                    <ExploreMyWork />
                </div>

                {/* Want To See Your Project Here CTA */}
                <ProjectCtaSection />
            </section>
        </>
    );
};

export default Services;
