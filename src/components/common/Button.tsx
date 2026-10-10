import React from 'react'
import { cn } from '../../utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const variantStyles = {
      primary:
        'bg-white text-black hover:bg-neutral-200 active:bg-neutral-300 border border-white',
      secondary:
        'bg-[#111111] text-white hover:bg-[#1a1a1a] active:bg-[#222222] border border-[#303030]',
      outline:
        'bg-transparent text-white border border-[#303030] hover:border-white/60 hover:bg-white/[0.03]',
      ghost:
        'bg-transparent text-[#A3A3A3] hover:text-white hover:bg-white/[0.04] border border-transparent',
    }[variant]

    const sizeStyles = {
      sm: 'h-8 px-3 text-xs tracking-wider font-mono',
      md: 'h-10 px-4 text-xs tracking-widest font-mono uppercase',
      lg: 'h-12 px-6 text-sm tracking-widest font-mono uppercase',
    }[size]

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white',
          variantStyles,
          sizeStyles,
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
