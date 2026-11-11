import React, { useEffect, useMemo, useState } from 'react'
import { FiAlertCircle, FiGrid, FiLayers } from 'react-icons/fi'
import { api, categoryServices } from '../../api'
import ProjectCard from './ProjectCard'

const FALLBACK_CATEGORIES = [
    { _id: 'all', name: 'All Projects', totalProjects: 11 },
    { _id: 'web', name: 'Web Development', totalProjects: 5 },
    { _id: 'marketing', name: 'Digital Marketing', totalProjects: 2 },
    { _id: 'seo', name: 'SEO Optimization', totalProjects: 2 },
    { _id: 'video', name: 'Video Production', totalProjects: 1 },
    { _id: 'branding', name: 'Brand Identity', totalProjects: 1 },
]

const FALLBACK_PROJECTS = [
    {
        _id: 'p1',
        title: 'Walk The Plan — 1:1 Blueprint Projection',
        categoryId: 'web',
        categoryName: 'Web Development',
        type: 'Web Application',
        thumbnail: '/images/project-walktheplan.jpg',
        liveLink: 'https://walktheplan.in',
        githubRepo: '',
        description: "Groundbreaking web platform developed for India's 1:1 scale architectural projection experience center. Features online slot reservation, interactive space planning, and frictionless Razorpay payment integration.",
        technologies: ['React', 'Tailwind', 'Node.js', 'Razorpay'],
        scrollPreview: false,
    },
    {
        _id: 'p2',
        title: 'House of Symmetry — Architecture & Design',
        categoryId: 'web',
        categoryName: 'Web Development',
        type: 'Luxury Portfolio',
        thumbnail: '/images/project-houseofsymmetry.jpg',
        liveLink: 'https://www.houseofsymmetry.in',
        githubRepo: '',
        description: 'Bespoke digital presence crafted for an elite architectural studio. Immersive spatial portfolio, balanced visual geometry, and optimized high-ticket client inquiry funnels.',
        technologies: ['Figma', 'React', 'Tailwind', 'SEO'],
        scrollPreview: false,
    },
    {
        _id: 'p3',
        title: 'FashionWave E-Commerce Platform',
        categoryId: 'web',
        categoryName: 'Web Development',
        type: 'E-Commerce Platform',
        thumbnail:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        liveLink: 'https://walktheplan.in',
        githubRepo: '',
        description: 'Complete MERN Stack e-commerce platform for a fashion brand featuring 5,000+ SKU catalog, dynamic filtering, automated Razorpay checkout, and real-time inventory management that doubled sales in 60 days.',
        technologies: ['React', 'Node.js', 'Razorpay', 'MongoDB', 'Redux'],
        scrollPreview: false,
    },
    {
        _id: 'p4',
        title: 'EduPrime — Learning Management System (LMS)',
        categoryId: 'web',
        categoryName: 'Web Development',
        type: 'Education Portal',
        thumbnail:
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        liveLink: 'https://walktheplan.in',
        githubRepo: '',
        description: 'Full-featured enterprise LMS platform with video streaming lectures, student quizzes, automated certificate generation, payment gateway integration, and comprehensive teacher analytics.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
        scrollPreview: false,
    },
    {
        _id: 'p5',
        title: 'HealthFirst — Doctor Booking & Telemedicine App',
        categoryId: 'web',
        categoryName: 'Web Development',
        type: 'Healthcare Platform',
        thumbnail:
            'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
        liveLink: 'https://www.houseofsymmetry.in',
        githubRepo: '',
        description: 'Modern healthcare portal and mobile app enabling patients to search doctors, book live consultation slots, pay online, and securely access e-prescriptions with 99.9% uptime.',
        technologies: ['React', 'Node.js', 'Express', 'Tailwind', 'MongoDB'],
        scrollPreview: false,
    },
    {
        _id: 'p6',
        title: 'GreenLeaf Organics — Brand Growth Campaign',
        categoryId: 'marketing',
        categoryName: 'Digital Marketing',
        type: 'Social Media Growth',
        thumbnail:
            'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
        liveLink: 'https://fitscalez.com',
        githubRepo: '',
        description: 'Multi-platform organic social media strategy that grew Instagram following from 2K to 50K followers in 4 months, driving a 300% surge in brand engagement and customer acquisition.',
        technologies: ['Instagram', 'Facebook', 'Content Strategy', 'Canva'],
        scrollPreview: false,
    },
    {
        _id: 'p7',
        title: 'FinWise Advisors — High-ROI Lead Gen Campaign',
        categoryId: 'marketing',
        categoryName: 'Digital Marketing',
        type: 'Paid Ads (PPC)',
        thumbnail:
            'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1200&q=80',
        liveLink: 'https://fitscalez.com',
        githubRepo: '',
        description: 'High-intent Google Search and Meta Ads PPC campaigns for a financial wealth advisory firm that generated 500+ qualified leads per month at ₹120 cost-per-lead with 12x return on ad spend.',
        technologies: ['Google Ads', 'Meta Ads', 'PPC', 'Analytics'],
        scrollPreview: false,
    },
    {
        _id: 'p8',
        title: 'BuildRight Infra — Local SEO Domination',
        categoryId: 'seo',
        categoryName: 'SEO Optimization',
        type: 'Search Optimization',
        thumbnail:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        liveLink: 'https://fitscalez.com',
        githubRepo: '',
        description: 'Comprehensive technical and local SEO strategy that pushed BuildRight to the #1 Google ranking for 25+ high-intent commercial construction keywords in Delhi NCR, yielding a 400% organic traffic surge.',
        technologies: ['SEO', 'Local SEO', 'Link Building', 'Google Search Console'],
        scrollPreview: false,
    },
    {
        _id: 'p9',
        title: 'QuickShop Delhi — E-Commerce SEO Engine',
        categoryId: 'seo',
        categoryName: 'SEO Optimization',
        type: 'E-Commerce SEO',
        thumbnail:
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        liveLink: 'https://walktheplan.in',
        githubRepo: '',
        description: 'Programmatic e-commerce SEO optimization including category architecture, structured product schema markup, Core Web Vitals speed tuning, and high-authority backlinks that drove +350% search traffic.',
        technologies: ['E-Commerce SEO', 'Technical SEO', 'Schema Markup'],
        scrollPreview: false,
    },
    {
        _id: 'p10',
        title: 'MedCare Solutions — Corporate Brand Film',
        categoryId: 'video',
        categoryName: 'Video Production',
        type: 'Video Production',
        thumbnail:
            'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
        liveLink: 'https://fitscalez.com',
        githubRepo: '',
        description: 'Cinematic corporate brand video produced for MedCare Solutions showcasing facility healthcare excellence and patient trust stories, achieving 2M+ digital views and a 40% improvement in brand perception.',
        technologies: ['Video Production', 'Motion Graphics', 'Color Grading'],
        scrollPreview: false,
    },
    {
        _id: 'p11',
        title: 'AutoGuru India — Complete Visual Rebrand',
        categoryId: 'branding',
        categoryName: 'Brand Identity',
        type: 'Brand Identity',
        thumbnail:
            'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        liveLink: 'https://fitscalez.com',
        githubRepo: '',
        description: 'Full brand identity overhaul including modern vector logo suite, comprehensive brand style guidelines manual, packaging kit, website redesign, and high-impact social media assets that doubled brand recognition.',
        technologies: ['Logo Design', 'Brand Guidelines', 'Figma', 'UI/UX'],
        scrollPreview: false,
    },
]

