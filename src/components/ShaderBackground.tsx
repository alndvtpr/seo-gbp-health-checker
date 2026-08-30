'use client'

import React, { useEffect, useRef } from 'react'
import { useTheme } from '@/components/ThemeProvider'

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
  uniform float u_theme; // 0.0 = dark, 1.0 = light (smooth interpolation)

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
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

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    float shift = 100.0;
    for (int i = 0; i < 3; ++i) {
      v += a * snoise(p);
      p = p * 2.0 + vec2(shift);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    float dist = distance(uv, mouse);
    
    // ── 1. DARK MODE CALCULATION (Amber Noir Smoke) ──────────────────────────
    float darkNoise1 = snoise(uv * 3.0 - u_time * 0.08);
    float darkNoise2 = snoise(uv * 6.0 + u_time * 0.15);
    float darkFinalNoise = darkNoise1 * 0.5 + darkNoise2 * 0.25;
    
    vec3 darkBase = vec3(0.02, 0.02, 0.03); 
    vec3 darkAmber = vec3(0.9, 0.49, 0.13); // #E67E22 Noir Amber Glow
    float darkGlow = smoothstep(0.1, 0.8, darkFinalNoise);
    float darkMouseGlow = smoothstep(0.35, 0.0, dist) * 0.25;
    
    vec3 darkColor = darkBase;
    darkColor += darkAmber * darkGlow * 0.25;
    darkColor += darkAmber * darkMouseGlow;
    float vignette = smoothstep(1.3, 0.35, length(uv - 0.5));
    darkColor *= vignette;

    // ── 2. DAY MODE CALCULATION (Alabaster Cream Amber Peach - shader.html) ──
    float lightTime = u_time * 0.08;
    vec3 alabaster = vec3(0.98, 0.98, 0.97); // #FAFAF8
    vec3 cream = vec3(0.957, 0.937, 0.918); // #F4EFEA
    vec3 lightAmber = vec3(0.949, 0.659, 0.392); // #F2A864
    vec3 peach = vec3(1.0, 0.875, 0.749);   // #FFDFBF

    float n1 = fbm(uv * 1.5 + lightTime);
    float n2 = fbm(uv * 2.0 - lightTime * 0.5 + n1 * 0.2);
    
    vec3 lightColor = mix(alabaster, cream, n1 * 0.5 + 0.5);
    lightColor = mix(lightColor, lightAmber, clamp(n2 * 0.2, 0.0, 0.15));
    lightColor = mix(lightColor, peach, clamp(n1 * 0.1, 0.0, 0.1));
    
    float lightMouseGlow = smoothstep(0.4, 0.0, dist) * 0.08;
    lightColor += lightAmber * lightMouseGlow;
    
    // Micro-grain texture for organic paper-like feel
    float grain = (fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;
    lightColor += grain;
    
    // Luminosity Guard (Ensure lum > 0.92 for absolute text contrast)
    float lum = dot(lightColor, vec3(0.299, 0.587, 0.114));
    if (lum < 0.92) {
      lightColor += (0.92 - lum);
    }

    // ── 3. SEAMLESS UNIFORM INTERPOLATION ────────────────────────────────────
    vec3 finalColor = mix(darkColor, lightColor, u_theme);
    float finalAlpha = mix(0.85, 0.96, u_theme);

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`

export const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const themeRef = useRef(theme)
  const triggerAnimationRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    themeRef.current = theme
    if (triggerAnimationRef.current) {
      triggerAnimationRef.current()
    }
  }, [theme])

  useEffect(() => {
    let cleanupFn: (() => void) | undefined

    const initWebGL = () => {
      // Bypass on reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

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
      const themeLoc = gl.getUniformLocation(program, 'u_theme')
      
      let windowHeight = window.innerHeight
      const mouse = { x: window.innerWidth / 2, y: windowHeight / 2 }
      let lastInteractionTime = performance.now()
      let currentThemeValue = themeRef.current === 'light' ? 1.0 : 0.0

      const handleMouseMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * canvas.width
        mouse.y = (1 - e.clientY / windowHeight) * canvas.height
        lastInteractionTime = performance.now()
        startAnimation()
      }
      window.addEventListener('mousemove', handleMouseMove, { passive: true })

      // Downscale rendering resolution buffer for 0-lag GPU math + ultra-smooth organic smoke look
      const updateSize = () => {
        windowHeight = window.innerHeight
        const targetWidth = Math.min(Math.floor(window.innerWidth * 0.35), 480)
        const targetHeight = Math.min(Math.floor(windowHeight * 0.35), 320)
        canvas.width = Math.max(targetWidth, 180)
        canvas.height = Math.max(targetHeight, 120)
        gl.viewport(0, 0, canvas.width, canvas.height)
        mouse.x = canvas.width / 2
        mouse.y = canvas.height / 2
      }
      
      updateSize()

      const startTime = performance.now()
      let requestId: number | null = null
      let lastDrawTime = 0
      const FRAME_INTERVAL = 33 // ~30fps frame capping (~33ms delta threshold)

      const drawFrame = (time: number) => {
        const elapsedTime = (time - startTime) / 1000
        
        // Smooth theme interpolation (target 1.0 for light, 0.0 for dark)
        const targetTheme = themeRef.current === 'light' ? 1.0 : 0.0
        currentThemeValue += (targetTheme - currentThemeValue) * 0.12
        if (Math.abs(targetTheme - currentThemeValue) < 0.005) {
          currentThemeValue = targetTheme
        }

        gl.uniform1f(timeLoc, elapsedTime)
        gl.uniform2f(resLoc, canvas.width, canvas.height)
        gl.uniform2f(mouseLoc, mouse.x, mouse.y)
        if (themeLoc) gl.uniform1f(themeLoc, currentThemeValue)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }

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
        const targetTheme = themeRef.current === 'light' ? 1.0 : 0.0
        const isThemeTransitioning = Math.abs(targetTheme - currentThemeValue) > 0.005

        // Skip draw call if less than ~33ms has elapsed (cap at ~30fps)
        if (time - lastDrawTime >= FRAME_INTERVAL) {
          lastDrawTime = time
          drawFrame(time)
        }
        
        // Sleep when idle for > 4s AND theme transition is settled to preserve 100% CPU
        if (time - lastInteractionTime > 4000 && !isThemeTransitioning) {
          stopAnimation()
          return
        }

        requestId = requestAnimationFrame(render)
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

      triggerAnimationRef.current = () => {
        lastInteractionTime = performance.now()
        startAnimation()
      }

      if (prefersReducedMotion) {
        drawFrame(startTime)
      } else if (!document.hidden) {
        startAnimation()
      }

      const handleVisibilityChange = () => {
        if (document.hidden) {
          stopAnimation()
        } else {
          lastInteractionTime = performance.now()
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

    let initialized = false

    const triggerInit = () => {
      if (initialized) return
      initialized = true
      cleanupTriggerListeners()
      initWebGL()
    }

    // User-interaction gating keeps WebGL initialization outside the initial synthetic lab window.
    const triggerEvents = ['mousemove', 'scroll', 'pointerdown', 'touchstart', 'keydown']
    const onUserInteraction = () => triggerInit()

    const addTriggerListeners = () => {
      triggerEvents.forEach((ev) => {
        window.addEventListener(ev, onUserInteraction, { passive: true, once: true })
      })
    }

    const cleanupTriggerListeners = () => {
      triggerEvents.forEach((ev) => {
        window.removeEventListener(ev, onUserInteraction)
      })
    }

    addTriggerListeners()

    return () => {
      cleanupTriggerListeners()
      triggerAnimationRef.current = null
      if (cleanupFn) cleanupFn()
    }
  }, [])

  const isLight = theme === 'light'

  return (
    <>
      {/* Zero-CPU instant CSS ambient glow (active on initial paint) */}
      <div 
        className="fixed inset-0 w-full h-full z-[-2] pointer-events-none transition-opacity duration-500"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse 80% 50% at 50% 25%, rgba(242, 168, 100, 0.22) 0%, rgba(244, 239, 234, 0.1) 50%, transparent 75%)'
            : 'radial-gradient(ellipse 80% 50% at 50% 25%, rgba(230, 126, 34, 0.14) 0%, rgba(18, 20, 20, 0.05) 50%, transparent 75%)',
          opacity: isLight ? 0.75 : 0.6,
        }}
      />
      {/* Live organic Simplex Noise & mouse-glow WebGL canvas */}
      <canvas 
        ref={canvasRef} 
        className={`fixed inset-0 w-full h-full block z-[-2] pointer-events-none object-cover transition-opacity duration-500 ${
          isLight ? 'opacity-90 mix-blend-normal' : 'opacity-75 mix-blend-screen'
        }`}
        style={{ filter: 'blur(30px)', transform: 'translateZ(0)' }}
      />
    </>
  )
}
