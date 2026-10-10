import React, { useState } from 'react'
import { BrandIdentity } from './components/brand/BrandIdentity'
import { defaultBrandConfig } from './config/brand.config'
import { InteractiveSculpture } from './components/canvas/InteractiveSculpture'
import { InteractiveTypography } from './components/ui/InteractiveTypography'
import { LoginForm } from './components/auth/LoginForm'
import { LoginSuccess } from './components/auth/LoginSuccess'
import type { LoginFormValues, FormInteractionState } from './types/auth'

export const App: React.FC = () => {
  const [interactionState, setInteractionState] = useState<FormInteractionState>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  const handleLoginSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true)
    setInteractionState('submitting')

    // Brief simulation delay for responsive interaction
    await new Promise((resolve) => setTimeout(resolve, 850))

    setIsSubmitting(false)
    setSubmittedEmail(values.email)
    setInteractionState('success')
  }

  const handleReset = () => {
    setSubmittedEmail(null)
    setInteractionState('idle')
  }

  const isSuccess = Boolean(submittedEmail)

  return (
    <div className="min-h-[100svh] w-full bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative overflow-x-hidden selection:bg-white selection:text-black">
      {/* 1. Original Compact Brand Header */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 pb-4">
        <BrandIdentity brand={defaultBrandConfig} size="md" />
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#A3A3A3]">
          SECURE_PORTAL
        </span>
      </header>

      {/* 2. Original Two-Column Composition */}
      <main className="w-full max-w-7xl mx-auto flex-1 my-auto flex flex-col justify-center py-6 sm:py-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Interactive Headline & 3D Sculpture */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 relative">
            <InteractiveTypography />

            {/* Interactive 3D Canvas Area */}
            <div className="w-full h-[320px] sm:h-[420px] lg:h-[480px] relative flex items-center justify-center">
              <InteractiveSculpture
                className="w-full h-full"
                interactionState={interactionState}
              />
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="lg:col-span-5 flex flex-col justify-center z-20">
            <div className="w-full max-w-md mx-auto lg:ml-auto">
              {isSuccess && submittedEmail ? (
                <LoginSuccess email={submittedEmail} onReset={handleReset} />
              ) : (
                <LoginForm
                  onSubmit={handleLoginSubmit}
                  isSubmitting={isSubmitting}
                  onInteractionStateChange={setInteractionState}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 3. Original Spacious Footer */}
      <footer className="w-full max-w-7xl mx-auto flex items-center justify-between pt-4 text-xs font-mono text-[#A3A3A3] z-20 border-t border-[#303030]">
        <span>GENZLOG © {new Date().getFullYear()}</span>
        <span className="text-white">PROJECT #001 · LOGIN PAGE</span>
      </footer>
    </div>
  )
}

export default App
