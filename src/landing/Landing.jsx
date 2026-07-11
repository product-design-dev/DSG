import Header from './Header'
import Hero from './Hero'
import HowItWorks from './HowItWorks'
import Features from './Features'
import Pricing from './Pricing'
import Faq from './Faq'
import '../marketing/theme.css'
import './landing.css'

export default function Landing({ onGetStarted, onSelectTier }) {
  return (
    <div className="landing">
      <Header onGetStarted={onGetStarted} />
      <Hero onGetStarted={onGetStarted} />
      <HowItWorks />
      <Features />
      <Pricing onSelectTier={onSelectTier} />
      <Faq />

      <section className="final-cta">
        <h2>Ready to build your design system?</h2>
        <p>Start free — no credit card, no time limit.</p>
        <button type="button" className="btn btn-primary btn-large" onClick={onGetStarted}>
          Get Started Free
        </button>
      </section>

      <footer className="landing-footer">© {new Date().getFullYear()} Design System Generator</footer>
    </div>
  )
}
