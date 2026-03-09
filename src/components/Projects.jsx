import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'OFPPT Notes',
    description: 'Educational platform for OFPPT students with course management, notes, and progress tracking',
    tech: ['React', 'Laravel', 'MySQL', 'Tailwind CSS'],
    link: 'https://ofppt-beta.vercel.app/',
    image: '/project-ofpptnotes.png'
  },
  {
    title: 'Mustapha Electro Services',
    description: 'Professional website for electrical services with booking system and portfolio',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://mustaphaelectroservices.com/',
    image: '/project-mustapha.png'
  },
  {
    title: 'Tech Store',
    description: 'E-commerce platform for tech products with advanced filtering and payment integration',
    tech: ['React', 'Firebase', 'Stripe', 'Redux'],
    link: 'https://tech-store-ashy.vercel.app/',
    image: '/project-techstore.png'
  },
  {
    title: 'PC Gamer Shop',
    description: 'Gaming PC marketplace with hardware specs, benchmarks, and custom build configurator',
    tech: ['React', 'Laravel', 'MySQL', 'Bootstrap'],
    link: 'https://pc-maroc.vercel.app/',
    image: '/project-pcgamer.png'
  },
  {
    title: 'Moroccan Hijab Shop',
    description: 'Fashion e-commerce store with product customization and social integration',
    tech: ['React', 'Shopify', 'Tailwind CSS', 'PayPal'],
    link: 'https://moroccan-hijab-shop.vercel.app/',
    image: '/project-hijab.png'
  },
  {
    title: 'Electro Services',
    description: 'Professional electrical services website with service booking and contact forms',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: '#',
    image: '/project-electro.svg',
    comingSoon: true
  }
]

function Projects({ theme = 'cyber' }) {
  const projectsRef = useRef([])
  
  const primaryColor = theme === 'cyber' ? '#ff0033' : '#3b82f6'
  const secondaryColor = theme === 'cyber' ? '#990000' : '#06b6d4'

  useEffect(() => {
    projectsRef.current.forEach((project, index) => {
      gsap.fromTo(project,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? -20 : 20 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: project,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
          }
        }
      )
    })
  }, [])

  return (
    <section id="projects" style={{
      minHeight: '100vh',
      padding: '100px 5%',
      position: 'relative',
      zIndex: 2
    }}>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '3.5rem',
          marginBottom: '80px',
          textAlign: 'center',
          background: `linear-gradient(135deg, ${primaryColor} 0%, #ffffff 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {theme === 'cyber' ? 'FEATURED PROJECTS' : 'MY PORTFOLIO'}
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            ref={el => projectsRef.current[index] = el}
            whileHover={{ y: -15 }}
            style={{
              background: 'rgba(17, 17, 17, 0.8)',
              border: theme === 'cyber' ? '1px solid rgba(255, 0, 51, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '10px',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              transition: 'all 0.4s ease'
            }}
          >
            {/* Project Image */}
            <div style={{
              width: '100%',
              height: '200px',
              background: 'linear-gradient(135deg, #1a0000 0%, #0a0000 100%)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <motion.img
                src={project.image}
                alt={project.title}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: theme === 'cyber' 
                  ? 'linear-gradient(135deg, rgba(255, 0, 51, 0.2) 0%, transparent 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, transparent 100%)'
              }} />
              {project.comingSoon && (
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  padding: '8px 16px',
                  background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                  color: '#fff',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  borderRadius: '4px',
                  boxShadow: theme === 'cyber' ? '0 0 20px rgba(255, 0, 51, 0.6)' : '0 0 20px rgba(59, 130, 246, 0.6)',
                  animation: 'pulse 2s infinite'
                }}>
                  Coming Soon
                </div>
              )}
            </div>

            {/* Project Content */}
            <div style={{ padding: '30px' }}>
              <h3 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.5rem',
                color: primaryColor,
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {project.title}
              </h3>

              <p style={{
                color: '#888',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                {project.description}
              </p>

              {/* Tech Stack */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '20px'
              }}>
                {project.tech.map((tech, i) => (
                  <span key={i} style={{
                    padding: '5px 12px',
                    background: theme === 'cyber' ? 'rgba(255, 0, 51, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    border: theme === 'cyber' ? '1px solid rgba(255, 0, 51, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)',
                    color: primaryColor,
                    fontSize: '0.75rem',
                    borderRadius: '3px',
                    fontFamily: 'Share Tech Mono, monospace'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{
                display: 'flex',
                gap: '15px'
              }}>
                {!project.comingSoon && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, boxShadow: theme === 'cyber' ? '0 0 20px rgba(255, 0, 51, 0.5)' : '0 0 20px rgba(59, 130, 246, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontFamily: 'Orbitron, sans-serif',
                      fontWeight: 600,
                      borderRadius: '5px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <FaExternalLinkAlt /> View Demo
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Projects

// Add pulse animation for Coming Soon badge
const style = document.createElement('style')
style.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
`
if (typeof document !== 'undefined') {
  document.head.appendChild(style)
}
