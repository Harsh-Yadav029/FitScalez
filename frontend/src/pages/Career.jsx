import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FiMapPin,
    FiBriefcase,
    FiDollarSign,
    FiZap,
    FiArrowRight,
    FiX,
    FiMail,
    FiCheckCircle,
    FiUploadCloud,
    FiMessageCircle,
} from "react-icons/fi";
import SeoHelmet from "../components/SeoHelmet";
import PageBanner from "../components/common/PageBanner";
import { careerService } from "../services/api.service";

const defaultRoles = [
    {
        _id: "default-1",
        title: "Full Stack Web Developer (MERN)",
        department: "Engineering",
        type: "Full-Time",
        location: "Delhi (Hybrid)",
        salaryRange: "₹3.5L - ₹7L/year",
        experience: "1-3 Years Experience",
        description:
            "Build and scale high-performance web applications using React.js, Node.js, Express and MongoDB. Collaborate with designers and clients to deliver responsive, pixel-perfect platforms.",
        requirements: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "REST APIs"],
    },
    {
        _id: "default-2",
        title: "Digital Marketing Specialist",
        department: "Marketing",
        type: "Full-Time",
        location: "Delhi (Hybrid)",
        salaryRange: "₹2.5L - ₹5L/year",
        experience: "1-2 Years Experience",
        description:
            "Manage Google Ads, Meta Ads and multi-platform growth campaigns for high-growth client accounts. Drive measurable client ROI through analytical split-testing.",
        requirements: ["Google Ads", "Meta Ads", "PPC", "Analytics", "Growth Strategy"],
    },
    {
        _id: "default-3",
        title: "SEO & Content Marketing Specialist",
        department: "Marketing",
        type: "Full-Time",
        location: "Remote / Delhi",
        salaryRange: "₹2L - ₹4L/year",
        experience: "1+ Year Experience",
        description:
            "Drive organic rankings through deep keyword research, technical SEO optimization, high-authority backlink acquisition, and high-ranking editorial guides.",
        requirements: ["Technical SEO", "Ahrefs / SEMrush", "Link Building", "Schema Markup"],
    },
    {
        _id: "default-4",
        title: "UI/UX Designer",
        department: "Design",
        type: "Full-Time",
        location: "Delhi (Hybrid)",
        salaryRange: "₹2.5L - ₹5L/year",
        experience: "1-3 Years Experience",
        description:
            "Craft immersive user interfaces, design systems, and conversion-optimized prototypes in Figma. Deliver clean design tokens that developers love building.",
        requirements: ["Figma", "Design Systems", "Wireframing", "User Journeys"],
    },
    {
        _id: "default-5",
        title: "Video Editor & Motion Designer",
        department: "Creative",
        type: "Full-Time / Freelance",
        location: "Delhi / Remote",
        salaryRange: "₹1.8L - ₹4L/year",
        experience: "Fresher / Experienced",
        description:
            "Edit high-retention short-form reels and cinematic brand videos. Proficiency in Premiere Pro and After Effects with a keen eye for visual pacing.",
        requirements: ["Premiere Pro", "After Effects", "Reels/TikTok", "Color Grading"],
    },
    {
        _id: "default-6",
        title: "Business Development Executive",
        department: "Sales",
        type: "Full-Time",
        location: "Delhi",
        salaryRange: "₹2L - ₹5L + Commission",
        experience: "1+ Year Experience",
        description:
            "Spearhead client acquisition for web engineering and digital marketing retainers across PAN-India and international markets.",
        requirements: ["B2B Sales", "Client Discovery", "Pitch Decks", "Negotiation"],
    },
];

const benefits = [
    {
        icon: "📈",
        title: "Rapid Career Growth",
        desc: "Merit-based promotions and leadership opportunities. Our engineers and marketers level up 2-3x faster than at rigid corporate firms.",
    },
    {
        icon: "🏠",
        title: "Hybrid & Flexible Work",
        desc: "Work from our Delhi office or remotely. We evaluate and celebrate actual outcomes and code quality, not hours logged.",
    },
    {
        icon: "🎓",
        title: "Continuous Learning",
        desc: "Access to premium developer courses, growth masterclasses, and tooling allowances. We actively fund your technical expansion.",
    },
    {
        icon: "💰",
        title: "Above-Market Compensation",
        desc: "Competitive base salaries, milestone bonuses, annual salary reviews, and profit-sharing on high-impact client deliveries.",
    },
    {
        icon: "🤝",
        title: "Collaborative Culture",
        desc: "A tight-knit, high-energy squad that celebrates wins together, shares transparent feedback, and avoids unnecessary bureaucracy.",
    },
    {
        icon: "🌍",
        title: "Real-World Business Impact",
        desc: "Your code and campaigns directly impact revenue for real Indian businesses, from architectural firms to nationwide e-commerce stores.",
    },
];

