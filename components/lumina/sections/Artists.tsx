'use client'

import { useState, useRef, useEffect } from 'react'
import { artists } from '../data/artists'
import { t, type Locale } from '../data/translations'
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import { SectionDecor, SectionMark, SectionTitle } from '../ui/Ornaments'
import { InstagramIcon } from '../ui/Icons'
import { ARTIST_SLIDES, portraitOf } from '../data/artistSlides'
import ArtistRoster from './ArtistRoster'


function ArtistCarousel({ name, isOpen }: { name: string; isOpen: boolean }) {
  const slides = ARTIST_SLIDES[name] ?? []
  const [current, setCurrent] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = (i: number) => setCurrent((i + slides.length) % slides.length)

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current) }

  // (El reset a portada al abrir/cerrar lo hace el padre con `key`, que remonta el componente.)

  // Bloquea scroll del fondo cuando el lightbox está abierto
  useEffect(() => {
    if (zoomed) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [zoomed])

  useEffect(() => {
    if (zoomed || !isOpen) return
    timerRef.current = setTimeout(() => goTo(current + 1), 4000)
    return clearTimer
  }, [current, name, zoomed, isOpen])

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); clearTimer(); goTo(current - 1) }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); clearTimer(); goTo(current + 1) }

  const currentSlide = slides[current]

  return (
    <>
      {/* Carousel */}
      <div className="ls-artist-carousel relative shrink-0 overflow-hidden bg-crypt">
        {slides.map((slide, i) => {
          // Solo se montan la foto actual y sus vecinas (precarga de la siguiente).
          // Antes se montaban todas: hasta 55 fotos (≈50 MB) por artista.
          const n = slides.length
          const near = isOpen && (i === current || i === (current + 1) % n || i === (current - 1 + n) % n)
          if (!near) return null
          return (
          <div key={i} className={`absolute inset-0 transition-opacity duration-500 ease-[ease] ${i === current ? 'opacity-100' : 'opacity-0'}`}>
            {slide.src ? (
              <img
                src={slide.src}
                alt={`${name} ${i + 1}`}
                onClick={e => { e.stopPropagation(); setZoomed(true) }}
                className="size-full cursor-zoom-in object-contain"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <span className="font-mono text-[9px] tracking-[0.25em] text-bone/18 uppercase">0{i + 1}</span>
              </div>
            )}
          </div>
          )
        })}

        {/* Prev / Next */}
        <button onClick={prev} aria-label="Anterior" className="lg-car-arrow lg-car-arrow--l"><ChevronLeft size={18} strokeWidth={1.25} /></button>
        <button onClick={next} aria-label="Siguiente" className="lg-car-arrow lg-car-arrow--r"><ChevronRight size={18} strokeWidth={1.25} /></button>

        {/* Contador */}
        <div className="absolute right-3 bottom-2.5 z-2 font-mono text-[9px] tracking-[0.2em] text-bone/50">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>

        {/* Link IG */}
        {currentSlide?.igUrl && (
          <a
            href={currentSlide.igUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="absolute top-2.5 right-2.5 z-3 flex items-center gap-[5px] rounded-sm bg-ink/60 px-2 py-1.5 font-mono text-[9px] tracking-[0.15em] text-bone uppercase no-underline backdrop-blur-xs"
          >
            <InstagramIcon size={11} /> Ver post
          </a>
        )}
      </div>

      {/* Zoom lightbox */}
      {zoomed && currentSlide?.src && (
        <div
          onClick={e => { e.stopPropagation(); setZoomed(false) }}
          className="fixed inset-0 z-500 flex items-center justify-center bg-ink/92 p-6"
        >
          <button onClick={e => { e.stopPropagation(); setZoomed(false) }} aria-label="Cerrar" className="lg-round-btn lg-lb-close"><X size={18} strokeWidth={1.25} /></button>
          <button onClick={e => { e.stopPropagation(); goTo(current - 1) }} aria-label="Anterior" className="lg-round-btn lg-lb-nav lg-lb-nav--l"><ChevronLeft size={20} strokeWidth={1.25} /></button>
          <img
            src={currentSlide.src}
            alt={`${name} zoom`}
            onClick={e => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button onClick={e => { e.stopPropagation(); goTo(current + 1) }} aria-label="Siguiente" className="lg-round-btn lg-lb-nav lg-lb-nav--r"><ChevronRight size={20} strokeWidth={1.25} /></button>
          {currentSlide.igUrl && (
            <a href={currentSlide.igUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-sm bg-ink/70 px-3.5 py-2 font-mono text-[10px] tracking-[0.2em] text-gold uppercase no-underline">
              <InstagramIcon size={12} /> Ver post en Instagram
            </a>
          )}
        </div>
      )}
    </>
  )
}

export default function Artists({ locale }: { locale: Locale }) {
  const tr = t[locale].artists
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleToggle = (i: number) => {
    const newOpen = openIndex === i ? null : i
    setOpenIndex(newOpen)
    if (newOpen !== null) {
      setTimeout(() => {
        const el = rowRefs.current[i]
        if (!el) return
        const navHeight = 64
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 12
        window.scrollTo({ top, behavior: 'smooth' })
      }, 120)
    }
  }

  return (
    <section className="ls-section lg-sec" id="artists" data-anim>
      <SectionDecor id="artists" glow="right" daggers sparks={[[8, 6, 12, 1.1], [88, 4, 9, 0.4], [4, 60, 10, 2.3]]} />
      <header className="lg-head">
        <SectionMark n={3} locale={locale} center />
        <div className="ls-section-label" data-reveal="fade">{tr.label}</div>
        <SectionTitle kicker={tr.title} main={tr.titleEm} />
      </header>

      {/* Escritorio: índice + escenario. Tablet/móvil: acordeón. */}
      <ArtistRoster locale={locale} />

      <div className="lg-artists-accordion" data-reveal="fade">
        {artists.map((artist, i) => {
          const isOpen = openIndex === i

          return (
            <div
              key={artist.name}
              ref={el => { rowRefs.current[i] = el }}
              className={`ls-artist-row relative${isOpen ? ' open' : ''}`}
            >
              {/* Header — siempre visible, click abre/cierra */}
              <div
                className="ls-artist-row-header"
                onClick={() => handleToggle(i)}
              >
                <div className="ls-artist-name-wrap">
                  <span className="lg-artist-oval" aria-hidden="true">
                    {portraitOf(artist.name) && (
                      <img src={portraitOf(artist.name)!} alt="" loading="lazy" decoding="async" width={120} height={160} />
                    )}
                  </span>
                  <span className="lg-artist-num" aria-hidden="true">N° {String(i + 1).padStart(2, '0')}</span>
                  <div className="ls-artist-name">{artist.name}</div>
                  <div className="ls-artist-role-label">{artist.role[locale]}</div>
                </div>
              </div>

              <button
                className="ls-artist-toggle"
                aria-label={isOpen ? 'Cerrar' : 'Abrir'}
                onClick={e => { e.stopPropagation(); handleToggle(i) }}
              >
                <Plus size={16} strokeWidth={1.25} />
              </button>

              <div className="ls-artist-bio-wrap ls-artist-bio-wrap-col">
                <ArtistCarousel key={isOpen ? 'open' : 'closed'} name={artist.name} isOpen={isOpen} />
                <div>
                  <p className="ls-artist-bio">{artist.bio[locale]}</p>
                </div>
              </div>

              <div className="ls-artist-tags-wrap ls-artist-tags-col">
                <div className="ls-artist-tags">{artist.styles[locale]}</div>
                <a
                  className="ls-artist-ig-link inline-flex items-center gap-1.5"
                  href={`https://instagram.com/${artist.ig.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                >
                  <InstagramIcon size={14} />
                  {artist.ig.startsWith('@') ? artist.ig : `@${artist.ig}`}
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
