import type { ReactElement } from 'react'
import { t, type Locale } from '../data/translations'

type Props = { locale: Locale }

const icons: Record<string, ReactElement> = {
  dignity: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  inclusion: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  ethics: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  zero: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
}

export default function SafeSpace({ locale }: Props) {
  const tr = t[locale].safeSpace
  return (
    <section id="safe-space" className="ls-safespace-section" style={{ padding: '80px 60px', background: '#0e0e0e', borderBottom: '1px solid #1a1a1a' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="ls-section-label" style={{ color: '#444', marginBottom: '16px' }}>{tr.label}</div>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(32px, 4vw, 56px)',
          fontWeight: 300, lineHeight: 1.1,
          color: '#f0f0f0', marginBottom: '56px',
        }}>
          {tr.title} <em>{tr.titleEm}</em>
        </h2>
        <div className="ls-safespace-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#2a2a2a' }}>
          {tr.items.map((item) => (
            <div key={item.icon} style={{ padding: '36px 28px', background: '#0e0e0e', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ color: '#888' }}>{icons[item.icon]}</div>
              <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c0c0c0', fontFamily: 'Jost, sans-serif' }}>
                {item.title}
              </div>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.9, letterSpacing: '0.02em' }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
