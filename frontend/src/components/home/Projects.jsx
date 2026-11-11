import React, { useEffect, useState } from 'react'
import ScrollFloat from '../effects/ScrollFloat'
import { FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { api } from '../../api'
import ProjectCard from '../Projects/ProjectCard'

const FALLBACK_PROJECTS = [
  {
    _id: 'walktheplan',
    title: 'Walk The Plan — 1:1 Blueprint Projection',
    type: 'Web Application',
    thumbnail: '/images/project-walktheplan.jpg',
    liveLink: 'https://walktheplan.in',
    githubRepo: '',
    description:
      "Groundbreaking web platform developed for India's 1:1 scale architectural projection experience center. Features online slot reservation, interactive space planning, and frictionless Razorpay payment integration.",
    technologies: ['React', 'Tailwind', 'Node.js', 'Razorpay'],
    scrollPreview: false,
  },
  {
    _id: 'houseofsymmetry',
    title: 'House of Symmetry — Architecture & Design',
    type: 'Luxury Portfolio',
    thumbnail: '/images/project-houseofsymmetry.jpg',
    liveLink: 'https://www.houseofsymmetry.in',
    githubRepo: '',
    description:
      'Bespoke digital presence crafted for an elite architectural studio. Immersive spatial portfolio, balanced visual geometry, and optimized high-ticket client inquiry funnels.',
    technologies: ['Figma', 'React', 'Tailwind', 'SEO'],
    scrollPreview: false,
  },
  {
    _id: 'fashionwave',
    title: 'FashionWave India — E-Commerce Platform',
    type: 'E-Commerce Platform',
    thumbnail:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    liveLink: 'https://walktheplan.in',
    githubRepo: '',
    description:
      'Full-stack MERN e-commerce engine with sub-second page loads, automated payment processing, real-time inventory management, and custom admin dashboard that doubled sales within 60 days.',
    technologies: ['React', 'Node.js', 'Razorpay', 'MongoDB', 'Redux'],
    scrollPreview: false,
  },
  {
    _id: 'medcare',
    title: 'MedCare Solutions — Healthcare & SEO Engine',
    type: 'Healthcare & SEO',
    thumbnail:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveLink: 'https://www.houseofsymmetry.in',
    githubRepo: '',
    description:
      'High-performance healthcare platform engineered for patient appointment scheduling, tele-consultation funnels, and data-driven SEO that achieved a 400% surge in organic patient inquiries.',
    technologies: ['React', 'Node.js', 'SEO', 'Tailwind'],
    scrollPreview: false,
  },
]

const Projects = () => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)

  useEffect(() => {
    let active = true

    const fetchFeaturedProjects = async () => {
      // In local dev without configured remote API URL, use the rich curated FALLBACK_PROJECTS directly
      if (!import.meta.env.VITE_API_URL && window.location.hostname === "localhost") {
        return;
      }

      try {
        const res = await api.get('/projects/featured', {
          params: { limit: 10 },
        })
        const data = res?.data?.data || res?.data || []
        if (active && Array.isArray(data) && data.length > 0) {
          // If server returns projects, filter out any self-referencing Fitscalez card
          const filtered = data.filter(
            (p) => !p.title?.toLowerCase().includes('fitscalez')
          )
          if (filtered.length > 0) {
            setProjects(filtered)
          }
        }
      } catch {
        // Fallback remains active
      }
    }

    fetchFeaturedProjects()

    return () => {
      active = false
    }
  }, [])

  return (
    <section id="Projects" className="my-24 lg:my-32 overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 border-y border-Primary/15 py-8 md:flex-row md:items-end lg:mb-20">
          <div>
            <div className="font-poppins text-Primary/70 font-semibold uppercase lg:text-base text-sm">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
              >
                FEATURED WORK
              </ScrollFloat>
            </div>
            <div className="font-soldier text-Primary font-semibold lg:text-[64px] text-[42px] leading-[0.9] uppercase lg:mt-5 mt-3">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=70%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
              >
                Selected Projects
              </ScrollFloat>
            </div>
          </div>
          <Link
            to="/projects"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-Primary/20 px-5 font-poppins text-sm font-semibold uppercase text-Primary transition hover:border-coffee hover:bg-coffee hover:text-brand"
          >
            <span>View all projects</span>
            <FiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ============= Projects ============ */}
        <div className="flex flex-col gap-10">
          {projects.map((items, i) => (
            <ProjectCard
              key={items._id || i}
              scrollPreview={items.scrollPreview}
              project={items}
              index={i}
            />
          ))}
        </div>

        {/* Explore More Projects Bottom CTA Button */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <Link
            to="/projects"
            className="group inline-flex min-h-13 items-center gap-3 rounded-full border border-Primary/25 bg-Primary px-8 py-4 font-poppins text-sm md:text-base font-semibold uppercase text-brand shadow-[0_12px_32px_rgba(22,22,22,0.18)] transition-all duration-300 hover:scale-105 hover:bg-coffee hover:border-coffee hover:shadow-[0_16px_40px_rgba(191,74,26,0.35)] active:scale-95"
          >
            <span>Explore More Projects</span>
            <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Projects
