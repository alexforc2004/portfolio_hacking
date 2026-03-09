import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute, FaMusic, FaTimes, FaPlus, FaRedo, FaRandom, FaTrash } from 'react-icons/fa'
import AudioVisualizer from './AudioVisualizer'

function MusicPlayer({ tracks, currentTrack, isPlaying, onFileImport, onPlayTrack, onTogglePlay, onNext, onPrev, onDeleteTrack, audioRef, onPlaylistToggle, theme = 'cyber' }) {
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [repeatMode, setRepeatMode] = useState(0) // 0: no repeat, 1: repeat all, 2: repeat one
  const [isShuffle, setIsShuffle] = useState(false)

  // Notify parent when playlist is toggled
  const handlePlaylistToggle = () => {
    const newState = !showPlaylist
    setShowPlaylist(newState)
    if (onPlaylistToggle) {
      onPlaylistToggle(newState)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [isMuted, volume, audioRef])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
      }
    }
    
    // Reset time when track changes
    setCurrentTime(0)
    setDuration(0)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('durationchange', updateDuration)
    
    // Try to get duration immediately if already loaded
    if (audio.duration && !isNaN(audio.duration)) {
      setDuration(audio.duration)
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
    }
  }, [audioRef, currentTrack])
  
  // Hide music player in dev mode - must be after all hooks
  if (theme === 'dev') return null

  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileImport(files)
      // Reset the input so the same file can be selected again
      e.target.value = ''
    }
  }

  const handleSeek = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (e.target.value / 100) * duration
    }
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Floating Music Player Button - Bottom Right */}
      <motion.button
        onClick={handlePlaylistToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff0033 0%, #990000 100%)',
          border: 'none',
          color: '#fff',
          fontSize: '1.8rem',
          cursor: 'pointer',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(255, 0, 51, 0.6)'
        }}
      >
        <FaMusic />
      </motion.button>

      {/* Playlist Sidebar */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              width: window.innerWidth <= 480 ? '100%' : window.innerWidth <= 768 ? '320px' : '400px',
              height: '100vh',
              background: 'rgba(10, 10, 10, 0.98)',
              borderLeft: window.innerWidth <= 480 ? 'none' : '2px solid rgba(255, 0, 51, 0.5)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid rgba(255, 0, 51, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.3rem',
                color: '#ff0033',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                PLAYLIST
              </h3>
              <motion.button
                onClick={handlePlaylistToggle}
                whileHover={{ scale: 1.2, color: '#ff0033' }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#888',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                <FaTimes />
              </motion.button>
            </div>

            {/* Import Button */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid rgba(255, 0, 51, 0.3)'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '15px',
                background: 'rgba(255, 0, 51, 0.1)',
                border: '2px dashed rgba(255, 0, 51, 0.5)',
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#ff0033',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 0, 51, 0.2)'
                e.currentTarget.style.borderColor = '#ff0033'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 0, 51, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(255, 0, 51, 0.5)'
              }}
              >
                <FaPlus /> Import Music
                <input
                  type="file"
                  multiple
                  accept="audio/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {/* Tracks List */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '10px'
            }}>
              {tracks.length === 0 ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#666',
                  textAlign: 'center',
                  padding: '20px'
                }}>
                  <p>No tracks imported yet.<br/>Click "Import Music" to add songs!</p>
                </div>
              ) : (
                tracks.map((track) => (
                  <motion.div
                    key={track.id}
                    whileHover={{ x: 10, backgroundColor: 'rgba(255, 0, 51, 0.1)' }}
                    style={{
                      padding: '15px',
                      marginBottom: '8px',
                      background: currentTrack?.id === track.id ? 'rgba(255, 0, 51, 0.2)' : 'transparent',
                      border: currentTrack?.id === track.id ? '1px solid rgba(255, 0, 51, 0.5)' : '1px solid rgba(255, 0, 51, 0.2)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div 
                        onClick={() => onPlayTrack(track)}
                        style={{
                          width: '40px',
                          height: '40px',
                          background: 'linear-gradient(135deg, #ff0033, #990000)',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: '1.2rem',
                          flexShrink: 0
                        }}>
                        <FaMusic />
                      </div>
                      <div 
                        onClick={() => onPlayTrack(track)}
                        style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          color: currentTrack?.id === track.id ? '#ff0033' : '#fff',
                          margin: 0,
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {track.name}
                        </p>
                        <p style={{
                          color: '#666',
                          margin: '5px 0 0 0',
                          fontSize: '0.75rem'
                        }}>
                          {formatTime(duration)}
                        </p>
                      </div>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteTrack(track.id)
                        }}
                        whileHover={{ scale: 1.2, color: '#ff0033' }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#666',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          padding: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                        title="Delete track"
                      >
                        <FaTimes />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Player Controls */}
            {currentTrack && (
              <div style={{
                padding: '20px',
                borderTop: '1px solid rgba(255, 0, 51, 0.3)',
                background: 'rgba(0, 0, 0, 0.5)'
              }}>
                {/* Audio Visualizer - Equalizer Bars */}
                <AudioVisualizer audioRef={audioRef} isPlaying={isPlaying} />
                
                {/* Current Track Info */}
                <div style={{
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    color: '#ff0033',
                    fontSize: '0.9rem',
                    margin: '0 0 5px 0',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {currentTrack.name}
                  </p>
                  <p style={{
                    color: '#888',
                    fontSize: '0.85rem',
                    margin: 0,
                    fontFamily: 'monospace'
                  }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </p>
                </div>

                {/* Progress Bar */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeek}
                  style={{
                    width: '100%',
                    height: '4px',
                    borderRadius: '2px',
                    background: 'rgba(255, 0, 51, 0.2)',
                    outline: 'none',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    accentColor: '#ff0033'
                  }}
                />

                {/* Control Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <motion.button
                    onClick={() => setRepeatMode((repeatMode + 1) % 3)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: repeatMode > 0 ? '#ff0033' : '#888',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      opacity: repeatMode > 0 ? 1 : 0.6
                    }}
                    title={repeatMode === 0 ? 'Repeat Off' : repeatMode === 1 ? 'Repeat All' : 'Repeat One'}
                  >
                    <FaRedo />
                    {repeatMode === 2 && <span style={{ fontSize: '0.7rem', marginLeft: '2px' }}>1</span>}
                  </motion.button>

                  <motion.button
                    onClick={onPrev}
                    whileHover={{ scale: 1.2, color: '#ff0033' }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#888',
                      fontSize: '1.3rem',
                      cursor: 'pointer'
                    }}
                  >
                    <FaStepBackward />
                  </motion.button>

                  <motion.button
                    onClick={onTogglePlay}
                    whileHover={{ scale: 1.15, color: '#ff0033' }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: 'linear-gradient(135deg, #ff0033, #990000)',
                      border: 'none',
                      color: '#fff',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      fontSize: '1.3rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </motion.button>

                  <motion.button
                    onClick={onNext}
                    whileHover={{ scale: 1.2, color: '#ff0033' }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#888',
                      fontSize: '1.3rem',
                      cursor: 'pointer'
                    }}
                  >
                    <FaStepForward />
                  </motion.button>

                  <motion.button
                    onClick={() => setIsShuffle(!isShuffle)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: isShuffle ? '#ff0033' : '#888',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      opacity: isShuffle ? 1 : 0.6
                    }}
                    title="Shuffle"
                  >
                    <FaRandom />
                  </motion.button>
                </div>

                {/* Volume Control */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <motion.button
                    onClick={() => setIsMuted(!isMuted)}
                    whileHover={{ scale: 1.1, color: '#ff0033' }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: isMuted ? '#ff0033' : '#888',
                      fontSize: '1.1rem',
                      cursor: 'pointer'
                    }}
                  >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </motion.button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value))
                      setIsMuted(false)
                    }}
                    style={{
                      flex: 1,
                      height: '4px',
                      borderRadius: '2px',
                      background: 'rgba(255, 0, 51, 0.2)',
                      outline: 'none',
                      cursor: 'pointer',
                      accentColor: '#ff0033'
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handlePlaylistToggle}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default MusicPlayer
