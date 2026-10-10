import React from 'react'
import { CheckCircle2, ShieldAlert, RotateCcw } from 'lucide-react'
import { Button } from '../common/Button'
import { cn } from '../../utils/cn'

export interface DemoAuthBannerProps {
  submittedEmail: string
  onReset: () => void
  variantName: string
  className?: string
}

export const DemoAuthBanner: React.FC<DemoAuthBannerProps> = ({
  submittedEmail,
  onReset,
  variantName,
  className,
}) => {
  return (
    <div
      className={cn(
        'border border-[#303030] bg-[#111111] p-6 space-y-4 text-left transition-all duration-300',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-white shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-[#A3A3A3]">
            [ DEMO VALIDATION SUCCESSFUL ]
          </div>
          <h4 className="text-base font-semibold text-white font-sans">
            Credentials validated for {submittedEmail}
          </h4>
        </div>
      </div>

      <div className="border border-[#303030] bg-[#050505] p-3.5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-white">
          <ShieldAlert className="h-4 w-4 text-[#A3A3A3] shrink-0" />
          <span>PRODUCTION NOTICE</span>
        </div>
        <p className="text-xs text-[#A3A3A3] leading-relaxed">
          This is a frontend UI kit demonstration with client-side Zod validation. Real user authentication requires integration with a secure backend API or identity provider (e.g. Supabase, Auth0, Firebase, Clerk, or NextAuth).
        </p>
        <div className="text-[11px] font-mono text-[#737373] pt-1">
          ARCHETYPE: {variantName} · PAYLOAD: VALIDATED · AUTH_STATUS: LOCAL_ONLY
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Form</span>
        </Button>
        <span className="text-[11px] font-mono text-[#737373]">
          READY FOR INTEGRATION
        </span>
      </div>
    </div>
  )
}
