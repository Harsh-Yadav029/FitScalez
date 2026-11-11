import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

const WorkTogetherCTA = () => {
    return (
        <section id="WorkTogetherCTA" className="mt-[112px] pb-16">
            <div className="container">
                <div
                    data-aos="fade-up"
                    className="relative overflow-hidden rounded-[32px] border border-Primary/15 bg-gradient-to-b from-[#1C1A17] via-[#161616] to-[#121110] p-10 md:p-16 lg:p-20 text-center shadow-[0_30px_90px_rgba(22,22,22,0.35)]"
                >
                    {/* Warm Terracotta Ambient Glow (Matching UI Color Grading) */}
                    <div
                        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[380px] rounded-full opacity-35 blur-[110px]"
                        style={{
                            background: 'radial-gradient(circle, rgba(191,74,26,0.6) 0%, rgba(224,109,59,0.35) 45%, rgba(245,158,11,0.15) 70%, transparent 85%)',
                        }}
                    />

                    {/* Headline */}
                    <h2 className="relative font-soldier text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#E5E3DC] leading-tight">
                        READY TO{' '}
                        <span className="bg-gradient-to-r from-[#BF4A1A] via-[#E06D3B] to-[#F59E0B] bg-clip-text text-transparent">
                            WORK TOGETHER?
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="relative mt-4 mx-auto max-w-xl font-poppins text-sm sm:text-base text-[#E5E3DC]/75 leading-relaxed">
                        Let's transform your vision into a digital reality. Start with a free consultation call today.
                    </p>

                    {/* Action Buttons with Brand Terracotta Grading */}
                    <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#BF4A1A] via-[#D45D2B] to-[#E06D3B] px-8 py-3.5 font-poppins text-sm sm:text-base font-semibold text-white shadow-[0_10px_28px_rgba(191,74,26,0.38)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_38px_rgba(191,74,26,0.55)] active:scale-95"
                        >
                            <HiOutlineSparkles className="text-amber-200 text-lg" />
                            <span>Get Free Consultation</span>
                        </Link>

                        <a
                            href="tel:+919599433616"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-poppins text-sm sm:text-base font-medium text-[#E5E3DC] backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-coffee active:scale-95 group"
                        >
                            <FiPhone className="text-coffee group-hover:scale-110 transition-transform" />
                            <span>Call Divyansh</span>
                        </a>
                    </div>

                    {/* Contact Direct Links */}
                    <div className="relative mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-poppins text-xs sm:text-sm text-[#E5E3DC]/70">
                        <a
                            href="tel:+919599433616"
                            className="inline-flex items-center gap-2 transition-colors hover:text-white"
                        >
                            <FiPhone className="text-coffee text-base" />
                            <span>+91 9599433616</span>
                        </a>

                        <a
                            href="mailto:fitscalezofficial@gmail.com"
                            className="inline-flex items-center gap-2 transition-colors hover:text-white"
                        >
                            <FiMail className="text-coffee text-base" />
                            <span>fitscalezofficial@gmail.com</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkTogetherCTA;
