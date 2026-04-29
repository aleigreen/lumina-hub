export default function Hero() {
  return (
    <section className="ls-hero">
      <div className="ls-hero-eyebrow">Tattoo Studio · Condesa, Mexico City</div>
      <h1 className="ls-hero-title">LUMINA</h1>
      <div className="ls-hero-subtitle">Sanctum</div>
      <div className="ls-hero-location">Only by appointment</div>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#book" className="ls-btn-primary">Book a session →</a>
        <a href="#artists" className="ls-btn-outline">Meet the artists</a>
      </div>
    </section>
  )
}
