import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaBriefcase, FaGraduationCap, FaAward, FaRocket } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    category: 'Cybersecurity',
    icon: <FaAward />,
    years: '4+ Years',
    items: [
      'Network Security & Firewalls',
      'Penetration Testing',
      'Threat Analysis & Mitigation',
      'Security Audits & Compliance',
      'Encryption & Cryptography',
      'Incident Response'
    ]
  },
  {
    category: 'IT & Infrastructure',
    icon: <FaBriefcase />,
    years: '2+ Years',
    items: [
      'System Administration',
      'Linux & Windows Servers',
      'Cloud Infrastructure',
      'Database Management',
      'Network Configuration',
      'IT Support & Troubleshooting'
    ]
  },
  {
    category: 'Full Stack Development',
    icon: <FaRocket />,
    years: 'Self-Taught',
    items: [
      'Frontend: React, Vue, Angular',
      'Backend: Node.js, Laravel, PHP',
      'Databases: MySQL, MongoDB',
      'DevOps: Docker, Git, CI/CD',
      'API Development & Integration',
      '10+ Production Projects'
    ]
  },
  {
    category: 'Education',
    icon: <FaGraduationCap />,
    years: 'Bac Sc Num',
    items: [
      'Bachelor in Digital Sciences',
      'Advanced Programming',
      'Network Fundamentals',
      'Database Design',
      'Web Technologies',
      'Security Principles'
    ]
  }
]

function Experience() {
  const cardsRef = useRef([])

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.15,
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
    <section id="experience" style={{
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
        EXPERIENCE & EDUCATION
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {experiences.map((exp, index) => (
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
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Border Animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #ff0033, #990000)',
                transformOrigin: 'left'
              }}
            />

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
                {exp.icon}
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.4rem',
                  color: '#ff0033',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: 0
                }}>
                  {exp.category}
                </h3>
                <p style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  margin: '5px 0 0 0'
                }}>
                  {exp.years}
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {exp.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#888',
                    fontSize: '0.95rem'
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    background: '#ff0033',
                    borderRadius: '50%',
                    flexShrink: 0
                  }} />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience
