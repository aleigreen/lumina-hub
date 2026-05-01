import { t, type Locale } from '../data/translations'

type Props = { locale: Locale }

export default function Location({ locale }: Props) {
  const loc = t[locale].location
  return (
    <section style={{ padding: '120px 64px', borderBottom: '1px solid rgba(232,219,196,0.10)', background: '#0d0a07' }} id="location" className="ls-location-section">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="ls-location-grid">
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c8a872', marginBottom: '28px' }}>
            {loc.label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,114,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '4px' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '20px', fontStyle: 'italic', color: '#e8dfcf', lineHeight: 1.5 }}>{loc.address}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,114,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '4px' }}>
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9bfa9' }}>{loc.hoursDetail}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,191,169,0.5)', marginTop: '4px' }}>{loc.hours}</div>
              </div>
            </div>
          </div>
          <a
            href="https://maps.app.goo.gl/eGjS5QGLUWSWGDJm9"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8a872', textDecoration: 'none', borderBottom: '1px solid rgba(200,168,114,0.4)', paddingBottom: '2px', transition: 'color 0.2s' }}
          >
            {loc.directions} →
          </a>
        </div>
        <div style={{ height: '280px', overflow: 'hidden', filter: 'grayscale(30%) sepia(20%) brightness(0.7)' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.0!2d-99.1685!3d19.4144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI0JzUxLjgiTiA5OcKwMTAnMDYuNiJX!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx&q=Lumina+Sanctum+Condesa+CDMX"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
