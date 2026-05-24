'use client'

import { useState, useRef, useEffect } from 'react'
import { artists } from '../data/artists'
import { t, type Locale } from '../data/translations'

function IgIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

type Slide = { src: string | null; igUrl: string | null }

const ARTIST_SLIDES: Record<string, Slide[]> = {
  'César': [
    { src: '/lumina/artists/Cesar/Portada.jpeg', igUrl: 'https://www.instagram.com/p/DYdMICRiYan/' },
    { src: '/lumina/artists/Cesar/IMG_5210.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5211.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5212.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5213.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5214.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5215.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5216.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5217.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5218.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5219.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5220.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5221.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5222.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5223.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5224.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5225.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5226.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5227.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5228.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5229.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5230.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5231.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5232.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5313.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5314.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5315.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5316.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5317.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5318.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5319.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5320.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5321.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5322.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5323.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5324.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5325.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5326.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5327.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5328.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5329.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5330.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5331.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5332.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5333.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5334.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5335.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5336.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5337.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5338.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5339.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5340.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5341.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5342.JPG', igUrl: null },
    { src: '/lumina/artists/Cesar/IMG_5343.JPG', igUrl: null },
  ],
  'Meri': [
    { src: '/lumina/artists/Meri/Portada.jpeg', igUrl: 'https://www.instagram.com/p/DYS7NCuCcNi/' },
    { src: '/lumina/artists/Meri/IMG_5188.JPG', igUrl: null },
    { src: '/lumina/artists/Meri/IMG_5189.JPG', igUrl: null },
    { src: '/lumina/artists/Meri/IMG_5190.JPG', igUrl: null },
    { src: '/lumina/artists/Meri/IMG_5191.JPG', igUrl: null },
    { src: '/lumina/artists/Meri/IMG_5192.JPG', igUrl: null },
    { src: '/lumina/artists/Meri/IMG_5194.JPG', igUrl: null },
    { src: '/lumina/artists/Meri/IMG_5199.JPG', igUrl: null },
  ],
  'Morgana Andre': [
    { src: '/lumina/artists/Morgana/Portada.jpeg', igUrl: 'https://www.instagram.com/p/DYN795rDE_Z/' },
    { src: '/lumina/artists/Morgana/IMG_5147.JPG', igUrl: null },
    { src: '/lumina/artists/Morgana/IMG_5149.JPG', igUrl: null },
    { src: '/lumina/artists/Morgana/IMG_5151.JPG', igUrl: null },
    { src: '/lumina/artists/Morgana/IMG_5153.JPG', igUrl: null },
  ],
  'Connyink': [
    { src: '/lumina/artists/Conny/Portada.PNG', igUrl: 'https://www.instagram.com/p/DYLROIzDOsp/' },
    { src: '/lumina/artists/Conny/IMG_5045.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5046.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5048.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5049.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5050.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5051.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5052.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5053.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5054.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5055.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5056.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5057.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5058.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5059.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5060.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5061.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5062.JPG', igUrl: null },
    { src: '/lumina/artists/Conny/IMG_5063.JPG', igUrl: null },
  ],
  'Danz': [
    { src: '/lumina/artists/Danz/Portada.jpeg', igUrl: 'https://www.instagram.com/p/DYdMICRiYan/' },
    { src: '/lumina/artists/Danz/IMG_5433.PNG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5434.JPG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5435.PNG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5436.PNG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5438.PNG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5440.PNG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5441.PNG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5442.PNG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5448.PNG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5449.PNG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5450.PNG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5451.PNG', igUrl: null },
    { src: '/lumina/artists/Danz/IMG_5452.PNG', igUrl: null },
  ],
}

