import { describe, expect, it } from 'vitest'
import { loginSchema } from '../types/auth'

describe('Login Validation Schema (Zod)', () => {
  it('accepts valid credentials with standard email and 8+ char password', () => {
    const valid = {
      email: 'founder@genzlog.dev',
      password: 'password123',
    }
    const result = loginSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('rejects empty email with required message', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/required/i)
    }
  })

  it('rejects invalid email formats', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/valid email/i)
    }
  })

  it('rejects passwords shorter than 8 characters', () => {
    const result = loginSchema.safeParse({
      email: 'founder@genzlog.dev',
      password: 'short',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/at least 8 characters/i)
    }
  })
})