const Career = () => {
    const [jobs, setJobs] = useState(defaultRoles);
    const [loading, setLoading] = useState(false);
    const [selectedJobTitle, setSelectedJobTitle] = useState("");
    const [showModal, setShowModal] = useState(false);

    // Modal Form State
    const [candidateName, setCandidateName] = useState("");
    const [candidateEmail, setCandidateEmail] = useState("");
    const [candidatePhone, setCandidatePhone] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");
    const [experience, setExperience] = useState("1-3 years");
    const [coverLetter, setCoverLetter] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await careerService.getAllJobs();
                if (res.data && res.data.length > 0) {
                    setJobs(res.data);
                }
            } catch {
                // Keep defaultRoles
            }
        };
        fetchJobs();
    }, []);

    const handleApply = (jobTitle) => {
        setSelectedJobTitle(jobTitle || "Open Role");
        setShowModal(true);
        setSubmitSuccess(false);
        setSubmitError("");
        document.body.style.overflow = "hidden";
    };

    const handleCloseModal = () => {
        setShowModal(false);
        document.body.style.overflow = "";
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError("");

        try {
            const formData = new FormData();
            formData.append("jobTitle", selectedJobTitle);
            formData.append("name", candidateName);
            formData.append("email", candidateEmail);
            formData.append("phone", candidatePhone);
            formData.append("portfolioUrl", portfolioUrl);
            formData.append("experience", experience);
            formData.append("coverLetter", coverLetter);
            if (resumeFile) formData.append("resume", resumeFile);

            await careerService.applyForJob(formData);
            setSubmitSuccess(true);
        } catch (err) {
            setSubmitError(err.message || "Failed to submit application. Please check your network or try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <SeoHelmet
                title="Careers at Fitscalez — We're Hiring Web Developers & Marketers Delhi"
                description="Join Delhi's premier digital agency. We're hiring MERN Stack Developers, SEO Specialists, UI/UX Designers, and Digital Marketers. Explore active roles."
                canonical="/career"
            />

            <section className="my-20">
                {/* Unified Editorial PageBanner */}
                <PageBanner
                    id="CareerBanner"
                    kicker="FITSCALEZ OPPORTUNITIES"
                    kickerMobile="Join Our Team"
                    title="CAREERS AT FITSCALEZ"
                    description="Build production-grade web platforms, data-driven SEO architectures, and scalable marketing campaigns alongside passionate engineers and growth marketers."
                    scrollTarget="#CareerContent"
                />

                <div id="CareerContent" className="mt-14 sm:mt-20">
                    <div className="container">
                        {/* Why Work With Us */}
                        <div className="section-header" data-aos="fade-up">
                            <span className="section-tag">WHY WORK AT FITSCALEZ</span>
                            <h2 className="section-title">
                                A Workplace Engineered for <span className="text-coffee">Real Growth</span>
                            </h2>
                            <p className="section-desc">
                                We believe outstanding work happens when talented builders are given autonomy, high-impact challenges, and genuine rewards.
                            </p>
                        </div>

                        {/* Benefits Grid */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {benefits.map((item, idx) => (
                                <div
                                    key={item.title}
                                    data-aos="fade-up"
                                    data-aos-delay={(idx % 3) * 80}
                                    className="group relative overflow-hidden rounded-[24px] border border-Primary/12 bg-[#DFDCD5] p-7 sm:p-8 shadow-[0_15px_40px_rgba(22,22,22,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-coffee/50 hover:shadow-[0_24px_70px_rgba(22,22,22,0.14)]"
                                >
                                    {/* Top hairline accent lights up on hover */}
                                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-coffee/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-Primary text-2xl flex items-center justify-center mb-6 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:bg-coffee">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-soldier text-2xl font-bold uppercase text-Primary group-hover:text-coffee transition-colors duration-200 leading-snug mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="font-poppins text-xs sm:text-sm text-second/80 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Open Positions Section */}
                        <div className="mt-28">
                            <div className="section-header" data-aos="fade-up">
                                <span className="section-tag">OPEN POSITIONS</span>
                                <h2 className="section-title">
                                    We're Actively <span className="text-coffee">Hiring!</span>
                                </h2>
                                <p className="section-desc">
                                    Find your role and start building with us from day one. Competitive pay, hybrid flexibility, and zero micromanagement.
                                </p>
                            </div>

                            {/* Job Listings Grid */}
                            <div className="mt-12 flex flex-col gap-6">
                                {jobs.map((job, idx) => (
                                    <div
                                        key={job._id || job.title}
                                        data-aos="fade-up"
                                        data-aos-delay={idx * 60}
                                        className="group rounded-[24px] border border-Primary/12 bg-[#DFDCD5] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-[0_15px_40px_rgba(22,22,22,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-coffee/50 hover:shadow-xl"
                                    >
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2.5">
                                                <h3 className="font-soldier text-2xl sm:text-3xl font-bold uppercase text-Primary group-hover:text-coffee transition-colors leading-tight">
                                                    {job.title}
                                                </h3>
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/10 border border-emerald-600/30 px-3 py-0.5 font-poppins text-[10px] font-bold uppercase text-emerald-800">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                                    Hiring
                                                </span>
                                                <span className="inline-flex items-center rounded-full border border-Primary/15 bg-white/60 px-3 py-0.5 font-poppins text-[10px] font-bold uppercase text-Primary/70">
                                                    {job.department}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 font-poppins text-xs text-second/75">
                                                <span className="flex items-center gap-1.5 font-medium">
                                                    <FiMapPin className="text-coffee" />
                                                    {job.location || "Delhi (Hybrid)"}
                                                </span>
                                                <span className="flex items-center gap-1.5 font-medium">
                                                    <FiBriefcase className="text-coffee" />
                                                    {job.type || "Full-Time"}
                                                </span>
                                                <span className="flex items-center gap-1.5 font-semibold text-Primary">
                                                    <FiDollarSign className="text-coffee" />
                                                    {job.salaryRange || "Competitive"}
                                                </span>
                                                <span className="flex items-center gap-1.5 font-medium">
                                                    <FiZap className="text-coffee" />
                                                    {job.experience || "1+ Year"}
                                                </span>
                                            </div>

                                            <p className="mt-4 font-poppins text-xs sm:text-sm text-second/80 leading-relaxed max-w-3xl">
                                                {job.description}
                                            </p>

                                            {job.requirements && job.requirements.length > 0 && (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {job.requirements.map((req) => (
                                                        <span
                                                            key={req}
                                                            className="rounded-lg border border-Primary/10 bg-white/70 px-2.5 py-1 font-poppins text-[10px] font-semibold text-Primary/80"
                                                        >
                                                            {req}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleApply(job.title)}
                                            className="w-full lg:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-Primary px-7 py-3.5 font-poppins text-xs sm:text-sm font-semibold text-brand hover:bg-coffee hover:text-white transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                                        >
                                            <span>Apply For Role</span>
                                            <FiArrowRight />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* General Application Card */}
                        <div
                            data-aos="fade-up"
                            className="mt-20 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#1C1A17] via-[#161616] to-[#121110] p-8 sm:p-12 text-center text-[#E5E3DC] shadow-[0_25px_80px_rgba(22,22,22,0.3)]"
                        >
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1.5 font-poppins text-xs font-bold uppercase text-amber-300 mb-4">
                                OPEN APPLICATION
                            </span>
                            <h3 className="font-soldier text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white leading-tight">
                                Don't See Your Role? <span className="text-coffee">Send Us Your Resume Anyway</span>
                            </h3>
                            <p className="mt-3 font-poppins text-xs sm:text-sm text-[#E5E3DC]/75 max-w-xl mx-auto leading-relaxed">
                                We are constantly expanding our engineering, performance marketing, and creative production teams. Send your resume and portfolio directly to our leadership team.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                                <a
                                    href="mailto:fitscalezofficial@gmail.com?subject=Job Application - Open Role"
                                    className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#BF4A1A] via-[#D45D2B] to-[#E06D3B] px-8 py-3.5 font-poppins text-xs sm:text-sm font-semibold text-white shadow-lg shadow-coffee/30 hover:scale-105 transition-all"
                                >
                                    <FiMail />
                                    <span>Send Your Resume via Email</span>
                                </a>
                                <a
                                    href="https://wa.me/919599433616?text=Hi!%20I%20want%20to%20apply%20at%20Fitscalez."
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-poppins text-xs sm:text-sm font-medium text-[#E5E3DC] hover:bg-white/10 transition-all"
                                >
                                    <FiMessageCircle className="text-emerald-400" />
                                    <span>WhatsApp Hiring Team</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) handleCloseModal();
                    }}
                >
                    <div className="relative my-8 w-full max-w-lg rounded-[28px] border border-Primary/15 bg-[#E5E3DC] p-6 sm:p-8 md:p-10 shadow-2xl">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="absolute right-5 top-5 p-2 rounded-full border border-Primary/15 text-Primary/60 hover:text-Primary hover:border-Primary transition cursor-pointer"
                            aria-label="Close modal"
                        >
                            <FiX className="text-lg" />
                        </button>

                        <div className="mb-6">
                            <span className="font-poppins text-[10px] font-bold uppercase tracking-wider text-coffee block mb-1">
                                FITSCALEZ APPLICATION
                            </span>
                            <h3 className="font-soldier text-2xl sm:text-3xl font-bold uppercase text-Primary leading-tight">
                                Apply for <span className="text-coffee">{selectedJobTitle}</span>
                            </h3>
                            <p className="mt-1 font-poppins text-xs text-second/70">
                                Share your background below. Our hiring team reviews and responds within 48 hours.
                            </p>
                        </div>

                        {submitSuccess ? (
                            <div className="py-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
                                    <FiCheckCircle />
                                </div>
                                <h4 className="font-soldier text-2xl font-bold uppercase text-Primary">
                                    Application Received!
                                </h4>
                                <p className="mt-2 font-poppins text-xs sm:text-sm text-second/80 max-w-xs mx-auto leading-relaxed">
                                    Thank you for your interest in joining Fitscalez. Our engineering leadership will review your profile and reach out shortly.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="mt-6 inline-flex items-center justify-center rounded-full bg-Primary px-8 py-3 font-poppins text-xs font-semibold text-brand hover:bg-coffee transition-colors cursor-pointer"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                {submitError && (
                                    <div className="p-3 rounded-xl bg-red-100 border border-red-200 text-red-700 font-poppins text-xs">
                                        {submitError}
                                    </div>
                                )}

                                <div>
                                    <label className="block font-poppins text-xs font-bold uppercase text-Primary/80 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={candidateName}
                                        onChange={(e) => setCandidateName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-2.5 rounded-xl border border-Primary/15 bg-white font-poppins text-xs text-Primary placeholder:text-Primary/40 focus:outline-none focus:border-coffee focus:ring-1 focus:ring-coffee/20 shadow-inner"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-poppins text-xs font-bold uppercase text-Primary/80 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={candidateEmail}
                                            onChange={(e) => setCandidateEmail(e.target.value)}
                                            placeholder="name@email.com"
                                            className="w-full px-4 py-2.5 rounded-xl border border-Primary/15 bg-white font-poppins text-xs text-Primary placeholder:text-Primary/40 focus:outline-none focus:border-coffee focus:ring-1 focus:ring-coffee/20 shadow-inner"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-poppins text-xs font-bold uppercase text-Primary/80 mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={candidatePhone}
                                            onChange={(e) => setCandidatePhone(e.target.value)}
                                            placeholder="+91 9999999999"
                                            className="w-full px-4 py-2.5 rounded-xl border border-Primary/15 bg-white font-poppins text-xs text-Primary placeholder:text-Primary/40 focus:outline-none focus:border-coffee focus:ring-1 focus:ring-coffee/20 shadow-inner"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-poppins text-xs font-bold uppercase text-Primary/80 mb-1">
                                            Portfolio / GitHub URL
                                        </label>
                                        <input
                                            type="url"
                                            value={portfolioUrl}
                                            onChange={(e) => setPortfolioUrl(e.target.value)}
                                            placeholder="https://github.com/..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-Primary/15 bg-white font-poppins text-xs text-Primary placeholder:text-Primary/40 focus:outline-none focus:border-coffee focus:ring-1 focus:ring-coffee/20 shadow-inner"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-poppins text-xs font-bold uppercase text-Primary/80 mb-1">
                                            Experience Level
                                        </label>
                                        <select
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-Primary/15 bg-white font-poppins text-xs text-Primary focus:outline-none focus:border-coffee focus:ring-1 focus:ring-coffee/20 shadow-inner"
                                        >
                                            <option value="Fresher / Intern">Fresher / Intern</option>
                                            <option value="1-2 Years">1-2 Years</option>
                                            <option value="2-4 Years">2-4 Years</option>
                                            <option value="4+ Years">4+ Years</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-poppins text-xs font-bold uppercase text-Primary/80 mb-1">
                                        Upload Resume (PDF / DOCX)
                                    </label>
                                    <div className="relative flex items-center justify-center p-4 border border-dashed border-Primary/25 rounded-xl bg-white/60 hover:bg-white transition cursor-pointer">
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setResumeFile(e.target.files[0])}
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                        />
                                        <div className="flex items-center gap-2 font-poppins text-xs text-Primary/70">
                                            <FiUploadCloud className="text-coffee text-lg" />
                                            <span>
                                                {resumeFile ? resumeFile.name : "Click to select or drag PDF file"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-poppins text-xs font-bold uppercase text-Primary/80 mb-1">
                                        Why Fitscalez? / Quick Note *
                                    </label>
                                    <textarea
                                        rows={3}
                                        required
                                        value={coverLetter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                        placeholder="Tell us about yourself and what you're excited to build..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-Primary/15 bg-white font-poppins text-xs text-Primary placeholder:text-Primary/40 focus:outline-none focus:border-coffee focus:ring-1 focus:ring-coffee/20 shadow-inner resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3.5 px-6 rounded-full bg-Primary text-brand font-poppins text-xs font-semibold hover:bg-coffee hover:text-white transition-all shadow-md disabled:opacity-60 cursor-pointer"
                                >
                                    {submitting ? "Submitting Application..." : "Submit Application →"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Career;
