import { describe, expect, it } from 'vitest'
import { cn } from '../utils/cn'

describe('cn utility', () => {
  it('combines multiple class names', () => {
    const result = cn('bg-black', 'text-white')
    expect(result).toBe('bg-black text-white')
  })

  it('resolves conflicting Tailwind classes by giving precedence to the latter', () => {
    const result = cn('p-4', 'p-8')
    expect(result).toBe('p-8')
  })

  it('filters out falsy and undefined values', () => {
    const isHidden = false
    const result = cn('font-mono', isHidden && 'hidden', undefined, null, 'text-xs')
    expect(result).toBe('font-mono text-xs')
  })
})
