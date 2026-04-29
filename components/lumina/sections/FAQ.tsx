'use client'

import { useState } from 'react'
import { faqs } from '../data/faqs'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="ls-section" id="faq">
      <div className="ls-section-label">What you need to know</div>
      <h2 className="ls-section-title" style={{ marginBottom: '40px' }}>FAQ</h2>
      <div style={{ maxWidth: '760px' }}>
        {faqs.map((faq, i) => (
          <div key={i} className="ls-faq-item">
            <div className="ls-faq-q" onClick={() => setOpen(open === i ? null : i)}>
              <span>{faq.q}</span>
              <span className={`ls-faq-icon ${open === i ? 'open' : ''}`}>+</span>
            </div>
            <div className={`ls-faq-a ${open === i ? 'open' : ''}`}>
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
