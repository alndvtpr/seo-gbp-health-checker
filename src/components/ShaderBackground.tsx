'use client'

import React, { useEffect, useRef, useState } from 'react'

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  void main() {
    v_texCoord = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision highp float;
  varying vec2 v_texCoord;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    
    float noise1 = snoise(uv * 3.0 - u_time * 0.08);
    float noise2 = snoise(uv * 6.0 + u_time * 0.15);
    float finalNoise = noise1 * 0.5 + noise2 * 0.25;
    
    vec3 color = vec3(0.02, 0.02, 0.03); 
    vec3 amber = vec3(0.9, 0.49, 0.13); // #E67E22 Noir Amber Glow
    float glow = smoothstep(0.1, 0.8, finalNoise);
    
    float dist = distance(uv, mouse);
    float mouseGlow = smoothstep(0.35, 0.0, dist) * 0.25;
    
    color += amber * glow * 0.25;
    color += amber * mouseGlow;
    
    float vignette = smoothstep(1.3, 0.35, length(uv - 0.5));
    color *= vignette;
    
    gl_FragColor = vec4(color, 0.85);
  }
`

export const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let cleanupFn: (() => void) | undefined
    let idleId: number | undefined
    let timeoutId: NodeJS.Timeout | undefined

    const initWebGL = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      
      const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' })
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

      const vertices = new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
         1.0,  1.0,
      ])
      
      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
      
      const posLoc = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(posLoc)
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)
      
      const timeLoc = gl.getUniformLocation(program, 'u_time')
      const resLoc = gl.getUniformLocation(program, 'u_resolution')
      const mouseLoc = gl.getUniformLocation(program, 'u_mouse')
      
      let windowHeight = window.innerHeight
      let mouse = { x: window.innerWidth / 2, y: windowHeight / 2 }
      const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX
        mouse.y = windowHeight - e.clientY
      }
      window.addEventListener('mousemove', handleMouseMove, { passive: true })

      const updateSize = () => {
        windowHeight = window.innerHeight
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
        canvas.width = window.innerWidth * dpr
        canvas.height = windowHeight * dpr
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
      
      updateSize()

      const startTime = performance.now()
      let requestId: number | null = null
      let lastDrawTime = 0
      const FRAME_INTERVAL = 33 // ~30fps frame capping (~33ms delta threshold)

      const drawFrame = (time: number) => {
        const elapsedTime = (time - startTime) / 1000
        gl.uniform1f(timeLoc, elapsedTime)
        gl.uniform2f(resLoc, canvas.width, canvas.height)
        gl.uniform2f(mouseLoc, mouse.x, mouse.y)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }

      // Check prefers-reduced-motion on mount
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      let prefersReducedMotion = motionQuery.matches

      const resizeObserver = new ResizeObserver(() => {
        updateSize()
        if (prefersReducedMotion) {
          drawFrame(performance.now())
        }
      })
      resizeObserver.observe(canvas)

      const render = (time: number) => {
        requestId = requestAnimationFrame(render)
        // Skip draw call if less than ~33ms has elapsed since the last draw (cap at ~30fps)
        if (time - lastDrawTime < FRAME_INTERVAL) {
          return
        }
        lastDrawTime = time
        drawFrame(time)
      }

      const stopAnimation = () => {
        if (requestId !== null) {
          cancelAnimationFrame(requestId)
          requestId = null
        }
      }

      const startAnimation = () => {
        if (requestId === null && !document.hidden && !prefersReducedMotion) {
          lastDrawTime = performance.now()
          requestId = requestAnimationFrame(render)
        }
      }

      // (2) If prefers-reduced-motion matches, skip animation loop and render single static frame
      if (prefersReducedMotion) {
        drawFrame(startTime)
      } else if (!document.hidden) {
        startAnimation()
      }

      // (1) Handle visibility change (tab hidden/visible)
      const handleVisibilityChange = () => {
        if (document.hidden) {
          stopAnimation()
        } else {
          startAnimation()
        }
      }
      document.addEventListener('visibilitychange', handleVisibilityChange)

      const handleMotionChange = (e: MediaQueryListEvent) => {
        prefersReducedMotion = e.matches
        if (prefersReducedMotion) {
          stopAnimation()
          drawFrame(performance.now())
        } else {
          startAnimation()
        }
      }
      motionQuery.addEventListener('change', handleMotionChange)

      cleanupFn = () => {
        stopAnimation()
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        motionQuery.removeEventListener('change', handleMotionChange)
        window.removeEventListener('mousemove', handleMouseMove)
        resizeObserver.disconnect()
        gl.deleteProgram(program)
        gl.deleteShader(vs)
        gl.deleteShader(fs)
        gl.deleteBuffer(buffer)
      }
    }

    if ('requestIdleCallback' in window) {
      idleId = (window as any).requestIdleCallback(() => initWebGL(), { timeout: 1000 })
    } else {
      timeoutId = setTimeout(initWebGL, 200)
    }

    return () => {
      if (idleId && 'cancelIdleCallback' in window) {
        ;(window as any).cancelIdleCallback(idleId)
      }
      if (timeoutId) clearTimeout(timeoutId)
      if (cleanupFn) cleanupFn()
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div 
        className="fixed inset-0 w-full h-full z-[-2] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(230, 126, 34, 0.12) 0%, rgba(18, 20, 20, 0) 60%)'
        }}
      />
    )
  }
  
  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full block z-[-2] pointer-events-none mix-blend-screen opacity-75" />
  )
}
