import React from 'react'
import { Link } from 'react-router-dom'
import Magnet from '../effects/Magnet'
import ScrollReveal from '../effects/ScrollReveal'

const AboutText = () => {
  return (
    <>
    <div id='AboutMeText' className='overflow-hidden mt-[112px]'>
        <div className="container">
            <div id="AboutTextRow" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div id='Text' className='lg:col-span-7 flex flex-col gap-7'>
                    <h2 data-aos="fade-right" className='lg:text-6xl text-5xl text-Primary font-soldier'>Who We Are</h2>
                    <ScrollReveal containerClassName='lg:text-[24px] text-second font-poppins font-normal leading-[150%]'>
                        We are <span className='text-coffee font-medium'>Fitscalez,</span> a forward-thinking <span className='text-coffee font-medium'>Full-Stack Development & Digital Growth Agency</span> that crafts production-level platforms, enterprise web applications, and ROI-driven marketing ecosystems. We transform ambitious business goals into scalable digital <span className='text-coffee font-medium'>experiences</span> that dominate search rankings and turn visitors into loyal customers.
                    </ScrollReveal>
                    <ScrollReveal containerClassName='lg:text-[24px] text-second font-poppins font-normal leading-[150%]'>
                        Founded by <span className='text-coffee font-medium'>Mr. Hariom Saini</span> and powered by senior engineering leads including <span className='text-coffee font-medium'>Divyansh</span> (Lead Web Developer), our multidisciplinary team unites cutting-edge MERN stack engineering with rigorous SEO and performance marketing to deliver measurable business scaling across India and globally.
                    </ScrollReveal>
                    {/* -----------Explore Work----------- */}
                    <div className="pt-4">
                        <Magnet padding={5} magnetStrength={30}>
                            <Link to={'/projects'} className='hover-brown transition-trigger relative w-[180px] h-[180px] rounded-full border-1 border-coffee flex items-center justify-center rotate-[-25deg] cursor-pointer hover:rotate-0 hover:bg-coffee duration-[.3s] group'>
                                <span className='absolute top-[-15px] left-0 w-full h-[180px] rotate-[-85deg] group-hover:rotate-0 group-hover:top-0 duration-[.3s] rounded-full border-1 border-coffee'></span>
                                <p className='text-3xl text-second text-center font-soldier group-hover:text-brand duration-[.3s]'>Explore <br /> Our Work</p>
                            </Link>
                        </Magnet>
                    </div>
                </div>

                {/* Right Side - Agency Impact Stats & Pillars */}
                <div className='lg:col-span-5 flex flex-col gap-5' data-aos="fade-left">
                    <div className="rounded-[24px] border border-Primary/12 bg-[#DFDCD5] p-7 shadow-[0_20px_50px_rgba(22,22,22,0.08)]">
                        <span className="font-poppins text-xs font-bold tracking-widest text-coffee uppercase">Track Record</span>
                        <h3 className="mt-2 font-soldier text-3xl font-bold uppercase text-Primary">Proven Impact</h3>
                        <p className="mt-2 font-poppins text-xs leading-relaxed text-second/70">
                            Numbers that demonstrate our commitment to speed, code excellence, and measurable bottom-line growth.
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="rounded-xl border border-Primary/10 bg-brand/90 p-4">
                                <strong className="font-soldier text-4xl font-bold text-coffee leading-none">3+ Yrs</strong>
                                <span className="mt-1 block font-poppins text-[11px] font-semibold uppercase text-second/70">In Business</span>
                            </div>
                            <div className="rounded-xl border border-Primary/10 bg-brand/90 p-4">
                                <strong className="font-soldier text-4xl font-bold text-coffee leading-none">80+</strong>
                                <span className="mt-1 block font-poppins text-[11px] font-semibold uppercase text-second/70">Happy Clients</span>
                            </div>
                            <div className="rounded-xl border border-Primary/10 bg-brand/90 p-4">
                                <strong className="font-soldier text-4xl font-bold text-coffee leading-none">150+</strong>
                                <span className="mt-1 block font-poppins text-[11px] font-semibold uppercase text-second/70">Projects Completed</span>
                            </div>
                            <div className="rounded-xl border border-Primary/10 bg-brand/90 p-4">
                                <strong className="font-soldier text-4xl font-bold text-coffee leading-none">5★</strong>
                                <span className="mt-1 block font-poppins text-[11px] font-semibold uppercase text-second/70">Average Rating</span>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-2.5 pt-6 border-t border-Primary/10 font-poppins text-xs">
                            <div className="flex items-center gap-2 text-second">
                                <span className="size-1.5 rounded-full bg-coffee" />
                                <span>MERN Full-Stack Enterprise Engineering</span>
                            </div>
                            <div className="flex items-center gap-2 text-second">
                                <span className="size-1.5 rounded-full bg-coffee" />
                                <span>High-Converting Precision Funnels</span>
                            </div>
                            <div className="flex items-center gap-2 text-second">
                                <span className="size-1.5 rounded-full bg-coffee" />
                                <span>Targeted Organic Search Domination</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AboutText