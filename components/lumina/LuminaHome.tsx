'use client'

import { useState } from 'react'
import Hero from './sections/Hero'
import Studio from './sections/Studio'
import Artists from './sections/Artists'
import BookingForm from './sections/BookingForm'
import FAQ from './sections/FAQ'
import PaymentBadges from './ui/PaymentBadges'

export default function LuminaHome() {
  const [selectedArtist, setSelectedArtist] = useState('')

  return (
    <main style={{ background: '#fff', color: '#111', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@100;300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Josefin Sans', sans-serif; }

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
          font-family: 'Josefin Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
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
        }
        .ls-hero-eyebrow {
          font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase;
          color: #999; margin-bottom: 32px;
        }
        .ls-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(60px, 9vw, 130px);
          font-weight: 300; line-height: 0.9;
          letter-spacing: -0.01em; margin-bottom: 12px;
        }
        .ls-hero-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 4vw, 52px);
          font-weight: 300; font-style: italic;
          color: #555; margin-bottom: 48px;
        }
        .ls-hero-location {
          font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase;
          color: #aaa; margin-bottom: 56px;
        }
        .ls-btn-primary {
          display: inline-flex; align-items: center; gap: 12px;
          background: #111; color: #fff;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase;
          padding: 16px 40px; border: none; cursor: pointer;
          text-decoration: none; transition: background 0.2s;
        }
        .ls-btn-primary:hover { background: #333; }
        .ls-btn-primary:disabled { background: #ccc; cursor: not-allowed; }
        .ls-btn-outline {
          display: inline-flex; align-items: center; gap: 12px;
          background: transparent; color: #111;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase;
          padding: 15px 40px; border: 1px solid #111; cursor: pointer;
          text-decoration: none; transition: all 0.2s;
        }
        .ls-btn-outline:hover { background: #111; color: #fff; }

        .ls-section { padding: 100px 60px; border-bottom: 1px solid #e8e8e8; }
        .ls-section-label {
          font-size: 11px; letter-spacing: 0.5em; text-transform: uppercase;
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
          font-family: 'Josefin Sans', sans-serif;
          font-size: 20px; font-weight: 300; letter-spacing: 0.2em;
          text-transform: uppercase; margin-bottom: 6px;
        }
        .ls-artist-role {
          font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #999; margin-bottom: 12px;
        }
        .ls-artist-styles {
          font-size: 13px; color: #777; letter-spacing: 0.05em;
          margin-bottom: 14px; line-height: 1.6;
        }
        .ls-artist-ig { font-size: 12px; color: #aaa; letter-spacing: 0.1em; }
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
          font-size: 13px; color: #888; letter-spacing: 0.08em;
          line-height: 1.8; margin-top: 24px;
          padding-top: 24px; border-top: 1px solid #ddd;
        }

        .ls-form-group { margin-bottom: 24px; }
        .ls-form-group label {
          display: block; font-size: 11px; letter-spacing: 0.3em;
          text-transform: uppercase; color: #aaa; margin-bottom: 8px;
        }
        .ls-form-group input,
        .ls-form-group textarea,
        .ls-form-group select {
          width: 100%; background: transparent;
          border: none; border-bottom: 1px solid #ddd;
          padding: 10px 0; color: #111;
          font-family: 'Josefin Sans', sans-serif; font-size: 16px;
          outline: none; transition: border-color 0.2s; appearance: none;
        }
        .ls-form-group input:focus,
        .ls-form-group textarea:focus,
        .ls-form-group select:focus { border-bottom-color: #111; }
        .ls-form-group textarea { resize: none; height: 80px; }
        .ls-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

        .ls-artist-selector { display: flex; gap: 2px; margin-bottom: 32px; }
        .ls-artist-btn {
          flex: 1; padding: 12px 8px; background: #fff;
          border: 1px solid #ddd; cursor: pointer;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #999; transition: all 0.2s; text-align: center;
        }
        .ls-artist-btn:hover { border-color: #111; color: #111; }
        .ls-artist-btn.active { background: #111; color: #fff; border-color: #111; }

        .ls-faq-item { border-bottom: 1px solid #e8e8e8; overflow: hidden; }
        .ls-faq-q {
          display: flex; justify-content: space-between; align-items: center;
          padding: 28px 0; cursor: pointer;
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 400; letter-spacing: 0.03em;
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
          padding: 6px 16px; border: 1px solid #ddd;
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #888;
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
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #aaa; text-decoration: none; transition: color 0.2s;
        }
        .ls-footer-links a:hover { color: #111; }

        @media (max-width: 768px) {
          .ls-nav { padding: 16px 24px; }
          .ls-nav-links { display: none; }
          .ls-section { padding: 72px 24px; }
          .ls-artists-grid { grid-template-columns: 1fr; }
          .ls-booking-grid { grid-template-columns: 1fr; gap: 40px; }
          .ls-studio-grid { grid-template-columns: 1fr; }
          .ls-form-row { grid-template-columns: 1fr; }
          .ls-footer { flex-direction: column; gap: 24px; text-align: center; }
          .ls-footer-links { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>

      <nav className="ls-nav">
        <div className="ls-nav-logo">Lumina Sanctum</div>
        <div className="ls-nav-links">
          <a href="#studio">The Studio</a>
          <a href="#artists">Artists</a>
          <a href="#book">Book</a>
          <a href="#faq">FAQ</a>
        </div>
      </nav>

      <Hero />
      <Studio />
      <Artists selectedArtist={selectedArtist} onSelect={setSelectedArtist} />

      <section className="ls-section ls-booking" id="book">
        <div className="ls-booking-grid">
          <div>
            <div className="ls-section-label">Appointments</div>
            <h2 className="ls-section-title">Book your<br /><em>session</em></h2>
            <p style={{ fontSize: '15px', color: '#777', lineHeight: 2, letterSpacing: '0.05em' }}>
              Tell us about your idea. We'll get back to you within 3–5 days
              with availability and a quote.
            </p>
            <div className="ls-booking-note">
              A non-refundable deposit is required to secure your appointment.
              It will be deducted from the total cost of your tattoo.
            </div>
            <div style={{ marginTop: '32px' }}>
              <PaymentBadges />
            </div>
          </div>
          <BookingForm initialArtist={selectedArtist} />
        </div>
      </section>

      <FAQ />

      <footer className="ls-footer">
        <div className="ls-footer-logo">Lumina Sanctum</div>
        <div className="ls-footer-links">
          <a href="https://instagram.com/luminasanctum" target="_blank">Instagram</a>
          <a href="https://luminasanctum.com">luminasanctum.com</a>
          <a href="#book">Book now</a>
        </div>
      </footer>
    </main>
  )
}
