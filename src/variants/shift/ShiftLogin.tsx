import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BrandIdentity } from '../../components/brand/BrandIdentity'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/ui/Input'
import { loginSchema, type LoginFormValues, type VariantProps } from '../../types/auth'
import { cn } from '../../utils/cn'
import { Loader2, ArrowUpRight, Info } from 'lucide-react'

/**
 * SHIFT — Variant 03
 * Distinctive Asymmetric Composition & Expressive Typography
 */
export const ShiftLogin: React.FC<VariantProps> = ({
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
        'min-h-[100svh] w-full flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-[#050505] text-white overflow-y-auto lg:overflow-hidden',
        className
      )}
      data-testid="login-shift"
    >
      {/* 1. Header (Brand Identity) */}
      <header className="w-full flex items-center justify-between pb-6">
        <BrandIdentity brand={activeBrand} size="md" />
      </header>

      {/* 2. Asymmetric Central Composition */}
      <main className="w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Asymmetric Typography Column */}
          <div className="lg:col-span-5 xl:col-span-6 space-y-4 text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold tracking-tighter text-white uppercase leading-none">
              TERMINAL ACCESS
            </h1>
            <p className="text-xs sm:text-sm text-[#A3A3A3] font-sans leading-relaxed max-w-sm">
              An asymmetric login layout engineered for technical documentation and developer consoles.
            </p>
          </div>

          {/* Form Container Card */}
          <div className="lg:col-span-7 xl:col-span-6">
            <div className="border border-[#303030] bg-[#111111] p-6 sm:p-10 shadow-2xl text-left space-y-6">
              <div className="border-b border-[#303030] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#A3A3A3]">
                  // AUTHENTICATION_PROMPT
                </span>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <Input
                  label="Email Identifier"
                  placeholder="operator@company.com"
                  type="email"
                  autoComplete="email"
                  inputClassName="font-mono text-xs bg-[#050505] border-[#303030] focus:border-white"
                  error={errors.email?.message}
                  disabled={isSubmitting}
                  {...register('email')}
                />

                <Input
                  label="Passcode Key"
                  placeholder="••••••••••••"
                  isPassword
                  autoComplete="current-password"
                  hint="Min. 8 characters"
                  inputClassName="font-mono text-xs bg-[#050505] border-[#303030] focus:border-white"
                  error={errors.password?.message}
                  disabled={isSubmitting}
                  {...register('password')}
                />

                {/* Restrained Temporary Inline Demo Feedback */}
                {demoNotice && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-3.5 border border-[#303030] bg-[#050505] text-xs font-mono text-[#A3A3A3] flex items-start gap-2.5 animate-in fade-in"
                  >
                    <Info className="h-4 w-4 text-white shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-white font-medium block">DEMO_NOTICE</span>
                      <span className="leading-relaxed font-sans">{demoNotice}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 font-mono uppercase tracking-widest font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <span>INITIALIZE SESSION</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Subtle Technical Footer */}
      <footer className="w-full pt-6 text-xs font-mono text-[#737373] text-left">
        GENZLOG © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
