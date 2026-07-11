import { HOW_IT_WORKS } from './content'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="landing-section">
      <div className="landing-inner">
        <div className="section-header">
          <span className="label-caps section-eyebrow">How it works</span>
          <h2 className="section-title">From blank canvas to synced system</h2>
          <p className="section-subtitle">Four steps, no design-system expertise required.</p>
        </div>

        <div className="how-grid">
          {HOW_IT_WORKS.map((step, i) => (
            <div className="how-card" key={step.title}>
              <span className="how-step-number">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
