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

  const [locale, setLocale] = useState<Locale>('es')
  const [menuOpen, setMenuOpen] = useState(false)
  const [valoresOpen, setValoresOpen] = useState(false)

  return (
    <main style={{ background: '#0d0a07', color: '#e8dfcf', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,300;0,400;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'JetBrains Mono', monospace; background: #0d0a07; }

        @keyframes ls-shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-8px); }
          30%       { transform: translateX(7px); }
          45%       { transform: translateX(-6px); }
          60%       { transform: translateX(5px); }
          75%       { transform: translateX(-3px); }
          90%       { transform: translateX(2px); }
        }
        .ls-form-shake { animation: ls-shake 0.5s ease; }

        /* ── NAV ── */
        .ls-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 64px;
          background: rgba(13,10,7,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(232,219,196,0.10);
        }
        .ls-nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; color: #e8dfcf;
        }
        .ls-nav-logo img { display: block; }
        .ls-nav-logo-wordmark {
          display: flex; flex-direction: column; align-items: stretch; line-height: 1;
        }
        .ls-nav-logo-text {
          font-family: 'Bodoni Moda', serif;
          font-size: 20px; font-weight: 400; letter-spacing: 0.12em;
          text-transform: uppercase; color: #e8dfcf; line-height: 1;
        }
        .ls-nav-logo-sub {
          font-family: 'Bodoni Moda', serif;
          font-size: 8px; font-weight: 400; letter-spacing: 0.52em;
          text-transform: uppercase; color: #c8a872;
          text-align: right; margin-top: 2px;
        }
        .ls-nav-links { display: flex; gap: 40px; align-items: center; }
        .ls-nav-links a {
          font-family: 'Inter', sans-serif;
          font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
          font-weight: 400; color: #c9bfa9; text-decoration: none; transition: color 0.2s;
        }
        .ls-nav-links a:hover { color: #c8a872; }

        /* ── HERO ── */
        .ls-hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 120px 64px 80px;
          border-bottom: 1px solid rgba(232,219,196,0.10);
          background: radial-gradient(80% 60% at 70% 20%, rgba(200,168,114,0.07) 0%, transparent 60%),
                      radial-gradient(60% 50% at 20% 90%, rgba(122,29,24,0.13) 0%, transparent 60%),
                      #0d0a07;
          position: relative; overflow: hidden;
        }
        .ls-hero-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase;
          color: #c8a872; margin-bottom: 28px;
          display: flex; align-items: center; gap: 16px;
        }
        .ls-hero-eyebrow::before,
        .ls-hero-eyebrow::after {
          content: ''; display: block; width: 28px; height: 1px; background: #c8a872; flex-shrink: 0;
        }
        .ls-hero-title {
          font-family: 'Bodoni Moda', serif;
          font-size: clamp(72px, 12vw, 200px);
          font-weight: 300; line-height: 1;
          letter-spacing: -0.02em; color: #e8dfcf; margin-bottom: 0;
        }
        .ls-hero-subtitle {
          font-family: 'Bodoni Moda', serif;
          font-size: clamp(12px, 1.6vw, 22px);
          font-weight: 400; letter-spacing: 0.52em;
          color: #c8a872; margin-bottom: 0; margin-top: 2px;
          text-transform: uppercase; text-align: right;
        }
        .ls-hero-divider {
          width: 1px; height: 48px; background: rgba(232,219,196,0.15); margin-bottom: 24px;
        }
        .ls-hero-location {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px; letter-spacing: 0.25em; text-transform: uppercase;
          color: #c9bfa9; margin-bottom: 40px;
        }
        .ls-hero-cta {
          display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
        }

        /* ── BUTTONS ── */
        .ls-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: #7a1d18; color: #e8dfcf;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase;
          padding: 16px 22px; border: 1px solid #9a2620; cursor: pointer;
          text-decoration: none; transition: background 0.2s;
        }
        .ls-btn-primary:hover { background: #9a2620; }
        .ls-btn-primary:disabled { background: rgba(122,29,24,0.3); cursor: not-allowed; color: #c9bfa9; }
        .ls-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: #e8dfcf;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase;
          padding: 16px 22px; border: 1px solid rgba(232,219,196,0.15); cursor: pointer;
          text-decoration: none; transition: all 0.2s;
        }
        .ls-btn-outline:hover { background: rgba(232,219,196,0.08); border-color: rgba(232,219,196,0.3); }

        /* ── SECTIONS ── */
        .ls-section { padding: 120px 64px; border-bottom: 1px solid rgba(232,219,196,0.10); }
        .ls-section-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          font-weight: 500; color: #c8a872; margin-bottom: 20px;
        }
        .ls-section-title {
          font-family: 'Bodoni Moda', serif;
          font-size: clamp(36px, 5vw, 88px);
          font-weight: 300; line-height: 1.05;
          margin-bottom: 60px; color: #e8dfcf;
        }
        .ls-section-title em { font-style: italic; color: #c8a872; }

        /* ── STUDIO ── */
        .ls-studio-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto; gap: 2px;
        }
        .ls-studio-sub { height: 480px; background: #15110c; overflow: hidden; }
        .ls-studio-sub img { width: 100%; height: 100%; object-fit: cover; filter: sepia(20%) brightness(0.85); }
        .ls-studio-text {
          display: flex; flex-direction: column;
          justify-content: center; padding: 48px;
          background: #15110c;
        }
        .ls-studio-text p {
          font-family: 'Bodoni Moda', serif;
          font-size: 18px; line-height: 1.8; color: #c9bfa9; letter-spacing: 0.02em;
        }

        /* ── ARTISTS (list) ── */
        .ls-artist-row {
          display: grid; grid-template-columns: 60px 1.2fr 1.5fr 1fr;
          align-items: start; padding: 32px 0;
          border-top: 1px solid rgba(232,219,196,0.10);
          cursor: pointer; transition: background 0.3s, padding 0.3s;
          gap: 24px;
        }
        .ls-artist-row:last-child { border-bottom: 1px solid rgba(232,219,196,0.10); }
        .ls-artist-row.open { background: #15110c; padding-left: 24px; padding-right: 24px; }
        .ls-artist-counter {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; letter-spacing: 0.24em; color: #c8a872; padding-top: 6px;
        }
        .ls-artist-carousel { width: 220px; height: auto; aspect-ratio: 9/16; }
        .ls-artist-row-header {
          display: contents;
        }
        .ls-artist-toggle { display: none; }
        .ls-artist-name-wrap {}
        .ls-artist-name {
          font-family: 'Bodoni Moda', serif;
          font-size: clamp(28px, 4vw, 56px);
          font-weight: 300; line-height: 1; color: #e8dfcf;
          transition: font-style 0.3s, color 0.3s;
        }
        .ls-artist-row.open .ls-artist-name { font-style: italic; color: #c8a872; }
        .ls-artist-role-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
          font-weight: 400; color: #c9bfa9; margin-top: 8px;
        }
        .ls-artist-bio-wrap {
          max-height: 0; overflow: hidden; opacity: 0;
          transition: max-height 0.6s ease, opacity 0.3s ease;
          display: flex; flex-direction: row; gap: 24px; align-items: flex-start;
        }
        .ls-artist-row.open .ls-artist-bio-wrap { max-height: 800px; opacity: 1; }
        .ls-artist-bio {
          font-family: 'Inter', sans-serif;
          font-size: 15px; font-weight: 300; color: #c9bfa9; line-height: 1.8; padding-top: 4px;
        }
        .ls-artist-tags-wrap { text-align: right; padding-top: 6px; }
        .ls-artist-tags {
          font-family: 'Inter', sans-serif;
          font-size: 12px; letter-spacing: 0.05em;
          font-weight: 300; color: #c9bfa9; line-height: 2;
        }
        .ls-artist-ig-link {
          font-family: 'Inter', sans-serif;
          font-size: 13px; letter-spacing: 0.04em; font-weight: 400; color: #c8a872;
          text-decoration: none; display: block; margin-top: 10px;
          transition: color 0.2s;
        }
        .ls-artist-ig-link:hover { color: #e3c48a; }
        .ls-artist-select-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
          background: #c8a872; color: #0d0a07; border: none;
          padding: 6px 12px; cursor: pointer; margin-top: 10px;
          transition: background 0.2s; display: inline-block;
        }
        .ls-artist-select-btn:hover { background: #e3c48a; }
        .ls-artist-select-btn.selected { background: #7a1d18; color: #e8dfcf; }

        /* ── BOOKING ── */
        .ls-booking {
          background: radial-gradient(60% 50% at 80% 20%, rgba(122,29,24,0.09) 0%, transparent 60%), #0d0a07;
        }
        .ls-booking-grid {
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px;
          align-items: start;
        }
        .ls-booking-note {
          font-family: 'Bodoni Moda', serif;
          font-size: 15px; color: #c9bfa9; letter-spacing: 0.02em;
          line-height: 1.8; margin-top: 24px;
          padding-top: 24px; border-top: 1px solid rgba(232,219,196,0.10);
        }

        /* ── FORM ── */
        .ls-form-card {
          background: #15110c;
          border: 1px solid rgba(232,219,196,0.10);
          padding: 48px;
        }
        .ls-form-group { margin-bottom: 28px; }
        .ls-form-group label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.24em;
          text-transform: uppercase; color: #c8a872; margin-bottom: 10px;
        }
        .ls-form-group input,
        .ls-form-group textarea,
        .ls-form-group select {
          width: 100%; background: transparent;
          border: none; border-bottom: 1px solid rgba(232,219,196,0.15);
          padding: 14px 0; color: #e8dfcf;
          font-family: 'Bodoni Moda', serif; font-size: 20px;
          outline: none; transition: border-color 0.2s; appearance: none;
        }
        .ls-form-group input::placeholder,
        .ls-form-group textarea::placeholder { color: rgba(201,191,169,0.4); }
        .ls-form-group input:focus,
        .ls-form-group textarea:focus { border-bottom-color: #c8a872; }
        .ls-form-group textarea { resize: none; height: 100px; }
        .ls-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

        .ls-artist-selector { display: flex; gap: 2px; margin-bottom: 32px; }
        .ls-artist-btn {
          flex: 1; padding: 14px 8px;
          background: transparent;
          border: 1px solid rgba(232,219,196,0.15); cursor: pointer;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #c9bfa9; transition: all 0.2s; text-align: center;
        }
        .ls-artist-btn:hover { border-color: #c8a872; color: #c8a872; }
        .ls-artist-btn.active { background: #c8a872; color: #0d0a07; border-color: #c8a872; }

        /* ── STEP INDICATOR ── */
        .ls-step-indicator {
          display: flex; gap: 0; margin-bottom: 40px;
          border-bottom: 1px solid rgba(232,219,196,0.10); padding-bottom: 20px;
        }
        .ls-step {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
          color: rgba(201,191,169,0.4); flex: 1; transition: color 0.3s;
        }
        .ls-step.active { color: #c8a872; }
        .ls-step.done { color: rgba(200,168,114,0.6); }

        /* ── FAQ ── */
        .ls-faq-item { border-top: 1px solid rgba(232,219,196,0.10); overflow: hidden; }
        .ls-faq-item:last-child { border-bottom: 1px solid rgba(232,219,196,0.10); }
        .ls-faq-q {
          display: flex; justify-content: space-between; align-items: center;
          padding: 28px 0; cursor: pointer;
          font-family: 'Bodoni Moda', serif;
          font-size: 22px; font-weight: 400; color: #e8dfcf;
          transition: background 0.2s; gap: 24px;
        }
        .ls-faq-q:hover { color: #c8a872; }
        .ls-faq-icon {
          font-family: 'JetBrains Mono', monospace;
          font-size: 18px; font-weight: 400; color: #c8a872;
          transition: transform 0.3s; flex-shrink: 0; line-height: 1;
        }
        .ls-faq-icon.open { transform: rotate(45deg); }
        .ls-faq-a {
          max-height: 0; overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .ls-faq-a.open { max-height: 300px; padding-bottom: 28px; opacity: 1; }
        .ls-faq-a p {
          font-family: 'Bodoni Moda', serif;
          font-size: 17px; line-height: 1.8; color: #c9bfa9;
        }

        /* ── PAYMENT CHIPS ── */
        .ls-payments { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; align-items: center; }
        .ls-payment-chip {
          padding: 8px 14px;
          background: #e8dfcf;
          display: flex; align-items: center; justify-content: center;
          border-radius: 4px;
          height: 36px;
          opacity: 0.92;
          transition: opacity 0.2s;
        }
        .ls-payment-chip:hover { opacity: 1; }

        /* ── SUCCESS ── */
        .ls-success { text-align: center; padding: 80px 40px; }
        .ls-success h3 {
          font-family: 'Bodoni Moda', serif;
          font-size: 48px; font-weight: 300; font-style: italic;
          color: #e8dfcf; margin-bottom: 16px;
        }
        .ls-success p {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; letter-spacing: 0.24em; color: #c8a872; text-transform: uppercase;
        }

        /* ── FOOTER ── */
        .ls-footer {
          padding: 64px 64px 32px;
          border-top: 1px solid rgba(232,219,196,0.10);
        }
        .ls-footer-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 48px;
        }
        .ls-footer-logo { display: flex; align-items: center; gap: 14px; }
        .ls-footer-logo-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase;
          line-height: 1.3; color: #e8dfcf;
        }
        .ls-footer-logo-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; font-weight: 400; letter-spacing: 0.45em;
          text-transform: uppercase; color: #c8a872;
        }
        .ls-footer-info {
          text-align: right;
        }
        .ls-footer-info-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
          color: #c8a872; margin-bottom: 12px;
        }
        .ls-footer-address {
          font-family: 'Bodoni Moda', serif;
          font-size: 20px; font-style: italic; color: #e8dfcf; margin-bottom: 8px;
        }
        .ls-footer-hours {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #c9bfa9; line-height: 1.8;
        }
        .ls-footer-bottom {
          border-top: 1px solid rgba(232,219,196,0.10);
          padding-top: 20px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .ls-footer-copy {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(201,191,169,0.4);
        }
        .ls-footer-links { display: flex; gap: 24px; }
        .ls-footer-links a {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #c9bfa9; text-decoration: none; transition: color 0.2s;
        }
        .ls-footer-links a:hover { color: #c8a872; }

        /* ── HAMBURGER ── */
        .ls-hamburger {
          display: none; flex-direction: column; justify-content: center;
          gap: 5px; background: none; border: none; cursor: pointer; padding: 4px;
        }
        .ls-hamburger span {
          display: block; width: 22px; height: 1px; background: #e8dfcf;
          transition: all 0.25s;
        }
        .ls-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .ls-hamburger.open span:nth-child(2) { opacity: 0; }
        .ls-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        .ls-mobile-menu {
          display: none; position: fixed; top: 57px; left: 0; right: 0;
          background: rgba(13,10,7,0.97); backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(232,219,196,0.10); z-index: 99;
          flex-direction: column; padding: 32px 24px; gap: 28px;
        }
        .ls-mobile-menu.open { display: flex; }
        .ls-mobile-menu a, .ls-mobile-menu button {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #c9bfa9; text-decoration: none; background: none; border: none;
          cursor: pointer; padding: 0; text-align: left;
          display: flex; align-items: center; gap: 8px;
        }
        .ls-mobile-menu a:hover, .ls-mobile-menu button:hover { color: #c8a872; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ls-artist-row { grid-template-columns: 44px 1fr; gap: 12px; }
          .ls-artist-row.open { display: flex; flex-direction: column; padding: 24px 20px; background: #15110c; gap: 16px; }
          .ls-artist-row.open .ls-artist-counter { display: none; }
          .ls-artist-row.open .ls-artist-name-wrap { order: 1; }
          .ls-artist-bio-wrap-col { display: none; }
          .ls-artist-row.open .ls-artist-bio-wrap-col { display: flex !important; flex-direction: column !important; gap: 20px; order: 2; }
          .ls-artist-row.open .ls-artist-bio-wrap { max-height: 2000px !important; opacity: 1 !important; flex-direction: column !important; }
          .ls-artist-row.open .ls-artist-tags-col { display: block; text-align: left !important; margin-top: 4px; order: 3; }
          .ls-artist-tags-col { display: none; }
          .ls-artist-row.open .ls-artist-tags-col { display: block; text-align: left !important; margin-top: 4px; }
          .ls-artist-tags-wrap { text-align: left !important; }
          .ls-artist-carousel { width: 100% !important; height: auto !important; }
        }

        @media (max-width: 768px) {
          .ls-nav { padding: 16px 20px; }
          .ls-nav-links { display: none; }
          .ls-hamburger { display: flex; }
          .ls-nav-logo-wordmark--desktop { display: none; }

          .ls-hero { padding: 100px 24px 64px; min-height: 100svh; }
          .ls-hero-eyebrow { font-size: 10px; }
          .ls-hero-cta { flex-direction: column; gap: 10px; max-width: 320px; margin: 0 auto; }

          .ls-section { padding: 64px 24px; }
          .ls-section-title { font-size: clamp(32px, 8vw, 56px); margin-bottom: 36px; }

          /* Studio */
          .ls-studio-grid { grid-template-columns: 1fr; }
          .ls-studio-sub { height: 260px; }
          .ls-studio-text { padding: 28px 24px; }
          .ls-studio-text p { font-size: 15px; line-height: 1.7; }
          .ls-identity-grid { grid-template-columns: 1fr !important; }

          /* Safe Space */
          .ls-safespace-section { padding: 48px 24px !important; }
          .ls-safespace-grid { grid-template-columns: 1fr !important; }

          /* Artists mobile */
          .ls-artist-row {
            display: flex !important; flex-direction: column !important;
            gap: 0 !important; padding: 0 !important;
          }
          .ls-artist-row-header {
            display: flex !important; align-items: center !important;
            padding: 14px 16px !important; gap: 12px !important;
            cursor: pointer; width: 100%;
          }
          .ls-artist-counter { flex-shrink: 0; font-size: 10px; }
          .ls-artist-name-wrap { flex: 1; min-width: 0; }
          .ls-artist-name { font-size: clamp(20px, 5.5vw, 32px) !important; }
          .ls-artist-role-label { font-size: 9px; margin-top: 4px; }
          .ls-artist-toggle {
            display: flex !important; align-items: center !important; justify-content: center !important;
            width: 32px; height: 32px; flex-shrink: 0;
            background: none; border: 1px solid rgba(232,219,196,0.25);
            border-radius: 50%;
            color: #c8a872; font-size: 20px; cursor: pointer;
            font-family: 'JetBrains Mono', monospace; line-height: 1;
            transition: transform 0.3s;
          }
          .ls-artist-row.open .ls-artist-toggle { transform: rotate(45deg); }
          .ls-artist-row.open { background: #15110c !important; }
          .ls-artist-row.open .ls-artist-row-header { padding-bottom: 8px !important; border-bottom: 1px solid rgba(232,219,196,0.08); }
          .ls-artist-bio-wrap-col { display: none !important; }
          .ls-artist-row.open .ls-artist-bio-wrap-col {
            display: flex !important; flex-direction: column !important;
            gap: 16px; padding: 16px 16px 16px;
          }
          .ls-artist-bio-wrap {
            max-height: none !important; opacity: 1 !important; overflow: visible !important;
            flex-direction: column !important;
          }
          .ls-artist-tags-col { display: none !important; }
          .ls-artist-row.open .ls-artist-tags-col { display: block !important; padding: 4px 16px 16px; text-align: left !important; }
          .ls-artist-tags-wrap { text-align: left !important; }
          .ls-artist-carousel {
            width: 100% !important;
            aspect-ratio: 4/5 !important;
          }
          .ls-artist-bio-wrap { gap: 16px !important; flex-direction: column !important; }
          .ls-artist-row.open .ls-artist-bio-wrap-col { gap: 8px !important; padding: 12px 16px 4px !important; }
          .ls-artist-bio { font-size: 14px !important; line-height: 1.6 !important; }

          /* Booking */
          .ls-booking-grid { grid-template-columns: 1fr; gap: 40px; }
          .ls-form-card { padding: 28px 20px; }
          .ls-form-row { grid-template-columns: 1fr; }

          /* Location */
          .ls-location-section { padding: 64px 24px !important; }
          .ls-location-grid { grid-template-columns: 1fr !important; gap: 40px !important; }

          /* Footer */
          .ls-footer { padding: 48px 20px 24px; }
          .ls-footer-top { flex-direction: column; gap: 32px; }
          .ls-footer-info { text-align: left; }
          .ls-footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
        }

        @media (max-width: 480px) {
          .ls-section { padding: 48px 16px; }
          .ls-hero { padding: 90px 16px 56px; }
          .ls-location-section { padding: 48px 16px !important; }
          .ls-safespace-grid { gap: 1px !important; }
        }

        /* ── VALORES MODAL ── */
        .ls-modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(13,10,7,0.7);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: ls-fade-in 0.25s ease;
        }
        @keyframes ls-fade-in { from { opacity: 0 } to { opacity: 1 } }
        .ls-modal {
          background: #15110c;
          border: 1px solid rgba(232,219,196,0.10);
          width: 100%; max-width: 900px;
          max-height: 90vh; overflow-y: auto;
          animation: ls-slide-up 0.3s ease;
        }
        @keyframes ls-slide-up { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .ls-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 40px;
          border-bottom: 1px solid rgba(232,219,196,0.08);
          position: sticky; top: 0; background: #15110c; z-index: 1;
        }
        .ls-modal-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase; color: #c8a872;
        }
        .ls-modal-close {
          background: none; border: none; cursor: pointer;
          color: #c9bfa9; font-size: 22px; line-height: 1;
          padding: 4px 8px; transition: color 0.2s;
          font-family: 'JetBrains Mono', monospace;
        }
        .ls-modal-close:hover { color: #e8dfcf; }
        .ls-modal-body {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 2px; background: rgba(232,219,196,0.06);
          margin: 2px;
        }
        .ls-modal-card {
          padding: 56px 48px;
          background: #15110c;
          display: flex; flex-direction: column; gap: 24px;
        }
        .ls-modal-card:nth-child(2) { background: #1a1410; }
        .ls-modal-card-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase; color: #c8a872;
        }
        .ls-modal-divider { width: 32px; height: 1px; background: rgba(200,168,114,0.3); }
        .ls-modal-card-title {
          font-family: 'Bodoni Moda', serif;
          font-size: clamp(24px, 3vw, 40px); font-weight: 300; font-style: italic;
          color: #e8dfcf; line-height: 1.1;
        }
        .ls-modal-card-body {
          font-family: 'Bodoni Moda', serif;
          font-size: 16px; color: #c9bfa9; line-height: 1.9; font-weight: 300;
        }
        @media (max-width: 640px) {
          .ls-modal-header { padding: 20px 24px; }
          .ls-modal-body { grid-template-columns: 1fr; }
          .ls-modal-card { padding: 40px 24px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="ls-nav">
        <a href="#" className="ls-nav-logo">
          <img src="/lumina/icon-wt.png" alt="" style={{ height: '36px', width: 'auto' }} />
          <div className="ls-nav-logo-wordmark ls-nav-logo-wordmark--desktop">
            <div className="ls-nav-logo-text">LUMINA</div>
            <div className="ls-nav-logo-sub">SANCTUM</div>
          </div>
        </a>
        <div className="ls-nav-links">
          <a href="#studio">{t[locale].nav.studio}</a>
          <a href="#artists">{t[locale].nav.artists}</a>
          <a href="#book">{t[locale].nav.book}</a>
          <a href="#faq">{t[locale].nav.faq}</a>
          <button onClick={() => setValoresOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.14em', color: '#c9bfa9', padding: 0, transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color='#c8a872')} onMouseLeave={e => (e.currentTarget.style.color='#c9bfa9')}>{t[locale].nav.values}</button>
          <button
            onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
            style={{
              background: 'none', border: '1px solid rgba(232,219,196,0.2)',
              cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px', letterSpacing: '0.3em', color: '#c9bfa9',
              padding: '6px 10px', lineHeight: 1, transition: 'all 0.2s',
            }}
          >
            {locale === 'en' ? 'ES' : 'EN'}
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
        <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 98 }} />
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
      <Studio locale={locale} />
      <SafeSpace locale={locale} onValores={() => setValoresOpen(true)} />
      <Artists locale={locale} />

      {/* BOOKING */}
      <section className="ls-section ls-booking" id="book">
        <div className="ls-booking-grid">
          <div>
            <div className="ls-section-label">{t[locale].booking.label}</div>
            <h2 className="ls-section-title">{t[locale].booking.title}<br /><em>{t[locale].booking.titleEm}</em></h2>
            <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '18px', color: '#c9bfa9', lineHeight: 1.8, maxWidth: '380px' }}>
              {t[locale].booking.body}
            </p>
            <div className="ls-booking-note">{t[locale].booking.deposit}</div>
            <div style={{ marginTop: '32px' }}>
              <PaymentBadges label={t[locale].booking.accept} />
            </div>
          </div>
          <div className="ls-form-card">
            <BookingForm initialArtist="" locale={locale} />
          </div>
        </div>
      </section>

      <FAQ locale={locale} />
      <Location locale={locale} />

      {/* FOOTER */}
      <footer className="ls-footer">
        <div className="ls-footer-top">
          <div className="ls-footer-logo">
            <img src="/lumina/icon-wt.png" alt="Lumina Sanctum" height={48} width={30} style={{ objectFit: 'contain' }} />
            <div>
              <div className="ls-footer-logo-text">Lumina</div>
              <div className="ls-footer-logo-sub">Sanctum</div>
            </div>
          </div>
        </div>
        <div className="ls-footer-bottom">
          <div className="ls-footer-copy">© MMXXVI · Lumina Sanctum</div>
          <div className="ls-footer-links">
            <a href="https://instagram.com/luminasanctum" target="_blank">{t[locale].footer.instagram}</a>
            <a href="#book">{t[locale].footer.book}</a>
          </div>
        </div>
      </footer>

      {/* VALORES MODAL */}
      {valoresOpen && (
        <div className="ls-modal-overlay" onClick={() => setValoresOpen(false)}>
          <div className="ls-modal" onClick={e => e.stopPropagation()}>
            <div className="ls-modal-header">
              <div className="ls-modal-label">{t[locale].nav.values}</div>
              <button className="ls-modal-close" onClick={() => setValoresOpen(false)} aria-label="Cerrar">×</button>
            </div>
            <div className="ls-modal-body">
              <div className="ls-modal-card">
                <div className="ls-modal-card-num">01</div>
                <div className="ls-modal-divider" />
                <h2 className="ls-modal-card-title">{t[locale].identity.missionTitle}</h2>
                <p className="ls-modal-card-body">{t[locale].identity.missionBody}</p>
              </div>
              <div className="ls-modal-card">
                <div className="ls-modal-card-num">02</div>
                <div className="ls-modal-divider" />
                <h2 className="ls-modal-card-title">{t[locale].identity.visionTitle}</h2>
                <p className="ls-modal-card-body">{t[locale].identity.visionBody}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
