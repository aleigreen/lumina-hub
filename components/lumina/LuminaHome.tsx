'use client'

import { useState } from 'react'
import Hero from './sections/Hero'
import Studio from './sections/Studio'
import Artists from './sections/Artists'
import SafeSpace from './sections/SafeSpace'
import Location from './sections/Location'
import BookingForm from './sections/BookingForm'
import FAQ from './sections/FAQ'
import PaymentBadges from './ui/PaymentBadges'
import { t, type Locale } from './data/translations'

export default function LuminaHome() {
  const [selectedArtist, setSelectedArtist] = useState('')
  const [locale, setLocale] = useState<Locale>('en')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main style={{ background: '#fff', color: '#111', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Jost', sans-serif; }

        .ls-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 60px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e8e8e8;
        }
        .ls-nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 400; letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .ls-nav-links { display: flex; gap: 40px; }
        .ls-nav-links a {
          font-family: 'Jost', sans-serif;
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #666; text-decoration: none; transition: color 0.2s;
        }
        .ls-nav-links a:hover { color: #111; }

        .ls-hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 120px 40px 80px;
          border-bottom: 1px solid #e8e8e8;
          gap: 0;
        }
        .ls-hero-eyebrow {
          font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #999; margin-bottom: 24px;
        }
        .ls-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(60px, 9vw, 130px);
          font-weight: 300; line-height: 1;
          letter-spacing: 0.05em; margin-bottom: 0;
        }
        .ls-hero-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 3.5vw, 44px);
          font-weight: 300; font-style: italic;
          color: #888; margin-bottom: 32px; margin-top: 4px;
        }
        .ls-hero-divider {
          width: 1px; height: 48px; background: #ddd; margin-bottom: 24px;
        }
        .ls-hero-location {
          font-size: 12px; letter-spacing: 0.25em; text-transform: uppercase;
          color: #bbb; margin-bottom: 40px;
        }
        .ls-hero-cta {
          display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
          width: 100%;
        }
        .ls-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: #111; color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 16px 36px; border: none; cursor: pointer;
          text-decoration: none; transition: background 0.2s;
        }
        .ls-btn-primary:hover { background: #333; }
        .ls-btn-primary:disabled { background: #ccc; cursor: not-allowed; }
        .ls-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: #111;
          font-family: 'Jost', sans-serif;
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 15px 36px; border: 1px solid #ccc; cursor: pointer;
          text-decoration: none; transition: all 0.2s;
        }
        .ls-btn-outline:hover { background: #111; color: #fff; border-color: #111; }

        .ls-section { padding: 100px 60px; border-bottom: 1px solid #e8e8e8; }
        .ls-section-label {
          font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #aaa; margin-bottom: 20px;
        }
        .ls-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 64px);
          font-weight: 300; line-height: 1.05;
          margin-bottom: 60px;
        }
        .ls-section-title em { font-style: italic; }

        .ls-studio-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 2px;
        }
        .ls-studio-grid .main-img {
          grid-column: 1 / -1;
          height: 420px; background: #f0f0f0; overflow: hidden;
        }
        .ls-studio-grid .main-img img,
        .ls-studio-sub img {
          width: 100%; height: 100%; object-fit: cover;
          filter: grayscale(20%); transition: filter 0.4s;
        }
        .ls-studio-grid .main-img:hover img { filter: grayscale(0); }
        .ls-studio-sub { height: 280px; background: #f0f0f0; overflow: hidden; }
        .ls-studio-sub:hover img { filter: grayscale(0); }
        .ls-studio-text {
          display: flex; flex-direction: column;
          justify-content: center; padding: 48px;
          background: #f8f8f8;
        }
        .ls-studio-text p {
          font-size: 15px; line-height: 2; color: #555; letter-spacing: 0.05em;
        }

        .ls-artists-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .ls-artist-card {
          cursor: pointer; border: 1px solid #e8e8e8; transition: border-color 0.2s;
        }
        .ls-artist-card:hover { border-color: #111; }
        .ls-artist-card.selected { border-color: #111; border-width: 2px; }
        .ls-artist-img {
          height: 360px; background: #f0f0f0; overflow: hidden; position: relative;
        }
        .ls-artist-img img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: filter 0.4s; }
        .ls-artist-card:hover .ls-artist-img img { filter: grayscale(0); }
        .ls-artist-info { padding: 28px 24px; }
        .ls-artist-name {
          font-family: 'Jost', sans-serif;
          font-size: 20px; font-weight: 300; letter-spacing: 0.2em;
          text-transform: uppercase; margin-bottom: 6px;
        }
        .ls-artist-role {
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #999; margin-bottom: 12px;
        }
        .ls-artist-styles {
          font-size: 15px; color: #777; letter-spacing: 0.02em;
          margin-bottom: 14px; line-height: 1.6;
        }
        .ls-artist-ig { font-size: 13px; color: #aaa; letter-spacing: 0.05em; }
        .ls-select-badge {
          position: absolute; top: 12px; right: 12px;
          background: #111; color: #fff;
          font-size: 9px; letter-spacing: 0.3em; padding: 4px 10px;
          text-transform: uppercase;
        }

        .ls-booking { background: #f8f8f8; }
        .ls-booking-grid {
          display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px;
          align-items: start;
        }
        .ls-booking-note {
          font-size: 14px; color: #888; letter-spacing: 0.02em;
          line-height: 1.8; margin-top: 24px;
          padding-top: 24px; border-top: 1px solid #ddd;
        }

        .ls-form-group { margin-bottom: 24px; }
        .ls-form-group label {
          display: block; font-size: 12px; letter-spacing: 0.2em;
          text-transform: uppercase; color: #aaa; margin-bottom: 8px;
        }
        .ls-form-group input,
        .ls-form-group textarea,
        .ls-form-group select {
          width: 100%; background: transparent;
          border: none; border-bottom: 1px solid #ddd;
          padding: 10px 0; color: #111;
          font-family: 'Jost', sans-serif; font-size: 16px;
          outline: none; transition: border-color 0.2s; appearance: none;
        }
        .ls-form-group input:focus,
        .ls-form-group textarea:focus,
        .ls-form-group select:focus { border-bottom-color: #111; }
        .ls-form-group textarea { resize: none; height: 80px; }
        .ls-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

        .ls-artist-selector { display: flex; gap: 2px; margin-bottom: 32px; }
        .ls-artist-btn {
          flex: 1; padding: 14px 8px; background: #fff;
          border: 1px solid #ddd; cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;
          color: #999; transition: all 0.2s; text-align: center;
        }
        .ls-artist-btn:hover { border-color: #111; color: #111; }
        .ls-artist-btn.active { background: #111; color: #fff; border-color: #111; }

        .ls-faq-item { border-bottom: 1px solid #e8e8e8; overflow: hidden; }
        .ls-faq-q {
          display: flex; justify-content: space-between; align-items: center;
          padding: 28px 0; cursor: pointer;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 400; letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .ls-faq-q:hover { color: #555; }
        .ls-faq-icon {
          font-size: 20px; font-weight: 300; color: #aaa;
          transition: transform 0.3s; flex-shrink: 0;
        }
        .ls-faq-icon.open { transform: rotate(45deg); }
        .ls-faq-a {
          max-height: 0; overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s ease;
        }
        .ls-faq-a.open { max-height: 200px; padding-bottom: 24px; }
        .ls-faq-a p { font-size: 15px; line-height: 2; color: #666; letter-spacing: 0.05em; }

        .ls-payments { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; }
        .ls-payment-chip {
          padding: 8px 16px; border: 1px solid #ddd;
          font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: #888;
        }

        .ls-success { text-align: center; padding: 60px 40px; }
        .ls-success h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px; font-weight: 300; margin-bottom: 12px;
        }
        .ls-success p { font-size: 11px; letter-spacing: 0.2em; color: #aaa; text-transform: uppercase; }

        .ls-footer {
          padding: 48px 60px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .ls-footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 300; letter-spacing: 0.2em; text-transform: uppercase;
        }
        .ls-footer-links { display: flex; gap: 32px; }
        .ls-footer-links a {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #aaa; text-decoration: none; transition: color 0.2s;
        }
        .ls-footer-links a:hover { color: #111; }

        .ls-hamburger {
          display: none; flex-direction: column; justify-content: center;
          gap: 5px; background: none; border: none; cursor: pointer; padding: 4px;
        }
        .ls-hamburger span {
          display: block; width: 22px; height: 1px; background: #111;
          transition: all 0.25s;
        }
        .ls-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .ls-hamburger.open span:nth-child(2) { opacity: 0; }
        .ls-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        .ls-mobile-menu {
          display: none; position: fixed; top: 57px; left: 0; right: 0;
          background: rgba(255,255,255,0.97); backdrop-filter: blur(12px);
          border-bottom: 1px solid #e8e8e8; z-index: 99;
          flex-direction: column; padding: 32px 24px; gap: 28px;
        }
        .ls-mobile-menu.open { display: flex; }
        .ls-mobile-menu a, .ls-mobile-menu button {
          font-family: 'Jost', sans-serif;
          font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase;
          color: #666; text-decoration: none; background: none; border: none;
          cursor: pointer; padding: 0; text-align: left;
          display: flex; align-items: center; gap: 8px;
        }
        .ls-mobile-menu a:hover, .ls-mobile-menu button:hover { color: #111; }

        @media (max-width: 768px) {
          /* Nav */
          .ls-nav { padding: 16px 20px; }
          .ls-nav-logo { font-size: 15px; }
          .ls-nav-links { display: none; }
          .ls-hamburger { display: flex; }

          /* Mobile menu */
          .ls-mobile-menu a, .ls-mobile-menu button { font-size: 13px; padding: 4px 0; }

          /* Hero */
          .ls-hero { padding: 100px 24px 64px; min-height: 100svh; }
          .ls-hero-eyebrow { font-size: 11px; letter-spacing: 0.3em; margin-bottom: 20px; }
          .ls-hero-location { font-size: 11px; letter-spacing: 0.25em; margin-bottom: 36px; }
          .ls-hero-divider { height: 36px; margin-bottom: 20px; }
          .ls-hero-cta { flex-direction: column; gap: 10px; max-width: 320px; margin: 0 auto; }
          .ls-btn-primary { font-size: 12px; padding: 16px 28px; }
          .ls-btn-outline { font-size: 12px; padding: 15px 28px; }

          /* Sections */
          .ls-section { padding: 56px 20px; }
          .ls-section-label { font-size: 10px; letter-spacing: 0.3em; }
          .ls-section-title { font-size: clamp(32px, 8vw, 48px); margin-bottom: 36px; }

          /* Studio */
          .ls-studio-grid { grid-template-columns: 1fr; }
          .ls-studio-sub { height: 240px; }
          .ls-studio-text { padding: 28px 24px; }
          .ls-studio-text p { font-size: 15px; }
          .ls-identity-grid { grid-template-columns: 1fr !important; }

          /* Artists */
          .ls-artists-grid { grid-template-columns: 1fr; gap: 16px; }
          .ls-artist-img { height: 280px; }
          .ls-artist-info { padding: 20px 18px; }
          .ls-artist-name { font-size: 18px; }
          .ls-artist-role { font-size: 10px; }
          .ls-artist-styles { font-size: 13px; }

          /* Safe Space */
          .ls-safespace-section { padding: 56px 20px !important; }
          .ls-safespace-grid { grid-template-columns: 1fr 1fr !important; }

          /* Booking */
          .ls-booking-grid { grid-template-columns: 1fr; gap: 40px; }
          .ls-booking-note { font-size: 13px; }
          .ls-form-row { grid-template-columns: 1fr; }
          .ls-form-group label { font-size: 11px; }
          .ls-form-group input,
          .ls-form-group textarea,
          .ls-form-group select { font-size: 16px; padding: 12px 0; }
          .ls-artist-btn { font-size: 12px; padding: 14px 8px; }
          .ls-payment-chip { font-size: 11px; padding: 8px 14px; }

          /* FAQ */
          .ls-faq-q { font-size: 17px; padding: 22px 0; }
          .ls-faq-a p { font-size: 14px; }

          /* Location */
          .ls-location-section { padding: 48px 20px !important; }
          .ls-location-grid { grid-template-columns: 1fr !important; gap: 28px !important; }

          /* Footer */
          .ls-footer { padding: 36px 20px; flex-direction: column; gap: 20px; text-align: center; }
          .ls-footer-logo { font-size: 17px; }
          .ls-footer-links { flex-wrap: wrap; justify-content: center; gap: 20px; }
          .ls-footer-links a { font-size: 10px; }

          /* Success */
          .ls-success { padding: 40px 20px; }
          .ls-success h3 { font-size: 32px; }
          .ls-success p { font-size: 12px; }
        }

        @media (max-width: 480px) {
          .ls-safespace-grid { grid-template-columns: 1fr !important; }
          .ls-section { padding: 48px 16px; }
          .ls-hero { padding: 90px 16px 56px; }
          .ls-safespace-section { padding: 48px 16px !important; }
          .ls-location-section { padding: 40px 16px !important; }
          .ls-footer { padding: 28px 16px; }
        }
      `}</style>

      <nav className="ls-nav">
        <div className="ls-nav-logo">Lumina Sanctum</div>
        <div className="ls-nav-links">
          <a href="#studio">{t[locale].nav.studio}</a>
          <a href="#artists">{t[locale].nav.artists}</a>
          <a href="#book">{t[locale].nav.book}</a>
          <a href="#faq">{t[locale].nav.faq}</a>
          <button
            onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Josefin Sans, sans-serif', fontSize: '10px', letterSpacing: '0.3em', color: '#666', padding: '0', lineHeight: 1, display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {locale.toUpperCase()}
          </button>
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
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 98 }}
        />
      )}
      <div className={`ls-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#studio" onClick={() => setMenuOpen(false)}>{t[locale].nav.studio}</a>
        <a href="#artists" onClick={() => setMenuOpen(false)}>{t[locale].nav.artists}</a>
        <a href="#book" onClick={() => setMenuOpen(false)}>{t[locale].nav.book}</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>{t[locale].nav.faq}</a>
        <button onClick={() => { setLocale(locale === 'en' ? 'es' : 'en'); setMenuOpen(false) }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {locale.toUpperCase()}
        </button>
      </div>

      <Hero locale={locale} />
      <SafeSpace locale={locale} />
      <Studio locale={locale} />
      <Artists selectedArtist={selectedArtist} onSelect={setSelectedArtist} locale={locale} />

      <section className="ls-section ls-booking" id="book">
        <div className="ls-booking-grid">
          <div>
            <div className="ls-section-label">{t[locale].booking.label}</div>
            <h2 className="ls-section-title">{t[locale].booking.title}<br /><em>{t[locale].booking.titleEm}</em></h2>
            <p style={{ fontSize: '15px', color: '#777', lineHeight: 2, letterSpacing: '0.05em' }}>
              {t[locale].booking.body}
            </p>
            <div className="ls-booking-note">
              {t[locale].booking.deposit}
            </div>
            <div style={{ marginTop: '32px' }}>
              <PaymentBadges label={t[locale].booking.accept} />
            </div>
          </div>
          <BookingForm initialArtist={selectedArtist} locale={locale} />
        </div>
      </section>

      <FAQ locale={locale} />
      <Location locale={locale} />

      <footer className="ls-footer">
        <div className="ls-footer-logo">Lumina Sanctum</div>
        <div className="ls-footer-links">
          <a href="https://instagram.com/luminasanctum" target="_blank">{t[locale].footer.instagram}</a>
          <a href="https://luminasanctum.com">luminasanctum.com</a>
          <a href="#book">{t[locale].footer.book}</a>
        </div>
      </footer>
    </main>
  )
}
