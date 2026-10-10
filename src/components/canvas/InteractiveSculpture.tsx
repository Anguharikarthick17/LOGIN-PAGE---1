import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import type { FormInteractionState } from '../../types/auth'
import { cn } from '../../utils/cn'

export interface InteractiveSculptureProps {
  className?: string
  interactionState?: FormInteractionState
}

/**
 * Checks if WebGL is available in the current browser environment.
 */
function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Monochrome Interactive 3D Digital Sculpture.
 * Polished chrome Torus Knot and concentric orbital ring with neutral studio lighting,
 * realistic specular reflections, and state-driven mechanical alignments.
 */
export const InteractiveSculpture: React.FC<InteractiveSculptureProps> = ({
  className,
  interactionState = 'idle',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasWebGL] = useState(() => checkWebGLSupport())

  // Keep interactionState in a ref to avoid recreating the render loop on every state change
  const stateRef = useRef<FormInteractionState>(interactionState)
  useEffect(() => {
    stateRef.current = interactionState
  }, [interactionState])

  useEffect(() => {
    if (!hasWebGL) {
      return
    }

    const container = containerRef.current
    if (!container) return

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 7.4)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // 2. Sculptural Group
    const sculptureGroup = new THREE.Group()
    scene.add(sculptureGroup)

    // Primary Sculpture: Polished Chrome Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(1.35, 0.38, 200, 36, 2, 3)
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    })
    const knotMesh = new THREE.Mesh(knotGeometry, chromeMaterial)
    sculptureGroup.add(knotMesh)

    // Secondary Sculpture: Concentric Orbital Gyro-Ring
    const ringRadius = 2.35
    const ringGeometry = new THREE.TorusGeometry(ringRadius, 0.045, 32, 128)
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xdcdcdc,
      metalness: 0.96,
      roughness: 0.22,
    })
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial)
    ringMesh.rotation.x = Math.PI * 0.45
    ringMesh.rotation.y = Math.PI * 0.25
    sculptureGroup.add(ringMesh)

    // 3. Strict Monochrome Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    // Key Specular Directional Light (neutral white)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.6)
    keyLight.position.set(5, 7, 6)
    scene.add(keyLight)

    // Cool Silver Rim Light 1
    const silverRimLight = new THREE.DirectionalLight(0xe0e0e0, 3.2)
    silverRimLight.position.set(-6, -4, -5)
    scene.add(silverRimLight)

    // Precision Specular Rim Light 2
    const rearRimLight = new THREE.DirectionalLight(0xcccccc, 2.8)
    rearRimLight.position.set(6, 4, -4)
    scene.add(rearRimLight)

    // Low Fill Spot
    const fillLight = new THREE.PointLight(0xffffff, 1.8, 25)
    fillLight.position.set(-3, 3, 5)
    scene.add(fillLight)

    // Orbital traveling light pulse (pure white gleam for valid email confirmation)
    const orbitPulseLight = new THREE.PointLight(0xffffff, 0, 10)
    sculptureGroup.add(orbitPulseLight)

    // 4. Pointer Interaction Tracking
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0
    let isHovered = false

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetMouseX = Math.max(-1, Math.min(1, x))
      targetMouseY = Math.max(-1, Math.min(1, y))
      isHovered = true
    }

    const handlePointerLeave = () => {
      targetMouseX = 0
      targetMouseY = 0
      isHovered = false
    }

    window.addEventListener('mousemove', handlePointerMove)
    document.addEventListener('mouseleave', handlePointerLeave)

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Interpolated lighting and transform parameters
    let currentKeyIntensity = 3.6
    let currentSilverIntensity = 3.2
    let currentRearIntensity = 2.8
    let currentAttitudeY = 0
    let currentAttitudeX = 0
    let currentAttitudeZ = 0
    let currentScale = 1.0
    let currentRingTilt = Math.PI * 0.45
    let orbitPulseAngle = 0

    // 5. Render Loop with State Transitions
    let animationFrameId: number
    const startTime = performance.now()
    let lastTime = performance.now()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const now = performance.now()
      const delta = Math.min((now - lastTime) / 1000, 0.1)
      const elapsedTime = (now - startTime) / 1000
      lastTime = now

      const activeState = stateRef.current

      // Baseline parameters (pure monochrome)
      let targetKeyIntensity = 3.6
      let targetSilverIntensity = 3.2
      let targetRearIntensity = 2.8
      let targetAttitudeY = 0
      let targetAttitudeX = 0
      let targetAttitudeZ = 0
      let targetScale = 1.0
      let targetRingTilt = Math.PI * 0.45
      let targetPulseLightIntensity = 0
      let rotationSpeedMultiplier = 1.0

      switch (activeState) {
        case 'email-focused':
          // Subtle mechanical alignment turning toward form
          targetAttitudeY = 0.35
          targetAttitudeX = -0.06
          targetAttitudeZ = 0.04
          targetKeyIntensity = 4.4
          targetSilverIntensity = 3.6
          targetScale = 1.02
          rotationSpeedMultiplier = 0.8
          break

        case 'email-typing':
          // Restrained specular gleam while typing
          targetAttitudeY = 0.38
          targetAttitudeX = -0.08
          targetKeyIntensity = 4.6 + Math.sin(elapsedTime * 6) * 0.3
          targetScale = 1.03
          rotationSpeedMultiplier = 1.1
          break

        case 'email-valid':
          // Precise understated specular gleam along orbit
          targetAttitudeY = 0.28
          targetKeyIntensity = 5.0
          targetSilverIntensity = 4.2
          targetPulseLightIntensity = 3.8
          targetScale = 1.04
          rotationSpeedMultiplier = 0.95
          break

        case 'password-focused':
          // Enclosed, secure mechanical configuration (ring tilts inwards, tighter scale)
          targetAttitudeY = -0.3
          targetAttitudeX = 0.1
          targetRingTilt = Math.PI * 0.28
          targetScale = 0.95
          targetSilverIntensity = 4.6
          targetKeyIntensity = 2.8
          rotationSpeedMultiplier = 0.65
          break

        case 'password-typing':
          // Enclosed state micro-activity without leaking data
          targetAttitudeY = -0.34
          targetAttitudeX = 0.12
          targetRingTilt = Math.PI * 0.26
          targetScale = 0.96
          targetSilverIntensity = 4.8 + Math.sin(elapsedTime * 5) * 0.25
          rotationSpeedMultiplier = 0.8
          break

        case 'password-visible':
          // Polished motion response: deliberate tilt
          targetAttitudeY = -0.12
          targetAttitudeZ = -0.08
          targetRingTilt = Math.PI * 0.36
          targetKeyIntensity = 4.2
          targetSilverIntensity = 4.0
          targetScale = 1.01
          rotationSpeedMultiplier = 0.9
          break

        case 'submitting':
          // Controlled mechanical alignment to center
          targetKeyIntensity = 4.0
          targetSilverIntensity = 3.8
          targetRearIntensity = 3.8
          rotationSpeedMultiplier = 0.45
          break

        case 'success':
          // Pure white specular convergence and harmonic acceleration
          targetKeyIntensity = 6.0 + Math.sin(elapsedTime * 4) * 0.8
          targetSilverIntensity = 5.0
          targetRearIntensity = 5.0
          targetScale = 1.07 + Math.sin(elapsedTime * 3) * 0.02
          rotationSpeedMultiplier = 3.0
          break

        case 'error':
          // Dignified, calm return to baseline
          targetKeyIntensity = 3.2
          targetSilverIntensity = 2.8
          rotationSpeedMultiplier = 0.85
          break

        case 'idle':
        default:
          break
      }

      // Smooth interpolation of dynamic lighting and transform targets
      const stateLerpRate = 0.065
      currentKeyIntensity += (targetKeyIntensity - currentKeyIntensity) * stateLerpRate
      currentSilverIntensity += (targetSilverIntensity - currentSilverIntensity) * stateLerpRate
      currentRearIntensity += (targetRearIntensity - currentRearIntensity) * stateLerpRate
      currentAttitudeY += (targetAttitudeY - currentAttitudeY) * stateLerpRate
      currentAttitudeX += (targetAttitudeX - currentAttitudeX) * stateLerpRate
      currentAttitudeZ += (targetAttitudeZ - currentAttitudeZ) * stateLerpRate
      currentScale += (targetScale - currentScale) * stateLerpRate
      currentRingTilt += (targetRingTilt - currentRingTilt) * stateLerpRate

      // Apply light values
      keyLight.intensity = currentKeyIntensity
      silverRimLight.intensity = currentSilverIntensity
      rearRimLight.intensity = currentRearIntensity

      // Orbit pulse light traveling along concentric ring when email is valid
      if (targetPulseLightIntensity > 0) {
        orbitPulseAngle += delta * 4.2
        orbitPulseLight.intensity = targetPulseLightIntensity
        orbitPulseLight.position.set(
          Math.cos(orbitPulseAngle) * ringRadius,
          Math.sin(orbitPulseAngle) * ringRadius * Math.sin(currentRingTilt),
          Math.sin(orbitPulseAngle) * ringRadius * Math.cos(currentRingTilt)
        )
      } else {
        orbitPulseLight.intensity = THREE.MathUtils.lerp(orbitPulseLight.intensity, 0, 0.1)
      }

      // Pointer parallax smoothing
      const mouseLerpRate = isHovered ? 0.04 : 0.025
      currentMouseX += (targetMouseX - currentMouseX) * mouseLerpRate
      currentMouseY += (targetMouseY - currentMouseY) * mouseLerpRate

      if (!prefersReducedMotion) {
        // Continuous idle rotation
        knotMesh.rotation.x += delta * 0.3 * rotationSpeedMultiplier
        knotMesh.rotation.y += delta * 0.44 * rotationSpeedMultiplier

        // Gentle breathing float
        sculptureGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12

        // Concentric outer ring counter-rotation with state-driven tilt
        ringMesh.rotation.x = currentRingTilt
        ringMesh.rotation.z -= delta * 0.16 * rotationSpeedMultiplier
        ringMesh.rotation.y += delta * 0.12 * rotationSpeedMultiplier
      }

      // Parallax tilt combined with reactive state attitude
      sculptureGroup.rotation.x = currentAttitudeX + currentMouseY * 0.32
      sculptureGroup.rotation.y = currentAttitudeY + currentMouseX * 0.44
      sculptureGroup.rotation.z = currentAttitudeZ
      sculptureGroup.scale.setScalar(currentScale)

      renderer.render(scene, camera)
    }

    animate()

    // 6. Resize Observer
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      if (width === 0 || height === 0) return

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handlePointerMove)
      document.removeEventListener('mouseleave', handlePointerLeave)
      resizeObserver.disconnect()

      knotGeometry.dispose()
      chromeMaterial.dispose()
      ringGeometry.dispose()
      ringMaterial.dispose()
      renderer.dispose()

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [hasWebGL])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none select-none',
        className
      )}
      aria-hidden="true"
    >
      {/* Graceful Fallback if WebGL is unavailable */}
      {!hasWebGL && (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <svg
            className="w-48 h-48 text-white/80 animate-pulse"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.2)" />
            <path
              d="M50 15 C30 15 15 35 15 50 C15 70 35 85 50 85 C70 85 85 65 85 50 C85 30 65 15 50 15 Z"
              stroke="#ffffff"
            />
            <path
              d="M30 35 C40 25 60 25 70 35 C80 48 80 65 65 72 C52 78 38 68 32 55"
              stroke="#a3a3a3"
            />
          </svg>
          <span className="text-xs font-mono text-[#A3A3A3] uppercase tracking-widest">
            GENZLOG DIGITAL ARTIFACT
          </span>
        </div>
      )}
    </div>
  )
}
