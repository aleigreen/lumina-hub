'use client'

import type { Artist } from '../data/artists'

type Props = {
  artist: Artist
  selected: boolean
  onClick: () => void
}

export default function ArtistCard({ artist, selected, onClick }: Props) {
  return (
    <div
      className={`ls-artist-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="ls-artist-img">
        <div style={{ width: '100%', height: '100%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#aaa', textTransform: 'uppercase' }}>{artist.name}</span>
        </div>
        {selected && <div className="ls-select-badge">Selected</div>}
      </div>
      <div className="ls-artist-info">
        <div className="ls-artist-name">{artist.name}</div>
        <div className="ls-artist-role">{artist.role}</div>
        <div className="ls-artist-styles">{artist.styles}</div>
        <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '16px' }}>{artist.bio}</p>
        <div className="ls-artist-ig">{artist.ig}</div>
      </div>
    </div>
  )
}
