import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Cybersecurity', href: '#cybersecurity' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '20px 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255, 0, 51, 0.3)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '1.8rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #ff0033 0%, #ff3355 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          cursor: 'pointer',
          textShadow: '0 0 30px rgba(255, 0, 51, 0.5)'
        }}
      >
        AZZEDINE.DEV
      </motion.div>

      {/* Desktop Menu */}
      <div style={{
        display: 'flex',
        gap: '40px',
        '@media (max-width: 768px)': { display: 'none' }
      }} className="desktop-menu">
        {navLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              color: '#ff0033',
              textShadow: '0 0 20px rgba(255, 0, 51, 0.8)'
            }}
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 500,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease'
            }}
          >
            {link.name}
          </motion.a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: 'none',
          background: 'transparent',
          border: 'none',
          color: '#ff0033',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}
        className="mobile-menu-btn"
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </motion.button>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  )
}

export default Navbar
