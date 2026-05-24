'use client'

import { useState, useEffect, useRef } from 'react'
import { t, type Locale } from '../data/translations'

type Props = { locale: Locale }

// Reemplaza src con tus fotos en WebP, 1200×800px, <150KB cada una
const SLIDES = [
  { src: '/lumina/studio/LUMINA-9.png', caption: 'Studio · 01' },
  { src: '/lumina/studio/LUMINA-71.png', caption: 'Studio · 02' },
  { src: '/lumina/studio/LUMINA-73.png', caption: 'Studio · 03' },
  { src: '/lumina/studio/LUMINA-60.png', caption: 'Studio · 04' },
]

export default function Studio({ locale }: Props) {
  const tr = t[locale].studio
  const [current, setCurrent] = useState(0)
  const [line1, line2] = tr.body.split('\n\n')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = (i: number) => {
    setCurrent((i + SLIDES.length) % SLIDES.length)
  }

  // Auto-advance every 4s, pauses on manual interaction
  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(current + 1), 4000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current])

  const handleManual = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    goTo(i)
  }

  return (
    <section className="ls-section" id="studio">
      <div className="ls-section-label">{tr.label}</div>
      <h2 className="ls-section-title">{tr.title} <em>{tr.titleEm}</em></h2>

      <div style={{ marginBottom: '2px' }} className="ls-studio-grid">

        {/* Carrusel */}
        <div className="ls-studio-sub" style={{ position: 'relative', background: '#15110c', overflow: 'hidden' }}>
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              style={{
                position: 'absolute', inset: 0,
                opacity: i === current ? 1 : 0,
                transition: 'opacity 0.7s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {slide.src ? (
                <img
                  src={slide.src}
                  alt={slide.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(10%) brightness(0.85)' }}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                // Placeholder: eliminar cuando tengas fotos
                <div style={{ width: '100%', height: '100%', background: `hsl(${30 + i * 8}, 15%, ${10 + i * 2}%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '1px', background: 'rgba(232,219,196,0.15)' }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(232,219,196,0.2)', textTransform: 'uppercase' }}>
                    {slide.caption}
                  </span>
                  <div style={{ width: '40px', height: '1px', background: 'rgba(232,219,196,0.15)' }} />
                </div>
              )}
            </div>
          ))}

          {/* Flechas */}
          <button
            onClick={() => handleManual(current - 1)}
            aria-label="Anterior"
            style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', zIndex: 2,
              color: 'rgba(232,219,196,0.5)', fontSize: '20px', padding: '8px',
              transition: 'color 0.2s', fontFamily: 'monospace',
            }}
          >‹</button>
          <button
            onClick={() => handleManual(current + 1)}
            aria-label="Siguiente"
            style={{
              position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', zIndex: 2,
              color: 'rgba(232,219,196,0.5)', fontSize: '20px', padding: '8px',
              transition: 'color 0.2s', fontFamily: 'monospace',
            }}
          >›</button>

          {/* Puntos */}
          <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 2 }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManual(i)}
                aria-label={`Foto ${i + 1}`}
                style={{
                  width: i === current ? '20px' : '6px', height: '2px',
                  background: i === current ? '#c8a872' : 'rgba(232,219,196,0.25)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Contador */}
          <div style={{
            position: 'absolute', top: '16px', right: '16px', zIndex: 2,
            fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
            letterSpacing: '0.2em', color: 'rgba(232,219,196,0.4)',
          }}>
            0{current + 1} / 0{SLIDES.length}
          </div>
        </div>

        {/* Texto */}
        <div className="ls-studio-text">
          <p>{line1}<br /><br />{line2}</p>
        </div>
      </div>

    </section>
  )
}
