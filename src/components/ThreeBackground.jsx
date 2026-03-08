import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Cube wall background - black and red theme (for when music is stopped)
function CubeWall() {
  const groupRef = useRef()
  const meshRefs = useRef([])
  
  // Create a grid of cubes - black with some red ones
  const cubes = useMemo(() => {
    const cubeData = []
    const gridSize = 14
    const spacing = 1.1
    
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Random depth for 3D effect
        const z = Math.random() * 2.5 - 1.25
        // Some cubes are red (about 20%)
        const isRed = Math.random() < 0.20
        
        cubeData.push({
          position: [
            (x - gridSize / 2) * spacing,
            (y - gridSize / 2) * spacing,
            z
          ],
          isRed,
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
            color={cube.isRed ? "#ff0033" : "#1a1a1a"}
            emissive={cube.isRed ? "#990000" : "#000000"}
            emissiveIntensity={cube.isRed ? 0.8 : 0}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// 3D Scene for when music is NOT playing - black and red theme
function IdleScene() {
  return (
    <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff0033" />
      <pointLight position={[-10, -10, 5]} intensity={1} color="#ff0000" />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#ffffff" />
      <CubeWall />
    </Canvas>
  )
}

function ThreeBackground({ bassIntensity = 0, isPlaying = false }) {
  const videoRef = useRef(null)
  
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
      
      {/* Red Hoodie Hacker Image - shown in center when music is playing */}
      <img
        src="/hoodie.png"
        alt=""
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '70vh',
          width: 'auto',
          objectFit: 'contain',
          opacity: isPlaying ? 1 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: 2,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 0 30px rgba(255, 0, 0, 0.5))'
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
        <IdleScene />
      </div>
    </div>
  )
}

export default ThreeBackground
