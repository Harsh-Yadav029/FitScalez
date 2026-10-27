"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// SeoHelmet replaced by Next.js metadata
import { careerService } from "@/services/api.service";

const defaultRoles = [
    {
        _id: "default-1",
        title: "Full Stack Web Developer (MERN)",
        department: "Engineering",
        type: "Full-Time",
        location: "Delhi (Hybrid)",
        salaryRange: "â‚¹3.5L - â‚¹7L/year",
        experience: "1-3 Years Experience",
        description: "Build and maintain modern web applications using React.js, Node.js, Express and MongoDB. Collaborate with designers and clients to deliver pixel-perfect solutions."
    },
    {
        _id: "default-2",
        title: "Digital Marketing Specialist",
        department: "Marketing",
        type: "Full-Time",
        location: "Delhi (Hybrid)",
        salaryRange: "â‚¹2.5L - â‚¹5L/year",
        experience: "1-2 Years Experience",
        description: "Manage SEO campaigns, social media accounts and paid advertising for 10+ client accounts. Strong analytical mindset and creative thinking required."
    },
    {
        _id: "default-3",
        title: "SEO & Content Marketing Specialist",
        department: "Marketing",
        type: "Full-Time",
        location: "Remote / Delhi",
        salaryRange: "â‚¹2L - â‚¹4L/year",
        experience: "1+ Year Experience",
        description: "Drive organic growth through keyword research, on-page SEO, link building and compelling content creation. Experience with Ahrefs/SEMrush is a plus."
    },
    {
        _id: "default-4",
        title: "UI/UX Designer",
        department: "Design",
        type: "Full-Time",
        location: "Delhi (Hybrid)",
        salaryRange: "â‚¹2.5L - â‚¹5L/year",
        experience: "1-3 Years Experience",
        description: "Create stunning user interfaces and experiences using Figma. Strong portfolio with both web and mobile design required. Knowledge of design systems is a plus."
    },
    {
        _id: "default-5",
        title: "Video Editor & Content Creator",
        department: "Creative",
        type: "Full-Time / Freelance",
        location: "Delhi / Remote",
        salaryRange: "â‚¹1.8L - â‚¹4L/year",
        experience: "Fresher/Experienced",
        description: "Edit engaging videos for social media, YouTube and commercial use. Proficiency in Premiere Pro and After Effects required. Creative storytelling is key."
    },
    {
        _id: "default-6",
        title: "Business Development Executive",
        department: "Sales",
        type: "Full-Time",
        location: "Delhi",
        salaryRange: "â‚¹2L - â‚¹5L + Commission",
        experience: "1+ Year Experience",
        description: "Drive business growth by acquiring new clients in web development and digital marketing. Strong communication, networking and sales skills essential."
    }
];

const Career = () => {
    // Instant synchronous render - zero loading screen
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
            } catch (err) {
                // Keep defaultRoles
            }
        };
        fetchJobs();
    }, []);

    // Ensure all career and benefit cards animate smoothly
    useEffect(() => {
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll(".benefit-card, .job-card, .animate-on-scroll");
            elements.forEach((el) => {
                el.classList.add("animated");
            });
        }, 10);
        return () => clearTimeout(timer);
    }, [jobs]);

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
            setSubmitError(err.message || "Failed to submit application");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            

            {/* Page Hero */}
            <div className="page-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span>â€º</span>
                        <span>Careers</span>
                    </div>
                    <div className="badge" style={{ marginBottom: "16px" }}>ðŸš€ Join Our Team</div>
                    <h1>Careers at <span className="gradient-text">Fitscalez</span></h1>
                    <p>Build your career with Delhi's fastest-growing digital agency. Work on exciting projects, learn cutting-edge skills and grow alongside passionate professionals.</p>
                </div>
            </div>

            {/* Why Work With Us */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Why Join Us</span>
                        <h2 className="section-title">A Workplace Where You <span className="gradient-text">Actually Grow</span></h2>
                        <p className="section-desc">We believe great work happens when talented people are given freedom, support and exciting challenges. Here's what makes Fitscalez special.</p>
                    </div>

                    <div className="benefits-grid animate-on-scroll">
                        <div className="card benefit-card">
                            <div className="benefit-icon">ðŸ“ˆ</div>
                            <h3>Rapid Career Growth</h3>
                            <p>Fast-track promotions based on performance. Our team members grow 2-3x faster than at traditional companies.</p>
                        </div>
                        <div className="card benefit-card">
                            <div className="benefit-icon">ðŸ </div>
                            <h3>Flexible Work</h3>
                            <p>Hybrid work model â€” work from our Delhi office or remotely. We judge by results, not attendance.</p>
                        </div>
                        <div className="card benefit-card">
                            <div className="benefit-icon">ðŸŽ“</div>
                            <h3>Continuous Learning</h3>
                            <p>Access to premium courses, certifications and conferences. We invest in your skills development.</p>
                        </div>
                        <div className="card benefit-card">
                            <div className="benefit-icon">ðŸ’°</div>
                            <h3>Competitive Salary</h3>
                            <p>Above-market compensation with performance bonuses, annual hikes and project incentives.</p>
                        </div>
                        <div className="card benefit-card">
                            <div className="benefit-icon">ðŸ¤</div>
                            <h3>Collaborative Culture</h3>
                            <p>A tight-knit team that celebrates wins together, supports each other and has fun while working hard.</p>
                        </div>
                        <div className="card benefit-card">
                            <div className="benefit-icon">ðŸŒ</div>
                            <h3>Real-World Impact</h3>
                            <p>Work on meaningful projects that genuinely help Indian businesses grow and succeed online.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="section-padding" style={{ background: "var(--bg2)" }}>
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-tag">Open Positions</span>
                        <h2 className="section-title">We're <span className="gradient-text">Hiring!</span></h2>
                        <p className="section-desc">Find your perfect role at Fitscalez and start making an impact from day one.</p>
                    </div>

                    <div className="job-listings animate-on-scroll">
                        {loading ? (
                            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>Loading active positions...</div>
                        ) : (
                            jobs.map((job) => (
                                <div key={job._id || job.title} className="card job-card">
                                    <div className="job-info">
                                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                            <h3>{job.title}</h3>
                                            <span className="job-tag-open">â— Hiring</span>
                                        </div>
                                        <div className="job-meta">
                                            <span className="job-meta-item">ðŸ“ {job.location || "Delhi (Hybrid)"}</span>
                                            <span className="job-meta-item">ðŸ’¼ {job.type || "Full-Time"}</span>
                                            <span className="job-meta-item">ðŸ’° {job.salaryRange || "Competitive"}</span>
                                            <span className="job-meta-item">âš¡ {job.experience || "1+ Year Experience"}</span>
                                        </div>
                                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "10px", maxWidth: "600px" }}>
                                            {job.description}
                                        </p>
                                    </div>
                                    <div className="job-apply">
                                        <button className="btn btn-primary btn-sm" onClick={() => handleApply(job.title)}>
                                            Apply Now â†’
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* General Application */}
            <section className="section-padding">
                <div className="container" style={{ maxWidth: "700px", textAlign: "center" }}>
                    <div className="animate-on-scroll">
                        <span className="section-tag">Don't See Your Role?</span>
                        <h2 className="section-title" style={{ marginTop: "12px" }}>Send Us Your <span className="gradient-text">Resume Anyway</span></h2>
                        <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "1rem", lineHeight: "1.7" }}>
                            We're always looking for talented people. If you're passionate about web development, marketing or design â€” send your resume and portfolio to us. We'll be in touch when a suitable opportunity opens.
                        </p>
                        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                            <a href="mailto:fitscalezofficial@gmail.com?subject=Job Application - Open Role" className="btn btn-primary">
                                âœ‰ï¸ Send Your Resume
                            </a>
                            <a href="https://wa.me/919599433616?text=Hi!%20I%20want%20to%20apply%20at%20Fitscalez." target="_blank" rel="noreferrer" className="btn btn-outline">
                                ðŸ’¬ WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Modal */}
            {showModal && (
                <div
                    className="apply-modal open"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) handleCloseModal();
                    }}
                >
                    <div className="apply-modal-card">
                        <button className="apply-modal-close" onClick={handleCloseModal}>âœ•</button>
                        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.4rem", fontWeight: "700", marginBottom: "6px" }}>
                            Apply for <span className="gradient-text">{selectedJobTitle}</span>
                        </h2>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "24px" }}>
                            Fill in your details and we'll get back to you within 48 hours.
                        </p>

                        {submitSuccess ? (
                            <div style={{ textAlign: "center", padding: "20px 0" }}>
                                <div style={{ fontSize: "3rem" }}>ðŸŽ‰</div>
                                <h3 style={{ marginTop: "10px" }}>Application Received!</h3>
                                <p style={{ color: "var(--text-muted)", marginTop: "6px" }}>
                                    Thank you for your interest in joining Fitscalez! Our hiring team will review your application and reach out within 48 hours.
                                </p>
                                <button className="btn btn-primary" style={{ marginTop: "20px" }} onClick={handleCloseModal}>
                                    Done
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                {submitError && (
                                    <div style={{ padding: "10px", background: "rgba(239,68,68,0.15)", color: "#f87171", borderRadius: "6px", marginBottom: "14px", fontSize: "0.85rem" }}>
                                        {submitError}
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Your Name *</label>
                                    <input type="text" required value={candidateName} onChange={(e) => setCandidateName(e.target.value)} placeholder="Enter Your Name" />
                                </div>

                                <div className="form-group">
                                    <label>Email Address *</label>
                                    <input type="email" required value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} placeholder="name@email.com" />
                                </div>

                                <div className="form-group">
                                    <label>Phone Number *</label>
                                    <input type="tel" required value={candidatePhone} onChange={(e) => setCandidatePhone(e.target.value)} placeholder="+91 9999999999" />
                                </div>

                                <div className="form-group">
                                    <label>Portfolio / LinkedIn / GitHub URL</label>
                                    <input type="url" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} placeholder="https://linkedin.com/in/yourname" />
                                </div>

                                <div className="form-group">
                                    <label>Experience Level</label>
                                    <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                                        <option value="Fresher / Intern">Fresher / Intern</option>
                                        <option value="1-2 Years">1-2 Years</option>
                                        <option value="2-4 Years">2-4 Years</option>
                                        <option value="4+ Years">4+ Years</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Resume (PDF / DOCX)</label>
                                    <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files[0])} />
                                </div>

                                <div className="form-group">
                                    <label>Cover Note / Why Fitscalez? *</label>
                                    <textarea rows={3} required value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder="Tell us about yourself and why you're a great fit for this role..." />
                                </div>

                                <button type="submit" className="form-submit" disabled={submitting}>
                                    {submitting ? "Submitting Application..." : "ðŸš€ Submit Application"}
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

