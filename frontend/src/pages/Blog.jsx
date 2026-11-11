import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiClock, FiCheckCircle } from "react-icons/fi";
import SeoHelmet from "../components/SeoHelmet";
import PageBanner from "../components/common/PageBanner";
import { blogService } from "../services/api.service";
import articlesData from "../data/articles.json";

const Blog = () => {
    const [allArticles, setAllArticles] = useState(articlesData);
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

    // Optional background fetch from API if server has fresh articles
    useEffect(() => {
        let active = true;
        const fetchRemote = async () => {
            try {
                const res = await blogService.getAllBlogs({ limit: 100 });
                const fetched = res.data?.blogs || [];
                if (active && Array.isArray(fetched) && fetched.length > 0) {
                    setAllArticles(fetched);
                }
            } catch {
                // Fallback to local articlesData remains active
            }
        };
        fetchRemote();
        return () => {
            active = false;
        };
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) return;
        setNewsletterSubmitted(true);
    };

    const featuredArticle =
        allArticles.find((a) => a.slug === "website-development-cost-in-india") || allArticles[0];

    return (
        <>
            <SeoHelmet
                title="Blog & Insights — Engineering, SEO & Web Costs | Fitscalez"
                description="Actionable playbooks on website development costs in India, MERN stack performance, high-converting Google SEO strategies, and digital scaling."
                canonical="/blog"
            />

            <section className="pb-20">
                {/* Unified Editorial PageBanner */}
                <PageBanner
                    id="BlogBanner"
                    kicker="FITSCALEZ KNOWLEDGE HUB"
                    kickerMobile="Articles & Guides"
                    title="BLOG & INSIGHTS"
                    description="Actionable guides, real pricing blueprints, and high-impact playbooks on full-stack web engineering, Google SEO algorithms, and digital business growth."
                    scrollTarget="#BlogContent"
                />

                <div id="BlogContent" className="mt-14 sm:mt-20">
                    <div className="container">
                        {/* Featured Spotlight Card */}
                        {featuredArticle && (
                            <div
                                data-aos="fade-up"
                                className="mb-14 overflow-hidden rounded-[28px] border border-coffee/30 bg-gradient-to-br from-[#1C1A17] via-[#161616] to-[#121110] p-8 sm:p-10 lg:p-12 text-[#E5E3DC] shadow-[0_25px_80px_rgba(22,22,22,0.3)] transition duration-300 hover:border-coffee/50"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                    <div className="lg:col-span-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-coffee px-3.5 py-1 font-poppins text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                                                    🔥 Editorial Spotlight
                                                </span>
                                                <span className="font-poppins text-xs text-[#E5E3DC]/60">
                                                    {featuredArticle.category} • {featuredArticle.readTime || "8 min read"} • {featuredArticle.date || "Sep 2026"}
                                                </span>
                                            </div>

                                            <h2 className="font-soldier text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#E5E3DC] leading-tight hover:text-coffee transition-colors">
                                                <Link to={`/blog/${featuredArticle.slug}`}>
                                                    {featuredArticle.title}
                                                </Link>
                                            </h2>

                                            <p className="mt-4 font-poppins text-xs sm:text-sm text-[#E5E3DC]/75 leading-relaxed max-w-2xl">
                                                {featuredArticle.summary || featuredArticle.metaDesc}
                                            </p>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-coffee text-white font-bold flex items-center justify-center font-soldier text-xl">
                                                    D
                                                </div>
                                                <div>
                                                    <strong className="block font-poppins text-sm text-[#E5E3DC]">
                                                        {featuredArticle.author || "Divyansh"}
                                                    </strong>
                                                    <span className="block font-poppins text-xs text-[#E5E3DC]/60">
                                                        {featuredArticle.authorRole || "Lead Web Developer"}
                                                    </span>
                                                </div>
                                            </div>

                                            <Link
                                                to={`/blog/${featuredArticle.slug}`}
                                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#BF4A1A] via-[#D45D2B] to-[#E06D3B] px-6 py-3 font-poppins text-xs sm:text-sm font-semibold text-white shadow-md shadow-coffee/30 hover:scale-105 transition-all"
                                            >
                                                <span>Read Complete Guide</span>
                                                <FiArrowRight />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Pricing & Transparency Callout Box */}
                                    <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                                        <span className="text-4xl mb-3 block">💰</span>
                                        <div className="font-soldier text-3xl font-bold text-coffee">
                                            ₹25,000 – ₹1,50,000+
                                        </div>
                                        <p className="mt-2 font-poppins text-xs text-[#E5E3DC]/70 leading-relaxed">
                                            Transparent, realistic market breakdown for modern responsive websites & custom MERN enterprise portals in India.
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-poppins text-[10px] text-amber-200">
                                                ✓ Zero Hidden Fees
                                            </span>
                                            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-poppins text-[10px] text-emerald-300">
                                                ✓ 100% Code Ownership
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Articles Grid */}
                        <div className="mb-14">
                            <div className="mb-6 flex items-center justify-between border-b border-Primary/10 pb-4">
                                <h3 className="font-soldier text-2xl sm:text-3xl font-bold uppercase text-Primary">
                                    All Engineering & Growth Guides
                                </h3>
                                <span className="font-poppins text-xs font-semibold uppercase text-Primary/60">
                                    Showing {allArticles.length} guides
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {allArticles.map((article, index) => (
                                        <article
                                            key={article.slug || index}
                                            data-aos="fade-up"
                                            data-aos-delay={(index % 3) * 80}
                                            className="group relative overflow-hidden rounded-[24px] border border-Primary/12 bg-[#DFDCD5] p-7 flex flex-col justify-between shadow-[0_15px_40px_rgba(22,22,22,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-coffee/50 hover:shadow-[0_24px_70px_rgba(22,22,22,0.14)]"
                                        >
                                            {/* Top hairline accent lights up on hover */}
                                            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-coffee/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                            {/* Subtle ambient circle */}
                                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-Primary/5 transition-all duration-500 group-hover:scale-125 group-hover:border-coffee/15" />

                                            <div className="relative z-10">
                                                {/* Meta Row */}
                                                <div className="flex items-center justify-between gap-2 mb-4">
                                                    <span className="inline-flex items-center gap-1 rounded-full border border-coffee/20 bg-coffee/10 px-3 py-1 font-poppins text-[10px] sm:text-xs font-bold uppercase text-coffee transition-all duration-300 group-hover:bg-coffee group-hover:text-white">
                                                        {article.category}
                                                    </span>
                                                    <span className="font-poppins text-[11px] text-second/60 flex items-center gap-1">
                                                        <FiClock className="text-coffee" />
                                                        {article.readTime || "5 min read"}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h4 className="font-soldier text-2xl font-bold uppercase text-Primary group-hover:text-coffee transition-colors duration-300 leading-snug mb-3">
                                                    <Link to={`/blog/${article.slug}`}>
                                                        {article.title}
                                                    </Link>
                                                </h4>

                                                {/* Description */}
                                                <p className="font-poppins text-xs sm:text-sm text-second/80 leading-relaxed line-clamp-3 mb-6">
                                                    {article.summary || article.metaDesc || article.description}
                                                </p>
                                            </div>

                                            {/* Footer Row */}
                                            <div className="relative z-10 pt-4 border-t border-Primary/10 flex items-center justify-between gap-4">
                                                <span className="font-poppins text-xs text-second/70 font-medium">
                                                    By {article.author || "Divyansh"}
                                                </span>
                                                <Link
                                                    to={`/blog/${article.slug}`}
                                                    className="inline-flex items-center gap-1.5 font-poppins text-xs font-bold uppercase tracking-wider text-coffee group-hover:text-coffee transition-colors"
                                                >
                                                    <span>Read Guide</span>
                                                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5" />
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                        </div>

                        {/* Weekly Newsletter Section */}
                        <div
                            data-aos="fade-up"
                            className="rounded-[28px] border border-Primary/12 bg-[#DFDCD5] p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(22,22,22,0.06)]"
                        >
                            <span className="inline-flex items-center gap-2 rounded-full border border-coffee/20 bg-coffee/10 px-4 py-1.5 font-poppins text-xs font-bold uppercase text-coffee mb-4">
                                <FiBookOpen /> Weekly Engineering & Marketing Dispatch
                            </span>
                            <h3 className="font-soldier text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-Primary leading-tight">
                                Get Tactical Growth Insights <span className="text-coffee">Every Week</span>
                            </h3>
                            <p className="mt-3 font-poppins text-xs sm:text-base text-second/80 max-w-xl mx-auto leading-relaxed">
                                Join 2,000+ Indian founders and engineering leaders who receive our curated web architecture blueprints and ROI formulas.
                            </p>

                            {newsletterSubmitted ? (
                                <div className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-emerald-700/10 border border-emerald-600/30 px-6 py-3 font-poppins text-xs sm:text-sm font-semibold text-emerald-800">
                                    <FiCheckCircle className="text-emerald-600 text-lg" />
                                    <span>Thank you for subscribing! Check your inbox for our latest blueprint.</span>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleNewsletterSubmit}
                                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
                                >
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your business email"
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        className="w-full px-5 py-3.5 rounded-full border border-Primary/15 bg-white font-poppins text-xs sm:text-sm text-Primary placeholder:text-Primary/40 focus:outline-none focus:border-coffee focus:ring-2 focus:ring-coffee/20 shadow-inner"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto shrink-0 px-7 py-3.5 rounded-full bg-Primary text-brand font-poppins text-xs sm:text-sm font-semibold hover:bg-coffee hover:text-white transition-all cursor-pointer shadow-md"
                                    >
                                        Subscribe →
                                    </button>
                                </form>
                            )}

                            <p className="mt-4 font-poppins text-[11px] text-second/60">
                                Zero spam. One actionable digest every Wednesday. Unsubscribe in one click.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export { Blog };
export default Blog;
