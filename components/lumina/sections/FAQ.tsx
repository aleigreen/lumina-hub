'use client'

import { useState } from 'react'
import { faqs } from '../data/faqs'
import type { CSSProperties } from 'react'
import { t, type Locale } from '../data/translations'
import { Plus } from 'lucide-react'
import { SectionDecor, SectionMark, SectionTitle } from '../ui/Ornaments'

type Props = { locale: Locale }

export default function FAQ({ locale }: Props) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set())
  const tr = t[locale].faq

  const toggle = (i: number) => {
    setOpenSet(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <section className="ls-section lg-sec" id="faq" data-anim>
      <SectionDecor id="faq" glow="left" sparks={[[90, 10, 14, 0.5], [7, 40, 9, 1.7], [86, 78, 11, 2.5]]} />
      <header className="lg-head" style={{ marginBottom: '60px' }}>
        <SectionMark n={5} locale={locale} center />
        <div className="ls-section-label" data-reveal="fade">{tr.label}</div>
        <SectionTitle kicker={locale === 'es' ? 'Preguntas' : 'Common'} main={locale === 'es' ? 'Frecuentes' : 'Questions'} />
      </header>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {faqs.map((faq, i) => {
          const isOpen = openSet.has(i)
          return (
            <div key={i} className="ls-faq-item" data-reveal style={{ '--d': `${Math.min(i, 6) * 0.06}s` } as CSSProperties}>
              <button type="button" className="ls-faq-q lg-faq-q" onClick={() => toggle(i)} aria-expanded={isOpen} aria-controls={`faq-a-${i}`}>
                <span className="lg-faq-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="lg-faq-text">{faq.q[locale]}</span>
                <span className={`ls-faq-icon${isOpen ? ' open' : ''}`} aria-hidden="true"><Plus size={18} strokeWidth={1.25} /></span>
              </button>
              <div id={`faq-a-${i}`} className={`ls-faq-a${isOpen ? ' open' : ''}`} role="region">
                <p>{faq.a[locale]}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
