'use client'

import { useEffect, type RefObject } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

interface ModalFocusOptions {
  active: boolean
  containerRef: RefObject<HTMLElement | null>
  initialFocusRef?: RefObject<HTMLElement | null>
  onEscape: () => void
}

export function useModalFocus({
  active,
  containerRef,
  initialFocusRef,
  onEscape,
}: ModalFocusOptions) {
  useEffect(() => {
    if (!active || !containerRef.current) return

    const container = containerRef.current
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null

    const getFocusableItems = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) => element.getClientRects().length > 0,
      )

    const focusFrame = window.requestAnimationFrame(() => {
      const initialTarget = initialFocusRef?.current ?? getFocusableItems()[0] ?? container
      initialTarget.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onEscape()
        return
      }

      if (event.key !== 'Tab') return

      const focusableItems = getFocusableItems()
      if (focusableItems.length === 0) {
        event.preventDefault()
        event.stopPropagation()
        container.focus()
        return
      }

      const firstItem = focusableItems[0]
      const lastItem = focusableItems[focusableItems.length - 1]
      const activeElement = document.activeElement

      if (!container.contains(activeElement)) {
        event.preventDefault()
        event.stopPropagation()
        firstItem.focus()
      } else if (event.shiftKey && activeElement === firstItem) {
        event.preventDefault()
        event.stopPropagation()
        lastItem.focus()
      } else if (!event.shiftKey && activeElement === lastItem) {
        event.preventDefault()
        event.stopPropagation()
        firstItem.focus()
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      container.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocused && document.contains(previouslyFocused)) {
        window.requestAnimationFrame(() => previouslyFocused.focus())
      }
    }
  }, [active, containerRef, initialFocusRef, onEscape])
}
