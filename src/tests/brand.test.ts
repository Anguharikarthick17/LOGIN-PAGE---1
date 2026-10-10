import { describe, expect, it } from 'vitest'
import { defaultBrandConfig } from '../config/brand.config'
import type { BrandConfig } from '../types/brand'

describe('Brand Configuration', () => {
  it('has default brand name set to GENZLOG', () => {
    expect(defaultBrandConfig.name).toBe('GENZLOG')
    expect(defaultBrandConfig.brandName).toBe('GENZLOG')
  })

  it('defaults to showLogo = true', () => {
    expect(defaultBrandConfig.showLogo).toBe(true)
  })

  it('points to the verified supplied logo asset', () => {
    expect(defaultBrandConfig.logoSrc).toBe('/genzlog-logo.png')
  })

  it('supports overriding brand name and hiding logo', () => {
    const custom: BrandConfig = {
      ...defaultBrandConfig,
      name: 'ACME LABS',
      showLogo: false,
    }
    expect(custom.name).toBe('ACME LABS')
    expect(custom.showLogo).toBe(false)
  })
})
