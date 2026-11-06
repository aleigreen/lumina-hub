'use client'

import { useState, useEffect, useRef, type CSSProperties } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { t, type Locale } from '../data/translations'
import { ArchOutline, Rays, SectionDecor, SectionMark, SectionTitle, Sparkle, VerticalText } from '../ui/Ornaments'

type Props = { locale: Locale }

const SLIDES = [
  { src: '/lumina/studio/LUMINA-9.webp', caption: 'Studio · 01' },
  { src: '/lumina/studio/LUMINA-71.webp', caption: 'Studio · 02' },
  { src: '/lumina/studio/LUMINA-73.webp', caption: 'Studio · 03' },
  { src: '/lumina/studio/LUMINA-60.webp', caption: 'Studio · 04' },
]

const pad = (n: number) => String(n).padStart(2, '0')

export default function Studio({ locale }: Props) {
  const tr = t[locale].studio
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(false)
  const [line1, line2] = tr.body.split('\n\n')
  const archRef = useRef<HTMLDivElement>(null)

  const goTo = (i: number) => setCurrent((i + SLIDES.length) % SLIDES.length)

  // El autoplay solo corre mientras el arco está en pantalla (antes re-renderizaba cada 4 s siempre).
  useEffect(() => {
    const el = archRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Avanza cada 5 s; cualquier cambio manual reinicia la cuenta (porque cambia `current`).
  useEffect(() => {
    if (!visible) return
    const id = setTimeout(() => setCurrent(c => (c + 1) % SLIDES.length), 5000)
    return () => clearTimeout(id)
  }, [current, visible])

  return (
    <section className="ls-section lg-sec" id="studio" data-anim>
      <SectionDecor id="studio" glow="right" sparks={[[5, 12, 14, 0.3], [93, 40, 10, 1.5], [52, 6, 9, 2.2]]} />

      <div className="lg-studio">
        {/* ── Texto ── */}
        <div className="lg-studio-copy">
          <SectionMark n={1} locale={locale} />
          <div className="ls-section-label" data-reveal="fade">{tr.label}</div>
          <SectionTitle kicker={tr.title} main={tr.titleEm} align="left" />
          <div className="lg-studio-body" data-reveal style={{ '--d': '0.15s' } as CSSProperties}>
            <p className="lg-studio-lead">{line1}</p>
            {line2 && <p className="lg-dropcap">{line2}</p>}
          </div>
          <a href="#book" className="lg-pill" data-reveal style={{ '--d': '0.3s' } as CSSProperties}>
            {locale === 'es' ? 'Agenda tu visita' : 'Book your visit'}
            <ArrowRight size={14} strokeWidth={1.5} />
          </a>
        </div>

        {/* ── Arco ── */}
        <figure className="lg-studio-figure" data-reveal="fade" style={{ '--d': '0.1s' } as CSSProperties}>
          <VerticalText className="lg-studio-vert">Zamora 165 · Condesa · CDMX</VerticalText>
          <Sparkle size={22} className="lg-arch-spark lg-arch-spark--l lg-twinkle" />
          <Sparkle size={14} className="lg-arch-spark lg-arch-spark--r lg-twinkle" style={{ '--d': '1.2s' } as CSSProperties} />

          <div className="lg-arch-wrap">
            <ArchOutline className="lg-arch-outline" />
            <div className="lg-arch" ref={archRef}>
              {SLIDES.map((slide, i) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.caption}
                  className={`lg-arch-img${i === current ? ' is-current lg-kb' : ''}`}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>

          <Rays className="lg-arch-rays" />

          <figcaption className="lg-arch-controls">
            <button type="button" className="lg-round-btn" onClick={() => goTo(current - 1)} aria-label={locale === 'es' ? 'Foto anterior' : 'Previous photo'}>
              <ChevronLeft size={16} strokeWidth={1.25} />
            </button>
            <span className="lg-arch-count" aria-live="polite">
              <b>{pad(current + 1)}</b> / {pad(SLIDES.length)}
            </span>
            <button type="button" className="lg-round-btn" onClick={() => goTo(current + 1)} aria-label={locale === 'es' ? 'Foto siguiente' : 'Next photo'}>
              <ChevronRight size={16} strokeWidth={1.25} />
            </button>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
