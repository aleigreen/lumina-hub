import { t, type Locale } from '../data/translations'

type Props = { locale: Locale }

export default function Hero({ locale }: Props) {
  const tr = t[locale].hero
  return (
    <section className="ls-hero">
      <div className="ls-hero-eyebrow">{tr.eyebrow}</div>
      <h1 className="ls-hero-title">LUMINA</h1>
      <div className="ls-hero-subtitle">{tr.subtitle}</div>
      <div className="ls-hero-divider" />
      <div className="ls-hero-location">{tr.location}</div>
      <div className="ls-hero-cta">
        <a href="#book" className="ls-btn-primary">{tr.cta}</a>
        <a href="#artists" className="ls-btn-outline">{tr.ctaSecondary}</a>
      </div>
    </section>
  )
}
