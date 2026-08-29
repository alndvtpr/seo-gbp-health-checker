'use client'

import { useEffect } from 'react'

export interface ToastProps {
  message: string
  type?: 'error' | 'success'
  onClose: () => void
}

/**
 * Auto-dismissing toast notification.
 */
export function Toast({
  message,
  type = 'error',
  onClose,
}: {
  message: string
  type?: 'error' | 'success'
  onClose: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [onClose])

  const bgStyle =
    type === 'success'
      ? 'bg-emerald-500/95 border-emerald-400/40 text-white'
      : 'bg-rose-500/95 border-rose-400/40 text-white'

  return (
    <div
      role="alert"
      className={`fixed bottom-6 right-6 z-[1000000] max-w-sm flex items-center gap-3 px-4 py-3 rounded-xl border ${bgStyle} text-xs font-medium shadow-2xl animate-in fade-in slide-in-from-bottom-5`}
    >
      <span className="text-base">{type === 'success' ? '✓' : '⚠'}</span>
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="opacity-70 hover:opacity-100 transition-opacity text-base leading-none cursor-pointer"
      >
        ×
      </button>
    </div>
  )
}
