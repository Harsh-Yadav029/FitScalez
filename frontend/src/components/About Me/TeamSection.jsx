import React from "react";

const teamMembers = [
    {
        name: "Mr. Hariom Saini",
        role: "Founder & CEO",
        avatar: "👨‍💼",
        bio: "Visionary entrepreneur with expertise in business strategy and digital transformation. Built Fitscalez to empower Indian businesses online.",
        socials: [
            { icon: "💼", href: "https://linkedin.com", label: "LinkedIn" },
            { icon: "📸", href: "https://instagram.com", label: "Instagram" },
            { icon: "🐦", href: "https://twitter.com", label: "Twitter" },
        ],
    },
    {
        name: "Ms. Anshul Sharma",
        role: "Partner & Strategy Director",
        avatar: "👩‍💼",
        bio: "Expert in digital marketing strategy and brand development. Drives growth for clients with data-driven insights and creative solutions.",
        socials: [
            { icon: "💼", href: "https://linkedin.com", label: "LinkedIn" },
            { icon: "📸", href: "https://instagram.com", label: "Instagram" },
            { icon: "🐦", href: "https://twitter.com", label: "Twitter" },
        ],
    },
    {
        name: "Divyansh",
        role: "Lead Web Developer",
        avatar: "👨‍💻",
        bio: "MERN Stack expert specializing in building fast, scalable and stunning web applications.",
        contact: "+91 9599433616",
        socials: [
            { icon: "💼", href: "https://linkedin.com", label: "LinkedIn" },
            { icon: "📞", href: "tel:+919599433616", label: "Call Divyansh" },
            { icon: "🐙", href: "https://github.com", label: "GitHub" },
        ],
    },
    {
        name: "Creative Team",
        role: "Design & Content",
        avatar: "🎨",
        bio: "Our talented designers, content creators and video editors work together to create stunning visual identities and engaging content.",
        socials: [
            { icon: "🎨", href: "https://dribbble.com", label: "Dribbble" },
            { icon: "🏀", href: "https://instagram.com", label: "Instagram" },
            { icon: "📸", href: "https://behance.net", label: "Behance" },
        ],
    },
];

const TeamSection = () => {
    return (
        <section id="Team" className="mt-[112px] pb-8">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-tag">MEET THE TEAM</span>
                    <h2 className="section-title">
                        The People Who Drive <span className="text-coffee">Your Success</span>
                    </h2>
                    <p className="section-desc">
                        A passionate team of experts — developers, marketers, designers and strategists dedicated to your digital growth.
                    </p>
                </div>

                <div className="team-grid">
                    {teamMembers.map((member, idx) => (
                        <div
                            key={member.name}
                            className={`card team-card animate-on-scroll ${idx > 0 ? `delay-${idx}` : ""}`}
                        >
                            <div className="team-avatar">
                                <div className="avatar-bg">{member.avatar}</div>
                            </div>
                            <h3>{member.name}</h3>
                            <div className="role">{member.role}</div>
                            <p className="bio">
                                {member.bio}
                                {member.contact && (
                                    <span className="block mt-1.5 font-medium">
                                        Contact:{" "}
                                        <a
                                            href={`tel:${member.contact}`}
                                            className="text-coffee font-semibold whitespace-nowrap hover:underline"
                                        >
                                            {member.contact}
                                        </a>
                                    </span>
                                )}
                            </p>
                            <div className="team-social">
                                {member.socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;

