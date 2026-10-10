import { describe, expect, it } from 'vitest'
import { projectMeta } from '../config/project.config'

describe('Project #001 Identity', () => {
  it('identifies as PROJECT #001 for brand GENZLOG', () => {
    expect(projectMeta.number).toBe('#001')
    expect(projectMeta.brand).toBe('GENZLOG')
    expect(projectMeta.name).toBe('LOGIN PAGE')
  })

  it('contains exactly the three defined login archetypes', () => {
    const ids = projectMeta.variants.map((v) => v.id)
    expect(ids).toEqual(['noir', 'prism', 'shift'])
  })
})
