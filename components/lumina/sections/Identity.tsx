import { t, type Locale } from '../data/translations'

type Props = { locale: Locale }

export default function Identity({ locale }: Props) {
  const tr = t[locale].identity
  return (
    <section className="ls-section" id="identity">
      <div className="ls-section-label">{tr.label}</div>
      <div className="ls-identity-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
        <div style={{ padding: '48px', background: '#f8f8f8', borderTop: '2px solid #111' }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase',
            color: '#aaa', marginBottom: '24px',
          }}>
            {tr.missionTitle}
          </div>
          <p style={{ fontSize: '14px', color: '#444', lineHeight: 2, letterSpacing: '0.03em' }}>
            {tr.missionBody}
          </p>
        </div>
        <div style={{ padding: '48px', background: '#111', borderTop: '2px solid #111' }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase',
            color: '#666', marginBottom: '24px',
          }}>
            {tr.visionTitle}
          </div>
          <p style={{ fontSize: '14px', color: '#bbb', lineHeight: 2, letterSpacing: '0.03em' }}>
            {tr.visionBody}
          </p>
        </div>
      </div>
    </section>
  )
}
