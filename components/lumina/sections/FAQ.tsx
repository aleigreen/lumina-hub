'use client'

import { useState } from 'react'
import { faqs } from '../data/faqs'
import { t, type Locale } from '../data/translations'

type Props = { locale: Locale }

export default function FAQ({ locale }: Props) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set())
  const tr = t[locale].faq

  const toggle = (i: number) => {
    setOpenSet(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <section className="ls-section" id="faq">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '60px', alignItems: 'end' }}>
        <div>
          <div className="ls-section-label">{tr.label}</div>
          <h2 className="ls-section-title" style={{ marginBottom: 0 }}>{tr.title}</h2>
        </div>
      </div>
      <div style={{ maxWidth: '860px' }}>
        {faqs.map((faq, i) => {
          const isOpen = openSet.has(i)
          return (
            <div key={i} className="ls-faq-item">
              <div className="ls-faq-q" onClick={() => toggle(i)}>
                <span>{faq.q[locale]}</span>
                <span className={`ls-faq-icon${isOpen ? ' open' : ''}`}>+</span>
              </div>
              <div className={`ls-faq-a${isOpen ? ' open' : ''}`}>
                <p>{faq.a[locale]}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
