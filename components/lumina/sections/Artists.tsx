'use client'

import { useState } from 'react'
import { artists } from '../data/artists'
import { t, type Locale } from '../data/translations'

type Props = {
  selectedArtist: string
  onSelect: (name: string) => void
  locale: Locale
}

export default function Artists({ selectedArtist, onSelect, locale }: Props) {
  const tr = t[locale].artists
  const [openIndex, setOpenIndex] = useState(0)

  const handleSelect = (name: string) => {
    onSelect(name)
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="ls-section" id="artists">
      <div className="ls-section-label">{tr.label}</div>
      <h2 className="ls-section-title">{tr.title} <em>{tr.titleEm}</em></h2>

      <div>
        {artists.map((artist, i) => {
          const isOpen = openIndex === i
          const isSelected = selectedArtist === artist.name
          const stylesTags = artist.styles[locale].split(' · ').join(' · ')

          return (
            <div
              key={artist.name}
              className={`ls-artist-row${isOpen ? ' open' : ''}`}
              onMouseEnter={() => setOpenIndex(i)}
              onClick={() => setOpenIndex(i)}
            >
              {/* Counter */}
              <div className="ls-artist-counter">0{i + 1}</div>

              {/* Name + role */}
              <div className="ls-artist-name-wrap">
                <div className="ls-artist-name">{artist.name}</div>
                <div className="ls-artist-role-label">{artist.role[locale]}</div>
                <div className="ls-artist-bio-wrap" style={{ marginTop: '12px' }}>
                  <p className="ls-artist-bio">{artist.bio[locale]}</p>
                  <button
                    className={`ls-artist-select-btn${isSelected ? ' selected' : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleSelect(artist.name) }}
                    style={{ marginTop: '16px' }}
                  >
                    {isSelected ? `✓ ${tr.selected}` : (locale === 'es' ? 'Elegir artista →' : 'Choose artist →')}
                  </button>
                </div>
              </div>

              {/* Bio (desktop center col) */}
              <div className="ls-artist-bio-wrap ls-artist-bio-wrap-col">
                <p className="ls-artist-bio">{artist.bio[locale]}</p>
              </div>

              {/* Tags + IG */}
              <div className="ls-artist-tags-wrap ls-artist-tags-col">
                <div className="ls-artist-tags">{stylesTags}</div>
                <a
                  className="ls-artist-ig-link"
                  href={`https://instagram.com/${artist.ig.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                >
                  {artist.ig.startsWith('@') ? artist.ig : `@${artist.ig}`}
                </a>
                <button
                  className={`ls-artist-select-btn${isSelected ? ' selected' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleSelect(artist.name) }}
                  style={{ marginTop: '16px', display: 'block', marginLeft: 'auto' }}
                >
                  {isSelected ? `✓ ${tr.selected}` : (locale === 'es' ? 'Elegir →' : 'Choose →')}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
