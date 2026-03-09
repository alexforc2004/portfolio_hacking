import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaCertificate, FaNetworkWired, FaJs, FaPython, FaShieldAlt, FaLaptopCode, FaGraduationCap } from 'react-icons/fa'
import { SiCisco, SiUdemy } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const netacadCertificates = [
  {
    title: 'Networking Essentials',
    icon: <FaNetworkWired />,
    provider: 'Cisco NetAcad',
    providerIcon: <SiCisco />,
    description: 'Comprehensive networking fundamentals including TCP/IP, routing, switching, and network security basics.',
    skills: ['TCP/IP', 'Routing', 'Switching', 'Network Security']
  },
  {
    title: 'JavaScript Essentials',
    icon: <FaJs />,
    provider: 'Cisco NetAcad',
    providerIcon: <SiCisco />,
    description: 'Modern JavaScript programming including ES6+, DOM manipulation, and asynchronous programming.',
    skills: ['ES6+', 'DOM', 'Async/Await', 'APIs']
  },
  {
    title: 'Python Essentials',
    icon: <FaPython />,
    provider: 'Cisco NetAcad',
    providerIcon: <SiCisco />,
    description: 'Python programming fundamentals, data structures, and object-oriented programming concepts.',
    skills: ['Python 3', 'OOP', 'Data Structures', 'Automation']
  },
  {
    title: 'Cybersecurity Essentials',
    icon: <FaShieldAlt />,
    provider: 'Cisco NetAcad',
    providerIcon: <SiCisco />,
    description: 'Core cybersecurity concepts including threat analysis, cryptography, and security operations.',
    skills: ['Threat Analysis', 'Cryptography', 'Security Ops', 'Risk Management']
  }
]

const udemyCourses = [
  {
    title: 'Complete Cyber Security Course',
    icon: <FaShieldAlt />,
    provider: 'Udemy',
    providerIcon: <SiUdemy />,
    description: 'Advanced cybersecurity training covering penetration testing, ethical hacking, and security tools.',
    skills: ['Penetration Testing', 'Ethical Hacking', 'Security Tools', 'Vulnerability Assessment']
  },
  {
    title: 'IT Fundamentals',
    icon: <FaLaptopCode />,
    provider: 'Udemy',
    providerIcon: <SiUdemy />,
    description: 'Comprehensive IT support and administration including hardware, software, and troubleshooting.',
    skills: ['Hardware', 'Software', 'Troubleshooting', 'System Admin']
  },
  {
    title: 'JavaScript Mastery',
    icon: <FaJs />,
    provider: 'Udemy',
    providerIcon: <SiUdemy />,
    description: 'Advanced JavaScript including React, Node.js, and full-stack development techniques.',
    skills: ['React', 'Node.js', 'Full-Stack', 'REST APIs']
  },
  {
    title: 'Programming Languages',
    icon: <FaGraduationCap />,
    provider: 'Udemy',
    providerIcon: <SiUdemy />,
    description: 'Multi-language programming covering Python, Java, C++, and modern development practices.',
    skills: ['Python', 'Java', 'C++', 'Best Practices']
  }
]

function Certificates({ theme = 'cyber' }) {
  const cardsRef = useRef([])
  
  const primaryColor = theme === 'cyber' ? '#ff0033' : '#3b82f6'
  const secondaryColor = theme === 'cyber' ? '#990000' : '#06b6d4'

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1
            }
          }
        )
      }
    })
  }, [])

  const CertificateCard = ({ cert, index, isNetacad }) => (
    <motion.div
      ref={el => cardsRef.current[index] = el}
      whileHover={{ 
        y: -10,
        boxShadow: theme === 'cyber' ? '0 0 40px rgba(255, 0, 51, 0.5)' : '0 0 40px rgba(59, 130, 246, 0.5)',
        borderColor: primaryColor
      }}
      style={{
        background: 'rgba(17, 17, 17, 0.9)',
        border: theme === 'cyber' ? '1px solid rgba(255, 0, 51, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)',
        padding: '30px',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        transition: 'all 0.4s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Provider Badge */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px',
        background: isNetacad ? 'rgba(0, 156, 222, 0.2)' : 'rgba(165, 82, 204, 0.2)',
        borderRadius: '20px',
        fontSize: '0.75rem',
        color: isNetacad ? '#009CDE' : '#A435F0'
      }}>
        {cert.providerIcon}
        <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}>
          {cert.provider}
        </span>
      </div>

      {/* Icon */}
      <div style={{
        fontSize: '2.5rem',
        color: primaryColor,
        marginBottom: '20px',
        textShadow: theme === 'cyber' ? '0 0 15px rgba(255, 0, 51, 0.5)' : '0 0 15px rgba(59, 130, 246, 0.5)'
      }}>
        {cert.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '1.2rem',
        color: '#fff',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        {cert.title}
      </h3>

      {/* Description */}
      <p style={{
        color: '#888',
        fontSize: '0.9rem',
        lineHeight: 1.6,
        marginBottom: '20px'
      }}>
        {cert.description}
      </p>

      {/* Skills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {cert.skills.map((skill, i) => (
          <span key={i} style={{
            padding: '5px 12px',
            background: theme === 'cyber' ? 'rgba(255, 0, 51, 0.1)' : 'rgba(59, 130, 246, 0.1)',
            border: theme === 'cyber' ? '1px solid rgba(255, 0, 51, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)',
            color: primaryColor,
            fontSize: '0.7rem',
            borderRadius: '4px',
            fontFamily: 'Share Tech Mono, monospace'
          }}>
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )

  return (
    <section id="certificates" style={{
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
          background: `linear-gradient(135deg, ${primaryColor} 0%, #ffffff 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        CERTIFICATES & COURSES
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
          margin: '0 auto 60px',
          lineHeight: 1.8
        }}
      >
        Professional certifications and courses from industry-leading platforms including Cisco NetAcad and Udemy.
      </motion.p>

      {/* NetAcad Certificates Section */}
      <div style={{ marginBottom: '80px' }}>
        <motion.h3
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.8rem',
            color: '#009CDE',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}
        >
          <SiCisco style={{ fontSize: '2rem' }} />
          Cisco NetAcad Certificates
        </motion.h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {netacadCertificates.map((cert, index) => (
            <CertificateCard key={index} cert={cert} index={index} isNetacad={true} />
          ))}
        </div>
      </div>

      {/* Udemy Courses Section */}
      <div>
        <motion.h3
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.8rem',
            color: '#A435F0',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}
        >
          <SiUdemy style={{ fontSize: '2rem' }} />
          Udemy Courses
        </motion.h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {udemyCourses.map((cert, index) => (
            <CertificateCard key={index} cert={cert} index={index + netacadCertificates.length} isNetacad={false} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates
