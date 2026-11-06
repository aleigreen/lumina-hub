import type { CSSProperties } from 'react'
import { ArrowUpRight, Clock, MapPin } from 'lucide-react'
import { t, type Locale } from '../data/translations'
import { InstagramIcon } from '../ui/Icons'
import { SectionDecor, SectionMark, SectionTitle, VerticalText } from '../ui/Ornaments'

type Props = { locale: Locale }

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.0!2d-99.1685!3d19.4144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI0JzUxLjgiTiA5OcKwMTAnMDYuNiJX!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx&q=Lumina+Sanctum+Condesa+CDMX'

export default function Location({ locale }: Props) {
  const loc = t[locale].location
  return (
    <section id="location" className="ls-section lg-sec" data-anim>
      <SectionDecor id="location" glow="right" sparks={[[5, 16, 12, 0.9], [46, 88, 9, 2.0]]} />
      <div className="lg-location">
        <div className="lg-location-copy">
          <SectionMark n={6} locale={locale} />
          <div className="ls-section-label" data-reveal="fade">{locale === 'es' ? 'Visítanos' : 'Visit us'}</div>
          <SectionTitle kicker={loc.label} main="Condesa" align="left" />

          <ul className="lg-info" data-reveal style={{ '--d': '0.15s' } as CSSProperties}>
            <li>
              <span className="lg-info-icon"><MapPin size={16} strokeWidth={1.25} /></span>
              <span className="lg-info-main">{loc.address}</span>
            </li>
            <li>
              <span className="lg-info-icon"><Clock size={16} strokeWidth={1.25} /></span>
              <span>
                <span className="lg-info-main lg-info-main--sm">{loc.hoursDetail}</span>
                <span className="lg-info-sub">{loc.hours}</span>
              </span>
            </li>
            <li>
              <span className="lg-info-icon"><InstagramIcon size={16} strokeWidth={1.25} /></span>
              <a className="lg-info-main lg-info-main--sm lg-info-link" href="https://instagram.com/luminasanctum.tattoo" target="_blank" rel="noopener noreferrer">
                @luminasanctum.tattoo
              </a>
            </li>
          </ul>

          <a
            className="lg-pill"
            href="https://maps.app.goo.gl/eGjS5QGLUWSWGDJm9"
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            style={{ '--d': '0.3s' } as CSSProperties}
          >
            {loc.directions}
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
        </div>

        <div className="lg-map" data-reveal="fade" style={{ '--d': '0.1s' } as CSSProperties}>
          <VerticalText className="lg-map-vert">{locale === 'es' ? 'Te esperamos' : 'We await you'} · Lumina Sanctum</VerticalText>
          <div className="lg-map-frame">
            <iframe
              src={MAP_SRC}
              title={locale === 'es' ? 'Mapa de Lumina Sanctum' : 'Lumina Sanctum map'}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
