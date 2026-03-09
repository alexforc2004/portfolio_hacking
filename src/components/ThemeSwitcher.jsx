import React from 'react'
import { motion } from 'framer-motion'
import { MdSwapHoriz } from 'react-icons/md'

const ThemeSwitcher = ({ theme, onToggle, isPlaylistOpen }) => {
  if (isPlaylistOpen) return null

  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '110px', // To the right of AI ChatBot
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: theme === 'cyber' 
          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
          : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        border: theme === 'cyber'
          ? '2px solid rgba(239, 68, 68, 0.5)'
          : '2px solid rgba(59, 130, 246, 0.5)',
        boxShadow: theme === 'cyber'
          ? '0 8px 32px rgba(239, 68, 68, 0.5), 0 0 60px rgba(239, 68, 68, 0.3)'
          : '0 8px 32px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'white',
        fontSize: '32px'
      }}
    >
      <MdSwapHoriz />
    </motion.button>
  )
}

export default ThemeSwitcher
