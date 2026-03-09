import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Cube wall background - black and red theme (for cyber mode)
function CubeWall({ theme = 'cyber' }) {
  const groupRef = useRef()
  const meshRefs = useRef([])
  
  const primaryColor = theme === 'cyber' ? '#ff0033' : '#3b82f6'
  const emissiveColor = theme === 'cyber' ? '#990000' : '#1e40af'
  
  // Create a grid of cubes - black with some colored ones
  const cubes = useMemo(() => {
    const cubeData = []
    const gridSize = 14
    const spacing = 1.1
    
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Random depth for 3D effect
        const z = Math.random() * 2.5 - 1.25
        // Some cubes are colored (about 20%)
        const isColored = Math.random() < 0.20
        
        cubeData.push({
          position: [
            (x - gridSize / 2) * spacing,
            (y - gridSize / 2) * spacing,
            z
          ],
          isColored,
          baseZ: z,
          speed: 1 + Math.random() * 1,
          rotSpeed: 0.5 + Math.random() * 0.5
        })
      }
    }
    return cubeData
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    // Normal speed rotation
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.15
      groupRef.current.rotation.y = time * 0.1
    }
    
    // Cube movement - normal speed
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const cube = cubes[i]
      // Breathing movement in Z
      mesh.position.z = cube.baseZ + Math.sin(time * cube.speed + i * 0.05) * 0.4
      // Subtle rotation
      mesh.rotation.x = Math.sin(time * cube.rotSpeed * 0.5 + i) * 0.2
      mesh.rotation.y = Math.cos(time * cube.rotSpeed * 0.3 + i) * 0.2
    })
  })

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {cubes.map((cube, i) => (
        <mesh 
          key={i} 
          ref={el => meshRefs.current[i] = el}
          position={cube.position}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={cube.isColored ? primaryColor : "#1a1a1a"}
            emissive={cube.isColored ? emissiveColor : "#000000"}
            emissiveIntensity={cube.isColored ? 0.8 : 0}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Floating spheres and hexagons for dev mode - modern web developer theme
function DevShapes() {
  const groupRef = useRef()
  const meshRefs = useRef([])
  
  const primaryColor = '#3b82f6'
  const secondaryColor = '#06b6d4'
  const emissiveColor = '#1e40af'
  
  // Create floating shapes - mix of spheres, octahedrons, and torus
  const shapes = useMemo(() => {
    const shapeData = []
    const count = 80
    
    for (let i = 0; i < count; i++) {
      // Random position in 3D space
      const x = (Math.random() - 0.5) * 30
      const y = (Math.random() - 0.5) * 25
      const z = Math.random() * 5 - 8
      
      // Random shape type: 0 = sphere, 1 = octahedron, 2 = torus, 3 = icosahedron
      const shapeType = Math.floor(Math.random() * 4)
      const isColored = Math.random() < 0.35
      const useSecondary = Math.random() < 0.5
      
      shapeData.push({
        position: [x, y, z],
        shapeType,
        isColored,
        useSecondary,
        baseY: y,
        baseX: x,
        speed: 0.3 + Math.random() * 0.5,
        rotSpeed: 0.2 + Math.random() * 0.4,
        scale: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2
      })
    }
    return shapeData
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    // Gentle group rotation
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
      groupRef.current.rotation.y = time * 0.05
    }
    
    // Individual shape animations
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const shape = shapes[i]
      
      // Floating movement
      mesh.position.y = shape.baseY + Math.sin(time * shape.speed + shape.phase) * 1.5
      mesh.position.x = shape.baseX + Math.cos(time * shape.speed * 0.7 + shape.phase) * 0.8
      
      // Rotation
      mesh.rotation.x = time * shape.rotSpeed
      mesh.rotation.y = time * shape.rotSpeed * 1.3
      mesh.rotation.z = Math.sin(time * shape.rotSpeed + i) * 0.3
    })
  })

  const getGeometry = (shapeType) => {
    switch(shapeType) {
      case 0:
        return <sphereGeometry args={[0.5, 16, 16]} />
      case 1:
        return <octahedronGeometry args={[0.6]} />
      case 2:
        return <torusGeometry args={[0.4, 0.15, 8, 16]} />
      case 3:
        return <icosahedronGeometry args={[0.5]} />
      default:
        return <sphereGeometry args={[0.5, 16, 16]} />
    }
  }

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {shapes.map((shape, i) => (
        <mesh 
          key={i} 
          ref={el => meshRefs.current[i] = el}
          position={shape.position}
          scale={shape.scale}
        >
          {getGeometry(shape.shapeType)}
          <meshStandardMaterial
            color={shape.isColored ? (shape.useSecondary ? secondaryColor : primaryColor) : "#1a1a2e"}
            emissive={shape.isColored ? emissiveColor : "#000000"}
            emissiveIntensity={shape.isColored ? 0.6 : 0}
            metalness={0.8}
            roughness={0.3}
            transparent={!shape.isColored}
            opacity={shape.isColored ? 1 : 0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

// 3D Scene for when music is NOT playing - theme aware
function IdleScene({ theme = 'cyber' }) {
  const lightColor = theme === 'cyber' ? '#ff0033' : '#3b82f6'
  const lightColor2 = theme === 'cyber' ? '#ff0000' : '#06b6d4'
  
  return (
    <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>
      <ambientLight intensity={theme === 'cyber' ? 0.15 : 0.25} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={lightColor} />
      <pointLight position={[-10, -10, 5]} intensity={1} color={lightColor2} />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#ffffff" />
      {theme === 'cyber' ? <CubeWall theme={theme} /> : <DevShapes />}
    </Canvas>
  )
}

function ThreeBackground({ bassIntensity = 0, isPlaying = false, theme = 'cyber' }) {
  const videoRef = useRef(null)
  const [imageScale, setImageScale] = useState(1)
  const [glowIntensity, setGlowIntensity] = useState(30)
  
  // Control video playback based on isPlaying
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => console.log('Video play error:', e))
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])
  
  // Make hoodie image pulse with bass
  useEffect(() => {
    if (isPlaying && bassIntensity > 0) {
      // Scale from 1.0 to 1.15 based on bass intensity
      const newScale = 1 + (bassIntensity * 0.15)
      setImageScale(newScale)
      // Glow from 30 to 80 based on bass
      const newGlow = 30 + (bassIntensity * 50)
      setGlowIntensity(newGlow)
    } else {
      setImageScale(1)
      setGlowIntensity(30)
    }
  }, [bassIntensity, isPlaying])
  
  // Get responsive height
  const getImageHeight = () => {
    if (typeof window === 'undefined') return '70vh'
    if (window.innerWidth <= 480) return '40vh'
    if (window.innerWidth <= 768) return '50vh'
    return '70vh'
  }
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      background: 'linear-gradient(135deg, #000000 0%, #1a0000 50%, #330000 100%)',
      overflow: 'hidden'
    }}>
      {/* Video background - shown when music is playing */}
      <video
        ref={videoRef}
        src="/cube.mp4"
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
          opacity: isPlaying ? 1 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: 1
        }}
      />
      
      {/* Red Hoodie Hacker Image - pulses with music bass */}
      <img
        src="/hoodie.png"
        alt=""
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${imageScale})`,
          height: getImageHeight(),
          maxWidth: '90%',
          width: 'auto',
          objectFit: 'contain',
          opacity: isPlaying ? 1 : 0,
          transition: 'transform 0.05s ease-out, opacity 0.5s ease, filter 0.05s ease-out',
          zIndex: 2,
          pointerEvents: 'none',
          filter: `drop-shadow(0 0 ${glowIntensity}px rgba(255, 0, 0, ${0.5 + bassIntensity * 0.4}))`
        }}
      />
      
      {/* 3D Cube wall - shown when music is NOT playing */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isPlaying ? 0 : 1,
        transition: 'opacity 0.5s ease',
        zIndex: 0
      }}>
        <IdleScene theme={theme} />
      </div>
    </div>
  )
}

export default ThreeBackground
