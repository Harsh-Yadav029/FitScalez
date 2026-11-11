import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
    FiArrowLeft,
    FiClock,
    FiEye,
    FiCalendar,
    FiShare2,
    FiArrowRight,
    FiCheck,
    FiArrowUp,
    FiList,
    FiPhone,
    FiMessageCircle,
} from "react-icons/fi";
import SeoHelmet from "../components/SeoHelmet";
import { blogService } from "../services/api.service";
import { ArticleSkeleton } from "../components/LoadingSkeleton";
import articlesData from "../data/articles.json";

const getStaticPost = (slug) => {
    const staticArticle = articlesData.find((a) => a.slug === slug);
    if (!staticArticle) return { blog: null, related: [] };

    const blog = {
        _id: staticArticle.slug,
        slug: staticArticle.slug,
        title: staticArticle.title,
        description: staticArticle.metaDesc || staticArticle.summary,
        category: staticArticle.category,
        readTime: staticArticle.readTime || "6 min read",
        views: staticArticle.views || 420,
        createdAt: staticArticle.date || "Sep 2026",
        date: staticArticle.date || "Sep 2026",
        author: {
            name: staticArticle.author || "Divyansh",
            role: staticArticle.authorRole || "Lead Web Developer",
        },
        content: staticArticle.contentHtml || `<p>${staticArticle.summary}</p>`,
    };

    const related = articlesData
        .filter((a) => a.slug !== slug && a.category === staticArticle.category)
        .slice(0, 3)
        .map((r) => ({
            _id: r.slug,
            slug: r.slug,
            title: r.title,
            category: r.category,
            readTime: r.readTime || "5 min read",
            summary: r.summary || r.metaDesc,
        }));

    return { blog, related };
};

