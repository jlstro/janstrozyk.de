'use client'

import { useEffect } from 'react'

interface ImprintModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ImprintModal({ isOpen, onClose }: ImprintModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
        
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
          Imprint
        </h3>
        
        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <p>
            Jan Strozyk<br />
            c/o IDIO Daten Import Export GmbH<br />
            Gottschedstr. 4<br />
            13357 Berlin<br />
          </p>
          <p>
            jan [at] dataresearchcenter [dot] org
          </p>
        </div>
      </div>
    </div>
  )
}