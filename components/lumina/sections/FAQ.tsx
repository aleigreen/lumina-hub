'use client'

import { useState } from 'react'
import { faqs } from '../data/faqs'
import { t, type Locale } from '../data/translations'

type Props = { locale: Locale }

export default function FAQ({ locale }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const tr = t[locale].faq

  return (
    <section className="ls-section" id="faq">
      <div className="ls-section-label">{tr.label}</div>
      <h2 className="ls-section-title" style={{ marginBottom: '40px' }}>{tr.title}</h2>
      <div style={{ maxWidth: '760px' }}>
        {faqs.map((faq, i) => (
          <div key={i} className="ls-faq-item">
            <div className="ls-faq-q" onClick={() => setOpen(open === i ? null : i)}>
              <span>{faq.q[locale]}</span>
              <span className={`ls-faq-icon ${open === i ? 'open' : ''}`}>+</span>
            </div>
            <div className={`ls-faq-a ${open === i ? 'open' : ''}`}>
              <p>{faq.a[locale]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
