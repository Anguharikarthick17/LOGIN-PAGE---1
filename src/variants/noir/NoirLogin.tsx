import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BrandIdentity } from '../../components/brand/BrandIdentity'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/ui/Input'
import { loginSchema, type LoginFormValues, type VariantProps } from '../../types/auth'
import { cn } from '../../utils/cn'
import { Loader2, ArrowRight, Info } from 'lucide-react'

/**
 * NOIR — Variant 01
 * Premium Editorial Minimalism & Split-Screen Composition
 */
export const NoirLogin: React.FC<VariantProps> = ({
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
    // Brief realistic transition
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
        'min-h-[100svh] w-full grid grid-cols-1 lg:grid-cols-12 bg-[#050505] text-white',
        className
      )}
      data-testid="login-noir"
    >
      {/* 1. Left Editorial Showcase (Desktop) */}
      <aside className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 xl:p-16 border-r border-[#303030] bg-[#0c0c0c]/60 select-none">
        <div>
          <BrandIdentity brand={activeBrand} size="md" />
        </div>

        <div className="space-y-6 max-w-sm text-left my-auto py-12">
          <h2 className="text-4xl xl:text-5xl font-light tracking-tight text-white font-sans leading-[1.12]">
            Elegance in restraint.
          </h2>
          <p className="text-sm text-[#A3A3A3] font-sans leading-relaxed">
            A disciplined authentication experience crafted for digital products that value silence, typography, and precision.
          </p>
        </div>

        <div className="text-xs font-mono text-[#737373] tracking-wider uppercase">
          GENZLOG © {new Date().getFullYear()}
        </div>
      </aside>

      {/* 2. Main Form Canvas (Desktop & Mobile) */}
      <main className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-24 min-h-[100svh] lg:min-h-0 overflow-y-auto">
        {/* Mobile Header Brand (Only on mobile so brand is not duplicated) */}
        <div className="lg:hidden flex items-center justify-between pb-8">
          <BrandIdentity brand={activeBrand} size="md" />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto my-auto space-y-8 text-left py-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-sans">
              Sign in to your account
            </h1>
            <p className="text-xs sm:text-sm text-[#A3A3A3]">
              Enter your email and password to access the platform.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <Input
              label="Email"
              placeholder="name@company.com"
              type="email"
              autoComplete="email"
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
              error={errors.password?.message}
              disabled={isSubmitting}
              {...register('password')}
            />

            {/* Restrained Temporary Inline Demo Feedback */}
            {demoNotice && (
              <div
                role="status"
                aria-live="polite"
                className="p-3.5 border border-[#303030] bg-[#111111] text-xs text-[#A3A3A3] flex items-start gap-2.5 animate-in fade-in"
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
                className="w-full flex items-center justify-center gap-2 group transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Mobile subtle footer */}
        <div className="lg:hidden text-center pt-8 text-xs font-mono text-[#737373]">
          GENZLOG © {new Date().getFullYear()}
        </div>
      </main>
    </div>
  )
}
