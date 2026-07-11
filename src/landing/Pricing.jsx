import { PRICING_TIERS } from './content'

export default function Pricing({ onSelectTier }) {
  return (
    <section id="pricing" className="landing-section">
      <div className="landing-inner">
        <div className="section-header">
          <span className="label-caps section-eyebrow">Pricing</span>
          <h2 className="section-title">Start free. Grow into sync.</h2>
          <p className="section-subtitle">
            Start free, upgrade when you need more brands, seats, or Figma &amp; Storybook sync.
          </p>
        </div>

        <div className="pricing-grid">
          {PRICING_TIERS.map((tier) => (
            <div className={`pricing-card ${tier.key === 'free' ? 'pricing-card--active' : ''}`} key={tier.key}>
              {tier.badge && <span className="pricing-badge">{tier.badge}</span>}
              <span className="pricing-name">{tier.name}</span>
              <span className="pricing-tagline">{tier.tagline}</span>
              <span className="pricing-price">{tier.price}</span>
              <span className="pricing-cadence">{tier.cadence}</span>
              <ul className="pricing-features">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                type="button"
                className={`btn btn-full ${tier.key === 'free' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => onSelectTier(tier.key)}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
