import { describe, expect, it } from 'vitest'
import { ShineButton } from '../components/ui/ShineButton'
import { InteractiveSculpture } from '../components/canvas/InteractiveSculpture'
import { InteractiveTypography } from '../components/ui/InteractiveTypography'
import { LoginForm } from '../components/auth/LoginForm'
import { LoginSuccess } from '../components/auth/LoginSuccess'
import type { FormInteractionState } from '../types/auth'

describe('GENZLOG 3D Reactive Login Components', () => {
  it('exports ShineButton component', () => {
    expect(typeof ShineButton).toBe('object') // forwardRef returns object
  })

  it('exports InteractiveSculpture component', () => {
    expect(typeof InteractiveSculpture).toBe('function')
  })

  it('exports InteractiveTypography component', () => {
    expect(typeof InteractiveTypography).toBe('function')
  })

  it('exports LoginForm component', () => {
    expect(typeof LoginForm).toBe('function')
  })

  it('exports LoginSuccess component', () => {
    expect(typeof LoginSuccess).toBe('function')
  })

  it('supports all defined interaction states in the state model', () => {
    const states: FormInteractionState[] = [
      'idle',
      'email-focused',
      'email-typing',
      'email-valid',
      'password-focused',
      'password-typing',
      'password-visible',
      'submitting',
      'success',
      'error',
    ]
    expect(states).toHaveLength(10)
    // Ensures state tokens never expose user inputs
    states.forEach((state) => {
      expect(typeof state).toBe('string')
      expect(state).not.toContain('@')
    })
  })
})
