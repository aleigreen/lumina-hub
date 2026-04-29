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

      {/* Foto + descripción */}
      <div className="ls-studio-grid" style={{ marginBottom: '2px' }}>
        <div className="ls-studio-sub">
          <div style={{ width: '100%', height: '100%', background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#aaa', textTransform: 'uppercase' }}>Studio Photo</span>
          </div>
        </div>
        <div className="ls-studio-text">
          <p>{line1}<br /><br />{line2}</p>
        </div>
      </div>

      {/* Acordeón Misión & Visión */}
      <div style={{ borderTop: '1px solid #e8e8e8' }}>
        <div
          onClick={() => setOpen(o => !o)}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', cursor: 'pointer' }}
        >
          <div className="ls-section-label" style={{ marginBottom: 0 }}>{id.accordion}</div>
          <span style={{ fontSize: '20px', fontWeight: 300, color: '#aaa', transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none', lineHeight: 1, flexShrink: 0 }}>+</span>
        </div>
        {open && (
          <div className="ls-identity-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
            <div style={{ padding: '40px 48px', background: '#f8f8f8' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#777', marginBottom: '20px' }}>
                {id.missionTitle}
              </div>
              <p style={{ fontSize: '15px', color: '#333', lineHeight: 2, letterSpacing: '0.02em' }}>{id.missionBody}</p>
            </div>
            <div style={{ padding: '40px 48px', background: '#111' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#888', marginBottom: '20px' }}>
                {id.visionTitle}
              </div>
              <p style={{ fontSize: '15px', color: '#ccc', lineHeight: 2, letterSpacing: '0.02em' }}>{id.visionBody}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
