export default function StepBrandNames({ brandMode, brandNames, onChange }) {
  const isMulti = brandMode === 'multi'

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

      {isMulti && (
        <button type="button" className="link-btn name-add" onClick={addBrand}>
          + Add another brand
        </button>
      )}
    </div>
  )
}
