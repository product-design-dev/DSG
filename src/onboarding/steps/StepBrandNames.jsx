import { duplicateBrandIndexes } from '../validation'

export default function StepBrandNames({ brandMode, brandNames, onChange }) {
  const isMulti = brandMode === 'multi'
  const duplicateIndexes = duplicateBrandIndexes(brandNames)
  const hasDuplicates = duplicateIndexes.size > 0

  function setName(index, value) {
    const next = [...brandNames]
    next[index] = value
    onChange(next)
  }

  function addBrand() {
    onChange([...brandNames, ''])
  }

  function removeBrand(index) {
    onChange(brandNames.filter((_, i) => i !== index))
  }

  return (
    <div className="step">
      <h1 className="step-title">{isMulti ? 'Name your brands' : 'Name your brand'}</h1>
      <p className="step-subtitle">
        {isMulti
          ? 'Add at least two brands. You can rename or add more later from inside the builder.'
          : 'This is what you’ll see at the top of the builder sidebar.'}
      </p>

      <div className="name-repeater">
        {brandNames.map((name, index) => (
          <div className="name-row" key={index}>
            <input
              type="text"
              value={name}
              placeholder={isMulti ? `Brand ${index + 1}` : 'e.g. Acme'}
              aria-invalid={duplicateIndexes.has(index) || undefined}
              aria-describedby={hasDuplicates ? 'brand-name-error' : undefined}
              className={duplicateIndexes.has(index) ? 'name-input--invalid' : undefined}
              onChange={(e) => setName(index, e.target.value)}
            />
            {isMulti && brandNames.length > 2 && (
              <button
                type="button"
                className="name-remove"
                aria-label="Remove brand"
                onClick={() => removeBrand(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {hasDuplicates && (
        <p id="brand-name-error" className="field-error" role="alert">
          Brand names must be unique. These match when you ignore case and extra spaces.
        </p>
      )}

      {isMulti && (
        <button type="button" className="link-btn name-add" onClick={addBrand}>
          + Add another brand
        </button>
      )}
    </div>
  )
}
