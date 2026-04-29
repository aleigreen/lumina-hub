'use client'

import type { ArtistData } from '../data/artists'
import type { Locale } from '../data/translations'

type Props = {
  artist: ArtistData
  selected: boolean
  selectedLabel: string
  locale: Locale
  onClick: () => void
}

export default function ArtistCard({ artist, selected, selectedLabel, locale, onClick }: Props) {
  return (
    <div
      className={`ls-artist-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="ls-artist-img">
        <div style={{ width: '100%', height: '100%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#aaa', textTransform: 'uppercase' }}>{artist.name}</span>
        </div>
        {selected && <div className="ls-select-badge">{selectedLabel}</div>}
      </div>
      <div className="ls-artist-info">
        <div className="ls-artist-name">{artist.name}</div>
        <div className="ls-artist-role">{artist.role[locale]}</div>
        <div className="ls-artist-styles">{artist.styles[locale]}</div>
        <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '16px' }}>{artist.bio[locale]}</p>
        <a
          className="ls-artist-ig"
          href={`https://instagram.com/${artist.ig.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
        >
          {artist.ig}
        </a>
      </div>
    </div>
  )
}
