import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-surface-container-low text-on-surface-variant py-12 mt-24 border-t border-on-surface/5">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-headline-md font-bold text-on-surface">Dave<span className="text-primary">.</span></span>
          <p className="text-body-md">&copy; {new Date().getFullYear()} Alain Dave Tapiru. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors text-body-lg font-medium">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors text-body-lg font-medium">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors text-body-lg font-medium">Email</a>
        </div>
      </div>
    </footer>
  )
}
