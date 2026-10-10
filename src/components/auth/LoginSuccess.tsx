import React from 'react'
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react'
import { Button } from '../common/Button'
import { cn } from '../../utils/cn'

export interface LoginSuccessProps {
  email: string
  onReset: () => void
  className?: string
}

export const LoginSuccess: React.FC<LoginSuccessProps> = ({
  email,
  onReset,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full space-y-6 text-left animate-in fade-in zoom-in-95 duration-300 ease-out select-none',
        className
      )}
      role="status"
      aria-live="polite"
    >
      {/* High-Contrast Monochromatic Checkmark Emblem */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center w-12 h-12 bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.25)] shrink-0">
          <Check className="w-6 h-6 text-black stroke-[3]" />
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-mono tracking-widest text-[#A3A3A3] uppercase block">
            DEMO VALIDATION // SUCCESS
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white font-sans">
            Demo login successful
          </h2>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        <p className="text-xs sm:text-sm text-[#A3A3A3] font-sans leading-relaxed">
          The credentials for <span className="text-white font-mono font-medium">{email}</span> have passed client-side validation.
        </p>

        <div className="p-3.5 bg-[#111111] border border-[#303030] space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-white">
            <ShieldCheck className="h-3.5 w-3.5 text-white shrink-0" />
            <span>FRONTEND SIMULATION NOTICE</span>
          </div>
          <p className="text-xs text-[#A3A3A3] leading-relaxed">
            This is a front-end demonstration. Connect this interface to your authentication provider (Supabase, Auth0, Firebase, Clerk, or NextAuth) to issue real production session tokens.
          </p>
        </div>
      </div>

      {/* Return Action */}
      <div className="pt-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 group transition-all border-[#303030] text-white hover:border-white hover:bg-white/[0.04]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to login</span>
        </Button>
      </div>
    </div>
  )
}
