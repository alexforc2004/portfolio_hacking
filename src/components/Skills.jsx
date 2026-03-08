import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaCode, FaShieldAlt, FaServer, FaDatabase, FaGitAlt, FaDocker } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Frontend',
    icon: <FaCode />,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Framer Motion', 'GSAP', 'Three.js']
  },
  {
    title: 'Backend',
    icon: <FaServer />,
    skills: ['PHP', 'Laravel', 'Node.js', 'Python', 'C++']
  },
  {
    title: 'Database',
    icon: <FaDatabase />,
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase']
  },
  {
    title: 'Cybersecurity',
    icon: <FaShieldAlt />,
    skills: ['Network Security', 'Penetration Testing', 'Encryption', 'Threat Analysis', 'Security Audits']
  },
  {
    title: 'DevOps',
    icon: <FaDocker />,
    skills: ['Docker', 'Git', 'GitHub', 'GitLab', 'CI/CD', 'Linux']
  },
  {
    title: 'Other',
    icon: <FaGitAlt />,
    skills: ['OOP', 'REST APIs', 'Agile', 'Problem Solving', 'AI Basics']
  }
]

function Skills() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
          }
        }
      )
    })
  }, [])

  return (
    <section id="skills" ref={sectionRef} style={{
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
          background: 'linear-gradient(135deg, #ff0033 0%, #ffffff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        TECHNICAL SKILLS
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            ref={el => cardsRef.current[index] = el}
            whileHover={{ y: -10, boxShadow: '0 0 40px rgba(255, 0, 51, 0.6)' }}
            style={{
              background: 'rgba(17, 17, 17, 0.8)',
              border: '1px solid rgba(255, 0, 51, 0.3)',
              padding: '40px',
              borderRadius: '10px',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              transition: 'all 0.4s ease'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '25px'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: '#ff0033',
                textShadow: '0 0 20px rgba(255, 0, 51, 0.5)'
              }}>
                {category.icon}
              </div>
              <h3 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.5rem',
                color: '#ff0033',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                {category.title}
              </h3>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              {category.skills.map((skill, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.1, backgroundColor: '#ff0033', color: '#fff' }}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(255, 0, 51, 0.1)',
                    border: '1px solid rgba(255, 0, 51, 0.3)',
                    color: '#888',
                    borderRadius: '5px',
                    fontSize: '0.85rem',
                    fontFamily: 'Rajdhani, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills
