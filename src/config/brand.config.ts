import type { BrandConfig } from '../types/brand'

/**
 * Default GENZLOG Brand Identity settings.
 * Points to the supplied official GENZLOG logo asset with automatic fallback to text wordmark.
 */
export const defaultBrandConfig: BrandConfig = {
  name: 'GENZLOG',
  brandName: 'GENZLOG',
  showLogo: true,
  logoSrc: '/genzlog-logo.png',
  logoUrl: '/genzlog-logo.png',
  tagline: 'Developer Design Systems',
  alt: 'GENZLOG',
  logoAlt: 'GENZLOG logo',
}
