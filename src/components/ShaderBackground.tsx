'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const vertexShaderSource = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision mediump float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_resolution;

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    
    // Subtle fluid / noise gradient
    // We use a very subtle dark scheme that matches the M3 surface colors
    float color1 = sin(st.x * 2.0 + u_time * 0.15) * 0.5 + 0.5;
    float color2 = cos(st.y * 3.0 - u_time * 0.2) * 0.5 + 0.5;
    float color3 = sin((st.x + st.y) * 2.5 + u_time * 0.1) * 0.5 + 0.5;
    
    // Very subtle base color (e.g. RGB 10, 10, 15) with slight variations
    vec3 base = vec3(0.04, 0.04, 0.05); // deep dark background
    vec3 highlight = vec3(0.06, 0.08, 0.12); // subtle bluish-purple shift
    
    vec3 finalColor = mix(base, highlight, (color1 * color2 * color3) * 0.4);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

export const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    if (!mounted || reducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    
    // Request a low-power context since it's just an ambient background
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' })
    if (!gl) return

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
    
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }
    
    gl.useProgram(program)

    // Setup full screen quad
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ])
    
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    
    const positionLocation = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
    
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')

    // Handle high DPI and resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        // Downscale slightly for performance (DPR capped at 1.5 for ambient background)
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
        canvas.width = width * dpr
        canvas.height = height * dpr
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      }
    })
    
    // Note: React 18 strict mode double-invokes effects, but ResizeObserver is safe to re-attach
    resizeObserver.observe(canvas)

    const startTime = performance.now()
    let requestId: number
    
    const render = (time: number) => {
      const elapsedTime = (time - startTime) / 1000
      gl.uniform1f(timeLocation, elapsedTime)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      requestId = requestAnimationFrame(render)
    }
    
    requestId = requestAnimationFrame(render)
    
    return () => {
      cancelAnimationFrame(requestId)
      resizeObserver.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [mounted, reducedMotion])

  if (!mounted || reducedMotion) return null
  
  const targetContainer = document.getElementById('webgl-background-container')
  if (!targetContainer) return null
  
  return createPortal(
    <canvas ref={canvasRef} className="w-full h-full block" />,
    targetContainer
  )
}
