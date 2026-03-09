import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

function Contact({ theme = 'cyber' }) {
  const contactRef = useRef(null)
  
  const primaryColor = theme === 'cyber' ? '#ff0033' : '#3b82f6'
  const secondaryColor = theme === 'cyber' ? '#990000' : '#06b6d4'

  useEffect(() => {
    gsap.fromTo(contactRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        }
      }
    )
  }, [])

  return (
    <section id="contact" ref={contactRef} style={{
      minHeight: '100vh',
      padding: '100px 5%',
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '1000px',
        width: '100%'
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
          GET IN TOUCH
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            color: '#888',
            fontSize: '1.1rem',
            marginBottom: '60px',
            maxWidth: '600px',
            margin: '0 auto 60px'
          }}
        >
          I'm always interested in hearing about new projects and opportunities. 
          Feel free to reach out through any of the channels below!
        </motion.p>

        {/* Contact Methods */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {[
            {
              icon: <FaPhone />,
              title: 'Phone',
              value: '+212 631 721 359',
              link: 'tel:+212631721359'
            },
            {
              icon: <FaEnvelope />,
              title: 'Email',
              value: 'oubaidazzedine00@gmail.com',
              link: 'mailto:oubaidazzedine00@gmail.com'
            },
            {
              icon: <FaMapMarkerAlt />,
              title: 'Location',
              value: 'Morocco',
              link: '#'
            }
          ].map((contact, i) => (
            <motion.a
              key={i}
              href={contact.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: theme === 'cyber' ? '0 0 40px rgba(255, 0, 51, 0.6)' : '0 0 40px rgba(59, 130, 246, 0.6)' }}
              style={{
                background: 'rgba(17, 17, 17, 0.8)',
                border: theme === 'cyber' ? '1px solid rgba(255, 0, 51, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)',
                padding: '40px',
                borderRadius: '10px',
                textDecoration: 'none',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s ease'
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                color: primaryColor,
                marginBottom: '15px',
                textShadow: theme === 'cyber' ? '0 0 20px rgba(255, 0, 51, 0.5)' : '0 0 20px rgba(59, 130, 246, 0.5)'
              }}>
                {contact.icon}
              </div>
              <h3 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.2rem',
                color: primaryColor,
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {contact.title}
              </h3>
              <p style={{
                color: '#888',
                fontSize: '0.95rem'
              }}>
                {contact.value}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            marginBottom: '60px'
          }}
        >
          {[
            { icon: <FaGithub />, href: 'https://github.com/alexforc2244', label: 'GitHub' },
            { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/azzedine-oubaid-64a3673a8', label: 'LinkedIn' },
            { icon: <FaTwitter />, href: '#', label: 'Twitter' }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, color: primaryColor }}
              whileTap={{ scale: 0.9 }}
              style={{
                fontSize: '2rem',
                color: '#888',
                transition: 'all 0.3s ease'
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center'
          }}
        >
          <motion.a
            href="mailto:oubaidazzedine00@gmail.com"
            whileHover={{ scale: 1.05, boxShadow: theme === 'cyber' ? '0 0 40px rgba(255, 0, 51, 0.8)' : '0 0 40px rgba(59, 130, 246, 0.8)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-block',
              padding: '20px 60px',
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              border: 'none',
              color: '#fff',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              cursor: 'pointer',
              borderRadius: '5px'
            }}
          >
            Send Me an Email
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
