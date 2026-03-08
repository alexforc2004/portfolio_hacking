import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Vibrant neon colors for the equalizer bars
const BAR_COLORS = [
  '#ff0066', // Pink
  '#ff0099', // Hot Pink
  '#ff00cc', // Magenta
  '#cc00ff', // Purple
  '#9900ff', // Violet
  '#6600ff', // Indigo
  '#3300ff', // Blue-Violet
  '#0066ff', // Blue
  '#0099ff', // Light Blue
  '#00ccff', // Cyan
  '#00ffcc', // Turquoise
  '#00ff99', // Green-Cyan
  '#00ff66', // Green
  '#33ff00', // Lime
  '#66ff00', // Yellow-Green
  '#99ff00', // Chartreuse
  '#ccff00', // Yellow-Lime
  '#ffff00', // Yellow
  '#ffcc00', // Gold
  '#ff9900', // Orange
  '#ff6600', // Red-Orange
  '#ff3300', // Vermillion
  '#ff0033', // Red
  '#ff0066', // Back to Pink
]

// Global audio context to share across components
let globalAudioContext = null
let globalAnalyser = null
let globalSource = null
let connectedAudioElement = null

// Expose analyser globally for bass detection in App.jsx
if (typeof window !== 'undefined') {
  window.__audioAnalyser = null
}

function AudioVisualizer({ audioRef, isPlaying }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const smoothedDataRef = useRef(new Array(64).fill(0))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const numBars = 64
    const barWidth = canvas.width / numBars - 2
    let dataArray = new Uint8Array(numBars)

    const setupAudio = () => {
      if (!audioRef.current) return false
      
      // Only setup if audio element changed
      if (connectedAudioElement === audioRef.current && globalAnalyser) {
        return true
      }

      try {
        if (!globalAudioContext) {
          globalAudioContext = new (window.AudioContext || window.webkitAudioContext)()
        }

        if (!globalAnalyser) {
          globalAnalyser = globalAudioContext.createAnalyser()
          globalAnalyser.fftSize = 256
          globalAnalyser.smoothingTimeConstant = 0.7
        }

        // Only create new source if audio element changed
        if (connectedAudioElement !== audioRef.current) {
          if (globalSource) {
            try { globalSource.disconnect() } catch(e) {}
          }
          globalSource = globalAudioContext.createMediaElementSource(audioRef.current)
          globalSource.connect(globalAnalyser)
          globalAnalyser.connect(globalAudioContext.destination)
          connectedAudioElement = audioRef.current
          // Expose globally for bass detection
          window.__audioAnalyser = globalAnalyser
        }
        return true
      } catch (e) {
        // Already connected, that's fine
        if (e.name === 'InvalidStateError') {
          connectedAudioElement = audioRef.current
          window.__audioAnalyser = globalAnalyser
          return true
        }
        console.log('Audio setup error:', e)
        return false
      }
    }

    const draw = () => {
      if (!canvas || !ctx) return

      // Clear canvas with slight fade for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (globalAnalyser && isPlaying) {
        const bufferLength = globalAnalyser.frequencyBinCount
        const fullDataArray = new Uint8Array(bufferLength)
        globalAnalyser.getByteFrequencyData(fullDataArray)

        // Sample the frequency data to get numBars values
        for (let i = 0; i < numBars; i++) {
          const index = Math.floor(i * bufferLength / numBars)
          dataArray[i] = fullDataArray[index]
        }
      } else {
        // When not playing, slowly decay to zero
        for (let i = 0; i < numBars; i++) {
          dataArray[i] = Math.max(0, (dataArray[i] || 0) - 8)
        }
      }

      // Draw bars
      for (let i = 0; i < numBars; i++) {
        // Smooth the data for fluid animation
        const target = dataArray[i] || 0
        smoothedDataRef.current[i] += (target - smoothedDataRef.current[i]) * 0.3

        const barHeight = (smoothedDataRef.current[i] / 255) * canvas.height * 0.9
        const x = i * (barWidth + 2)
        const y = canvas.height - barHeight

        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(x, canvas.height, x, y)
        const colorIndex = i % BAR_COLORS.length
        const nextColorIndex = (i + 1) % BAR_COLORS.length
        
        gradient.addColorStop(0, BAR_COLORS[colorIndex])
        gradient.addColorStop(0.5, BAR_COLORS[nextColorIndex])
        gradient.addColorStop(1, '#ffffff')

        // Draw main bar
        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth, barHeight)

        // Draw reflection (mirror effect)
        const reflectionGradient = ctx.createLinearGradient(x, canvas.height, x, canvas.height + barHeight * 0.3)
        reflectionGradient.addColorStop(0, BAR_COLORS[colorIndex] + '80')
        reflectionGradient.addColorStop(1, 'transparent')
        ctx.fillStyle = reflectionGradient
        ctx.fillRect(x, canvas.height, barWidth, barHeight * 0.3)

        // Add glow effect for high values
        if (smoothedDataRef.current[i] > 200) {
          ctx.shadowColor = BAR_COLORS[colorIndex]
          ctx.shadowBlur = 20
          ctx.fillStyle = BAR_COLORS[colorIndex]
          ctx.fillRect(x, y, barWidth, 4)
          ctx.shadowBlur = 0
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    if (isPlaying && audioRef.current) {
      setupAudio()
      if (globalAudioContext?.state === 'suspended') {
        globalAudioContext.resume()
      }
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioRef, isPlaying])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        width: '100%',
        padding: '10px 0',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%)',
        borderRadius: '8px',
        marginBottom: '15px'
      }}
    >
      <canvas
        ref={canvasRef}
        width={360}
        height={120}
        style={{
          width: '100%',
          height: '120px',
          borderRadius: '8px'
        }}
      />
    </motion.div>
  )
}

export default AudioVisualizer
