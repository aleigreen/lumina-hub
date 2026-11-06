'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import './lumina.css'
import './gothic.css'
import './editorial.css'
import Hero from './sections/Hero'
import { ArrowRight, Eye, Flame, X } from 'lucide-react'
import Marquee, { GothicWall } from './ui/Marquee'
import { InstagramIcon } from './ui/Icons'
import { Corners, OrnamentDivider, Seal, SectionDecor, SectionMark, SectionTitle, Sparkle } from './ui/Ornaments'
import Studio from './sections/Studio'
import Artists from './sections/Artists'
import SafeSpace from './sections/SafeSpace'
import Location from './sections/Location'
import BookingForm from './sections/BookingForm'
import FAQ from './sections/FAQ'
import PaymentBadges from './ui/PaymentBadges'
import { t, type Locale } from './data/translations'

export default function LuminaHome() {

  const [locale, setLocale] = useState<Locale>('es')
  const [menuOpen, setMenuOpen] = useState(false)
  const [valoresOpen, setValoresOpen] = useState(false)
  const rootRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  // Revelado al hacer scroll: cualquier elemento con [data-reveal] aparece al entrar en pantalla.
  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) return
    root.classList.add('ls-anim-ready')
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    )
    root.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))

    // Pausa las animaciones infinitas de los bloques que no están en pantalla
    // (hero, marquesinas, decoraciones de sección): menos trabajo de GPU/CPU.
    const pauser = new IntersectionObserver(
      entries => {
        for (const entry of entries) entry.target.classList.toggle('is-paused', !entry.isIntersecting)
      },
      { rootMargin: '120px 0px' },
    )
    root.querySelectorAll('[data-anim]').forEach(el => pauser.observe(el))

    return () => { io.disconnect(); pauser.disconnect() }
  }, [])

  // Scroll: barra de progreso y nav que se oculta al bajar.
  // Solo escribe transform/clases en la nav: nada que recalcule estilos de toda la página.
  useEffect(() => {
    const root = rootRef.current
    const nav = navRef.current
    const bar = progressRef.current
    if (!root || !nav || !bar) return
    let lastY = window.scrollY
    let ticking = false
    let maxScroll = 1

    const measure = () => { maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight) }
    const update = () => {
      ticking = false
      const y = window.scrollY
      const vh = window.innerHeight
      bar.style.transform = `scaleX(${Math.min(1, y / maxScroll)})`
      nav.classList.toggle('is-scrolled', y > 40)

      const menuIsOpen = root.querySelector('.ls-mobile-menu.open') !== null
      if (y > lastY + 6 && y > vh * 0.6 && !menuIsOpen) nav.classList.add('is-hidden')
      else if (y < lastY - 6 || y < 80 || menuIsOpen) nav.classList.remove('is-hidden')
      if (Math.abs(y - lastY) > 6) lastY = y
    }
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }
    const onResize = () => { measure(); onScroll() }
    // La altura del documento cambia al abrir artistas/FAQ: se re-mide sin leer layout en cada scroll.
    // El ResizeObserver también dispara al empezar a observar, ya con el layout calculado:
    // así la primera medición no fuerza un reflow durante la carga.
    const ro = new ResizeObserver(onResize)
    ro.observe(root)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Modal de valores: Escape lo cierra y el fondo no se desplaza mientras está abierto.
  useEffect(() => {
    if (!valoresOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setValoresOpen(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [valoresOpen])

  const marqueeStyles = locale === 'es'
    ? ['Neo-gótico', 'Anime', 'Fine line', 'Blackwork', 'Full color']
    : ['Neo-gothic', 'Anime', 'Fine line', 'Blackwork', 'Full color']
  const marqueeRitual = locale === 'es'
    ? ['Arte permanente', 'Cada pieza, un ritual', 'Condesa · CDMX']
    : ['Permanent art', 'Every piece, a ritual', 'Condesa · CDMX']

  return (
    <main ref={rootRef} className="ls-root min-h-screen bg-ink text-bone">

      <div className="lg-grain" aria-hidden="true" />

      {/* NAV */}
      <nav className="ls-nav" ref={navRef}>
        <span className="lg-progress" ref={progressRef} aria-hidden="true" />
        <div className="ls-nav-links lg-nav-side lg-nav-side--l">
          <a href="#studio">{t[locale].nav.studio}</a>
          <a href="#artists">{t[locale].nav.artists}</a>
          <a href="#faq">{t[locale].nav.faq}</a>
        </div>
        <a href="#" className="ls-nav-logo">
          <Image src="/lumina/icon-wt.png" alt="Lumina Sanctum" width={17} height={36} loading="eager" className="h-9 w-auto" />
          <div className="ls-nav-logo-wordmark ls-nav-logo-wordmark--desktop" aria-hidden="true">
            <div className="ls-nav-logo-text">LUMINA</div>
            <div className="ls-nav-logo-sub">SANCTUM</div>
          </div>
        </a>
        <div className="ls-nav-links lg-nav-side lg-nav-side--r">
          <button type="button" className="lg-nav-btn" onClick={() => setValoresOpen(true)}>{t[locale].nav.values}</button>
          <button type="button" className="lg-nav-lang" onClick={() => setLocale(locale === 'en' ? 'es' : 'en')} aria-label={locale === 'en' ? 'ES · Cambiar a español' : 'EN · Switch to English'}>
            {locale === 'en' ? 'ES' : 'EN'}
          </button>
          <a href="#book" className="lg-nav-cta">{t[locale].nav.book}</a>
        </div>
        <button
          className={`ls-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} className="fixed inset-0 z-98" />
      )}
      <div className={`ls-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#studio" onClick={() => setMenuOpen(false)}>{t[locale].nav.studio}</a>
        <a href="#artists" onClick={() => setMenuOpen(false)}>{t[locale].nav.artists}</a>
        <a href="#book" onClick={() => setMenuOpen(false)}>{t[locale].nav.book}</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>{t[locale].nav.faq}</a>
        <button onClick={() => { setLocale(locale === 'en' ? 'es' : 'en'); setMenuOpen(false) }}>
          {locale === 'en' ? 'ES' : 'EN'}
        </button>
      </div>

      <Hero locale={locale} />
      <Marquee items={marqueeStyles} />
      <Studio locale={locale} />
      <SafeSpace locale={locale} onValores={() => setValoresOpen(true)} />
      <Artists locale={locale} />
      <GothicWall rows={marqueeRitual} />

      {/* BOOKING */}
      <section className="ls-section ls-booking lg-sec" id="book" data-anim>
        <SectionDecor id="book" glow="left" sparks={[[6, 18, 12, 0.4], [48, 90, 10, 1.6], [94, 8, 14, 2.4]]} />
        <div className="ls-booking-grid">
          <div>
            <SectionMark n={4} locale={locale} />
            <div className="ls-section-label" data-reveal="fade">{t[locale].booking.label}</div>
            <SectionTitle kicker={t[locale].booking.title} main={t[locale].booking.titleEm} align="left" />
            <p data-reveal className="max-w-[380px] font-body text-xl leading-[1.8] text-ash">
              {t[locale].booking.body}
            </p>
            <div className="ls-booking-note" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>{t[locale].booking.deposit}</div>
            <div className="mt-8" style={{ '--d': '0.2s' } as React.CSSProperties} data-reveal>
              <PaymentBadges label={t[locale].booking.accept} />
            </div>
          </div>
          <div className="ls-form-card lg-framed" data-reveal style={{ '--d': '0.15s' } as React.CSSProperties}>
            <div className="lg-form-seal" aria-hidden="true">
              <Seal
                id={`form-${locale}`}
                text={locale === 'es' ? '✦ Tu proyecto ✦ Tu ritual ✦ Lumina Sanctum ' : '✦ Your project ✦ Your ritual ✦ Lumina Sanctum '}
              />
            </div>
            <BookingForm initialArtist="" locale={locale} />
          </div>
        </div>
      </section>

      <FAQ locale={locale} />
      <Location locale={locale} />

      {/* FOOTER */}
      <footer className="ls-footer lg-sec" data-anim>
        <SectionDecor id="footer" glow="none" sparks={[[8, 30, 10, 0.2], [91, 22, 14, 1.4], [70, 70, 9, 2.2]]} />
        <OrnamentDivider />
        <div className="lg-footer-mark" aria-hidden="true" data-reveal="title">LUMINA</div>
        <div className="ls-footer-top">
          <div className="ls-footer-logo">
            <Image src="/lumina/icon-wt.png" alt="Lumina Sanctum" width={22} height={48} className="object-contain" />
            <div>
              <div className="ls-footer-logo-text">Lumina</div>
              <div className="ls-footer-logo-sub">Sanctum</div>
            </div>
          </div>
        </div>
        <div className="ls-footer-bottom">
          <div className="ls-footer-copy">© MMXXVI · Lumina Sanctum</div>
          <div className="ls-footer-links">
            <a href="https://instagram.com/luminasanctum.tattoo" target="_blank" rel="noopener noreferrer" className="lg-footer-ig"><InstagramIcon size={13} strokeWidth={1.5} />{t[locale].footer.instagram}</a>
            <a href="#book">{t[locale].footer.book}</a>
          </div>
        </div>
        <div className="lg-footer-credit">
          {t[locale].footer.credit}{' '}
          <a href="https://holiic.mx/" target="_blank" rel="noopener noreferrer">holiic</a>
          <span className="lg-footer-heart" aria-hidden="true">♡</span>
        </div>
      </footer>

      {/* VALORES MODAL */}
      {valoresOpen && (
        <div className="lg-vmodal-overlay" onClick={() => setValoresOpen(false)}>
          <div className="lg-vmodal" role="dialog" aria-modal="true" aria-labelledby="vmodal-title" onClick={e => e.stopPropagation()}>
            <div className="lg-vmodal-frame" aria-hidden="true"><Corners /></div>
            <button type="button" className="lg-round-btn lg-vmodal-close" onClick={() => setValoresOpen(false)} aria-label={locale === 'es' ? 'Cerrar' : 'Close'}>
              <X size={18} strokeWidth={1.25} />
            </button>

            <header className="lg-vmodal-head">
              <div className="lg-vmodal-label"><Sparkle size={8} /> {t[locale].identity.label} <Sparkle size={8} /></div>
              {/* Sin data-reveal: el modal se monta después del observador de scroll */}
              <h2 id="vmodal-title" className="lg-title lg-title--center is-in">
                <span className="lg-title-kicker">{locale === 'es' ? 'Nuestros' : 'Our'}</span>
                <span className="lg-title-main">{locale === 'es' ? 'Valores' : 'Values'}</span>
              </h2>
            </header>

            <div className="lg-vmodal-grid">
              {([
                { Icon: Flame, title: t[locale].identity.missionTitle, body: t[locale].identity.missionBody },
                { Icon: Eye, title: t[locale].identity.visionTitle, body: t[locale].identity.visionBody },
              ]).map(({ Icon, title, body }, i) => (
                <article key={title} className="lg-vcard" style={{ '--d': `${0.15 + i * 0.12}s` } as React.CSSProperties}>
                  <span className="lg-vcard-icon"><Icon size={22} strokeWidth={1} /></span>
                  <span className="lg-vcard-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="lg-vcard-title">{title}</h3>
                  <Sparkle size={9} className="lg-vcard-star" />
                  <p className="lg-vcard-body">{body}</p>
                </article>
              ))}
            </div>

            <footer className="lg-vmodal-foot">
              <a href="#book" className="lg-pill" onClick={() => setValoresOpen(false)}>
                {t[locale].nav.book} <ArrowRight size={14} strokeWidth={1.5} />
              </a>
            </footer>
          </div>
        </div>
      )}
    </main>
  )
}
