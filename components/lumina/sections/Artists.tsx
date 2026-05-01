'use client'

import { useState, useEffect, useRef } from 'react'
import { artists } from '../data/artists'
import { t, type Locale } from '../data/translations'

type Props = {
  selectedArtist: string
  onSelect: (name: string) => void
  locale: Locale
}

// Por artista: 4 fotos en WebP 600×800px <100KB cada una
// Reemplaza los null con '/lumina/artists/cesar-01.webp' etc.
const ARTIST_PHOTOS: Record<string, (string | null)[]> = {
  'César':        [null, null, null, null],
  'Meri':         [null, null, null, null],
  'Morgana Andre':[null, null, null, null],
  'Connyyink':    [null, null, null, null],
}

function ArtistCarousel({ name }: { name: string }) {
  const photos = ARTIST_PHOTOS[name] ?? [null, null, null, null]
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = (i: number) => setCurrent((i + photos.length) % photos.length)

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(current + 1), 3500)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, name])

  const handleManual = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    goTo(i)
  }

  return (
    <div style={{ position: 'relative', width: '180px', height: '240px', flexShrink: 0, background: '#15110c', overflow: 'hidden' }}>
      {photos.map((src, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === current ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          {src ? (
            <img src={src} alt={`${name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(10%) brightness(0.85)' }} loading="lazy" decoding="async" />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(232,219,196,0.12)' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(232,219,196,0.18)', textTransform: 'uppercase' }}>0{i + 1}</span>
              <div style={{ width: '24px', height: '1px', background: 'rgba(232,219,196,0.12)' }} />
            </div>
          )}
        </div>
      ))}

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '6px', zIndex: 2 }}>
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); handleManual(i) }}
            aria-label={`Foto ${i + 1}`}
            style={{
              width: i === current ? '14px' : '4px', height: '2px',
              background: i === current ? '#c8a872' : 'rgba(232,219,196,0.2)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Artists({ selectedArtist, onSelect, locale }: Props) {
  const tr = t[locale].artists
  const [openIndex, setOpenIndex] = useState(0)

  const handleSelect = (name: string) => {
    onSelect(name)
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="ls-section" id="artists">
      <div className="ls-section-label">{tr.label}</div>
      <h2 className="ls-section-title">{tr.title} <em>{tr.titleEm}</em></h2>

      <div>
        {artists.map((artist, i) => {
          const isOpen = openIndex === i
          const isSelected = selectedArtist === artist.name

          return (
            <div
              key={artist.name}
              className={`ls-artist-row${isOpen ? ' open' : ''}`}
              onMouseEnter={() => setOpenIndex(i)}
              onClick={() => setOpenIndex(i)}
            >
              {/* Counter */}
              <div className="ls-artist-counter">{String(i + 1).padStart(2, '0')}</div>

              {/* Nombre + rol — siempre visible */}
              <div className="ls-artist-name-wrap">
                <div className="ls-artist-name">{artist.name}</div>
                <div className="ls-artist-role-label">{artist.role[locale]}</div>
              </div>

              {/* Carrusel + bio — visible solo cuando abierto */}
              <div className="ls-artist-bio-wrap ls-artist-bio-wrap-col" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <ArtistCarousel name={artist.name} />
                <div>
                  <p className="ls-artist-bio">{artist.bio[locale]}</p>
                  <button
                    className={`ls-artist-select-btn${isSelected ? ' selected' : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleSelect(artist.name) }}
                    style={{ marginTop: '16px' }}
                  >
                    {isSelected ? `✓ ${tr.selected}` : (locale === 'es' ? 'Elegir artista →' : 'Choose artist →')}
                  </button>
                </div>
              </div>

              {/* Tags + IG */}
              <div className="ls-artist-tags-wrap ls-artist-tags-col">
                <div className="ls-artist-tags">{artist.styles[locale]}</div>
                <a
                  className="ls-artist-ig-link"
                  href={`https://instagram.com/${artist.ig.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                >
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
