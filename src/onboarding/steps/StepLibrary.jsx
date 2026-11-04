import { Badge } from '@mantine/core'
import { LIBRARIES, foundationLabel, isLibrarySelectable, normalizeLibraryKey, resolveEffectiveLibrary } from '../content'

const comingSoonBadgeStyle = {
  '--badge-bg': 'var(--accent-soft)',
  '--badge-color': 'var(--accent)',
  '--badge-bd': '1px solid var(--border)',
}

export default function StepLibrary({ value, onChange }) {
  const selectedKey = resolveEffectiveLibrary(value)?.key
  const savedKey = normalizeLibraryKey(value)
  const showSavedNotice = Boolean(savedKey) && !isLibrarySelectable(savedKey)

  return (
    <div className="step">
      <h1 className="step-title">What are you building on top of?</h1>
      <p className="step-subtitle">
        Mantine is ready now. The other foundations are on the way.
      </p>

      <div className="card-grid card-grid--3">
        {LIBRARIES.map((lib) => {
          const selected = lib.key === selectedKey
          return (
            <button
              type="button"
              key={lib.key}
              className={`option-card option-card--compact ${selected ? 'option-card--selected' : ''}`}
              disabled={!lib.available}
              aria-pressed={selected}
              onClick={() => {
                if (!lib.available) return
                onChange(lib.key)
              }}
            >
              <span className="option-card-title">
                {lib.title}
                {!lib.available && (
                  <Badge
                    component="span"
                    className="coming-soon-badge"
                    size="xs"
                    radius="xl"
                    variant="light"
                    style={comingSoonBadgeStyle}
                  >
                    Coming soon
                  </Badge>
                )}
              </span>
              <span className="option-card-description">{lib.description}</span>
            </button>
          )
        })}
      </div>

      {showSavedNotice && (
        <p className="foundation-note">
          Your saved foundation is {foundationLabel(savedKey)}. It is not available yet, so Mantine stays selected.
        </p>
      )}
    </div>
  )
}
