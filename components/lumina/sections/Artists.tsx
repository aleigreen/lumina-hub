'use client'

import { artists } from '../data/artists'
import { t, type Locale } from '../data/translations'
import ArtistCard from '../ui/ArtistCard'

type Props = {
  selectedArtist: string
  onSelect: (name: string) => void
  locale: Locale
}

export default function Artists({ selectedArtist, onSelect, locale }: Props) {
  const tr = t[locale].artists

  const handleSelect = (name: string) => {
    onSelect(name)
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="ls-section" id="artists">
      <div className="ls-section-label">{tr.label}</div>
      <h2 className="ls-section-title">{tr.title} <em>{tr.titleEm}</em></h2>
      <div className="ls-artists-grid">
        {artists.map(artist => (
          <ArtistCard
            key={artist.name}
            artist={artist}
            selected={selectedArtist === artist.name}
            selectedLabel={tr.selected}
            locale={locale}
            onClick={() => handleSelect(artist.name)}
          />
        ))}
      </div>
    </section>
  )
}
