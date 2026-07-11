export default function Header({ onGetStarted }) {
  return (
    <header className="landing-header">
      <div className="landing-header-inner">
        <button type="button" className="landing-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Design System Generator
        </button>
        <nav className="landing-nav">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="landing-header-actions">
          <button type="button" className="landing-login-link" onClick={onGetStarted}>
            Log In
          </button>
          <button type="button" className="btn btn-primary btn-small" onClick={onGetStarted}>
            Get Started Free
          </button>
        </div>
      </div>
    </header>
  )
}
