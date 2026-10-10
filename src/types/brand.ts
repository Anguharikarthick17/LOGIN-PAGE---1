/**
 * Brand configuration options for GENZLOG templates and kits.
 * Separated from specific design variants to ensure high reusability.
 */
export interface BrandConfig {
  /** The displayed brand name text */
  name: string
  /** Whether the visual logo symbol or image is visible */
  showLogo: boolean
  /** Path to the brand logo image asset (e.g. /genzlog-logo.png) */
  logoSrc?: string
  /** Optional secondary subtitle or tagline */
  tagline?: string
  /** Accessible alt text for custom logo image */
  alt?: string

  /** Backward-compatible aliases */
  brandName?: string
  logoUrl?: string
  logoAlt?: string
}

export interface BrandIdentityProps {
  /** Optional override for default brand configuration */
  brand?: Partial<BrandConfig>
  /** Deprecated config prop alias */
  config?: Partial<BrandConfig>
  /** Additional styling container classes */
  className?: string
  /** Size variant for wordmark/logo */
  size?: 'sm' | 'md' | 'lg'
  /** Whether to render the tagline text alongside brand name */
  showTagline?: boolean
}
