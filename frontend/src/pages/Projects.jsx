import React from 'react'
import AllProjects from '../components/Projects/AllProjects'
import PageBanner from '../components/common/PageBanner'
import ProjectCtaSection from '../components/common/ProjectCtaSection'

const Projects = () => {
  return (
    <>
      <PageBanner
        id='ProjectsBanner'
        kicker='Featured Engineering'
        title='OUR PROJECTS'
        description='Explore our curated showcase of live production web applications, high-converting platforms, and scalable digital solutions.'
        descriptionWidth='lg:w-[500px]'
        scrollTarget='#AllProjects-Section'
        className='py-20'
      />
      <AllProjects />
      <ProjectCtaSection />
    </>
  )
}

export default Projects