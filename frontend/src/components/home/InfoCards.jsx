import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineApi } from 'react-icons/ai'
import { SlGlobe } from 'react-icons/sl'
import { FaFigma, FaChartBar } from 'react-icons/fa'
import { MdManageHistory } from 'react-icons/md'
import { TbDeviceMobileCode } from 'react-icons/tb'
import { FiArrowUpRight, FiCheckCircle } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnet from '../effects/Magnet'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'MERN Stack Web Development',
    label: 'Full-Stack Platforms',
    icon: SlGlobe,
    theme: 'dark',
    description:
      'We engineer production-grade web applications using MongoDB, Express.js, React.js and Node.js. Scalable, secure, and built for heavy concurrent traffic.',
    points: ['React.js & Node.js Architecture', 'Custom RESTful APIs & JWT Auth', 'Production-Grade Cloud Scaling'],
  },
  {
    number: '02',
    title: 'Social Media Marketing',
    label: 'Audience & Conversion',
    icon: TbDeviceMobileCode,
    theme: 'light',
    description:
      'Create, Connect, Convert — our strategic social media approach builds genuine brand authority and turns casual followers into loyal paying customers.',
    points: ['Content Strategy & Publishing', 'Community & Inbound Engagement', 'Instagram, LinkedIn & Meta Growth'],
  },
  {
    number: '03',
    title: 'SEO & Search Rankings',
    label: 'Organic Domination',
    icon: MdManageHistory,
    theme: 'dark',
    description:
      'Rank #1 on Google with proven data-driven SEO. Comprehensive keyword research, technical tuning, and high-authority link acquisition.',
    points: ['On-Page & Core Technical SEO', 'High-Authority Backlink Acquisition', 'Transparent Monthly Analytics & ROI'],
  },
  {
    number: '04',
    title: 'Paid Ads & PPC Funnels',
    label: 'High-ROI Advertising',
    icon: AiOutlineApi,
    theme: 'light',
    description:
      'Laser-targeted advertising campaigns across Google Ads, Meta (Instagram/Facebook), and LinkedIn. Every rupee invested is optimized for maximum conversions.',
    points: ['Google Search & Shopping Ads', 'Meta Laser-Targeted Retargeting', 'Continuous A/B Creative Testing'],
  },
  {
    number: '05',
    title: 'Video Production & Editing',
    label: 'Cinematic Storytelling',
    icon: FaFigma,
    theme: 'dark',
    description:
      'Turning moments into masterpieces. Professional video editing and cinematic motion graphics that blend storytelling with high-impact brand visuals.',
    points: ['Commercial Brand Video Production', 'High-Retention Reels & YouTube Shorts', 'Cinematic Color Grading & Motion'],
  },
  {
    number: '06',
    title: 'Business Growth Strategy',
    label: 'Data-Driven Intelligence',
    icon: FaChartBar,
    theme: 'light',
    description:
      'Data-driven market research, competitor gap intelligence, and automated marketing workflows that uncover untapped opportunities and scale revenue.',
    points: ['Competitive Intelligence & Gaps', 'GTM Planning & Growth Frameworks', 'Marketing & CRM Funnel Automation'],
  },
]

const InfoCards = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('#ScrollCards .card')
    if (!cards || cards.length === 0) return

    const ctx = gsap.context(() => {
      Array.from(cards).forEach((card, index) => {
        const offsetTop = 20 + index * 20
        card.style.top = `${offsetTop}px`

        if (index === cards.length - 1) return

        const cardInner = card.querySelector('.card__inner')
        const nextCard = cards[index + 1]

        if (cardInner && nextCard) {
          gsap.to(cardInner, {
            scale: 0.95 - (cards.length - 1 - index) * 0.02,
            opacity: 0.82,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
            },
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="ScrollCards" className="relative">
      <div className="cards">
        {services.map((service, index) => {
          const Icon = service.icon
          const isDark = service.theme === 'dark'

          return (
            <div className="card sticky" data-index={index} key={service.number}>
              <div
                className={`card__inner info-card info-card--${service.theme}`}
                id={isDark ? 'ServicesBG' : undefined}
              >
                <div className="card__content info-card__content">
                  <div className="info-card__top">
                    <span className="info-card__label">{service.label}</span>
                    <span className="info-card__number">{service.number}</span>
                  </div>

                  <div className="info-card__heading">
                    <span className="info-card__icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <h3 className="card__title info-card__title font-soldier uppercase">
                      {service.title}
                    </h3>
                  </div>

                  <p className="card__description info-card__description">
                    {service.description}
                  </p>

                  <div className="info-card__footer">
                    <ul className="info-card__points">
                      {service.points.map((point) => (
                        <li key={point}>
                          <FiCheckCircle className="text-coffee" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <Magnet magnetStrength={4} padding={20}>
                      <div className="magnetic-btn">
                        <Link
                          to="/services"
                          className="info-card__link transition-trigger font-poppins font-semibold hover-this"
                          aria-label={`View services for ${service.title}`}
                        >
                          <span>Explore services</span>
                          <FiArrowUpRight aria-hidden="true" />
                        </Link>
                      </div>
                    </Magnet>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default InfoCards
