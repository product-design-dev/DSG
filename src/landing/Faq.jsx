import { useState } from 'react'
import { FAQS } from './content'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="landing-section">
      <div className="landing-inner">
        <div className="section-header">
          <span className="label-caps section-eyebrow">FAQ</span>
          <h2 className="section-title">Questions, answered</h2>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} key={faq.question}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {faq.question}
                  <span className="faq-icon">+</span>
                </button>
                {isOpen && <p className="faq-answer">{faq.answer}</p>}
              </div>
            )
          })}
        </div>

        <p className="faq-contact">
          Still have questions? Email us at <a href="mailto:info@kevinsmithdesign.com">info@kevinsmithdesign.com</a>
        </p>
      </div>
    </section>
  )
}