function ArtistCarousel({ name, isOpen }: { name: string; isOpen: boolean }) {
  const slides = ARTIST_SLIDES[name] ?? []
  const [current, setCurrent] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = (i: number) => setCurrent((i + slides.length) % slides.length)

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current) }

  // Resetea a portada al abrir/cerrar
  useEffect(() => {
    setCurrent(0)
    setZoomed(false)
  }, [isOpen])

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
      <div className="ls-artist-carousel" style={{ position: 'relative', flexShrink: 0, background: '#15110c', overflow: 'hidden' }}>
        {slides.map((slide, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === current ? 1 : 0, transition: 'opacity 0.5s ease' }}>
            {slide.src ? (
              <img
                src={slide.src}
                alt={`${name} ${i + 1}`}
                onClick={e => { e.stopPropagation(); setZoomed(true) }}
                style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'zoom-in' }}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(232,219,196,0.18)', textTransform: 'uppercase' }}>0{i + 1}</span>
              </div>
            )}
          </div>
        ))}

        {/* Prev / Next */}
        <button onClick={prev} aria-label="Anterior" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(232,219,196,0.7)', fontSize: '20px' }}>‹</button>
        <button onClick={next} aria-label="Siguiente" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(232,219,196,0.7)', fontSize: '20px' }}>›</button>

        {/* Contador */}
        <div style={{ position: 'absolute', bottom: '10px', right: '12px', zIndex: 2, fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(232,219,196,0.5)' }}>
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>

        {/* Link IG */}
        {currentSlide?.igUrl && (
          <a
            href={currentSlide.igUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 3, background: 'rgba(13,10,7,0.6)', backdropFilter: 'blur(4px)', borderRadius: '4px', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: '5px', color: '#e8dfcf', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
          >
            <IgIcon size={11} /> Ver post
          </a>
        )}
      </div>

      {/* Zoom lightbox */}
      {zoomed && currentSlide?.src && (
        <div
          onClick={e => { e.stopPropagation(); setZoomed(false) }}
          style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(13,10,7,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
        >
          <button onClick={e => { e.stopPropagation(); setZoomed(false) }} style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', color: '#e8dfcf', fontSize: '28px', cursor: 'pointer', fontFamily: 'monospace', lineHeight: 1 }}>×</button>
          <button onClick={e => { e.stopPropagation(); goTo(current - 1) }} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(232,219,196,0.7)', fontSize: '32px', cursor: 'pointer' }}>‹</button>
          <img
            src={currentSlide.src}
            alt={`${name} zoom`}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
          />
          <button onClick={e => { e.stopPropagation(); goTo(current + 1) }} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(232,219,196,0.7)', fontSize: '32px', cursor: 'pointer' }}>›</button>
          {currentSlide.igUrl && (
            <a href={currentSlide.igUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(13,10,7,0.7)', borderRadius: '4px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px', color: '#c8a872', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              <IgIcon size={12} /> Ver post en Instagram
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
    <section className="ls-section" id="artists">
      <div className="ls-section-label">{tr.label}</div>
      <h2 className="ls-section-title">{tr.title} <em>{tr.titleEm}</em></h2>

      <div>
        {artists.map((artist, i) => {
          const isOpen = openIndex === i

          return (
            <div
              key={artist.name}
              ref={el => { rowRefs.current[i] = el }}
              className={`ls-artist-row${isOpen ? ' open' : ''}`}
              onMouseEnter={() => { if (window.innerWidth >= 1025) setOpenIndex(i) }}
              style={{ position: 'relative' }}
            >
              {/* Header — siempre visible, click abre/cierra */}
              <div
                className="ls-artist-row-header"
                onClick={() => handleToggle(i)}
              >
                <div className="ls-artist-name-wrap">
                  <div className="ls-artist-name">{artist.name}</div>
                  <div className="ls-artist-role-label">{artist.role[locale]}</div>
                </div>
              </div>

              <button
                className="ls-artist-toggle"
                aria-label={isOpen ? 'Cerrar' : 'Abrir'}
                onClick={e => { e.stopPropagation(); handleToggle(i) }}
              >
                {isOpen ? (
                  <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                    <line x1="0" y1="1" x2="14" y2="1" stroke="#c8a872" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ) : '+'}
              </button>

              <div className="ls-artist-bio-wrap ls-artist-bio-wrap-col">
                <ArtistCarousel name={artist.name} isOpen={isOpen} />
                <div>
                  <p className="ls-artist-bio">{artist.bio[locale]}</p>
                </div>
              </div>

              <div className="ls-artist-tags-wrap ls-artist-tags-col">
                <div className="ls-artist-tags">{artist.styles[locale]}</div>
                <a
                  className="ls-artist-ig-link"
                  href={`https://instagram.com/${artist.ig.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <IgIcon />
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
