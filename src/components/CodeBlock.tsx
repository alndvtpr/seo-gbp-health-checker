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
      className={`rounded-2xl bg-surface-1 border border-black/10 dark:border-white/10 overflow-hidden my-6 shadow-xl relative group font-sans ${className}`}
    >
      {/* Code Header Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 bg-surface-2/90 px-3 py-2.5 text-xs sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex items-center gap-1.5 opacity-60">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          {filename ? (
            <span className="truncate pl-2 font-heading font-semibold text-on-surface/80">
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
          className={`inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1 font-heading text-xs font-bold uppercase tracking-[0.06em] transition-all ${
            copied
              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
              : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/15 text-on-surface/80 hover:text-on-surface border border-black/10 dark:border-white/10'
          }`}
        >
          {copied ? (
            <>
              <Icon name="check" size={14} className="text-emerald-700 dark:text-emerald-400" />
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
      <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-100 leading-relaxed bg-[#0b0d0e]/95">
        <pre className="m-0 p-0 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock
