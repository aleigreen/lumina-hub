'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { t, type Locale } from '../data/translations'
import { stripArrow } from '../ui/Icons'
import { Arch, Circles, Corners, Dagger, HeroStar, Seal, Sparkle } from '../ui/Ornaments'

type Props = { locale: Locale }

const TITLE = 'LUMINA'
const SPOT_R = 460 // radio del halo (la mitad del tamaño del elemento en CSS)

// Destellos flotantes: [left %, top %, tamaño px, retraso s]
const SPARKS: [number, number, number, number][] = [
  [14, 22, 18, 0], [84, 18, 12, 1.2], [9, 70, 10, 2.1],
  [90, 64, 20, 0.6], [24, 86, 9, 1.7], [74, 84, 12, 2.6],
]

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

export default function Hero({ locale }: Props) {
  const tr = t[locale].hero
  const ref = useRef<HTMLElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const starRef = useRef<HTMLDivElement>(null)

  /* ── Luz de vela que sigue al cursor ─────────────────────────
     · Un único elemento movido con translate3d (solo composición, sin repintar).
     · Sin lecturas de layout por evento: el origen se mide al entrar/redimensionar.
     · Interpolación suave en rAF que se detiene sola cuando alcanza el cursor. */
  useEffect(() => {
    const hero = ref.current
    const spot = spotRef.current
    if (!hero || !spot) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ox = 0, oy = 0
    let tx = 0, ty = 0
    let x = 0, y = 0
    let raf = 0
    let placed = false

    const paint = () => { spot.style.transform = `translate3d(${x - SPOT_R}px, ${y - SPOT_R}px, 0)` }
    const tick = () => {
      x += (tx - x) * 0.14
      y += (ty - y) * 0.14
      paint()
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0
    }
    const measure = () => {
      const r = hero.getBoundingClientRect()
      ox = r.left + window.scrollX
      oy = r.top + window.scrollY
    }
    const onEnter = () => { measure(); spot.classList.remove('is-off') }
    const onLeave = () => spot.classList.add('is-off')
    const onMove = (e: PointerEvent) => {
      tx = e.pageX - ox
      ty = e.pageY - oy
      if (!raf) raf = requestAnimationFrame(tick)
    }

    // Las medidas llegan por ResizeObserver (dispara tras el layout, también al inicio):
    // leerlas al montar forzaría un reflow durante la carga.
    const ro = new ResizeObserver(([entry]) => {
      measure()
      if (!placed) {
        placed = true
        tx = x = entry.contentRect.width / 2
        ty = y = entry.contentRect.height * 0.42
        paint()
      }
    })
    ro.observe(hero)
    hero.addEventListener('pointerenter', onEnter)
    hero.addEventListener('pointerleave', onLeave)
    hero.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      hero.removeEventListener('pointerenter', onEnter)
      hero.removeEventListener('pointerleave', onLeave)
      hero.removeEventListener('pointermove', onMove)
    }
  }, [])

  /* ── Parallax de salida: transforms directos sobre 2 nodos.
     Antes era una variable CSS en <main>, que recalculaba estilos de toda la página
     en cada frame de scroll. Ahora se deja de escribir al salir del hero. */
  useEffect(() => {
    const content = contentRef.current
    const star = starRef.current
    if (!content || !star) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let last = -1
    let raf = 0
    const update = () => {
      raf = 0
      const p = Math.min(1, window.scrollY / window.innerHeight)
      if (p === last) return
      last = p
      content.style.transform = p ? `translate3d(0, ${p * -70}px, 0)` : ''
      content.style.opacity = p ? String(Math.max(0, 1 - p * 1.2)) : ''
      star.style.transform = `translate(-50%, -50%) scale(${1 + p * 0.35}) rotate(${p * 30}deg)`
      star.style.opacity = String(0.75 - p * 0.6)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    // Primer cálculo en el siguiente frame, no durante el montaje (leer scrollY aquí fuerza reflow).
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const seal = locale === 'es'
    ? '✦ Arte permanente ✦ Cada pieza, un ritual '
    : '✦ Permanent art ✦ Every piece, a ritual '

  return (
    <section className="ls-hero" id="hero" ref={ref} data-anim>
      {/* ── Atmósfera ── */}
      <div className="lg-hero-spot" ref={spotRef} aria-hidden="true" />
      <div className="lg-hero-star" ref={starRef} aria-hidden="true"><HeroStar /></div>
      <div className="lg-hero-vignette" aria-hidden="true" />

      {/* ── Marco ── */}
      <div className="lg-hero-frame" aria-hidden="true"><Corners /></div>

      <Dagger className="lg-hero-dagger lg-hero-dagger--l" />
      <Dagger className="lg-hero-dagger lg-hero-dagger--r" />

      {SPARKS.map(([x, y, s, delay], i) => (
        <Sparkle
          key={i}
          size={s}
          className="lg-hero-spark lg-twinkle"
          style={{ left: `${x}%`, top: `${y}%`, ...d(delay) }}
        />
      ))}

      <div className="lg-hero-seal" aria-hidden="true">
        <Seal id={`hero-${locale}`} text={seal} />
      </div>

      <Circles className="lg-hero-circles" />

      {/* ── Contenido ── */}
      <div className="lg-hero-content" ref={contentRef}>
        <div className="ls-hero-eyebrow lg-rise" style={d(0.3)}>{tr.eyebrow}</div>

        <div className="lg-hero-emblem">
          <Arch className="lg-hero-arch" />
          {/* Imagen LCP: preload pone el <link> en el <head> con fetchpriority=high y next/image sirve un tamaño acorde (no el PNG de 985 px). */}
          <Image
            src="/lumina/icon-wt.png"
            alt=""
            className="lg-hero-icon mb-6 h-[clamp(80px,10vw,130px)] w-auto"
            width={60}
            height={130}
            preload
            fetchPriority="high"
          />
          <div className="mb-9 inline-flex flex-col items-stretch">
            <h1 className="ls-hero-title" aria-label={TITLE}>
              {TITLE.split('').map((ch, i) => (
                <span key={i} className="lg-letter" aria-hidden="true" style={{ '--i': i } as CSSProperties}>
                  {ch}
                </span>
              ))}
            </h1>
            <div className="ls-hero-subtitle lg-sheen">SANCTUM</div>
          </div>
        </div>

        <div className="ls-hero-divider lg-grow" style={d(1.5)} />
        <div className="ls-hero-location lg-rise" style={d(1.65)}>{tr.location}</div>
        <div className="ls-hero-cta lg-rise" style={d(1.8)}>
          <a href="#book" className="ls-btn-primary">{stripArrow(tr.cta)}<ArrowRight size={14} strokeWidth={1.5} /></a>
          <a href="#artists" className="ls-btn-outline">{tr.ctaSecondary}</a>
        </div>
      </div>

      <a href="#studio" className="lg-scroll">
        <span className="lg-scroll-text">{locale === 'es' ? 'Desliza' : 'Scroll'}</span>
        <span className="lg-scroll-line" />
      </a>
    </section>
  )
}
