import React from 'react'
import { motion } from 'framer-motion'

function Footer() {
  return (
    <footer style={{
      background: 'rgba(0, 0, 0, 0.95)',
      borderTop: '1px solid rgba(255, 0, 51, 0.3)',
      padding: '40px 5%',
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p style={{
            color: '#888',
            fontSize: '0.95rem',
            marginBottom: '15px'
          }}>
            © 2024 Azzedine Oubaid. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'Share Tech Mono, monospace',
            color: '#ff0033',
            fontSize: '0.85rem',
            letterSpacing: '1px'
          }}>
            [ CYBERSECURITY | FULL STACK DEVELOPMENT | IT SOLUTIONS ]
          </p>
          <p style={{
            color: '#666',
            fontSize: '0.8rem',
            marginTop: '15px'
          }}>
            [ SYSTEM ONLINE ] [ SECURITY ACTIVE ] [ READY TO DEPLOY ]
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
