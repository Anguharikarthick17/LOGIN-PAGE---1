import React from 'react'
import { cn } from '../../utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'outline' | 'filled' | 'subtle'
  size?: 'sm' | 'md'
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'outline',
  size = 'md',
  ...props
}) => {
  const variantStyles = {
    outline: 'border border-[#303030] text-[#A3A3A3] bg-transparent',
    filled: 'border border-transparent bg-[#111111] text-white',
    subtle: 'border border-[#303030] bg-[#111111]/80 text-white',
  }[variant]

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-widest',
  }[size]

  return (
    <span
      className={cn(
        'inline-flex items-center uppercase font-mono font-medium select-none transition-colors duration-150',
        variantStyles,
        sizeStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
