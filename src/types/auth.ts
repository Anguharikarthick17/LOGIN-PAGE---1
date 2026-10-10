import { z } from 'zod'
import type { BrandConfig } from './brand'

/**
 * Zod validation schema for login credentials
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address (e.g. name@domain.com)'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must contain at least 8 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

/**
 * Strongly typed interaction state model connecting the form to the 3D scene.
 * Personal information (email string, password chars, length) is NEVER passed.
 */
export type FormInteractionState =
  | 'idle'
  | 'email-focused'
  | 'email-typing'
  | 'email-valid'
  | 'password-focused'
  | 'password-typing'
  | 'password-visible'
  | 'submitting'
  | 'success'
  | 'error'

export type DemoAuthState =
  | { status: 'idle' }
  | { status: 'loading' }
  | {
      status: 'demo-success'
      submittedEmail: string
      message: string
    }

export interface VariantProps {
  /** Configurable brand identity settings */
  brand?: Partial<BrandConfig>
  /** Legacy alias for brand settings */
  brandConfig?: Partial<BrandConfig>
  /** Optional container class name */
  className?: string
  /** Callback on demo submit if parent wants to observe */
  onDemoSubmit?: (values: LoginFormValues) => void
}
