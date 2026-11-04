import { useState } from 'react'
import {
  DEFAULT_LIBRARY,
  STEPS,
  hydrateAnswers,
  isLibrarySelectable,
  resolveEffectiveLibrary,
} from './content'
import Stepper from './Stepper'
import StepBrandMode from './steps/StepBrandMode'
import StepBrandNames from './steps/StepBrandNames'
import StepArchitecture from './steps/StepArchitecture'
import StepLibrary from './steps/StepLibrary'
import StepReview from './steps/StepReview'
import MockBuilder from './MockBuilder'
import '../marketing/theme.css'
import './onboarding.css'

function canProceed(stepKey, answers) {
  switch (stepKey) {
    case 'brand':
      return Boolean(answers.brandMode)
    case 'names':
      return answers.brandMode === 'multi'
        ? answers.brandNames.length >= 2 && answers.brandNames.every((n) => n.trim().length > 0)
        : answers.brandNames[0]?.trim().length > 0
    case 'architecture':
      if (!answers.architecture) return false
      return answers.architecture === 'custom' ? answers.customTiers.trim().length > 0 : true
    case 'library':
      return Boolean(resolveEffectiveLibrary(answers.library))
    default:
      return true
  }
}

function initialStepIndex(answers) {
  const blocked = STEPS.findIndex((step) => step.key !== 'review' && !canProceed(step.key, answers))
  return blocked === -1 ? STEPS.length - 1 : blocked
}

export default function OnboardingFlow({ onLaunch, userEmail, onLogout, initialAnswers = null }) {
  const [answers, setAnswers] = useState(() => hydrateAnswers(initialAnswers))
  const [stepIndex, setStepIndex] = useState(() => initialStepIndex(hydrateAnswers(initialAnswers)))
  const [launched, setLaunched] = useState(false)
  const [launching, setLaunching] = useState(false)
  const [launchError, setLaunchError] = useState(null)

  const step = STEPS[stepIndex]

  function update(patch) {
    setAnswers((prev) => ({ ...prev, ...patch }))
  }

  function setBrandMode(mode) {
    setAnswers((prev) => {
      const brandNames =
        mode === 'single'
          ? [prev.brandNames[0] ?? '']
          : prev.brandNames.length >= 2
            ? prev.brandNames
            : ['', '']
      return { ...prev, brandMode: mode, brandNames }
    })
  }

  function goTo(index) {
    setStepIndex(Math.max(0, Math.min(STEPS.length - 1, index)))
  }

  function reset() {
    const fresh = hydrateAnswers(null)
    setAnswers(fresh)
    setStepIndex(initialStepIndex(fresh))
    setLaunched(false)
  }

  // Awaits onLaunch (persists onboarding_complete to Supabase) before
  // committing to the "launched" screen. Previously this fired onLaunch
  // without waiting and switched screens immediately, so a slow or failed
  // save left the user on a blank screen with no way back.
  async function handleLaunch() {
    if (!onLaunch) {
      setLaunched(true)
      return
    }
    setLaunching(true)
    setLaunchError(null)
    try {
      await onLaunch({
        ...answers,
        library: resolveEffectiveLibrary(answers.library)?.key || DEFAULT_LIBRARY,
      })
      setLaunched(true)
    } catch (err) {
      console.error('[DSG] Failed to complete onboarding:', err)
      setLaunchError('Something went wrong creating your design system. Please try again.')
    } finally {
      setLaunching(false)
    }
  }

  if (launched) {
    if (onLaunch) {
      return null
    }
    return <MockBuilder answers={answers} onStartOver={reset} />
  }

  const isLastStep = stepIndex === STEPS.length - 1
  const proceedAllowed = canProceed(step.key, answers)

  return (
    <div className="onboarding">
      <header className="onboarding-header">
        <div className="onboarding-header-row">
          <span className="onboarding-logo">Design System Generator</span>
          {onLogout && (
            <button type="button" className="onboarding-logout" onClick={onLogout}>
              {userEmail ? `${userEmail} · Log Out` : 'Log Out'}
            </button>
          )}
        </div>
        <Stepper steps={STEPS} currentIndex={stepIndex} onJump={goTo} />
      </header>

      <main className="onboarding-main">
        {step.key === 'brand' && <StepBrandMode value={answers.brandMode} onChange={setBrandMode} />}
        {step.key === 'names' && (
          <StepBrandNames
            brandMode={answers.brandMode}
            brandNames={answers.brandNames}
            onChange={(brandNames) => update({ brandNames })}
          />
        )}
        {step.key === 'architecture' && (
          <StepArchitecture
            brandMode={answers.brandMode}
            value={answers.architecture}
            customTiers={answers.customTiers}
            onChange={(v) => update({ architecture: v })}
            onCustomTiersChange={(v) => update({ customTiers: v })}
          />
        )}
        {step.key === 'library' && (
          <StepLibrary value={answers.library} onChange={(v) => update({ library: v })} />
        )}
        {step.key === 'review' && (
          <StepReview
            answers={answers}
            onEdit={goTo}
            onLaunch={handleLaunch}
            launching={launching}
            launchError={launchError}
          />
        )}
      </main>

      {!isLastStep && (
        <footer className="onboarding-footer">
          <button
            type="button"
            className="btn btn-ghost"
            disabled={stepIndex === 0}
            onClick={() => goTo(stepIndex - 1)}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!proceedAllowed}
            onClick={() => {
              if (step.key === 'library' && !isLibrarySelectable(answers.library)) {
                setAnswers((prev) => ({ ...prev, library: DEFAULT_LIBRARY }))
              }
              goTo(stepIndex + 1)
            }}
          >
            Continue
          </button>
        </footer>
      )}
    </div>
  )
}
