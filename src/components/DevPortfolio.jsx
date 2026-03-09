import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaHome, FaUser, FaBriefcase, FaCode, FaGraduationCap, FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaReact, FaNodeJs, FaPython, FaDatabase, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaExternalLinkAlt, FaBars, FaTimes, FaCertificate } from 'react-icons/fa'
import { SiMongodb, SiTailwindcss, SiTypescript, SiLaravel } from 'react-icons/si'

function DevPortfolio({ theme }) {
  const [activeSection, setActiveSection] = useState('home')
  const [typedText, setTypedText] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const fullText = 'Web Developer'
  
  // Window resize detection
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024
  const isDesktop = windowWidth >= 1024
  
  // Typing animation
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        index = 0
      }
    }, 150)
    return () => clearInterval(interval)
  }, [])

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const skills = [
    { name: 'React', level: 80, icon: <FaReact /> },
    { name: 'JavaScript', level: 85, icon: <FaJs /> },
    { name: 'Node.js', level: 80, icon: <FaNodeJs /> },
    { name: 'Python', level: 75, icon: <FaPython /> },
    { name: 'Laravel', level: 80, icon: <SiLaravel /> },
    { name: 'MongoDB', level: 70, icon: <SiMongodb /> },
  ]

  const projects = [
    { name: 'OFPPT Notes', image: '/project-ofpptnotes.png', tech: ['React', 'Laravel', 'MySQL'], link: 'https://ofppt-beta.vercel.app/' },
    { name: 'Mustapha Electro', image: '/project-mustapha.png', tech: ['React', 'Node.js', 'MongoDB'], link: 'https://mustaphaelectroservices.com/' },
    { name: 'Tech Store', image: '/project-techstore.png', tech: ['React', 'Firebase', 'Stripe'], link: 'https://tech-store-ashy.vercel.app/' },
    { name: 'PC Gamer Shop', image: '/project-pcgamer.png', tech: ['React', 'Laravel', 'MySQL'], link: 'https://pc-maroc.vercel.app/' },
    { name: 'Moroccan Hijab Shop', image: '/project-hijab.png', tech: ['React', 'Shopify', 'Tailwind'], link: 'https://moroccan-hijab-shop.vercel.app/' },
    { name: 'Electro Services', image: '/project-electro.svg', tech: ['React', 'Node.js', 'Express'], link: '#' },
  ]

  const education = [
    { title: 'Full Stack Development', institution: 'OFPPT', year: '2023-2025', icon: '🎓' },
    { title: 'Auto Formations IT + Cyber Security', institution: 'Self Learning', year: '2019-2023', icon: '💻' },
  ]

  const certifications = [
    { title: 'Networking Certificate', icon: '🌐', source: 'NetAcad' },
    { title: 'JavaScript Certificate', icon: '📜', source: 'NetAcad' },
    { title: 'Python Certificate', icon: '🐍', source: 'NetAcad' },
    { title: 'Cybersecurity Certificate', icon: '🔒', source: 'NetAcad' },
    { title: 'Cyber IT Course', icon: '💻', source: 'Udemy' },
    { title: 'JavaScript Course', icon: '⚡', source: 'Udemy' },
    { title: 'Programming Languages', icon: '🖥️', source: 'Udemy' },
  ]

  const languages = [
    { name: 'Arabic', level: 100, code: 'AR' },
    { name: 'French', level: 40, code: 'FR' },
    { name: 'English', level: 60, code: 'EN' },
  ]

  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome /> },
    { id: 'about', label: 'About', icon: <FaUser /> },
    { id: 'skills', label: 'Skills', icon: <FaCode /> },
    { id: 'projects', label: 'Projects', icon: <FaBriefcase /> },
    { id: 'certificates', label: 'Certificates', icon: <FaCertificate /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope /> },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating particles background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              borderRadius: '50%',
              background: `rgba(6, 182, 212, ${Math.random() * 0.3 + 0.1})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: scrolled ? 'rgba(10, 10, 26, 0.95)' : 'rgba(20, 30, 50, 0.8)',
          backdropFilter: 'blur(20px)',
          padding: isMobile ? '12px 20px' : '15px 50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: 'none',
          borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
          zIndex: 100,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: isMobile ? '1.1rem' : '1.5rem',
            fontWeight: 700,
            color: '#06b6d4',
            cursor: 'pointer',
          }}
          onClick={() => {
            setActiveSection('home')
            document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          AZZEDINE<span style={{ color: '#06b6d4' }}>.DEV</span>
        </motion.div>

        {/* Mobile Menu Button */}
        {isMobile && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#06b6d4',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '5px',
            }}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        )}

        {/* Nav Links - Desktop */}
        <div style={{ 
          display: isMobile ? 'none' : 'flex', 
          gap: isTablet ? '5px' : '10px' 
        }}>
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id)
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileHover={{ scale: 1.05, background: 'rgba(6, 182, 212, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: isTablet ? '8px 12px' : '10px 20px',
                borderRadius: '25px',
                border: 'none',
                background: activeSection === item.id 
                  ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
                  : 'transparent',
                color: activeSection === item.id ? '#fff' : '#888',
                fontSize: isTablet ? '0.8rem' : '0.9rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: isTablet ? '4px' : '8px',
                transition: 'all 0.3s ease',
                fontFamily: 'Rajdhani, sans-serif',
              }}
            >
              {item.icon}
              {!isTablet && item.label}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobile && mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            background: 'rgba(10, 10, 26, 0.98)',
            backdropFilter: 'blur(20px)',
            padding: '20px',
            zIndex: 99,
            borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
          }}
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id)
                setMobileOpen(false)
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '100%',
                padding: '15px 20px',
                marginBottom: '10px',
                borderRadius: '15px',
                border: 'none',
                background: activeSection === item.id 
                  ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: activeSection === item.id ? '#fff' : '#888',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                fontFamily: 'Rajdhani, sans-serif',
              }}
            >
              {item.icon}
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Main Content */}
      <div style={{ 
        padding: isMobile ? '80px 15px 40px 15px' : isTablet ? '90px 30px 40px 30px' : '100px 60px 40px 60px', 
        maxWidth: '1400px', 
        margin: '0 auto' 
      }}>
        
        {/* Hero Section */}
        <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: isMobile ? '20px 10px' : '0' }}>
          {/* Profile Image with Glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              width: isMobile ? '150px' : '200px',
              height: isMobile ? '150px' : '200px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              padding: '4px',
              marginBottom: isMobile ? '20px' : '30px',
              boxShadow: '0 0 60px rgba(6, 182, 212, 0.5), 0 0 100px rgba(59, 130, 246, 0.3)',
            }}
          >
            <img
              src="/mypicture2.png"
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: isMobile ? '2rem' : isTablet ? '2.8rem' : '3.5rem',
              fontFamily: 'Orbitron, sans-serif',
              color: '#fff',
              marginBottom: '10px',
            }}
          >
            Hi, I'm <span style={{ color: '#06b6d4' }}>Azzedine</span>
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: isMobile ? '1.1rem' : '1.5rem',
              color: '#888',
              marginBottom: '20px',
              fontFamily: 'Rajdhani, sans-serif',
            }}
          >
            I'm a <span style={{ color: '#3b82f6' }}>{typedText}</span>
            <span style={{ animation: 'blink 1s infinite' }}>|</span>
          </motion.p>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              color: '#666',
              maxWidth: '600px',
              lineHeight: 1.8,
              marginBottom: isMobile ? '30px' : '40px',
              padding: isMobile ? '0 10px' : '0',
            }}
          >
            I create beautiful, responsive web experiences using modern technologies.
            Passionate about clean code and user-centered design.
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{ display: 'flex', gap: isMobile ? '10px' : '20px', flexDirection: isMobile ? 'column' : 'row', width: isMobile ? '100%' : 'auto', padding: isMobile ? '0 20px' : '0' }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: isMobile ? '12px 30px' : '15px 40px',
                borderRadius: '30px',
                border: 'none',
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                color: '#fff',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Rajdhani, sans-serif',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              View My Work
            </motion.button>
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.05, background: 'rgba(6, 182, 212, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: isMobile ? '12px 30px' : '15px 40px',
                borderRadius: '30px',
                border: '2px solid #06b6d4',
                background: 'transparent',
                color: '#06b6d4',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Rajdhani, sans-serif',
                textDecoration: 'none',
                textAlign: 'center',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Download CV
            </motion.a>
          </motion.div>
        </section>

        {/* FEATURED PROJECTS Section */}
        <section id="projects" style={{ paddingTop: isMobile ? '60px' : '100px', paddingBottom: isMobile ? '40px' : '60px' }}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '50px' }}
          >
            <h2 style={{ 
              fontSize: isMobile ? '1.8rem' : '2.5rem', 
              fontFamily: 'Orbitron, sans-serif',
              color: '#06b6d4',
              marginBottom: '10px'
            }}>
              FEATURED PROJECTS
            </h2>
            <p style={{ color: '#666', fontSize: isMobile ? '0.9rem' : '1rem' }}>Check out some of my recent work</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? '20px' : '30px' }}>
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)' }}
                style={{
                  background: 'rgba(20, 30, 50, 0.6)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ 
                  height: '180px', 
                  background: `url(${project.image}) center/cover no-repeat`,
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(10, 10, 26, 0.9))',
                  }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '10px', fontFamily: 'Orbitron, sans-serif' }}>
                    {project.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
                    {project.tech.map((t, j) => (
                      <span key={j} style={{ 
                        fontSize: '0.75rem', 
                        color: '#06b6d4', 
                        background: 'rgba(6, 182, 212, 0.1)', 
                        padding: '4px 10px', 
                        borderRadius: '15px' 
                      }}>{t}</span>
                    ))}
                  </div>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #06b6d4',
                      background: 'transparent',
                      color: '#06b6d4',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                    }}
                  >
                    <FaExternalLinkAlt /> View Demo
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills & Portfolio Section */}
        <section id="skills" style={{ minHeight: isMobile ? 'auto' : '100vh', paddingTop: isMobile ? '60px' : '100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '20px' : '40px' }}>
            
            {/* Skills Card */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(20, 30, 50, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: isMobile ? '20px' : '30px',
                padding: isMobile ? '25px' : '40px',
                border: '1px solid rgba(6, 182, 212, 0.2)',
              }}
            >
              <h2 style={{ color: '#fff', fontSize: isMobile ? '1.4rem' : '1.8rem', marginBottom: '10px', fontFamily: 'Orbitron, sans-serif' }}>
                My <span style={{ color: '#06b6d4' }}>Skills</span>
              </h2>
              <p style={{ color: '#666', marginBottom: isMobile ? '20px' : '30px', fontSize: isMobile ? '0.85rem' : '0.9rem' }}>
                I'm a passionate web developer with over 3 years of experience creating modern, responsive web applications.
              </p>
              
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '20px' : '30px' }}>
                {/* Skills illustration */}
                {!isMobile && (
                  <div style={{ width: '150px', height: '150px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaCode style={{ fontSize: '60px', color: '#06b6d4' }} />
                  </div>
                )}
                
                {/* Progress bars */}
                <div style={{ flex: 1 }}>
                  {skills.map((skill, i) => (
                    <div key={i} style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ color: '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#06b6d4' }}>{skill.icon}</span> {skill.name}
                        </span>
                        <span style={{ color: '#06b6d4' }}>{skill.level}%</span>
                      </div>
                      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                            borderRadius: '10px',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Portfolio Card */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(20, 30, 50, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                padding: '40px',
                border: '1px solid rgba(6, 182, 212, 0.2)',
              }}
            >
              <h2 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '10px', fontFamily: 'Orbitron, sans-serif' }}>
                My <span style={{ color: '#06b6d4' }}>Portfolio</span>
              </h2>
              <p style={{ color: '#666', marginBottom: '30px', fontSize: '0.9rem' }}>
                A collection of my recent projects
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ height: '80px', background: `linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FaBriefcase style={{ fontSize: '30px', color: '#06b6d4' }} />
                    </div>
                    <div style={{ padding: '10px' }}>
                      <p style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>{project.name}</p>
                      <div style={{ display: 'flex', gap: '5px', marginTop: '5px', flexWrap: 'wrap' }}>
                        {project.tech.map((t, j) => (
                          <span key={j} style={{ fontSize: '0.6rem', color: '#06b6d4', background: 'rgba(6, 182, 212, 0.1)', padding: '2px 6px', borderRadius: '10px' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" style={{ paddingTop: isMobile ? '60px' : '100px', paddingBottom: isMobile ? '40px' : '60px' }}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '50px' }}
          >
            <h2 style={{ 
              fontSize: isMobile ? '1.6rem' : '2.5rem', 
              fontFamily: 'Orbitron, sans-serif',
              color: '#06b6d4',
              marginBottom: '10px'
            }}>
              CERTIFICATES & COURSES
            </h2>
            <p style={{ color: '#666', fontSize: isMobile ? '0.9rem' : '1rem' }}>My professional certifications and completed courses</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '20px' : '30px' }}>
            {/* NetAcad Certificates */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(20, 30, 50, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: isMobile ? '15px' : '20px',
                padding: isMobile ? '20px' : '30px',
                border: '1px solid rgba(6, 182, 212, 0.2)',
              }}
            >
              <h3 style={{ color: '#06b6d4', fontSize: isMobile ? '1rem' : '1.3rem', marginBottom: isMobile ? '15px' : '20px', fontFamily: 'Orbitron, sans-serif' }}>
                🎓 NetAcad Certificates
              </h3>
              {certifications.filter(c => c.source === 'NetAcad').map((cert, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  style={{ 
                    marginBottom: isMobile ? '10px' : '15px', 
                    padding: isMobile ? '12px 15px' : '15px 20px', 
                    background: 'rgba(6, 182, 212, 0.1)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: isMobile ? '10px' : '15px',
                    borderLeft: '3px solid #06b6d4'
                  }}
                >
                  <span style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>{cert.icon}</span>
                  <span style={{ color: '#fff', fontSize: isMobile ? '0.85rem' : '1rem' }}>{cert.title}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Udemy Courses */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(20, 30, 50, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: isMobile ? '15px' : '20px',
                padding: isMobile ? '20px' : '30px',
                border: '1px solid rgba(6, 182, 212, 0.2)',
              }}
            >
              <h3 style={{ color: '#06b6d4', fontSize: isMobile ? '1rem' : '1.3rem', marginBottom: isMobile ? '15px' : '20px', fontFamily: 'Orbitron, sans-serif' }}>
                📚 Udemy Courses
              </h3>
              {certifications.filter(c => c.source === 'Udemy').map((cert, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  style={{ 
                    marginBottom: isMobile ? '10px' : '15px', 
                    padding: isMobile ? '12px 15px' : '15px 20px', 
                    background: 'rgba(6, 182, 212, 0.1)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: isMobile ? '10px' : '15px',
                    borderLeft: '3px solid #3b82f6'
                  }}
                >
                  <span style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>{cert.icon}</span>
                  <span style={{ color: '#fff', fontSize: isMobile ? '0.85rem' : '1rem' }}>{cert.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Education & Languages Section */}
        <section id="education" style={{ minHeight: isMobile ? 'auto' : '100vh', paddingTop: isMobile ? '60px' : '100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '20px' : '40px' }}>
            
            {/* Education Card */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(20, 30, 50, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: isMobile ? '20px' : '30px',
                padding: isMobile ? '25px' : '40px',
                border: '1px solid rgba(6, 182, 212, 0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: isMobile ? '20px' : '30px' }}>
                <FaGraduationCap style={{ color: '#06b6d4', fontSize: isMobile ? '20px' : '24px' }} />
                <h2 style={{ color: '#fff', fontSize: isMobile ? '1.3rem' : '1.8rem', fontFamily: 'Orbitron, sans-serif' }}>Education</h2>
              </div>
              <p style={{ color: '#666', marginBottom: isMobile ? '20px' : '30px', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                My learning journey and certifications
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '20px' : '30px' }}>
                <div>
                  <h3 style={{ color: '#06b6d4', marginBottom: isMobile ? '15px' : '20px', fontSize: isMobile ? '0.9rem' : '1rem' }}>📚 Education</h3>
                  {education.map((edu, i) => (
                    <div key={i} style={{ marginBottom: isMobile ? '15px' : '20px', padding: isMobile ? '12px' : '15px', background: 'rgba(0,0,0,0.2)', borderRadius: isMobile ? '12px' : '15px', borderLeft: '3px solid #06b6d4' }}>
                      <p style={{ color: '#fff', fontWeight: 600, fontSize: isMobile ? '0.85rem' : '1rem' }}>{edu.title}</p>
                      <p style={{ color: '#666', fontSize: isMobile ? '0.75rem' : '0.85rem' }}>{edu.institution}</p>
                      <p style={{ color: '#06b6d4', fontSize: isMobile ? '0.7rem' : '0.8rem' }}>{edu.year}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 style={{ color: '#06b6d4', marginBottom: isMobile ? '15px' : '20px', fontSize: isMobile ? '0.9rem' : '1rem' }}>🏆 Certifications</h3>
                  {certifications.slice(0, isMobile ? 4 : certifications.length).map((cert, i) => (
                    <div key={i} style={{ marginBottom: isMobile ? '10px' : '15px', padding: isMobile ? '10px 12px' : '12px 15px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '10px' }}>
                      <span style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>{cert.icon}</span>
                      <div>
                        <span style={{ color: '#fff', fontSize: isMobile ? '0.8rem' : '0.9rem', display: 'block' }}>{cert.title}</span>
                        <span style={{ color: '#06b6d4', fontSize: isMobile ? '0.6rem' : '0.7rem' }}>{cert.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Languages Card */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'rgba(20, 30, 50, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: isMobile ? '20px' : '30px',
                padding: isMobile ? '25px' : '40px',
                border: '1px solid rgba(6, 182, 212, 0.2)',
              }}
            >
              <h2 style={{ color: '#fff', fontSize: isMobile ? '1.3rem' : '1.8rem', marginBottom: '10px', fontFamily: 'Orbitron, sans-serif' }}>
                <span style={{ color: '#06b6d4' }}>Languages</span>
              </h2>
              <p style={{ color: '#666', marginBottom: isMobile ? '25px' : '40px', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                The languages I speak and my proficiency level in each
              </p>
              
              {languages.map((lang, i) => (
                <div key={i} style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '15px', marginBottom: '10px' }}>
                    <div style={{ width: isMobile ? '35px' : '40px', height: isMobile ? '35px' : '40px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', fontWeight: 700, fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
                      {lang.code}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#fff', marginBottom: '5px', fontSize: isMobile ? '0.9rem' : '1rem' }}>{lang.name}</p>
                      <div style={{ height: isMobile ? '6px' : '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                            borderRadius: '10px',
                          }}
                        />
                      </div>
                    </div>
                    <span style={{ color: '#06b6d4' }}>{lang.level}%</span>
                  </div>
                </div>
              ))}
              
              <p style={{ color: '#666', fontSize: '0.85rem', textAlign: 'center', marginTop: '30px' }}>
                Always learning and improving my language skills
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ paddingTop: isMobile ? '60px' : '100px', paddingBottom: isMobile ? '40px' : '60px' }}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '50px' }}
          >
            <h2 style={{ 
              fontSize: isMobile ? '1.8rem' : '2.5rem', 
              fontFamily: 'Orbitron, sans-serif',
              color: '#06b6d4',
              marginBottom: '10px'
            }}>
              CONTACT ME
            </h2>
            <p style={{ color: '#666', fontSize: isMobile ? '0.9rem' : '1rem' }}>Get in touch with me</p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              background: 'rgba(20, 30, 50, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: isMobile ? '15px' : '20px',
              padding: isMobile ? '25px' : '40px',
              border: '1px solid rgba(6, 182, 212, 0.2)',
            }}
          >
            <form
              action="https://formsubmit.co/gptworm9@gmail.com"
              method="POST"
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <input type="hidden" name="_subject" value="New Contact from Portfolio" />
              <input type="hidden" name="_captcha" value="false" />
              
              <div>
                <label style={{ color: '#06b6d4', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '10px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label style={{ color: '#06b6d4', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '10px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label style={{ color: '#06b6d4', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '10px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                  placeholder="Subject"
                />
              </div>

              <div>
                <label style={{ color: '#06b6d4', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Message</label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '10px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '15px 40px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Rajdhani, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <FaEnvelope /> Send Message
              </motion.button>
            </form>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>Or reach me directly at:</p>
              <a 
                href="mailto:gptworm9@gmail.com" 
                style={{ 
                  color: '#06b6d4', 
                  fontSize: '1.1rem', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <FaEnvelope /> gptworm9@gmail.com
              </a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '60px 0', marginTop: '100px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
            {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2, color: '#06b6d4' }}
                style={{ color: '#666', fontSize: '24px' }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            © 2026 Azzedine Oubaid. All rights reserved.
          </p>
          <p style={{ color: '#06b6d4', fontSize: '0.85rem', marginTop: '10px', fontFamily: 'Share Tech Mono, monospace' }}>
            [ WEB DEVELOPMENT | FULL STACK | MODERN TECHNOLOGIES ]
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default DevPortfolio
