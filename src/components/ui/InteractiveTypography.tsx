import React, { useEffect, useState } from 'react'
import { cn } from '../../utils/cn'

export interface InteractiveTypographyProps {
  className?: string
}

export const InteractiveTypography: React.FC<InteractiveTypographyProps> = ({ className }) => {
  const fullSubtext = 'One secure entry. Your next move.'
  const [displayedSubtext, setDisplayedSubtext] = useState('')
  const [headlineVisible, setHeadlineVisible] = useState(false)

  useEffect(() => {
    // Fade in headline first
    const headlineTimer = setTimeout(() => {
      setHeadlineVisible(true)
    }, 150)

    // Typewriter effect for supporting line
    let index = 0
    const typingTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index <= fullSubtext.length) {
          setDisplayedSubtext(fullSubtext.slice(0, index))
          index++
        } else {
          clearInterval(interval)
        }
      }, 35)

      return () => clearInterval(interval)
    }, 700)

    return () => {
      clearTimeout(headlineTimer)
      clearTimeout(typingTimer)
    }
  }, [fullSubtext])

  return (
    <div className={cn('space-y-3 text-left select-none', className)}>
      <h1
        className={cn(
          'text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white font-sans leading-[1.08] transition-all duration-700 ease-out',
          headlineVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3'
        )}
      >
        Access your world<span className="text-[#A3A3A3]">.</span>
      </h1>

      <p className="text-sm sm:text-base text-[#A3A3A3] font-sans h-6 flex items-center">
        <span>{displayedSubtext}</span>
        {displayedSubtext.length < fullSubtext.length && (
          <span className="inline-block w-1.5 h-4 ml-1 bg-white animate-blink" aria-hidden="true" />
        )}
      </p>
    </div>
  )
}
