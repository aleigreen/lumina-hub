'use client'

import { artists } from '../data/artists'
import ArtistCard from '../ui/ArtistCard'

type Props = {
  selectedArtist: string
  onSelect: (name: string) => void
}

export default function Artists({ selectedArtist, onSelect }: Props) {
  const handleSelect = (name: string) => {
    onSelect(name)
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="ls-section" id="artists">
      <div className="ls-section-label">Resident & guest artists</div>
      <h2 className="ls-section-title">The <em>Artists</em></h2>
      <div className="ls-artists-grid">
        {artists.map(artist => (
          <ArtistCard
            key={artist.name}
            artist={artist}
            selected={selectedArtist === artist.name}
            onClick={() => handleSelect(artist.name)}
          />
        ))}
      </div>
    </section>
  )
}
