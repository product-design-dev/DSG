export default function Stepper({ steps, currentIndex, onJump }) {
  return (
    <ol className="stepper">
      {steps.map((step, index) => {
        const state =
          index === currentIndex ? 'current' : index < currentIndex ? 'done' : 'upcoming'
        const clickable = index <= currentIndex

        return (
          <li key={step.key} className={`stepper-item stepper-item--${state}`}>
            <button
              type="button"
              className="stepper-dot"
              disabled={!clickable}
              onClick={() => clickable && onJump(index)}
            >
              {state === 'done' ? '✓' : index + 1}
            </button>
            <span className="stepper-label">{step.label}</span>
            {index < steps.length - 1 && <span className="stepper-connector" aria-hidden="true" />}
          </li>
        )
      })}
    </ol>
  )
}
