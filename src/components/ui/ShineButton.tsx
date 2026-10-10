import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface ShineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  children: React.ReactNode
}

/**
 * Refined Monochrome Submit Button.
 * Features high-contrast black-and-white styling with a subtle traveling specular highlight,
 * tactile active feedback, and loading state lock.
 */
export const ShineButton = React.forwardRef<HTMLButtonElement, ShineButtonProps>(
  (
    {
      className,
      isLoading = false,
      loadingText = 'Authenticating...',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'relative w-full h-12 px-6 overflow-hidden select-none cursor-pointer',
          'bg-white text-black font-semibold text-xs tracking-widest uppercase font-mono',
          'border border-white shadow-[0_2px_15px_rgba(255,255,255,0.12)]',
          'transition-all duration-150 ease-out',
          'hover:bg-[#EAEAEA] hover:shadow-[0_4px_22px_rgba(255,255,255,0.22)] hover:-translate-y-0.5',
          'active:translate-y-0 active:scale-[0.985] active:shadow-[0_1px_8px_rgba(255,255,255,0.08)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none',
          className
        )}
        {...props}
      >
        {/* Subtle traveling monochromatic specular sweep */}
        {!isLoading && !disabled && (
          <span
            className="absolute inset-0 w-1/2 h-full pointer-events-none bg-gradient-to-r from-transparent via-white/50 to-transparent animate-button-shine"
            aria-hidden="true"
          />
        )}

        {/* Content Container */}
        <span className="relative z-10 flex items-center justify-center gap-2.5 font-semibold text-black">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-black" aria-hidden="true" />
              <span className="tracking-wider">{loadingText}</span>
            </>
          ) : (
            children
          )}
        </span>
      </button>
    )
  }
)

ShineButton.displayName = 'ShineButton'
