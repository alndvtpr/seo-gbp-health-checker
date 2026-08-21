'use client'

import React, { useState } from 'react'
import { Icon } from '@/components/icons'

export interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  className?: string
}

export function CodeBlock({
  code,
  language = 'json',
  filename,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code to clipboard', err)
    }
  }

  return (
    <div
      className={`rounded-2xl bg-surface-1 border border-white/10 overflow-hidden my-6 shadow-xl relative group font-sans ${className}`}
    >
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-2/90 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 opacity-60">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          {filename ? (
            <span className="font-heading font-semibold text-on-surface/80 pl-2">
              {filename}
            </span>
          ) : (
            <span className="font-heading font-semibold uppercase tracking-[0.08em] text-[10px] text-primary-container pl-2">
              {language}
            </span>
          )}
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Code snippet copied' : 'Copy code snippet to clipboard'}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-heading font-bold uppercase tracking-[0.06em] transition-all cursor-pointer ${
            copied
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-white/5 hover:bg-white/15 text-on-surface/80 hover:text-on-surface border border-white/10'
          }`}
        >
          {copied ? (
            <>
              <Icon name="check" size={14} className="text-emerald-400" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Icon name="content_copy" size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body Container */}
      <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-on-surface/90 leading-relaxed bg-[#0b0d0e]/90">
        <pre className="m-0 p-0 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock
