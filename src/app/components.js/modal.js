"use client"

import { useEffect } from "react"
import { X } from 'lucide-react'

export default function PhotoModal({ isOpen, onClose, setIsOpen, artistLogoOptions, keyWordsPhrases }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-10 text-gray-600 hover:text-black bg-white/80 hover:bg-white p-1 rounded-full transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Artist Logo Options</h2>
        
        {keyWordsPhrases && keyWordsPhrases.length > 0 ? (
  keyWordsPhrases.map((keyWord, index) => (
    <p key={index}>{keyWord}</p>
  ))
) : (
  <p>No keywords or phrases available</p>
)}

        {artistLogoOptions?.length > 0 ? (
          <div className="flex flex-col gap-y-6">
            {artistLogoOptions.map(({ artistLogoOption, url, colorsToReccomend }) => (
              <div key={artistLogoOption[0]} className="border rounded-lg p-4 bg-gray-50 shadow">
                <p className="text-center mb-2 font-medium">{`Option ${artistLogoOption[0]}`}</p>
                <img
                  src={url}
                  alt={`Artist logo ${artistLogoOption[0]}`}
                  className="mx-auto object-contain max-h-[60vh] rounded"
                />
                <p>{colorsToReccomend}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">No artist logo options available.</div>
        )}
      </div>
    </div>
  )
}
