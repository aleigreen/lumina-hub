export default function Studio() {
  return (
    <section className="ls-section" id="studio">
      <div className="ls-section-label">Condesa · Mexico City</div>
      <h2 className="ls-section-title">The <em>Studio</em></h2>
      <div className="ls-studio-grid">
        <div className="ls-studio-sub">
          <div style={{ width: '100%', height: '100%', background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#aaa', textTransform: 'uppercase' }}>Studio Photo</span>
          </div>
        </div>
        <div className="ls-studio-text">
          <p>
            A cozy, welcoming haven in the heart of Condesa.<br /><br />
            Personalized ink in a space designed to make you feel at home.
            Our studio combines artistic freedom with a warm, professional environment
            where every session is a unique ritual.
          </p>
        </div>
      </div>
    </section>
  )
}
