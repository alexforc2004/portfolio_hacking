import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaShieldAlt, FaLock, FaEye, FaServer, FaUserSecret, FaNetworkWired } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const cyberSecurityTopics = [
  {
    title: 'Network Security',
    icon: <FaNetworkWired />,
    description: 'Protecting networks from unauthorized access and cyber attacks through firewalls, VPNs, and intrusion detection systems.',
    advantages: [
      'Prevents data breaches',
      'Blocks malicious traffic',
      'Ensures data confidentiality',
      'Maintains network integrity'
    ]
  },
  {
    title: 'Encryption & Cryptography',
    icon: <FaLock />,
    description: 'Converting sensitive data into unreadable format to protect it from unauthorized access and interception.',
    advantages: [
      'Secures data in transit',
      'Protects stored data',
      'Ensures authentication',
      'Prevents eavesdropping'
    ]
  },
  {
    title: 'Penetration Testing',
    icon: <FaUserSecret />,
    description: 'Authorized security testing to identify vulnerabilities before malicious actors can exploit them.',
    advantages: [
      'Finds security gaps',
      'Tests defenses',
      'Prevents attacks',
      'Improves security posture'
    ]
  },
  {
    title: 'Threat Analysis',
    icon: <FaEye />,
    description: 'Identifying, analyzing, and mitigating potential security threats and vulnerabilities in systems.',
    advantages: [
      'Early threat detection',
      'Risk assessment',
      'Incident prevention',
      'Informed decisions'
    ]
  },
  {
    title: 'Access Control',
    icon: <FaShieldAlt />,
    description: 'Managing user permissions and authentication to ensure only authorized users access sensitive resources.',
    advantages: [
      'Prevents unauthorized access',
      'Tracks user activities',
      'Enforces policies',
      'Protects assets'
    ]
  },
  {
    title: 'Security Audits',
    icon: <FaServer />,
    description: 'Comprehensive review of security systems and policies to ensure compliance and effectiveness.',
    advantages: [
      'Identifies weaknesses',
      'Ensures compliance',
      'Improves processes',
      'Reduces risk'
    ]
  }
]

function CyberSecurity() {
  const cardsRef = useRef([])

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.12,
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
    <section id="cybersecurity" style={{
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
          marginBottom: '30px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ff0033 0%, #ffffff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        CYBERSECURITY EXPERTISE
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          color: '#888',
          fontSize: '1.1rem',
          maxWidth: '800px',
          margin: '0 auto 80px',
          lineHeight: 1.8
        }}
      >
        With 4+ years of cybersecurity experience, I specialize in protecting digital assets, 
        identifying vulnerabilities, and implementing robust security solutions.
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {cyberSecurityTopics.map((topic, index) => (
          <motion.div
            key={index}
            ref={el => cardsRef.current[index] = el}
            whileHover={{ 
              y: -15,
              boxShadow: '0 0 50px rgba(255, 0, 51, 0.6)',
              borderColor: '#ff0033'
            }}
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
            {/* Background Gradient */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255, 0, 51, 0.05) 0%, transparent 100%)',
              pointerEvents: 'none'
            }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontSize: '3rem',
                color: '#ff0033',
                marginBottom: '20px',
                textShadow: '0 0 20px rgba(255, 0, 51, 0.5)'
              }}>
                {topic.icon}
              </div>

              <h3 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.5rem',
                color: '#ff0033',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                {topic.title}
              </h3>

              <p style={{
                color: '#888',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginBottom: '25px'
              }}>
                {topic.description}
              </p>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.9rem',
                  color: '#ff0033',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Key Advantages:
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0
                }}>
                  {topic.advantages.map((advantage, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      style={{
                        color: '#666',
                        fontSize: '0.9rem',
                        padding: '8px 0',
                        paddingLeft: '25px',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#ff0033',
                        fontWeight: 'bold'
                      }}>▸</span>
                      {advantage}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          marginTop: '100px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '100px auto 0'
        }}
      >
        {[
          { number: '4+', label: 'Years Experience' },
          { number: '50+', label: 'Security Audits' },
          { number: '100%', label: 'Threat Detection' },
          { number: '24/7', label: 'Monitoring' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            style={{
              textAlign: 'center',
              padding: '30px',
              background: 'rgba(255, 0, 51, 0.05)',
              border: '1px solid rgba(255, 0, 51, 0.3)',
              borderRadius: '10px'
            }}
          >
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '2.5rem',
              color: '#ff0033',
              marginBottom: '10px',
              fontWeight: 700
            }}>
              {stat.number}
            </div>
            <div style={{
              color: '#888',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default CyberSecurity