const BlogPost = () => {
    const { slug } = useParams();

    const initialData = getStaticPost(slug);
    const [blog, setBlog] = useState(initialData.blog);
    const [relatedBlogs, setRelatedBlogs] = useState(initialData.related);
    const [loading, setLoading] = useState(!initialData.blog);
    const [error, setError] = useState(initialData.blog ? "" : "Article not found");
    const [copied, setCopied] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("");
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const local = getStaticPost(slug);
        if (local.blog) {
            setBlog(local.blog);
            setRelatedBlogs(local.related);
            setLoading(false);
            setError("");
        }

        const fetchArticle = async () => {
            try {
                const res = await blogService.getBlogBySlug(slug);
                if (res.data?.blog) {
                    setBlog(res.data.blog);
                    setRelatedBlogs(res.data.relatedBlogs || local.related);
                    setLoading(false);
                    setError("");
                }
            } catch {
                if (!local.blog) {
                    setError("The requested article could not be loaded.");
                    setLoading(false);
                }
            }
        };

        fetchArticle();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [slug]);

    // Extract headings for Table of Contents
    const tableOfContents = useMemo(() => {
        if (!blog?.content) return [];
        // Regex to extract h2 tags with optional id and their text content
        const regex = /<h2(?:\s+id=["']([^"']*)["'])?[^>]*>(.*?)<\/h2>/gi;
        const items = [];
        let match;
        let index = 0;
        while ((match = regex.exec(blog.content)) !== null) {
            const rawId = match[1];
            const rawText = match[2].replace(/<[^>]*>/g, "").trim();
            const id =
                rawId ||
                `section-${index}-${rawText
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")}`;
            items.push({ id, text: rawText });
            index++;
        }
        return items;
    }, [blog?.content]);

    // Track scroll progress and active heading
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const windowHeight =
                document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${(totalScroll / windowHeight) * 100}`;
            setScrollProgress(Number(scroll) || 0);
            setShowBackToTop(totalScroll > 400);

            // Active section spy
            if (tableOfContents.length > 0) {
                const headingElements = tableOfContents
                    .map((item) => document.getElementById(item.id))
                    .filter(Boolean);

                const scrollPosition = window.scrollY + 160;

                for (let i = headingElements.length - 1; i >= 0; i--) {
                    const el = headingElements[i];
                    if (el && el.offsetTop <= scrollPosition) {
                        setActiveSection(el.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [tableOfContents]);

    const scrollToHeading = (id) => {
        const target = document.getElementById(id);
        if (target) {
            const yOffset = -90;
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
            setActiveSection(id);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    if (loading) {
        return (
            <div className="container py-32">
                <ArticleSkeleton />
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="container min-h-[60vh] py-32 flex flex-col items-center justify-center text-center">
                <div className="text-5xl mb-4">📄</div>
                <h2 className="font-soldier text-4xl font-bold uppercase text-Primary">
                    Article Not Found
                </h2>
                <p className="mt-2 font-poppins text-sm text-second/70 max-w-md">
                    The requested guide could not be located. It may have been relocated or updated.
                </p>
                <Link
                    to="/blog"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-Primary px-7 py-3 font-poppins text-xs font-semibold text-brand hover:bg-coffee transition-all"
                >
                    <FiArrowLeft /> Back to Knowledge Hub
                </Link>
            </div>
        );
    }

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.description,
        author: {
            "@type": "Person",
            name: blog.author?.name || "Divyansh",
        },
        publisher: {
            "@type": "Organization",
            name: "Fitscalez",
            logo: {
                "@type": "ImageObject",
                url: "https://fitscalez.com/images/logo.png",
            },
        },
        datePublished: blog.createdAt,
    };

    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(blog.title);

    return (
        <>
            <SeoHelmet
                title={`${blog.title} | Fitscalez Insights`}
                description={blog.description}
                canonical={`/blog/${blog.slug}`}
                schema={blogSchema}
            />

            {/* Top Fixed Reading Progress Bar */}
            <div
                className="fixed top-0 left-0 right-0 h-1 bg-Primary/10 z-[100] pointer-events-none"
                aria-hidden="true"
            >
                <div
                    className="h-full bg-gradient-to-r from-coffee via-[#D45D2B] to-[#F59E0B] transition-[width] duration-150 ease-out"
                    style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
                />
            </div>

            {/* Floating Back to Top & Reading Indicator */}
            {showBackToTop && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="flex items-center gap-2 rounded-full border border-Primary/15 bg-Primary/95 px-4 py-2.5 font-poppins text-xs font-bold text-brand shadow-xl backdrop-blur-md transition-all hover:bg-coffee hover:scale-105 active:scale-95 cursor-pointer"
                        title="Scroll to top"
                    >
                        <FiArrowUp />
                        <span>{Math.round(scrollProgress)}% read</span>
                    </button>
                </div>
            )}

            <article className="pt-28 pb-20 overflow-hidden">
                <div className="container max-w-7xl">
                    {/* Breadcrumbs Navigation */}
                    <div className="mb-8 flex items-center gap-2 font-poppins text-xs text-second/60">
                        <Link to="/" className="hover:text-coffee transition-colors">
                            Home
                        </Link>
                        <span>›</span>
                        <Link to="/blog" className="hover:text-coffee transition-colors">
                            Blog
                        </Link>
                        <span>›</span>
                        <span className="text-coffee font-semibold truncate max-w-xs sm:max-w-md">
                            {blog.category}
                        </span>
                    </div>

                    {/* Article Header Card */}
                    <header className="mb-12 border-b border-Primary/12 pb-10">
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-coffee/25 bg-coffee/10 px-3.5 py-1 font-poppins text-xs font-bold uppercase text-coffee">
                                {blog.category}
                            </span>
                            <span className="font-poppins text-xs text-second/60 flex items-center gap-1">
                                <FiClock className="text-coffee" /> {blog.readTime}
                            </span>
                            <span className="font-poppins text-xs text-second/60 flex items-center gap-1">
                                <FiEye className="text-coffee" /> {blog.views} views
                            </span>
                            <span className="font-poppins text-xs text-second/60 flex items-center gap-1">
                                <FiCalendar className="text-coffee" /> {blog.date}
                            </span>
                        </div>

                        <h1 className="font-soldier text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-Primary uppercase tracking-tight leading-[1.15]">
                            {blog.title}
                        </h1>

                        <p className="mt-5 font-poppins text-sm sm:text-base text-second/80 leading-relaxed max-w-3xl">
                            {blog.description}
                        </p>

                        {/* Author & Share Bar */}
                        <div className="mt-8 pt-6 border-t border-Primary/10 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5">
                                <div className="w-12 h-12 rounded-full bg-Primary text-brand font-bold flex items-center justify-center font-soldier text-2xl shadow-sm">
                                    D
                                </div>
                                <div>
                                    <strong className="block font-poppins text-sm font-semibold text-Primary">
                                        {blog.author?.name || "Divyansh"}
                                    </strong>
                                    <span className="block font-poppins text-xs text-second/60">
                                        {blog.author?.role || "Lead Web Developer"} • Fitscalez
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-Primary/15 bg-white/60 font-poppins text-xs font-semibold text-Primary hover:border-coffee hover:text-coffee transition-all cursor-pointer"
                                >
                                    {copied ? (
                                        <>
                                            <FiCheck className="text-emerald-600" />
                                            <span className="text-emerald-700">Link Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiShare2 />
                                            <span>Share Guide</span>
                                        </>
                                    )}
                                </button>
                                <Link
                                    to="/blog"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-Primary text-brand font-poppins text-xs font-semibold hover:bg-coffee transition-colors"
                                >
                                    <FiArrowLeft /> All Guides
                                </Link>
                            </div>
                        </div>
                    </header>

                    {/* Mobile Table of Contents Accordion */}
                    {tableOfContents.length > 0 && (
                        <div className="lg:hidden mb-10 rounded-2xl border border-coffee/20 bg-[#DFDCD5] p-5">
                            <details className="group">
                                <summary className="flex items-center justify-between font-poppins text-xs font-bold uppercase text-Primary cursor-pointer list-none">
                                    <span className="flex items-center gap-2">
                                        <FiList className="text-coffee text-base" /> Quick Navigation ({tableOfContents.length} Sections)
                                    </span>
                                    <span className="text-coffee text-xs transition-transform group-open:rotate-180">
                                        ▼
                                    </span>
                                </summary>
                                <nav className="mt-4 pt-3 border-t border-Primary/10 flex flex-col gap-2">
                                    {tableOfContents.map((item, idx) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => scrollToHeading(item.id)}
                                            className={`text-left font-poppins text-xs py-1 transition-colors ${
                                                activeSection === item.id
                                                    ? "text-coffee font-bold"
                                                    : "text-second/70 hover:text-Primary"
                                            }`}
                                        >
                                            {idx + 1}. {item.text}
                                        </button>
                                    ))}
                                </nav>
                            </details>
                        </div>
                    )}

                    {/* Main Two-Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                        {/* Article Content Column */}
                        <div className="lg:col-span-8">
                            <div
                                className="article-prose"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            {/* Author Signature & Bio Box */}
                            <div className="my-16 rounded-[24px] border border-Primary/15 bg-[#DFDCD5] p-8 md:p-10 shadow-[0_15px_40px_rgba(22,22,22,0.06)]">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-Primary text-brand font-bold flex items-center justify-center font-soldier text-3xl shrink-0 shadow-md">
                                        D
                                    </div>
                                    <div>
                                        <span className="font-poppins text-xs font-bold uppercase tracking-wider text-coffee block mb-1">
                                            ABOUT THE AUTHOR
                                        </span>
                                        <h4 className="font-soldier text-2xl font-bold uppercase text-Primary leading-tight">
                                            Divyansh — Lead Web Developer
                                        </h4>
                                        <p className="mt-2 font-poppins text-xs sm:text-sm text-second/80 leading-relaxed">
                                            Divyansh specializes in custom MERN stack platforms, high-performance web engineering, and enterprise conversion architecture at Fitscalez. Have questions about building your next platform?
                                        </p>
                                        <div className="mt-4 flex flex-wrap items-center gap-3">
                                            <Link
                                                to="/contact"
                                                className="inline-flex items-center gap-2 rounded-full bg-Primary px-5 py-2 font-poppins text-xs font-semibold text-brand hover:bg-coffee transition-colors"
                                            >
                                                <span>Consult With Divyansh</span>
                                                <FiArrowRight />
                                            </Link>
                                            <a
                                                href="tel:+919599433616"
                                                className="font-poppins text-xs font-bold text-coffee hover:underline"
                                            >
                                                Direct Line: +91 9599433616
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Desktop Sidebar: Table of Contents & Share */}
                        <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
                            {/* Table of Contents Card */}
                            {tableOfContents.length > 0 && (
                                <div className="rounded-[24px] border border-Primary/12 bg-[#DFDCD5] p-6 shadow-[0_15px_35px_rgba(22,22,22,0.05)]">
                                    <div className="flex items-center justify-between pb-3 border-b border-Primary/10 mb-4">
                                        <span className="flex items-center gap-2 font-soldier text-xl font-bold uppercase text-Primary">
                                            <FiList className="text-coffee" /> Table of Contents
                                        </span>
                                        <span className="font-poppins text-[11px] font-bold text-coffee bg-coffee/10 px-2.5 py-0.5 rounded-full">
                                            {tableOfContents.length} Sections
                                        </span>
                                    </div>

                                    <nav className="flex flex-col gap-1 max-h-[50vh] overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
                                        {tableOfContents.map((item, idx) => {
                                            const isActive = activeSection === item.id;
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => scrollToHeading(item.id)}
                                                    className={`text-left font-poppins text-xs py-2 px-3 rounded-xl transition-all flex items-start gap-2 cursor-pointer ${
                                                        isActive
                                                            ? "bg-coffee text-white font-bold shadow-md shadow-coffee/20 translate-x-1"
                                                            : "text-second/70 hover:bg-black/5 hover:text-Primary"
                                                    }`}
                                                >
                                                    <span className={`text-[10px] mt-0.5 font-mono ${isActive ? "text-white/80" : "text-second/40"}`}>
                                                        {String(idx + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className="line-clamp-2 leading-relaxed">
                                                        {item.text}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>
                            )}

                            {/* Quick Consultation Callout */}
                            <div className="rounded-[24px] border border-coffee/30 bg-gradient-to-br from-[#1C1A17] via-[#161616] to-[#121110] p-6 text-[#E5E3DC] shadow-lg">
                                <span className="font-poppins text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                                    NEED ENGINEERING EXPERTISE?
                                </span>
                                <h4 className="font-soldier text-2xl font-bold uppercase text-white mb-2 leading-snug">
                                    Build With Fitscalez
                                </h4>
                                <p className="font-poppins text-xs text-[#E5E3DC]/75 leading-relaxed mb-5">
                                    Discuss your next web project, e-commerce engine, or SEO roadmap directly with our core engineering team.
                                </p>
                                <div className="flex flex-col gap-2.5">
                                    <Link
                                        to="/contact"
                                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#BF4A1A] to-[#E06D3B] font-poppins text-xs font-semibold text-white shadow-md hover:scale-102 transition-all"
                                    >
                                        <span>Start Milestone Discovery</span>
                                        <FiArrowRight />
                                    </Link>
                                    <a
                                        href="https://wa.me/919599433616"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-white/20 bg-white/5 font-poppins text-xs font-medium text-[#E5E3DC] hover:bg-white/10 transition-all"
                                    >
                                        <FiMessageCircle className="text-emerald-400" />
                                        <span>WhatsApp Us Directly</span>
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Related Articles Section */}
                    {relatedBlogs.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-Primary/12">
                            <div className="mb-8 flex items-center justify-between">
                                <h3 className="font-soldier text-2xl sm:text-3xl font-bold uppercase text-Primary">
                                    Related {blog.category} Guides
                                </h3>
                                <Link
                                    to={`/blog?category=${encodeURIComponent(blog.category)}`}
                                    className="font-poppins text-xs font-bold uppercase text-coffee hover:underline"
                                >
                                    View All In {blog.category} →
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedBlogs.map((rel) => (
                                    <div
                                        key={rel._id}
                                        className="group rounded-2xl border border-Primary/12 bg-[#DFDCD5] p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:border-coffee/40 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div>
                                            <span className="font-poppins text-[10px] font-bold uppercase text-coffee block mb-2">
                                                {rel.category} • {rel.readTime}
                                            </span>
                                            <h5 className="font-soldier text-xl font-bold uppercase text-Primary group-hover:text-coffee transition-colors line-clamp-2 leading-snug">
                                                <Link to={`/blog/${rel.slug}`}>
                                                    {rel.title}
                                                </Link>
                                            </h5>
                                            {rel.summary && (
                                                <p className="mt-2 font-poppins text-xs text-second/70 line-clamp-2 leading-relaxed">
                                                    {rel.summary}
                                                </p>
                                            )}
                                        </div>
                                        <Link
                                            to={`/blog/${rel.slug}`}
                                            className="mt-5 pt-3 border-t border-Primary/10 inline-flex items-center gap-1.5 font-poppins text-xs font-bold text-coffee uppercase"
                                        >
                                            <span>Read Article</span>
                                            <FiArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </>
    );
};

export default BlogPost;
