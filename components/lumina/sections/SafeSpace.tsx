import type { ReactElement } from 'react'
import { t, type Locale } from '../data/translations'

type Props = { locale: Locale; onValores?: () => void }

const icons: Record<string, ReactElement> = {
  dignity: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  inclusion: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  ethics: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  zero: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
  values: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
}

export default function SafeSpace({ locale, onValores }: Props) {
  const tr = t[locale].safeSpace
  return (
    <section id="safe-space" style={{ padding: '72px 64px', background: '#0d0a07', borderBottom: '1px solid rgba(232,219,196,0.10)' }} className="ls-safespace-section">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c8a872', marginBottom: '16px' }}>
          {tr.label}
        </div>
        <h2 style={{
          fontFamily: "'Bodoni Moda', serif",
          fontSize: 'clamp(28px, 4vw, 64px)',
          fontWeight: 300, lineHeight: 1.05,
          color: '#e8dfcf', marginBottom: '40px',
        }}>
          {tr.title} <em style={{ fontStyle: 'italic', color: '#c8a872' }}>{tr.titleEm}</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(232,219,196,0.08)' }} className="ls-safespace-grid">
          {tr.items.map((item) => (
            <div key={item.icon} style={{ padding: '28px 24px', background: '#0d0a07', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'rgba(200,168,114,0.6)', flexShrink: 0 }}>{icons[item.icon]}</div>
                <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '20px', fontStyle: 'italic', color: '#e8dfcf', lineHeight: 1.1 }}>
                  {item.title}
                </div>
              </div>
              <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '14px', color: '#c9bfa9', lineHeight: 1.7 }}>
                {item.body}
              </p>
            </div>
          ))}
          {/* Card Misión & Visión */}
          <button
            onClick={onValores}
            style={{
              padding: '28px 24px', background: '#15110c',
              display: 'flex', flexDirection: 'column', gap: '14px',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1a1510')}
            onMouseLeave={e => (e.currentTarget.style.background = '#15110c')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: 'rgba(200,168,114,0.6)', flexShrink: 0 }}>{icons.values}</div>
              <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '20px', fontStyle: 'italic', color: '#e8dfcf', lineHeight: 1.1 }}>
                {t[locale].identity.accordion}
              </div>
            </div>
            <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '14px', color: '#c9bfa9', lineHeight: 1.7 }}>
              {locale === 'es' ? 'Conoce nuestra misión y visión.' : 'Learn about our mission and vision.'}
            </p>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c8a872', marginTop: '4px' }}>
              {locale === 'es' ? 'Ver más →' : 'Read more →'}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
