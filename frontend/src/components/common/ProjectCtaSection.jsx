import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProjectCtaSection = ({
    title = 'Want to See Your Project',
    highlight = 'Here?',
    description = "Let's collaborate and create something extraordinary together.",
    subDescription = 'Join our growing list of successful clients.',
    primaryBtnText = '🚀 Start Your Project',
    primaryBtnTo = '/contact',
    secondaryBtnText = 'View All Services',
    secondaryBtnTo = '/services',
    className = '',
}) => {
    const location = useLocation();
    const isServicesPage = location.pathname === '/services';

    const handleSecondaryClick = (e) => {
        if (isServicesPage) {
            e.preventDefault();
            const target = document.getElementById('ServicesContent') || document.getElementById('ServicesBanner');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section id="ProjectCtaBanner" className={`py-12 md:py-20 overflow-hidden ${className}`}>
            <div className="container max-w-5xl">
                <div
                    data-aos="fade-up"
                    className="relative overflow-hidden rounded-[28px] md:rounded-[36px] border border-purple-500/20 bg-gradient-to-b from-[#181524] via-[#121019] to-[#0d0b13] p-10 sm:p-14 md:p-20 text-center shadow-[0_25px_80px_rgba(108,99,255,0.18)]"
                >
                    {/* Glowing Top Radial Light */}
                    <div
                        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[360px] rounded-full opacity-40 blur-[90px]"
                        style={{
                            background:
                                'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(236, 72, 153, 0.25) 45%, transparent 75%)',
                        }}
                    />

                    {/* Subtle Grid Accent */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#6c63ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

                    <div className="relative z-10">
                        {/* Heading */}
                        <h2 className="font-soldier text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-tight">
                            {title}{' '}
                            <span className="bg-gradient-to-r from-[#A78BFA] via-[#EC4899] to-[#F43F5E] bg-clip-text text-transparent">
                                {highlight}
                            </span>
                        </h2>

                        {/* Subtitle */}
                        <p className="mt-4 sm:mt-5 font-poppins text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
                            {description}
                            {subDescription && (
                                <>
                                    <br className="hidden sm:inline" /> {subDescription}
                                </>
                            )}
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
                            {/* Primary Button */}
                            <Link
                                to={primaryBtnTo}
                                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-poppins text-sm md:text-base font-semibold text-white bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#EC4899] shadow-[0_0_35px_rgba(168,85,247,0.45)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                            >
                                <span>{primaryBtnText}</span>
                            </Link>

                            {/* Secondary Button */}
                            <Link
                                to={secondaryBtnTo}
                                onClick={handleSecondaryClick}
                                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-poppins text-sm md:text-base font-semibold text-white/90 hover:text-white border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/40 backdrop-blur-sm hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                            >
                                <span>{secondaryBtnText}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectCtaSection;

