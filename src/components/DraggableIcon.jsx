import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function DraggableIcon({ children, id, defaultPosition, zIndex = 999 }) {
  const [position, setPosition] = useState(defaultPosition)
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef(null)

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem(`draggable-${id}`)
    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition)
        setPosition(parsed)
      } catch (e) {
        console.error('Error loading saved position:', e)
      }
    }
  }, [id])

  // Save position to localStorage when dragging ends
  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    const newPosition = {
      x: position.x + info.offset.x,
      y: position.y + info.offset.y
    }
    
    // Constrain to viewport
    const maxX = window.innerWidth - 80
    const maxY = window.innerHeight - 80
    newPosition.x = Math.max(0, Math.min(newPosition.x, maxX))
    newPosition.y = Math.max(0, Math.min(newPosition.y, maxY))
    
    setPosition(newPosition)
    localStorage.setItem(`draggable-${id}`, JSON.stringify(newPosition))
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: isDragging ? zIndex + 100 : zIndex,
        cursor: 'grab',
        touchAction: 'none'
      }}
    >
      {children}
    </motion.div>
  )
}

export default DraggableIcon
