import React from 'react'
import SeoHelmet from '../components/SeoHelmet'
import PageBanner from '../components/common/PageBanner'
import AboutText from '../components/About Me/AboutText'
import AboutCounters from '../components/About Me/AboutCounters'
import CoreValues from '../components/About Me/CoreValues'
import TeamSection from '../components/About Me/TeamSection'
import WhyUs from '../components/About Me/WhyUs'
import Review from '../components/About Me/Review'
import WorkTogetherCTA from '../components/About Me/WorkTogetherCTA'
import ExploreMyWork from '../components/common/ExploreMyWork'

const About = () => {
  return (
    <>
      <SeoHelmet
        title="About Fitscalez — Premier Web Development & Digital Growth Agency"
        description="Learn about Fitscalez, led by Founder Mr. Hariom Saini and Lead Web Developer Divyansh. Full-stack engineering, performance marketing, and digital transformation."
        canonical="/about"
      />
      <section className='pb-20'>
        <PageBanner
          id='AboutBanner'
          kicker='FITSCALEZ AGENCY'
          kickerMobile="About Fitscalez"
          title='ABOUT US'
          description='Architecting high-growth digital experiences, high-performance web platforms, and data-driven marketing campaigns.'
          scrollTarget='#AboutMeText'
        />
        <AboutText />
        <AboutCounters />
        <CoreValues />
        <TeamSection />
        <WhyUs />
        <Review />
        <WorkTogetherCTA />
        <div className='pt-[60px]'>
          <ExploreMyWork />
        </div>
      </section>
    </>
  )
}

export default About
