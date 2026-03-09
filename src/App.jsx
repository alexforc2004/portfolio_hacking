import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import CyberSecurity from './components/CyberSecurity'
import Experience from './components/Experience'
import Contact from './components/Contact'
import MusicPlayer from './components/MusicPlayer'
import ThreeBackground from './components/ThreeBackground'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot_test'
import ThemeSwitcher from './components/ThemeSwitcher'
import DevPortfolio from './components/DevPortfolio'
// import Sidebar from './components/Sidebar' // Removed per user request
import Certificates from './components/Certificates'
import DraggableIcon from './components/DraggableIcon'

gsap.registerPlugin(ScrollTrigger)

// Initialize IndexedDB
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MusicPlayerDB', 2) // Increment version
    
    request.onupgradeneeded = (e) => {
      const db = e.target.result
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files')
      }
      if (!db.objectStoreNames.contains('metadata')) {
        db.createObjectStore('metadata')
      }
    }
    
    request.onsuccess = (e) => resolve(e.target.result)
    request.onerror = (e) => reject(e.target.error)
  })
}

// IndexedDB helper functions
const getStoredFile = async (id) => {
  try {
    const db = await initDB()
    return new Promise((resolve) => {
      const transaction = db.transaction(['files'], 'readonly')
      const store = transaction.objectStore('files')
      const getRequest = store.get(id)
      
      getRequest.onsuccess = () => {
        const result = getRequest.result
        console.log('Retrieved from IndexedDB for id', id, ':', result ? 'found' : 'not found')
        if (result) {
          // Ensure it's a proper Blob
          if (result instanceof Blob) {
            resolve(result)
          } else if (result instanceof ArrayBuffer) {
            resolve(new Blob([result], { type: 'audio/mpeg' }))
          } else {
            resolve(new Blob([result], { type: 'audio/mpeg' }))
          }
        } else {
          resolve(null)
        }
      }
      getRequest.onerror = (e) => {
        console.error('Error getting file from IndexedDB:', e)
        resolve(null)
      }
    })
  } catch (err) {
    console.error('Error getting stored file:', err)
    return null
  }
}

const storeFile = async (id, file) => {
  try {
    // First read the file as ArrayBuffer
    const arrayBuffer = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(reader.error)
      reader.readAsArrayBuffer(file)
    })
    
    // Then store in IndexedDB
    const db = await initDB()
    return new Promise((resolve) => {
      const transaction = db.transaction(['files'], 'readwrite')
      const store = transaction.objectStore('files')
      const blob = new Blob([arrayBuffer], { type: file.type || 'audio/mpeg' })
      const request = store.put(blob, id)
      
      request.onsuccess = () => {
        console.log('File stored successfully:', id)
        resolve(true)
      }
      request.onerror = (e) => {
        console.error('Error storing file:', e)
        resolve(false)
      }
    })
  } catch (err) {
    console.error('Error storing file:', err)
    return false
  }
}

const deleteStoredFile = async (id) => {
  try {
    const db = await initDB()
    return new Promise((resolve) => {
      const transaction = db.transaction(['files'], 'readwrite')
      const store = transaction.objectStore('files')
      store.delete(id)
      transaction.oncomplete = () => resolve(true)
      transaction.onerror = () => resolve(false)
    })
  } catch (err) {
    console.error('Error deleting file:', err)
    return false
  }
}

const clearAllFiles = async () => {
  try {
    const db = await initDB()
    return new Promise((resolve) => {
      const transaction = db.transaction(['files'], 'readwrite')
      const store = transaction.objectStore('files')
      store.clear()
      transaction.oncomplete = () => resolve(true)
    })
  } catch (err) {
    return false
  }
}

