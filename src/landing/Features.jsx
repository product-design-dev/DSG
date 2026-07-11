import { FEATURES } from './content'

export default function Features() {
  return (
    <section id="features" className="landing-section">
      <div className="landing-inner">
        <div className="section-header">
          <span className="label-caps section-eyebrow">Features</span>
          <h2 className="section-title">Everything a multi-brand system needs</h2>
          <p className="section-subtitle">Built around how design systems actually get maintained, not just shipped once.</p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
