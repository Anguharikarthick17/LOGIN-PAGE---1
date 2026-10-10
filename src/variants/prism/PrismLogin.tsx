import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BrandIdentity } from '../../components/brand/BrandIdentity'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/ui/Input'
import { loginSchema, type LoginFormValues, type VariantProps } from '../../types/auth'
import { cn } from '../../utils/cn'
import { Loader2, Lock, Info } from 'lucide-react'

/**
 * PRISM — Variant 02
 * Layered Translucent Surfaces & Dimensional Glass Depth
 */
export const PrismLogin: React.FC<VariantProps> = ({
  brand,
  brandConfig,
  className,
  onDemoSubmit,
}) => {
  const [demoNotice, setDemoNotice] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setDemoNotice(null)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setDemoNotice(
      `Demo submission verified for ${data.email}. Real authentication requires backend integration.`
    )
    onDemoSubmit?.(data)
  }

  const activeBrand = brand ?? brandConfig

  return (
    <div
      className={cn(
        'min-h-[100svh] w-full flex items-center justify-center bg-[#050505] p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden',
        className
      )}
      data-testid="login-prism"
    >
      {/* Subtle ambient light gradient providing depth behind translucent glass card */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none -top-24 -left-24"
        aria-hidden="true"
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-white/[0.015] blur-[100px] pointer-events-none -bottom-20 -right-20"
        aria-hidden="true"
      />

      {/* Layer 01: Ambient boundary surface */}
      <div className="relative z-10 w-full max-w-md p-1.5 sm:p-2 bg-[#161616]/40 border border-[#303030]/60 backdrop-blur-sm shadow-2xl">
        {/* Layer 02: Central Elevated Glass Card */}
        <div className="bg-[#111111]/90 backdrop-blur-2xl border border-[#303030] p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] space-y-7">
          {/* Brand Identity Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#303030]/80">
            <BrandIdentity brand={activeBrand} size="md" />
          </div>

          <div className="space-y-1.5 text-left">
            <h1 className="text-2xl font-medium tracking-tight text-white font-sans">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-[#A3A3A3]">
              Authenticate to access your secure console.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 text-left"
            noValidate
          >
            <Input
              label="Account Email"
              placeholder="operator@company.com"
              type="email"
              autoComplete="email"
              inputClassName="bg-[#050505]/80 backdrop-blur-md border-[#303030] focus:border-white"
              error={errors.email?.message}
              disabled={isSubmitting}
              {...register('email')}
            />

            <Input
              label="Password"
              placeholder="••••••••••••"
              isPassword
              autoComplete="current-password"
              hint="Min. 8 characters"
              inputClassName="bg-[#050505]/80 backdrop-blur-md border-[#303030] focus:border-white"
              error={errors.password?.message}
              disabled={isSubmitting}
              {...register('password')}
            />

            {/* Restrained Temporary Inline Demo Feedback */}
            {demoNotice && (
              <div
                role="status"
                aria-live="polite"
                className="p-3.5 border border-[#303030] bg-[#050505]/90 text-xs text-[#A3A3A3] flex items-start gap-2.5 animate-in fade-in"
              >
                <Info className="h-4 w-4 text-white shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-white font-medium block">Demonstration Notice</span>
                  <span className="leading-relaxed">{demoNotice}</span>
                </div>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 transition-all shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verifying session...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 text-black" />
                    <span>Sign in</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
