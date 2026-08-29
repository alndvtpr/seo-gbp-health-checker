'use client'

import { useState, useEffect } from 'react'

/**
 * Animated SVG circular progress ring.
 * Uses stroke-dashoffset animation to draw the arc on mount / score change.
 */
export function CircularProgressRing({
  score,
  grade,
}: {
  score: number
  grade: string
}) {
  const radius = 68
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const [offset, setOffset] = useState(circumference)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (score / 100) * circumference)
    }, 100)
    return () => clearTimeout(timer)
  }, [score, circumference])

  const ringColor =
    score >= 70
      ? '#4ade80'
      : score >= 40
        ? '#ffb783'
        : '#f87171'

  const gradeColor =
    score >= 70 ? 'text-emerald-400' : score >= 40 ? 'text-primary-container' : 'text-rose-400'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="drop-shadow-[0_0_20px_rgba(255,183,131,0.15)]"
          aria-label={`GBP score: ${score} out of 100`}
        >
          <circle
            stroke="rgba(255,255,255,0.06)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={ringColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
            style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease' }}
          />
          <text
            x={radius}
            y={radius - 7}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="24"
            fontWeight="800"
            fontFamily="var(--font-jakarta), sans-serif"
          >
            {score}
          </text>
          <text
            x={radius}
            y={radius + 15}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="10"
            fontFamily="var(--font-inter), sans-serif"
            fontWeight="600"
          >
            SCORE / 100
          </text>
        </svg>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
        <span className="text-[10px] uppercase font-heading font-bold text-on-surface/50 tracking-wider">
          Rating
        </span>
        <span className={`font-heading font-extrabold text-sm ${gradeColor}`}>
          {grade}
        </span>
      </div>
    </div>
  )
}
