'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { artists, type ArtistData } from '../data/artists'
import { ARTIST_SLIDES, portraitOf, thumbOf } from '../data/artistSlides'
import type { Locale } from '../data/translations'
import { InstagramIcon } from '../ui/Icons'
import { Corners, Sparkle } from '../ui/Ornaments'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Escritorio: índice editorial de artistas a la izquierda y un "escenario" fijo
 * a la derecha con la galería del artista activo (foto grande + tira de miniaturas).
 */
export default function ArtistRoster({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0)

  return (
    <div className="lg-roster" data-reveal="fade">
      <ol className="lg-roster-list" role="tablist" aria-orientation="vertical">
        {artists.map((a, i) => {
          const portrait = portraitOf(a.name)
          const isActive = i === active
          return (
            <li key={a.name}>
              <button
                type="button"
                role="tab"
                id={`roster-tab-${i}`}
                aria-selected={isActive}
                aria-controls="roster-panel"
                className={`lg-roster-item${isActive ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="lg-artist-oval" aria-hidden="true">
                  {portrait && <img src={portrait} alt="" loading="lazy" decoding="async" width={120} height={160} />}
                </span>
                <span className="lg-roster-meta">
                  <span className="lg-artist-num">N° {pad(i + 1)}</span>
                  <span className="lg-roster-name">{a.name}</span>
                  <span className="lg-roster-role">{a.role[locale]}</span>
                </span>
                <ArrowRight className="lg-roster-arrow" size={18} strokeWidth={1.25} aria-hidden="true" />
              </button>
            </li>
          )
        })}
      </ol>

      <div className="lg-stage" id="roster-panel" role="tabpanel" aria-labelledby={`roster-tab-${active}`}>
        {/* key: al cambiar de artista se remonta (galería en 0 y animación de entrada) */}
        <StagePanel key={active} artist={artists[active]} locale={locale} />
      </div>
    </div>
  )
}

function StagePanel({ artist, locale }: { artist: ArtistData; locale: Locale }) {
  const slides = (ARTIST_SLIDES[artist.name] ?? []).filter(s => s.src) as { src: string; igUrl: string | null }[]
  const [current, setCurrent] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)
  const n = slides.length
  const go = (i: number) => setCurrent((i + n) % n)
  const slide = slides[current]
  const es = locale === 'es'
  const first = artist.name.split(' ')[0]
  const igHandle = artist.ig.startsWith('@') ? artist.ig : `@${artist.ig}`

  // Mantiene visible la miniatura activa dentro de la tira (sin mover la página).
  useEffect(() => {
    const strip = stripRef.current
    const el = strip?.children[current] as HTMLElement | undefined
    if (!strip || !el) return
    const left = el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2
    strip.scrollTo({ left, behavior: 'smooth' })
  }, [current])

  // Lightbox: teclado + bloqueo de scroll del fondo.
  useEffect(() => {
    if (!zoomed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false)
      if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % n)
      if (e.key === 'ArrowLeft') setCurrent(c => (c - 1 + n) % n)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [zoomed, n])

  if (!slide) return null

  return (
    <div className="lg-stage-inner">
      <div className="lg-stage-media">
        <div className="lg-stage-frame">
          <img className="lg-stage-bg" src={slide.src} alt="" aria-hidden="true" decoding="async" />
          <button type="button" className="lg-stage-zoom" onClick={() => setZoomed(true)} aria-label={es ? 'Ampliar foto' : 'Enlarge photo'}>
            <img key={slide.src} className="lg-stage-img" src={slide.src} alt={`${artist.name} · ${current + 1}`} decoding="async" />
            <span className="lg-stage-expand" aria-hidden="true"><Expand size={14} strokeWidth={1.5} /></span>
          </button>
          <div className="lg-slide-frame" aria-hidden="true"><Corners /></div>
          {n > 1 && (
            <>
              <button type="button" className="lg-car-arrow lg-car-arrow--l" onClick={() => go(current - 1)} aria-label={es ? 'Anterior' : 'Previous'}>
                <ChevronLeft size={18} strokeWidth={1.25} />
              </button>
              <button type="button" className="lg-car-arrow lg-car-arrow--r" onClick={() => go(current + 1)} aria-label={es ? 'Siguiente' : 'Next'}>
                <ChevronRight size={18} strokeWidth={1.25} />
              </button>
            </>
          )}
          <span className="lg-stage-count"><b>{pad(current + 1)}</b> / {pad(n)}</span>
          {slide.igUrl && (
            <a className="lg-stage-post" href={slide.igUrl} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={12} /> {es ? 'Ver post' : 'View post'}
            </a>
          )}
        </div>

        {n > 1 && (
          <div className="lg-stage-strip" ref={stripRef}>
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className={`lg-stage-thumb${i === current ? ' is-active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`${es ? 'Foto' : 'Photo'} ${i + 1}`}
                aria-current={i === current}
              >
                <img src={thumbOf(s.src)} alt="" loading="lazy" decoding="async" width={64} height={80} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lg-stage-info">
        <span className="lg-stage-role">{artist.role[locale]}</span>
        <h3 className="lg-stage-name">{artist.name}</h3>
        <div className="lg-stage-rule" aria-hidden="true"><span /><Sparkle size={10} /><span /></div>
        <p className="lg-stage-bio">{artist.bio[locale]}</p>
        <div className="lg-stage-label">{es ? 'Estilos' : 'Styles'}</div>
        <ul className="lg-stage-tags">
          {artist.styles[locale].split('·').map(s => s.trim()).filter(Boolean).map(s => <li key={s}>{s}</li>)}
        </ul>
        <div className="lg-stage-actions">
          <a className="lg-pill lg-pill--solid" href="#book">
            {es ? `Agendar con ${first}` : `Book with ${first}`} <ArrowRight size={14} strokeWidth={1.5} />
          </a>
          <a className="lg-stage-ig" href={`https://instagram.com/${igHandle.slice(1)}`} target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={14} /> {igHandle}
          </a>
        </div>
      </div>

      {/* Portal: el lightbox no puede vivir dentro de ancestros con transform (rompen position: fixed). */}
      {zoomed && createPortal(
        <div className="lg-lightbox" onClick={() => setZoomed(false)} role="dialog" aria-modal="true" aria-label={artist.name}>
          <button type="button" className="lg-round-btn lg-lb-close" onClick={() => setZoomed(false)} aria-label={es ? 'Cerrar' : 'Close'}>
            <X size={18} strokeWidth={1.25} />
          </button>
          <button type="button" className="lg-round-btn lg-lb-nav lg-lb-nav--l" onClick={e => { e.stopPropagation(); go(current - 1) }} aria-label={es ? 'Anterior' : 'Previous'}>
            <ChevronLeft size={20} strokeWidth={1.25} />
          </button>
          <img src={slide.src} alt={`${artist.name} · ${current + 1}`} onClick={e => e.stopPropagation()} />
          <button type="button" className="lg-round-btn lg-lb-nav lg-lb-nav--r" onClick={e => { e.stopPropagation(); go(current + 1) }} aria-label={es ? 'Siguiente' : 'Next'}>
            <ChevronRight size={20} strokeWidth={1.25} />
          </button>
          <span className="lg-lightbox-count">{pad(current + 1)} / {pad(n)}</span>
        </div>,
        document.body,
      )}
    </div>
  )
}