function App() {
  const [loading, setLoading] = useState(true)
  const [musicTracks, setMusicTracks] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [bassIntensity, setBassIntensity] = useState(0)
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)
  const [theme, setTheme] = useState('cyber') // 'cyber' or 'dev'
  const audioRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const animationFrameRef = useRef(null)

  // Load tracks from localStorage on mount
  useEffect(() => {
    const loadTracksFromStorage = async () => {
      const savedTracks = localStorage.getItem('musicTracks')
      console.log('Loading saved tracks:', savedTracks)
      if (savedTracks) {
        try {
          const trackData = JSON.parse(savedTracks)
          console.log('Parsed track data:', trackData)
          // Recreate object URLs from stored data
          const tracks = await Promise.all(trackData.map(async (t) => {
            // Try to get the file from IndexedDB
            const storedFile = await getStoredFile(t.id)
            console.log('Retrieved file for', t.name, ':', storedFile ? 'found' : 'not found')
            if (storedFile) {
              return {
                id: t.id,
                name: t.name,
                file: storedFile,
                url: URL.createObjectURL(storedFile)
              }
            }
            return null
          }))
          const validTracks = tracks.filter(t => t !== null)
          console.log('Valid tracks loaded:', validTracks.length)
          setMusicTracks(validTracks)
          if (validTracks.length > 0) {
            setCurrentTrack(validTracks[0])
          }
        } catch (e) {
          console.error('Error loading saved tracks:', e)
        }
      }
      setTimeout(() => setLoading(false), 2000)
    }
    loadTracksFromStorage()
  }, [])

  // Save tracks to localStorage whenever they change
  useEffect(() => {
    if (musicTracks.length > 0) {
      const tracksToSave = musicTracks.map(t => ({
        id: t.id,
        name: t.name
      }))
      localStorage.setItem('musicTracks', JSON.stringify(tracksToSave))
    } else {
      // Clear localStorage when all tracks are deleted
      localStorage.removeItem('musicTracks')
    }
  }, [musicTracks])

  // Control audio playback when isPlaying changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(err => console.log('Play error:', err))
        }
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  // Auto-next when song ends
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      nextTrack()
    }

    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [musicTracks, currentTrack])

  // Setup audio analyzer for bass detection - uses global audio context from AudioVisualizer
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      setBassIntensity(0)
      return
    }

    // Wait a bit for AudioVisualizer to set up the global audio context
    const setupTimeout = setTimeout(() => {
      // Access the global audio context from window (set by AudioVisualizer)
      const globalAnalyser = window.__audioAnalyser
      
      if (!globalAnalyser) {
        // Fallback: create our own if AudioVisualizer hasn't set it up
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
          analyserRef.current = audioContextRef.current.createAnalyser()
          analyserRef.current.fftSize = 256
          analyserRef.current.smoothingTimeConstant = 0.8
        }

        if (!sourceRef.current) {
          try {
            sourceRef.current = audioContextRef.current.createMediaElementSource(audio)
            sourceRef.current.connect(analyserRef.current)
            analyserRef.current.connect(audioContextRef.current.destination)
          } catch (e) {
            console.log('Audio source already connected')
          }
        }

        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume()
        }
      } else {
        analyserRef.current = globalAnalyser
      }

      if (!analyserRef.current) return

      const bufferLength = analyserRef.current.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const detectBass = () => {
        if (!analyserRef.current || !isPlaying) return

        analyserRef.current.getByteFrequencyData(dataArray)

        // Get bass frequencies (first 8 bins for deep bass, ~0-300Hz)
        let bassSum = 0
        const bassRange = 8
        for (let i = 0; i < bassRange; i++) {
          // Weight lower frequencies more heavily
          const weight = 1 + (bassRange - i) * 0.2
          bassSum += dataArray[i] * weight
        }
        const bassAvg = bassSum / (bassRange * 1.8) // Adjusted for weights
        
        // Normalize and boost the signal for more dramatic effect
        let normalizedBass = bassAvg / 255
        normalizedBass = Math.pow(normalizedBass, 0.6) // Boost lower values
        normalizedBass = Math.min(normalizedBass * 1.3, 1) // Amplify and cap at 1

        setBassIntensity(normalizedBass)
        animationFrameRef.current = requestAnimationFrame(detectBass)
      }

      detectBass()
    }, 100)

    return () => {
      clearTimeout(setupTimeout)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, currentTrack])

  const handleFileImport = async (files) => {
    console.log('Importing files:', files.length)
    const newTracks = Array.from(files).map((file, index) => {
      console.log('Processing file:', file.name)
      return {
        id: Date.now() + index,
        name: file.name.replace(/\.[^/.]+$/, ''),
        file: file,
        url: URL.createObjectURL(file)
      }
    })
    
    console.log('New tracks created:', newTracks.length)
    
    // Store files in IndexedDB
    for (const track of newTracks) {
      const stored = await storeFile(track.id, track.file)
      console.log('Stored track:', track.name, stored)
    }
    
    setMusicTracks(prev => {
      console.log('Previous tracks:', prev.length, 'Adding:', newTracks.length)
      return [...prev, ...newTracks]
    })
    
    if (!currentTrack && newTracks.length > 0) {
      setCurrentTrack(newTracks[0])
      setIsPlaying(true)
    }
  }

  const deleteTrack = async (trackId) => {
    const newTracks = musicTracks.filter(t => t.id !== trackId)
    setMusicTracks(newTracks)
    
    // Delete from IndexedDB
    await deleteStoredFile(trackId)
    
    // If deleted track was playing, play next
    if (currentTrack?.id === trackId) {
      if (newTracks.length > 0) {
        setCurrentTrack(newTracks[0])
        setIsPlaying(true)
      } else {
        setCurrentTrack(null)
        setIsPlaying(false)
      }
    }
  }

  const playTrack = (track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    if (musicTracks.length === 0) return
    const currentIndex = musicTracks.findIndex(t => t.id === currentTrack?.id)
    const nextIndex = (currentIndex + 1) % musicTracks.length
    setCurrentTrack(musicTracks[nextIndex])
    setIsPlaying(true)
  }

  const prevTrack = () => {
    if (musicTracks.length === 0) return
    const currentIndex = musicTracks.findIndex(t => t.id === currentTrack?.id)
    const prevIndex = currentIndex === 0 ? musicTracks.length - 1 : currentIndex - 1
    setCurrentTrack(musicTracks[prevIndex])
    setIsPlaying(true)
  }

  if (loading) {
    return (
      <motion.div 
        className="loading"
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1], rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '100px',
            height: '100px',
            border: '4px solid #ff0033',
            borderTop: '4px solid transparent',
            borderRadius: '50%'
          }}
        />
      </motion.div>
    )
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'cyber' ? 'dev' : 'cyber')
  }

  // Render Dev Portfolio for dev theme
  if (theme === 'dev') {
    return (
      <div className="app" data-theme={theme}>
        <DevPortfolio theme={theme} />
        
        {/* Theme Switcher */}
        <ThemeSwitcher theme={theme} onToggle={toggleTheme} isPlaylistOpen={isPlaylistOpen} />
        
        {/* AI ChatBot */}
        <ChatBot isPlaylistOpen={isPlaylistOpen} theme={theme} />
      </div>
    )
  }

  // Render Cyber Portfolio for cyber theme
  return (
    <div className="app" data-theme={theme}>
      <ThreeBackground bassIntensity={bassIntensity} isPlaying={isPlaying} theme={theme} />
      <div className="scanlines" />
      <div className="red-overlay" />
      

      
      <Navbar theme={theme} />
      
      <main>
        <Hero isPlaying={isPlaying} theme={theme} />
        <Skills theme={theme} />
        <Projects theme={theme} />
        <Certificates theme={theme} />
        <CyberSecurity theme={theme} />
        <Experience theme={theme} />
        <Contact theme={theme} />
      </main>
      
      <MusicPlayer
        tracks={musicTracks}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onFileImport={handleFileImport}
        onPlayTrack={playTrack}
        onTogglePlay={togglePlay}
        onNext={nextTrack}
        onPrev={prevTrack}
        onDeleteTrack={deleteTrack}
        audioRef={audioRef}
        onPlaylistToggle={setIsPlaylistOpen}
        theme={theme}
      />
      
      <Footer theme={theme} />
      
      {currentTrack && (
        <audio
          key={currentTrack.id}
          ref={audioRef}
          src={currentTrack.url}
          autoPlay={isPlaying}
          onEnded={nextTrack}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Theme Switcher */}
      <ThemeSwitcher theme={theme} onToggle={toggleTheme} isPlaylistOpen={isPlaylistOpen} />
      
      {/* AI ChatBot */}
      <ChatBot isPlaylistOpen={isPlaylistOpen} theme={theme} />
    </div>
  )
}

export default App
