"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { useTranslation } from "@/app/contexts/TranslationContext"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

export default function RotatingEarth({ width = 800, height = 600, className = "" }: RotatingEarthProps) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Set up fixed dimensions for stability
    const containerWidth = width
    const containerHeight = height
    const radius = Math.min(containerWidth, containerHeight) / 2.5

    setDimensions({ width: containerWidth, height: containerHeight })

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        // Check if point is in outer ring
        if (!pointInPolygon(point, coordinates[0])) {
          return false
        }
        // Check if point is in any hole (inner rings)
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false // Point is in a hole
          }
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        // Check each polygon in the MultiPolygon
        for (const polygon of geometry.coordinates) {
          // Check if point is in outer ring
          if (pointInPolygon(point, polygon[0])) {
            // Check if point is in any hole
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) {
              return true
            }
          }
        }
        return false
      }

      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds

      const stepSize = dotSpacing * 0.08
      let pointsGenerated = 0

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
            pointsGenerated++
          }
        }
      }

      console.log(
        `[v0] Generated ${pointsGenerated} points for land feature:`,
        feature.properties?.featurecla || "Land",
      )
      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = Math.max(0, projection.scale())
      const scaleFactor = currentScale / radius

      // Draw ocean (globe background) - only if scale is positive
      if (currentScale > 0) {
        context.beginPath()
        context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
        context.fillStyle = "transparent"
        context.fill()
      }

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "#ffffff"
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = 0.25
        context.stroke()
        context.globalAlpha = 1

        // Draw land outlines
        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "#ffffff"
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        // Draw halftone dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "#999999"
            context.fill()
          }
        })

        // Draw green glowing beacon at Hungary's coordinates (Budapest: 47.1625° N, 19.5033° E)
        const hungaryCoords: [number, number] = [19.5033, 47.1625]
        const hungaryProjected = projection(hungaryCoords)
        
        if (hungaryProjected && 
            hungaryProjected[0] >= 0 && 
            hungaryProjected[0] <= containerWidth &&
            hungaryProjected[1] >= 0 && 
            hungaryProjected[1] <= containerHeight) {
          
          // Scale down beacon for mobile
          const isMobile = width < 768
          const beaconScale = isMobile ? 0.5 : 1
          const beaconHeight = 50 * scaleFactor * beaconScale // Height of the laser beam (shortened and scaled for mobile)
          
          // Calculate direction from center to beacon point (outward from sphere)
          const centerX = containerWidth / 2
          const centerY = containerHeight / 2
          const dirX = hungaryProjected[0] - centerX
          const dirY = hungaryProjected[1] - centerY
          const distance = Math.sqrt(dirX * dirX + dirY * dirY)
          const normX = dirX / distance
          const normY = dirY / distance
          
          // Calculate the end point of the beam (extending outward from surface)
          const beamEndX = hungaryProjected[0] + normX * beaconHeight
          const beamEndY = hungaryProjected[1] + normY * beaconHeight
          
          // Draw laser beam glow (multiple layers for depth) with fade to zero
          for (let i = 3; i >= 1; i--) {
            const glowWidth = i * 6 * scaleFactor * beaconScale
            const gradient = context.createLinearGradient(
              hungaryProjected[0], hungaryProjected[1],
              beamEndX, beamEndY
            )
            gradient.addColorStop(0, `rgba(34, 197, 94, ${0.6 * i / 3})`)
            gradient.addColorStop(0.7, `rgba(34, 197, 94, ${0.3 * i / 3})`)
            gradient.addColorStop(1, `rgba(34, 197, 94, 0)`) // Fade to zero at tip
            
            context.beginPath()
            context.moveTo(hungaryProjected[0], hungaryProjected[1])
            context.lineTo(beamEndX, beamEndY)
            context.strokeStyle = gradient
            context.lineWidth = glowWidth
            context.lineCap = 'round'
            context.stroke()
          }
          
          // Draw core laser beam (bright center) with fade
          const coreGradient = context.createLinearGradient(
            hungaryProjected[0], hungaryProjected[1],
            beamEndX, beamEndY
          )
          coreGradient.addColorStop(0, "rgba(34, 197, 94, 1)")
          coreGradient.addColorStop(0.6, "rgba(34, 197, 94, 0.6)")
          coreGradient.addColorStop(1, "rgba(34, 197, 94, 0)") // Fade to zero at tip
          
          context.beginPath()
          context.moveTo(hungaryProjected[0], hungaryProjected[1])
          context.lineTo(beamEndX, beamEndY)
          context.strokeStyle = coreGradient
          context.lineWidth = 2 * scaleFactor * beaconScale
          context.lineCap = 'round'
          context.stroke()
          
          // Draw base glow on surface
          context.beginPath()
          context.arc(hungaryProjected[0], hungaryProjected[1], 12 * scaleFactor * beaconScale, 0, 2 * Math.PI)
          const baseGradient = context.createRadialGradient(
            hungaryProjected[0], hungaryProjected[1], 0,
            hungaryProjected[0], hungaryProjected[1], 12 * scaleFactor * beaconScale
          )
          baseGradient.addColorStop(0, "rgba(34, 197, 94, 0.8)")
          baseGradient.addColorStop(0.5, "rgba(34, 197, 94, 0.4)")
          baseGradient.addColorStop(1, "rgba(34, 197, 94, 0)")
          context.fillStyle = baseGradient
          context.fill()
        }
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        )
        if (!response.ok) throw new Error("Failed to load land data")

        landFeatures = await response.json()

        // Generate dots for all land features
        let totalDots = 0
        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 16)
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true })
            totalDots++
          })
        })

        console.log(`[v0] Total dots generated: ${totalDots} across ${landFeatures.features.length} land features`)

        render()
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    // Set up rotation and interaction
    const rotation: [number, number] = [0, -20] // Start tilted up 20 degrees to show northern hemisphere
    let autoRotate = true
    const rotationSpeed = 0.15
    let isDragging = false
    let lastMousePos = { x: 0, y: 0 }

    const rotate = () => {
      if (autoRotate && !isDragging) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
        render()
      }
    }

    // Mouse event handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      lastMousePos = { x: e.clientX, y: e.clientY }
      canvas.style.cursor = 'grabbing'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - lastMousePos.x
      const deltaY = e.clientY - lastMousePos.y

      rotation[0] += deltaX * 0.5
      rotation[1] -= deltaY * 0.5
      rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

      projection.rotate(rotation)
      render()

      lastMousePos = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDragging = false
      canvas.style.cursor = 'grab'
    }

    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseUp)
    canvas.style.cursor = 'grab'

    // Auto-rotation timer
    const rotationTimer = d3.timer(rotate)

    // Load world data
    loadWorldData()

    // Cleanup
    return () => {
      rotationTimer.stop()
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [width, height])

  if (error) {
    return (
      <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Globe Canvas */}
      <div className="flex items-center justify-center">
        <canvas
          ref={canvasRef}
          style={{ 
            width: `${dimensions.width}px`, 
            height: `${dimensions.height}px`,
            maxWidth: "100%",
            display: "block",
            background: "transparent"
          }}
        />
      </div>
      
      {/* Text overlaid on the globe - positioned at red line location */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 text-center hidden md:block"
        style={{
          top: "8%",
        }}
      >
        <div
          className="mb-2 px-6 py-2 inline-block"
          style={{
            background: "rgba(100, 150, 255, 0.15)",
            boxShadow: "0 0 30px rgba(100, 150, 255, 0.3)",
            backdropFilter: "blur(10px)"
          }}
        >
          <h2 
            className="text-2xl md:text-3xl whitespace-nowrap" 
            style={{ 
              fontFamily: "Avenir Next, sans-serif",
              fontWeight: 600,
              color: "#FFFFFF",
              textShadow: '0 0 20px rgba(100, 150, 255, 0.5)',
              letterSpacing: "-0.02em"
            }}
          >
            {t('globe.beaconTitle')}
          </h2>
        </div>
        
        <div
          className="px-6 py-2 inline-block"
          style={{
            background: "rgba(34, 197, 94, 0.15)",
            boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
            backdropFilter: "blur(10px)"
          }}
        >
          <p 
            className="text-base md:text-lg whitespace-nowrap" 
            style={{ 
              fontFamily: "Avenir Next, sans-serif",
              fontWeight: 400,
              color: "rgba(34, 197, 94, 1)",
              textShadow: '0 0 15px rgba(34, 197, 94, 0.4)'
            }}
          >
            {t('globe.beaconLocation')}
          </p>
        </div>
      </div>
    </div>
  )
}