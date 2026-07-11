import { LIBRARIES } from '../content'

export default function StepLibrary({ value, onChange }) {
  return (
    <div className="step">
      <h1 className="step-title">What are you building on top of?</h1>
      <p className="step-subtitle">
        This decides how your tokens get exported and how components are styled in the builder.
      </p>

      <div className="card-grid card-grid--3">
        {LIBRARIES.map((lib) => (
          <button
            type="button"
            key={lib.key}
            className={`option-card option-card--compact ${
              value === lib.key ? 'option-card--selected' : ''
            }`}
            onClick={() => onChange(lib.key)}
          >
            <span className="option-card-title">{lib.title}</span>
            <span className="option-card-description">{lib.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
