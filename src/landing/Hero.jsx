const SIDE_SWATCHES = [
  ['#3b6fe8', '#2f5ac0', '#244498', '#1a3170', '#102049'],
  ['#dc382b', '#b32d23', '#8a221b', '#621712', '#3a0d09'],
]

const LIST_ITEMS = ['Button', 'ActionIcon', 'Tabs', 'Accordion', 'Switch']

export default function Hero({ onGetStarted }) {
  return (
    <section className="hero-section">
      <span className="hero-eyebrow">Design System Generator</span>
      <h1 className="hero-title">Design tokens to production components, in minutes.</h1>
      <p className="hero-subtitle">
        Build your color palette, set up your token architecture, and customize every component — then push it
        straight to Figma and Storybook.
      </p>
      <div className="hero-actions">
        <button type="button" className="btn btn-primary btn-large" onClick={onGetStarted}>
          Get Started Free
        </button>
        <a href="#how-it-works" className="btn btn-ghost btn-large">
          See how it works
        </a>
      </div>

      <div className="hero-preview" aria-hidden="true">
        <div className="hero-preview-bar">
          <span className="hero-preview-dot" />
          Design System Generator
        </div>
        <div className="hero-preview-body">
          <div className="hero-preview-side">
            {SIDE_SWATCHES.map((scale, i) => (
              <div className="hero-preview-swatch-row" key={i}>
                {scale.map((color, j) => (
                  <span key={j} className="hero-preview-swatch" style={{ background: color }} />
                ))}
              </div>
            ))}
          </div>
          <div className="hero-preview-canvas">
            <button type="button" className="hero-preview-button" tabIndex={-1}>
              Button
            </button>
          </div>
          <div className="hero-preview-side hero-preview-side--right">
            {LIST_ITEMS.map((item, i) => (
              <div key={item} className={`hero-preview-list-item ${i === 0 ? 'hero-preview-list-item--active' : ''}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
