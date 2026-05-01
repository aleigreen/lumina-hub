'use client'

import { useState } from 'react'
import { t, type Locale } from '../data/translations'

type Props = { locale: Locale }

export default function Studio({ locale }: Props) {
  const tr = t[locale].studio
  const id = t[locale].identity
  const [open, setOpen] = useState(false)
  const [line1, line2] = tr.body.split('\n\n')

  return (
    <section className="ls-section" id="studio">
      <div className="ls-section-label">{tr.label}</div>
      <h2 className="ls-section-title">{tr.title} <em>{tr.titleEm}</em></h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '2px' }} className="ls-studio-grid">
        <div className="ls-studio-sub">
          <div style={{ width: '100%', height: '100%', background: '#15110c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(232,219,196,0.2)', textTransform: 'uppercase' }}>Studio Photo</span>
          </div>
        </div>
        <div className="ls-studio-text">
          <p>{line1}<br /><br />{line2}</p>
        </div>
      </div>

      {/* Acordeón Misión & Visión */}
      <div style={{ borderTop: '1px solid rgba(232,219,196,0.10)' }}>
        <div
          onClick={() => setOpen(o => !o)}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', cursor: 'pointer' }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c8a872' }}>
            {id.accordion}
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', color: '#c8a872', transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none', lineHeight: 1, flexShrink: 0 }}>+</span>
        </div>
        {open && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }} className="ls-identity-grid">
            <div style={{ padding: '40px 48px', background: '#15110c' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c8a872', marginBottom: '20px' }}>
                {id.missionTitle}
              </div>
              <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '16px', color: '#c9bfa9', lineHeight: 1.9 }}>{id.missionBody}</p>
            </div>
            <div style={{ padding: '40px 48px', background: '#1f1812' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c8a872', marginBottom: '20px' }}>
                {id.visionTitle}
              </div>
              <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '16px', color: '#c9bfa9', lineHeight: 1.9 }}>{id.visionBody}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
