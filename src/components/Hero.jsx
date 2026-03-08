import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope, FaShieldAlt, FaCode, FaServer } from 'react-icons/fa'

function Hero() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

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
              color: '#ff0033',
              fontSize: '1.2rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ color: '#ff0033' }}>&lt;</span>
            CYBERSECURITY SPECIALIST
            <span style={{ color: '#ff0033' }}>/&gt;</span>
          </motion.div>

          <h1 ref={titleRef} style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '4.5rem',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #ffffff 0%, #ff0033 50%, #990000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
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
            <span style={{ color: '#ff0033' }}> Cybersecurity Expert</span>
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
                <div style={{ color: '#ff0033', fontSize: '1.5rem', marginBottom: '5px' }}>
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
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 0, 51, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '15px 40px',
                background: 'linear-gradient(135deg, #ff0033 0%, #990000 100%)',
                border: 'none',
                color: '#fff',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: 'pointer'
              }}
            >
              Contact Me
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, borderColor: '#ff0033' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '15px 40px',
                background: 'transparent',
                border: '2px solid #ff0033',
                color: '#ff0033',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: 'pointer'
              }}
            >
              View Projects
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
                whileHover={{ scale: 1.2, color: '#ff0033' }}
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
              background: 'linear-gradient(135deg, #ff0033, #990000, #ff0033)',
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
              border: '4px solid #ff0033',
              overflow: 'hidden',
              background: '#111'
            }}>
              <img
                src="/profile.png"
                alt="Azzedine Oubaid"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
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
                border: '2px dashed rgba(255, 0, 51, 0.3)',
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
        @media (max-width: 968px) {
          #home > div {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          #home h1 {
            font-size: 3rem !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