const AllProjects = () => {
    const [categories, setCategories] = useState(FALLBACK_CATEGORIES)
    const [projects, setProjects] = useState(FALLBACK_PROJECTS)
    const [pagination, setPagination] = useState({ total: 11 })
    const [selected, setSelected] = useState('all')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        let active = true

        const fetchProjects = async () => {
            try {
                const [categoryRes, projectRes] = await Promise.allSettled([
                    categoryServices.getCategories(),
                    api.get(`/projects`, {
                        params: {
                            limit: 1000,
                            category: selected !== 'all' ? selected : undefined,
                        },
                    }),
                ])

                if (!active) return

                const categoryData = categoryRes.status === 'fulfilled' && (categoryRes.value?.data || categoryRes.value)
                const projectData = projectRes.status === 'fulfilled' && (projectRes.value?.data?.data?.projects || projectRes.value?.data?.projects)

                if (Array.isArray(categoryData) && categoryData.length > 0) {
                    setCategories(categoryData)
                }

                if (Array.isArray(projectData) && projectData.length > 0) {
                    const filtered = projectData.filter((p) => !p.title?.toLowerCase().includes('fitscalez'))
                    setProjects(filtered)
                    setPagination(projectRes.value?.data?.data?.pagination || { total: filtered.length })
                } else {
                    // Filter fallback projects by selected category if API is offline
                    if (selected === 'all') {
                        setProjects(FALLBACK_PROJECTS)
                    } else {
                        setProjects(FALLBACK_PROJECTS.filter((p) => p.categoryId === selected))
                    }
                    setPagination({ total: FALLBACK_PROJECTS.length })
                }
            } catch {
                if (!active) return
                if (selected === 'all') {
                    setProjects(FALLBACK_PROJECTS)
                } else {
                    setProjects(FALLBACK_PROJECTS.filter((p) => p.categoryId === selected))
                }
                setPagination({ total: FALLBACK_PROJECTS.length })
            } finally {
                if (active) setLoading(false)
            }
        }

        fetchProjects()

        return () => {
            active = false
        }
    }, [selected])

    const categoryButtons = useMemo(() => {
        return categories.map((category) => {
            const count =
                category._id === 'all'
                    ? FALLBACK_PROJECTS.length
                    : FALLBACK_PROJECTS.filter((p) => p.categoryId === category._id).length
            return {
                id: String(category._id),
                label: category.name,
                count: category.totalProjects || count,
                icon: <FiLayers aria-hidden="true" />,
            }
        })
    }, [categories])

    return (
        <section id='AllProjects-Section' className='mb-20 overflow-hidden'>
            <div id="Projects-Header-Row" className="max-w-7xl w-full mx-auto rounded-3xl border-0 md:border border-Primary/10 bg-transparent md:bg-[#f2f0e9]/70 p-0 md:p-8 md:shadow-[0_24px_70px_rgba(22,22,22,0.08)]">
                <div className="md:p-0 p-4 flex flex-col justify-between gap-6 md:gap-8 lg:flex-row lg:items-end">
                    <div>
                        <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-coffee/25 bg-coffee/10 px-3.5 py-1.5 md:px-4 md:py-2 font-poppins text-[11px] md:text-xs font-bold uppercase text-coffee">
                            <FiLayers aria-hidden="true" />
                            Portfolio archive
                        </span>
                        <h2 className='mt-3 md:mt-5 text-second font-soldier lg:text-[66px] md:text-[42px] text-3xl font-semibold uppercase tracking-tight' data-aos="fade-up">
                            Project & works
                        </h2>
                        <p className="mt-2 md:mt-5 max-w-2xl font-poppins text-xs md:text-base leading-relaxed text-Primary/70" data-aos="fade-up">
                            Browse 11 live production projects across Web Development, Digital Marketing, SEO, Video Production, and Brand Identity.
                        </p>
                    </div>

                    {/* Counter Stats Grid */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:flex" data-aos="fade-up">
                        <div className="rounded-2xl border border-Primary/10 bg-white/60 md:bg-white/45 p-3.5 md:px-5 md:py-4 backdrop-blur-sm">
                            <strong className="block font-soldier text-3xl md:text-4xl leading-none text-Primary">{pagination?.total || 11}</strong>
                            <span className="mt-1 block font-poppins text-[10px] md:text-xs font-semibold uppercase text-Primary/60">Projects</span>
                        </div>
                        <div className="rounded-2xl border border-Primary/10 bg-white/60 md:bg-white/45 p-3.5 md:px-5 md:py-4 backdrop-blur-sm">
                            <strong className="block font-soldier text-3xl md:text-4xl leading-none text-Primary">{categories.length - 1 || 5}</strong>
                            <span className="mt-1 block font-poppins text-[10px] md:text-xs font-semibold uppercase text-Primary/60">Categories</span>
                        </div>
                    </div>
                </div>

                <div data-aos="fade-up" className='relative mt-2 md:mt-8'>
                    {/* Fade Overlay */}
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-6 md:w-8 bg-gradient-to-r from-Primary via-Primary/60 to-transparent rounded-l-2xl" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-8 md:w-12 bg-gradient-to-l from-Primary via-Primary/80 to-transparent rounded-r-2xl" />

                    <div className="flex items-center gap-2 overflow-x-auto md:rounded-2xl rounded-lg border border-Primary/10 bg-Primary p-2" style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        {categoryButtons.map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => setSelected(btn.id)}
                                className={`shrink-0 py-2.5 px-3.5 md:py-3 md:px-4 duration-300 flex items-center gap-2 rounded-xl font-poppins text-xs font-bold cursor-pointer transition-all active:scale-95 ${selected === btn.id
                                    ? 'bg-coffee text-white shadow-lg shadow-coffee/25'
                                    : 'bg-brand/10 text-brand/75 hover:bg-brand/20 hover:text-brand'
                                    }`}
                            >
                                {btn.icon}
                                <span>{btn.label}</span>
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${selected === btn.id ? 'bg-white/20' : 'bg-black/15'}`}>
                                    {btn.count || 0}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container">
                {loading ? (
                    <div className="mt-[80px] flex flex-col items-center justify-center gap-4 py-10">
                        <div className="relative size-10">
                            <span className="absolute inset-0 rounded-full border-2 border-Primary/15"></span>
                            <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-coffee"></span>
                            <span className="absolute inset-[7px] animate-[spin_0.9s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-coffee/50"></span>
                        </div>
                        <p className="flex items-center gap-1 font-poppins text-xs font-semibold tracking-widest text-Primary/60 uppercase">
                            Loading projects
                            <span className="inline-flex gap-0.5">
                                <span className="size-1 animate-bounce rounded-full bg-coffee [animation-delay:-0.3s]"></span>
                                <span className="size-1 animate-bounce rounded-full bg-coffee [animation-delay:-0.15s]"></span>
                                <span className="size-1 animate-bounce rounded-full bg-coffee"></span>
                            </span>
                        </p>
                    </div>
                ) : error ? (
                    <div className="mt-[80px] flex flex-col items-center justify-center gap-3 py-10 text-center">
                        <span className="flex size-11 items-center justify-center rounded-full border border-red-500/20 text-red-500">
                            <FiAlertCircle className="text-xl" aria-hidden="true" />
                        </span>
                        <p className="font-poppins text-sm font-bold text-Primary">Something went wrong</p>
                        <p className="max-w-xs font-poppins text-xs text-Primary/60">{error}</p>
                    </div>
                ) : (
                    <div id='Projects-Cards-Row' className="mt-10">
                        <div className='mb-6 flex items-center gap-4'>
                            <span className="flex size-11 items-center justify-center rounded-full bg-Primary text-brand">
                                <FiGrid aria-hidden="true" />
                            </span>
                            <div className='h-px flex-1 bg-Primary/20'></div>
                            <span className="font-poppins text-xs font-semibold uppercase text-second/60">
                                Showing {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                            </span>
                        </div>
                        {projects.length > 0 ? (
                            <div className='flex flex-col md:gap-10 gap-6'>
                                {projects.map((project, index) => (
                                    <ProjectCard key={project._id || index} project={project} scrollPreview={project.scrollPreview} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[28px] border border-Primary/10 bg-white/50 p-8 font-poppins text-sm text-Primary/70 text-center">
                                No projects found in this category.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default AllProjects
