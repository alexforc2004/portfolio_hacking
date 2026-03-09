import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaCertificate, FaBriefcase, FaEnvelope, FaChevronLeft, FaChevronRight, FaDownload, FaShieldAlt } from 'react-icons/fa'

const navItems = [
  { id: 'home', name: 'Home', icon: <FaHome />, href: '#home' },
  { id: 'profile', name: 'Profile', icon: <FaUser />, href: '#home' },
  { id: 'skills', name: 'Skills', icon: <FaCode />, href: '#skills' },
  { id: 'projects', name: 'Projects', icon: <FaProjectDiagram />, href: '#projects' },
  { id: 'certificates', name: 'Certificates', icon: <FaCertificate />, href: '#certificates' },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: <FaShieldAlt />, href: '#cybersecurity' },
  { id: 'experience', name: 'Experience', icon: <FaBriefcase />, href: '#experience' },
  { id: 'contact', name: 'Contact', icon: <FaEnvelope />, href: '#contact' }
]

function Sidebar({ theme = 'cyber' }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  
  const primaryColor = theme === 'cyber' ? '#ff0033' : '#3b82f6'
  const secondaryColor = theme === 'cyber' ? '#990000' : '#06b6d4'

  const handleNavClick = (e, item) => {
    e.preventDefault()
    setActiveSection(item.id)
    const element = document.querySelector(item.href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = '/cv.pdf'
    link.download = 'Azzedine_Oubaid_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        background: 'rgba(10, 10, 10, 0.95)',
        borderRight: `2px solid ${theme === 'cyber' ? 'rgba(255, 0, 51, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
        borderRadius: '0 15px 15px 0',
        backdropFilter: 'blur(10px)',
        width: isExpanded ? '200px' : '60px',
        transition: 'width 0.3s ease'
      }}
    >
      {/* Navigation Items */}
      {navItems.map((item, index) => (
        <motion.a
          key={item.id}
          href={item.href}
          onClick={(e) => handleNavClick(e, item)}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '12px 15px',
            margin: '5px 0',
            width: '100%',
            color: activeSection === item.id ? primaryColor : '#888',
            textDecoration: 'none',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease',
            background: activeSection === item.id ? `${primaryColor}15` : 'transparent',
            borderLeft: activeSection === item.id ? `3px solid ${primaryColor}` : '3px solid transparent'
          }}
        >
          <span style={{ 
            minWidth: '24px', 
            display: 'flex', 
            justifyContent: 'center',
            textShadow: activeSection === item.id ? `0 0 10px ${primaryColor}` : 'none'
          }}>
            {item.icon}
          </span>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.name}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      ))}

      {/* Divider */}
      <div style={{
        width: '80%',
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
        margin: '15px 0'
      }} />

      {/* Download CV Button */}
      <motion.button
        onClick={handleDownloadCV}
        whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${primaryColor}50` }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          padding: '12px 15px',
          width: '100%',
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          border: 'none',
          color: '#fff',
          fontSize: '1.2rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{ minWidth: '24px', display: 'flex', justifyContent: 'center' }}>
          <FaDownload />
        </span>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                whiteSpace: 'nowrap'
              }}
            >
              Download CV
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <style>{`
        @media (max-width: 768px) {
          /* Hide sidebar on mobile */
        }
      `}</style>
    </motion.div>
  )
}

export default Sidebar
