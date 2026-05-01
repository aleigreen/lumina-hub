import { t, type Locale } from '../data/translations'

type Props = { locale: Locale }

export default function Hero({ locale }: Props) {
  const tr = t[locale].hero
  return (
    <section className="ls-hero" id="hero">
      <div className="ls-hero-eyebrow">{tr.eyebrow}</div>
      <img
        src="/lumina/icon-wt.png"
        alt=""
        style={{ height: 'clamp(80px, 10vw, 130px)', width: 'auto', marginBottom: '24px', opacity: 0.88 }}
      />
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'stretch', marginBottom: '36px' }}>
        <h1 className="ls-hero-title">LUMINA</h1>
        <div className="ls-hero-subtitle">SANCTUM</div>
      </div>
      <div className="ls-hero-divider" />
      <div className="ls-hero-location">{tr.location}</div>
      <div className="ls-hero-cta">
        <a href="#book" className="ls-btn-primary">{tr.cta}</a>
        <a href="#artists" className="ls-btn-outline">{tr.ctaSecondary}</a>
      </div>
    </section>
  )
}
