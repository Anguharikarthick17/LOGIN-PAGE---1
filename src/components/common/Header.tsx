import React from 'react'
import { BrandIdentity } from '../brand/BrandIdentity'
import { Badge } from './Badge'
import { cn } from '../../utils/cn'

export interface HeaderProps {
  className?: string
  projectNumber?: string
  projectName?: string
}

export const Header: React.FC<HeaderProps> = ({
  className,
  projectNumber = 'PROJECT #001',
  projectName = 'LOGIN PAGE',
}) => {
  return (
    <header
      className={cn(
        'w-full border-b border-[#303030] bg-[#050505]/95 backdrop-blur-md sticky top-0 z-40',
        className
      )}
      data-testid="project-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand identity on left */}
        <div className="flex items-center gap-3">
          <BrandIdentity size="md" />
        </div>

        {/* Center / Right project identification */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#A3A3A3]">
            <span>COLLECTION</span>
            <span className="text-[#303030]">/</span>
            <span className="text-white font-medium">{projectName}</span>
          </div>

          <Badge variant="subtle" size="md">
            {projectNumber}
          </Badge>

          <Badge variant="outline" size="sm" className="hidden sm:inline-flex text-[#A3A3A3]">
            UI KIT
          </Badge>
        </div>
      </div>
    </header>
  )
}
