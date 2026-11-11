import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCheckCircle, FiMail, FiPhoneCall, FiMessageCircle } from 'react-icons/fi';

export const LetsWorkTogether = () => {
  const highlights = [
    'Responsive MERN Architecture',
    'Sub-Second Page Performance',
    'Clean Handoff & 3-Mo Warranty',
  ];

  const metrics = [
    { value: '80+', label: 'Completed builds' },
    { value: '4+', label: 'Years practice' },
    { value: '100%', label: 'Focused delivery' },
  ];

  return (
    <section className="relative flex min-h-[580px] w-full items-center overflow-hidden bg-Primary py-20 text-brand md:min-h-screen md:py-24">
      {/* Ambient Radial Lights */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(191,74,26,0.35),transparent_38%),radial-gradient(circle_at_82%_82%,rgba(224,109,59,0.18),transparent_42%),linear-gradient(135deg,rgba(229,227,220,0.06),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-4 sm:inset-6 rounded-[32px] md:border md:border-brand/10" />

      {/* Top Angled Kinetic Ticker Tape */}
      <div className="pointer-events-none absolute left-1/2 top-10 w-[140vw] -translate-x-1/2 rotate-[5deg] md:rotate-[7deg] border-y border-brand/10 bg-brand/[0.06] py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap font-soldier text-3xl sm:text-4xl md:text-[46px] font-semibold uppercase leading-none text-brand/40 [animation:a-text-scroll_32s_linear_infinite]">
          <span className="px-6">Let's work together / Scalable MERN Platforms / High-ROI SEO / Creative Front-End / Modern Web Apps /</span>
          <span className="px-6">Let's work together / Scalable MERN Platforms / High-ROI SEO / Creative Front-End / Modern Web Apps /</span>
          <span className="px-6">Let's work together / Scalable MERN Platforms / High-ROI SEO / Creative Front-End / Modern Web Apps /</span>
          <span className="px-6">Let's work together / Scalable MERN Platforms / High-ROI SEO / Creative Front-End / Modern Web Apps /</span>
        </div>
      </div>

      {/* Bottom Angled Kinetic Ticker Tape (Terracotta Accent) */}
      <div className="pointer-events-none absolute bottom-12 left-1/2 w-[140vw] -translate-x-1/2 -rotate-[4deg] md:-rotate-[6deg] border-y border-coffee/30 bg-coffee/15 py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap font-soldier text-3xl sm:text-4xl md:text-[46px] font-semibold uppercase leading-none text-coffee/80 [animation:b-text-scroll_36s_linear_infinite]">
          <span className="px-6">Available for projects / E-Commerce Engines / 80+ Builds Delivered / Custom Portals / Performance Marketing /</span>
          <span className="px-6">Available for projects / E-Commerce Engines / 80+ Builds Delivered / Custom Portals / Performance Marketing /</span>
          <span className="px-6">Available for projects / E-Commerce Engines / 80+ Builds Delivered / Custom Portals / Performance Marketing /</span>
          <span className="px-6">Available for projects / E-Commerce Engines / 80+ Builds Delivered / Custom Portals / Performance Marketing /</span>
        </div>
      </div>

      <div className="container relative z-10">
        <div className="grid items-end gap-10 lg:gap-14 lg:grid-cols-[1fr_440px]">
          {/* Left Column: Heading & CTAs */}
          <div data-aos="fade-up">
            {/* Live Booking Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand/15 bg-brand/[0.08] px-4 py-2 font-poppins text-xs font-bold uppercase text-brand/80 backdrop-blur-md shadow-sm">
              <span className="size-2 rounded-full bg-coffee shadow-[0_0_15px_rgba(191,74,26,1)] animate-pulse" />
              Open to selected client work
            </div>

            {/* Massive Soldier Typography */}
            <h2 className="mt-6 max-w-5xl font-soldier text-[56px] sm:text-[78px] md:text-[112px] lg:text-[136px] font-bold uppercase leading-[0.85] text-brand tracking-tight">
              Let's build <br />
              <span className="text-coffee">something sharp.</span>
            </h2>

            <p className="mt-6 max-w-2xl font-poppins text-xs sm:text-sm md:text-base font-normal leading-relaxed text-brand/75">
              We design and develop high-performance digital platforms, full-stack MERN architectures, and conversion-optimized growth funnels with a transparent path from concept to production launch.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                to="/contact"
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-brand px-7 font-poppins text-xs sm:text-sm font-bold uppercase text-Primary transition duration-300 hover:bg-coffee hover:text-white shadow-lg shadow-black/25 active:scale-95 cursor-pointer"
              >
                <span>Start a project</span>
                <FiArrowUpRight className="text-lg transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link
                to="/projects"
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-brand/20 bg-brand/[0.04] px-7 font-poppins text-xs sm:text-sm font-bold uppercase text-brand transition duration-300 hover:border-brand hover:bg-brand/10 active:scale-95 cursor-pointer"
              >
                <span>View work (11)</span>
                <FiArrowUpRight className="text-lg transition duration-300 group-hover:rotate-45" />
              </Link>
            </div>

            {/* Direct Quick Contact Strip */}
            <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6 font-poppins text-xs text-brand/60">
              <a
                href="tel:+919599433616"
                className="flex items-center gap-1.5 hover:text-coffee transition-colors"
              >
                <FiPhoneCall className="text-coffee" />
                <span>+91 9599433616 (Divyansh)</span>
              </a>
              <span className="hidden sm:inline opacity-30">•</span>
              <a
                href="mailto:fitscalezofficial@gmail.com"
                className="flex items-center gap-1.5 hover:text-coffee transition-colors"
              >
                <FiMail className="text-coffee" />
                <span>fitscalezofficial@gmail.com</span>
              </a>
              <span className="hidden sm:inline opacity-30">•</span>
              <a
                href="https://wa.me/919599433616"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <FiMessageCircle className="text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Right Column: Floating Glass "Project Fit" Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="120"
            className="group rounded-[28px] border border-brand/[0.14] bg-brand/[0.08] p-6 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:border-coffee/40 hover:-translate-y-1.5"
          >
            <div className="flex items-start justify-between gap-5 border-b border-brand/10 pb-5">
              <div>
                <p className="font-poppins text-xs font-bold uppercase tracking-wider text-coffee">Project fit</p>
                <h3 className="mt-1 font-soldier text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-none text-brand">
                  Modern web UI
                </h3>
              </div>
              <Link
                to="/contact"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-coffee text-xl text-white shadow-md shadow-coffee/30 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Send inquiry"
              >
                <FiMail />
              </Link>
            </div>

            <ul className="mt-5 grid gap-2.5">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-brand/10 bg-brand/[0.06] px-4 py-3 font-poppins text-xs sm:text-sm font-semibold text-brand/85 transition-colors hover:bg-brand/[0.1]"
                >
                  <FiCheckCircle className="shrink-0 text-coffee text-base" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-brand/10 bg-black/20 p-3.5 sm:p-4 text-center transition-colors hover:border-coffee/30"
                >
                  <strong className="block font-soldier text-3xl sm:text-4xl font-bold leading-none text-brand">
                    {metric.value}
                  </strong>
                  <span className="mt-1.5 block font-poppins text-[10px] sm:text-[11px] font-semibold uppercase leading-tight text-brand/60">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetsWorkTogether;
