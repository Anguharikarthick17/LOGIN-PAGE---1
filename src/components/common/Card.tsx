import React from 'react'
import { cn } from '../../utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'translucent' | 'bordered'
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'solid',
  children,
  ...props
}) => {
  const variantStyles = {
    solid: 'bg-[#111111] border border-[#303030]',
    translucent: 'bg-[#111111]/70 backdrop-blur-md border border-[#303030]/80',
    bordered: 'bg-[#050505] border border-[#303030]',
  }[variant]

  return (
    <div
      className={cn(
        'text-white transition-colors duration-200',
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
