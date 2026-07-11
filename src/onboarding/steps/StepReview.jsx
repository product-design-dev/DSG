import { BRAND_MODES, LIBRARIES, resolveArchitecture, stepIndexOf } from '../content'

export default function StepReview({ answers, onEdit, onLaunch }) {
  const brand = BRAND_MODES.find((b) => b.key === answers.brandMode)
  const arch = resolveArchitecture(answers)
  const lib = LIBRARIES.find((l) => l.key === answers.library)

  return (
    <div className="step">
      <h1 className="step-title">Review your setup</h1>
      <p className="step-subtitle">You can change any of these later — this just configures your starting point.</p>

      <div className="review-list">
        <div className="review-row">
          <div>
            <span className="label-caps">Brand setup</span>
            <p className="review-value">{brand?.title}</p>
          </div>
          <button type="button" className="link-btn" onClick={() => onEdit(stepIndexOf('brand'))}>
            Edit
          </button>
        </div>

        <div className="review-row">
          <div>
            <span className="label-caps">{answers.brandMode === 'multi' ? 'Brands' : 'Brand name'}</span>
            <p className="review-value">{answers.brandNames.filter(Boolean).join(', ')}</p>
          </div>
          <button type="button" className="link-btn" onClick={() => onEdit(stepIndexOf('names'))}>
            Edit
          </button>
        </div>

        <div className="review-row">
          <div>
            <span className="label-caps">Token architecture</span>
            <p className="review-value">
              {arch?.title}
              <span className="review-value-sub"> — {arch?.subtitle}</span>
              {answers.architecture === 'auto' && <span className="review-value-sub"> (picked for you)</span>}
              {answers.architecture === 'custom' && answers.customTiers && (
                <span className="review-value-sub"> — {answers.customTiers}</span>
              )}
            </p>
          </div>
          <button type="button" className="link-btn" onClick={() => onEdit(stepIndexOf('architecture'))}>
            Edit
          </button>
        </div>

        <div className="review-row">
          <div>
            <span className="label-caps">Foundation</span>
            <p className="review-value">{lib?.title}</p>
          </div>
          <button type="button" className="link-btn" onClick={() => onEdit(stepIndexOf('library'))}>
            Edit
          </button>
        </div>
      </div>

      <button type="button" className="btn btn-primary btn-large" onClick={onLaunch}>
        Create my design system
      </button>
    </div>
  )
}
