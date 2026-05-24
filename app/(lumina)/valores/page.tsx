import { t } from '../../../components/lumina/data/translations'

export default function ValoresPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0a07; }

        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,300;0,400;1,300;1,400&family=JetBrains+Mono:wght@300;400&display=swap');

        .vp-wrap {
          min-height: 100vh;
          background: #0d0a07;
          color: #e8dfcf;
          font-family: 'Bodoni Moda', serif;
          padding: 0;
        }

        /* Nav */
        .vp-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 64px;
          border-bottom: 1px solid rgba(232,219,196,0.08);
        }
        .vp-nav-logo {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; letter-spacing: 0.35em; color: #c8a872;
          text-decoration: none; text-transform: uppercase;
        }
        .vp-nav-back {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.25em; color: #c9bfa9;
          text-decoration: none; text-transform: uppercase;
          transition: color 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .vp-nav-back:hover { color: #c8a872; }

        /* Hero */
        .vp-hero {
          padding: 96px 64px 64px;
          border-bottom: 1px solid rgba(232,219,196,0.08);
        }
        .vp-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase;
          color: #c8a872; margin-bottom: 24px;
        }
        .vp-title {
          font-size: clamp(40px, 6vw, 96px);
          font-weight: 300; line-height: 1.0;
          color: #e8dfcf;
        }
        .vp-title em { font-style: italic; color: #c8a872; }

        /* Grid */
        .vp-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 2px; background: rgba(232,219,196,0.06);
          margin: 2px;
        }
        .vp-card {
          padding: 72px 64px;
          background: #0d0a07;
          display: flex; flex-direction: column; gap: 32px;
        }
        .vp-card:nth-child(2) { background: #15110c; }
        .vp-card-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase;
          color: #c8a872;
        }
        .vp-card-title {
          font-size: clamp(28px, 3vw, 48px);
          font-weight: 300; font-style: italic;
          color: #e8dfcf; line-height: 1.1;
        }
        .vp-card-body {
          font-size: 17px; color: #c9bfa9;
          line-height: 1.9; font-weight: 300;
          max-width: 520px;
        }
        .vp-divider {
          width: 40px; height: 1px;
          background: rgba(200,168,114,0.3);
        }

        @media (max-width: 768px) {
          .vp-nav { padding: 20px 24px; }
          .vp-hero { padding: 64px 24px 48px; }
          .vp-grid { grid-template-columns: 1fr; }
          .vp-card { padding: 48px 24px; }
        }
      `}</style>

      <div className="vp-wrap">
        <nav className="vp-nav">
          <a href="/" className="vp-nav-logo">Lumina Sanctum</a>
          <a href="/" className="vp-nav-back">← Volver</a>
        </nav>

        <div className="vp-hero">
          <div className="vp-label">Lumina Sanctum</div>
          <h1 className="vp-title">
            Nuestros<br /><em>Valores</em>
          </h1>
        </div>

        <div className="vp-grid">
          <div className="vp-card">
            <div className="vp-card-label">01 — {t.es.identity.missionTitle}</div>
            <div className="vp-divider" />
            <h2 className="vp-card-title">{t.es.identity.missionTitle}</h2>
            <p className="vp-card-body">{t.es.identity.missionBody}</p>
          </div>
          <div className="vp-card">
            <div className="vp-card-label">02 — {t.es.identity.visionTitle}</div>
            <div className="vp-divider" />
            <h2 className="vp-card-title">{t.es.identity.visionTitle}</h2>
            <p className="vp-card-body">{t.es.identity.visionBody}</p>
          </div>
        </div>
      </div>
    </>
  )
}
