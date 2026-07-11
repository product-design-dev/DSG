import { ARCHITECTURES, recommendArchitecture } from '../content'

export default function StepArchitecture({ brandMode, value, customTiers, onChange, onCustomTiersChange }) {
  const recommendedKey = recommendArchitecture(brandMode)
  const recommended = ARCHITECTURES.find((a) => a.key === recommendedKey)

  return (
    <div className="step">
      <h1 className="step-title">How should your tokens be structured?</h1>
      <p className="step-subtitle">
        This decides how many layers sit between raw values and the tokens components consume.
      </p>

      <button
        type="button"
        className={`option-card option-card--auto ${value === 'auto' ? 'option-card--selected' : ''}`}
        onClick={() => onChange('auto')}
      >
        <span className="option-card-title">
          Pick for me
          <span className="option-card-badge">Recommended</span>
        </span>
        <span className="option-card-description">
          {brandMode === 'multi'
            ? `You're running multiple brands, so we'd suggest ${recommended.title} — the component layer lets each brand override a component without touching the semantic tokens the others share.`
            : `You're running a single brand, so ${recommended.title} is usually enough — it skips a layer of indirection you don't need yet.`}
        </span>
      </button>

      <div className="card-grid card-grid--2 architecture-grid">
        {ARCHITECTURES.map((arch) => (
          <button
            type="button"
            key={arch.key}
            className={`option-card ${value === arch.key ? 'option-card--selected' : ''}`}
            onClick={() => onChange(arch.key)}
          >
            <span className="option-card-title">
              {arch.title}
              <span className="option-card-subtitle">{arch.subtitle}</span>
            </span>
            <span className="option-card-description">{arch.description}</span>
          </button>
        ))}
      </div>

      {value === 'custom' && (
        <div className="custom-input">
          <label className="label-caps" htmlFor="custom-tiers">
            Name your tiers, in order, separated by commas
          </label>
          <input
            id="custom-tiers"
            type="text"
            placeholder="e.g. Raw Values, Aliases, Component Overrides"
            value={customTiers}
            onChange={(e) => onCustomTiersChange(e.target.value)}
          />
        </div>
      )}
    </div>
  )
}
