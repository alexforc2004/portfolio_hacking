import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Cybersecurity', href: '#cybersecurity' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
]

function Navbar({ theme = 'cyber' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  
  const primaryColor = theme === 'cyber' ? '#ff0033' : '#3b82f6'
  const secondaryColor = theme === 'cyber' ? '#ff3355' : '#06b6d4'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => setMobileOpen(false)

  return (
    <>
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
          padding: '15px 5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
          borderBottom: scrolled ? `1px solid ${theme === 'cyber' ? 'rgba(255, 0, 51, 0.3)' : 'rgba(59, 130, 246, 0.3)'}` : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="nav-logo"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 800,
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer'
          }}
        >
          {theme === 'cyber' ? 'AZZEDINE.DEV' : 'AZZEDINE.DEV'}
        </motion.div>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{
          display: 'flex',
          gap: '30px'
        }}>
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                color: primaryColor,
                textShadow: `0 0 20px ${theme === 'cyber' ? 'rgba(255, 0, 51, 0.8)' : 'rgba(59, 130, 246, 0.8)'}`
              }}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '1px',
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
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: primaryColor,
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: '300px',
              height: '100vh',
              background: 'rgba(10, 10, 10, 0.98)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              padding: '80px 30px 30px',
              borderLeft: `2px solid ${theme === 'cyber' ? 'rgba(255, 0, 51, 0.5)' : 'rgba(59, 130, 246, 0.5)'}`
            }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '15px 0',
                  borderBottom: `1px solid ${theme === 'cyber' ? 'rgba(255, 0, 51, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
                  transition: 'all 0.3s ease'
                }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 998
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (max-width: 480px) {
          .nav-logo { font-size: 1.2rem !important; }
        }
        @media (max-width: 360px) {
          .nav-logo { font-size: 1rem !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar
