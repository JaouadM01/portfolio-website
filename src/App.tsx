import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Education from './components/Education/Education'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  return (
    // LazyMotion + `m`-componenten houden de Motion-bundle klein; strict voorkomt per ongeluk `motion.*`.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a href="#main" className="skip-link">
          Direct naar de inhoud
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
