import { t, type Locale } from '../data/translations'

type Props = { locale: Locale }

export default function Studio({ locale }: Props) {
  const tr = t[locale].studio
  const [line1, line2] = tr.body.split('\n\n')
  return (
    <section className="ls-section" id="studio">
      <div className="ls-section-label">{tr.label}</div>
      <h2 className="ls-section-title">{tr.title} <em>{tr.titleEm}</em></h2>
      <div className="ls-studio-grid">
        <div className="ls-studio-sub">
          <div style={{ width: '100%', height: '100%', background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#aaa', textTransform: 'uppercase' }}>Studio Photo</span>
          </div>
        </div>
        <div className="ls-studio-text">
          <p>{line1}<br /><br />{line2}</p>
        </div>
      </div>
    </section>
  )
}
