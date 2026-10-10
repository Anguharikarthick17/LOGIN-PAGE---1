import React, { useState, useId } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  isPassword?: boolean
  inputClassName?: string
  onPasswordVisibilityChange?: (isVisible: boolean) => void
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      hint,
      isPassword = false,
      type = 'text',
      className,
      inputClassName,
      disabled,
      onPasswordVisibilityChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const generatedId = useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type

    const togglePassword = () => {
      setShowPassword((prev) => {
        const next = !prev
        onPasswordVisibilityChange?.(next)
        return next
      })
    }

    return (
      <div className={cn('space-y-1.5 text-left w-full', className)}>
        <div className="flex items-center justify-between">
          <label
            htmlFor={inputId}
            className="text-xs font-mono uppercase tracking-widest text-[#A3A3A3] select-none block"
          >
            {label}
          </label>
          {hint && !error && (
            <span id={hintId} className="text-[10px] font-mono text-[#737373]">
              {hint}
            </span>
          )}
        </div>

        <div className="relative flex items-center group">
          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={cn(
              'w-full h-11 px-3.5 bg-[#111111] border border-[#303030] text-xs font-mono text-white placeholder:text-[#525252] rounded-none transition-all duration-150',
              'hover:border-[#444444]',
              'focus:outline-none focus:border-white focus:bg-[#161616] focus:ring-1 focus:ring-white',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              error && 'border-red-500/80 focus:border-red-400 focus:ring-red-400',
              isPassword && 'pr-11',
              inputClassName
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={togglePassword}
              disabled={disabled}
              className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-[#737373] hover:text-white transition-colors cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:text-white"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={0}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 shrink-0 transition-transform active:scale-90" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4 shrink-0 transition-transform active:scale-90" aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        {/* Fixed height container to prevent layout shifts when validation errors appear */}
        <div className="h-4 flex items-center">
          {error && (
            <p
              id={errorId}
              role="alert"
              className="text-[11px] font-mono text-red-400 animate-in fade-in duration-150"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'
