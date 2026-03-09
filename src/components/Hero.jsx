import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope, FaShieldAlt, FaCode, FaServer } from 'react-icons/fa'

function Hero({ isPlaying = false, theme = 'cyber' }) {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const [rotation, setRotation] = useState(0)
  const [currentImage, setCurrentImage] = useState('/profile.png')

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power4.out' }
    )
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
    )
  }, [])

  // Update image based on theme
  useEffect(() => {
    if (theme === 'dev') {
      setCurrentImage('/mypicture2.png')
    } else {
      setCurrentImage(isPlaying ? '/mask.jpg' : '/profile.png')
    }
  }, [theme, isPlaying])

  // Rotate when music plays/stops (only in cyber theme)
  useEffect(() => {
    if (theme === 'cyber') {
      if (isPlaying) {
        setRotation(prev => prev + 360)
        setTimeout(() => {
          setCurrentImage('/mask.jpg')
        }, 500)
      } else {
        setRotation(prev => prev + 360)
        setTimeout(() => {
          setCurrentImage('/profile.png')
        }, 500)
      }
    }
  }, [isPlaying, theme])

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 5%',
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        maxWidth: '1400px',
        width: '100%',
        alignItems: 'center'
      }}>
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'Share Tech Mono, monospace',
              color: theme === 'cyber' ? '#ff0033' : '#3b82f6',
              fontSize: '1.2rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ color: theme === 'cyber' ? '#ff0033' : '#3b82f6' }}>&lt;</span>
            {theme === 'cyber' ? 'CYBERSECURITY SPECIALIST' : 'WEB DEVELOPER SPECIALIST'}
            <span style={{ color: theme === 'cyber' ? '#ff0033' : '#3b82f6' }}>/&gt;</span>
          </motion.div>

          <h1 ref={titleRef} style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '4.5rem',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '20px',
            background: theme === 'cyber'
              ? 'linear-gradient(135deg, #ffffff 0%, #ff0033 50%, #990000 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #3b82f6 50%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent'
          }}>
            AZZEDINE<br/>OUBAID
          </h1>

          <p ref={subtitleRef} style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '1.4rem',
            color: '#888',
            marginBottom: '30px',
            maxWidth: '500px',
            lineHeight: 1.6
          }}>
            21 Years Old | Full Stack Developer | IT Specialist | 
            <span style={{ color: theme === 'cyber' ? '#ff0033' : '#3b82f6' }}>
              {theme === 'cyber' ? ' Cybersecurity Expert' : ' Web Development Expert'}
            </span>
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {[
              { icon: <FaShieldAlt />, value: '4+', label: 'Years Cybersecurity' },
              { icon: <FaCode />, value: '2+', label: 'Years IT' },
              { icon: <FaServer />, value: '10+', label: 'Projects' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.2 }}
                whileHover={{ scale: 1.1, y: -5 }}
                style={{
                  textAlign: 'center'
                }}
              >
                <div style={{ color: theme === 'cyber' ? '#ff0033' : '#3b82f6', fontSize: '1.5rem', marginBottom: '5px' }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  {stat.value}
                </div>
                <div style={{ color: '#666', fontSize: '0.8rem' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: theme === 'cyber' ? '0 0 30px rgba(255, 0, 51, 0.5)' : '0 0 30px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '15px 40px',
                background: theme === 'cyber' 
                  ? 'linear-gradient(135deg, #ff0033 0%, #990000 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                border: 'none',
                color: '#fff',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: 'pointer',
                borderRadius: theme === 'dev' ? '8px' : '0'
              }}
            >
              {theme === 'cyber' ? 'Contact Me' : 'View My Work'}
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, borderColor: theme === 'cyber' ? '#ff0033' : '#3b82f6' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '15px 40px',
                background: 'transparent',
                border: theme === 'cyber' ? '2px solid #ff0033' : '2px solid #3b82f6',
                color: theme === 'cyber' ? '#ff0033' : '#3b82f6',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: 'pointer',
                borderRadius: theme === 'dev' ? '8px' : '0'
              }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="/cv.pdf"
              download="Azzedine_Oubaid_CV.pdf"
              whileHover={{ scale: 1.05, boxShadow: theme === 'cyber' ? '0 0 30px rgba(255, 0, 51, 0.3)' : '0 0 30px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '15px 40px',
                background: 'transparent',
                border: theme === 'cyber' ? '2px solid #ff0033' : '2px solid #3b82f6',
                color: theme === 'cyber' ? '#ff0033' : '#3b82f6',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: 'pointer',
                borderRadius: theme === 'dev' ? '8px' : '0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              📄 Download CV
            </motion.a>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
            {[
              { icon: <FaGithub />, href: 'https://github.com/alexforc2244', label: 'GitHub' },
              { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/azzedine-oubaid-64a3673a8', label: 'LinkedIn' },
              { icon: <FaEnvelope />, href: 'mailto:oubaidazzedine00@gmail.com', label: 'Email' },
              { icon: <FaPhone />, href: 'tel:+212631721359', label: 'Phone' }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: theme === 'cyber' ? '#ff0033' : '#3b82f6' }}
                style={{
                  color: '#888',
                  fontSize: '1.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right - Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotateY: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              position: 'relative',
              width: '400px',
              height: '400px'
            }}
          >
            {/* Glowing Border */}
            <div style={{
              position: 'absolute',
              inset: '-10px',
              background: theme === 'cyber' 
                ? 'linear-gradient(135deg, #ff0033, #990000, #ff0033)'
                : 'linear-gradient(135deg, #3b82f6, #06b6d4, #3b82f6)',
              borderRadius: '50%',
              animation: 'spin 4s linear infinite',
              filter: 'blur(20px)',
              opacity: 0.6
            }} />
            
            {/* Profile Image Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: theme === 'cyber' ? '4px solid #ff0033' : '4px solid #3b82f6',
              overflow: 'hidden',
              background: '#111',
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 1s ease-in-out'
            }}>
              <img
                src={currentImage}
                alt="Azzedine Oubaid"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.3s ease'
                }}
              />
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: '-30px',
                border: theme === 'cyber' 
                  ? '2px dashed rgba(255, 0, 51, 0.3)'
                  : '2px dashed rgba(59, 130, 246, 0.3)',
                borderRadius: '50%'
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Tablet */
        @media (max-width: 1024px) {
          #home > div {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 40px !important;
          }
          #home h1 {
            font-size: 3.5rem !important;
          }
          #home > div > div:last-child > div {
            width: 300px !important;
            height: 300px !important;
          }
        }
        
        /* Large Phone */
        @media (max-width: 768px) {
          #home {
            padding: 80px 4% !important;
          }
          #home h1 {
            font-size: 2.5rem !important;
          }
          #home > div > div:last-child > div {
            width: 250px !important;
            height: 250px !important;
          }
          #home > div > div:first-child > div:nth-child(4) {
            gap: 20px !important;
            justify-content: center;
          }
        }
        
        /* Phone */
        @media (max-width: 576px) {
          #home {
            padding: 60px 3% !important;
          }
          #home h1 {
            font-size: 2rem !important;
          }
          #home > div > div:last-child > div {
            width: 200px !important;
            height: 200px !important;
          }
          #home > div > div:first-child > div:first-child {
            font-size: 0.9rem !important;
            flex-wrap: wrap;
            justify-content: center;
          }
          #home > div > div:first-child > p {
            font-size: 1rem !important;
          }
          #home > div > div:first-child > div:nth-child(4) {
            gap: 15px !important;
          }
          #home > div > div:first-child > div:nth-child(4) > div > div:nth-child(2) {
            font-size: 1.5rem !important;
          }
          #home > div > div:first-child > div:nth-child(5) {
            flex-direction: column;
            gap: 10px !important;
          }
          #home > div > div:first-child > div:nth-child(5) > a {
            width: 100%;
            text-align: center;
            padding: 12px 20px !important;
            font-size: 0.8rem !important;
          }
        }
        
        /* Mini Phone */
        @media (max-width: 400px) {
          #home {
            padding: 50px 2% !important;
          }
          #home h1 {
            font-size: 1.6rem !important;
          }
          #home > div > div:last-child > div {
            width: 160px !important;
            height: 160px !important;
          }
          #home > div > div:first-child > div:first-child {
            font-size: 0.75rem !important;
          }
          #home > div > div:first-child > p {
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
