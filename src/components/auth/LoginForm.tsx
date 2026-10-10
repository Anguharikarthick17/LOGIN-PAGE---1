import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/Input'
import { ShineButton } from '../ui/ShineButton'
import {
  loginSchema,
  type LoginFormValues,
  type FormInteractionState,
} from '../../types/auth'
import { cn } from '../../utils/cn'
import { ArrowRight } from 'lucide-react'

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void> | void
  isSubmitting?: boolean
  onInteractionStateChange?: (state: FormInteractionState) => void
  className?: string
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isSubmitting = false,
  onInteractionStateChange,
  className,
}) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleFormSubmit = async (data: LoginFormValues) => {
    onInteractionStateChange?.('submitting')
    try {
      await onSubmit(data)
    } catch {
      onInteractionStateChange?.('error')
    }
  }

  const handleInvalidSubmit = () => {
    onInteractionStateChange?.('error')
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, handleInvalidSubmit)}
      className={cn('w-full space-y-6 text-left', className)}
      noValidate
    >
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white font-sans">
          Sign in
        </h2>
        <p className="text-sm text-[#A3A3A3] font-sans">
          Enter your credentials to access the workspace.
        </p>
      </div>

      <div className="space-y-4 pt-1">
        <Input
          label="Email Address"
          placeholder="name@company.com"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register('email', {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value
              const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
              if (isValidFormat) {
                onInteractionStateChange?.('email-valid')
              } else {
                onInteractionStateChange?.('email-typing')
              }
            },
          })}
          onFocus={() => onInteractionStateChange?.('email-focused')}
          onBlur={async () => {
            const isValid = await trigger('email')
            if (isValid) {
              onInteractionStateChange?.('email-valid')
            } else {
              onInteractionStateChange?.('idle')
            }
          }}
        />

        <Input
          label="Password"
          placeholder="••••••••••••"
          isPassword
          autoComplete="current-password"
          hint="Min. 8 characters"
          error={errors.password?.message}
          disabled={isSubmitting}
          {...register('password', {
            onChange: () => {
              onInteractionStateChange?.('password-typing')
            },
          })}
          onFocus={() => onInteractionStateChange?.('password-focused')}
          onBlur={() => onInteractionStateChange?.('idle')}
          onPasswordVisibilityChange={() => {
            onInteractionStateChange?.('password-visible')
          }}
        />
      </div>

      <div className="pt-3">
        <ShineButton
          type="submit"
          isLoading={isSubmitting}
          loadingText="Authenticating..."
          className="group"
        >
          <span>Sign In</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </ShineButton>
      </div>
    </form>
  )
}
