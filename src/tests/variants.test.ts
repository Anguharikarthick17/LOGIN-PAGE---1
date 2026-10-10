import { describe, expect, it } from 'vitest'
import { NoirLogin } from '../variants/noir'
import { PrismLogin } from '../variants/prism'
import { ShiftLogin } from '../variants/shift'

describe('Login Variants Export & Definition', () => {
  it('exports NoirLogin component function', () => {
    expect(typeof NoirLogin).toBe('function')
  })

  it('exports PrismLogin component function', () => {
    expect(typeof PrismLogin).toBe('function')
  })

  it('exports ShiftLogin component function', () => {
    expect(typeof ShiftLogin).toBe('function')
  })
})
