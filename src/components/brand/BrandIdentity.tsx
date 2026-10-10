import React, { useState } from 'react'
import { defaultBrandConfig } from '../../config/brand.config'
import type { BrandConfig, BrandIdentityProps } from '../../types/brand'
import { cn } from '../../utils/cn'

/**
 * Reusable GENZLOG Brand Identity component.
 * Displays the authentic GENZLOG logo by default with natural aspect ratio.
 * Supports configurable brand overrides, hiding the logo, or replacing with custom logo URLs.
 * Automatically falls back to the clean geometric text wordmark if image fails to load.
 */
export const BrandIdentity: React.FC<BrandIdentityProps> = ({
  brand,
  config,
  className,
  size = 'md',
  showTagline = false,
}) => {
  const [imageError, setImageError] = useState(false)

  // Merge overrides, supporting both 'brand' and legacy 'config' prop
  const override = brand ?? config ?? {}
  const merged: BrandConfig = {
    ...defaultBrandConfig,
    ...override,
    name: override.name ?? override.brandName ?? defaultBrandConfig.name,
    logoSrc: override.logoSrc ?? override.logoUrl ?? defaultBrandConfig.logoSrc,
    alt: override.alt ?? override.logoAlt ?? defaultBrandConfig.alt,
  }

  if (!merged.showLogo) {
    return null
  }

  const sizeClasses = {
    sm: {
      wrap: 'gap-2 text-xs',
      logo: 'h-6 w-6',
      mark: 'h-5 w-5 text-[10px]',
      name: 'text-xs tracking-wider',
    },
    md: {
      wrap: 'gap-2.5 text-sm',
      logo: 'h-7 w-7',
      mark: 'h-6 w-6 text-xs',
      name: 'text-xs tracking-widest',
    },
    lg: {
      wrap: 'gap-3 text-base',
      logo: 'h-8 w-8',
      mark: 'h-8 w-8 text-sm',
      name: 'text-sm tracking-widest',
    },
  }[size]

  const activeLogoSrc = merged.logoSrc

  return (
    <div
      className={cn(
        'inline-flex items-center select-none font-mono text-white',
        sizeClasses.wrap,
        className
      )}
      data-testid="brand-identity"
    >
      {activeLogoSrc && !imageError ? (
        <img
          src={activeLogoSrc}
          alt={merged.alt ?? merged.name}
          className={cn(
            'object-contain shrink-0 aspect-square select-none pointer-events-none transition-opacity duration-200',
            sizeClasses.logo
          )}
          onError={() => setImageError(true)}
        />
      ) : (
        /* Typographic fallback wordmark */
        <span
          className={cn(
            'flex items-center justify-center font-bold font-mono border border-[#303030] bg-[#111111] text-white select-none shrink-0',
            sizeClasses.mark
          )}
          aria-hidden="true"
        >
          G
        </span>
      )}
      <span className={cn('font-bold font-sans uppercase text-white tracking-widest', sizeClasses.name)}>
        {merged.name}
      </span>
      {showTagline && merged.tagline && (
        <span className="hidden sm:inline-block text-[11px] text-[#A3A3A3] font-normal font-sans border-l border-[#303030] pl-2.5 tracking-normal">
          {merged.tagline}
        </span>
      )}
    </div>
  )
}
