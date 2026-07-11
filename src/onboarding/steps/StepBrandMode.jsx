import { BRAND_MODES } from '../content'

export default function StepBrandMode({ value, onChange }) {
  return (
    <div className="step">
      <h1 className="step-title">How many brands are you setting up?</h1>
      <p className="step-subtitle">You can always add more brands later from inside the builder.</p>

      <div className="card-grid card-grid--2">
        {BRAND_MODES.map((mode) => (
          <button
            type="button"
            key={mode.key}
            className={`option-card ${value === mode.key ? 'option-card--selected' : ''}`}
            onClick={() => onChange(mode.key)}
          >
            <span className="option-card-title">{mode.title}</span>
            <span className="option-card-description">{mode.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
