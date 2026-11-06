import { Sparkle } from './Ornaments'

type Props = { items: string[]; reverse?: boolean }

/** Banda tipográfica infinita entre secciones. Se pausa al pasar el cursor. */
export default function Marquee({ items, reverse = false }: Props) {
  // Se duplica el contenido para que el bucle (-50%) sea continuo.
  const loop = [...items, ...items, ...items, ...items]
  return (
    <div className={`lg-marquee${reverse ? ' lg-marquee--reverse' : ''}`} aria-hidden="true" data-anim>
      <div className="lg-marquee-track">
        {loop.map((item, i) => (
          <span key={i} className={`lg-marquee-item${i % 2 ? ' lg-marquee-item--outline' : ''}`}>
            {item}
            <Sparkle size={14} className="lg-marquee-star" />
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * Muro tipográfico en letra gótica: tres filas que corren en sentidos opuestos
 * (ref. "SAINTS · Ink your story"). Solo anima transform: lo compone la GPU.
 */
export function GothicWall({ rows }: { rows: string[] }) {
  return (
    <div className="lg-wall" aria-hidden="true" data-anim>
      {rows.map((text, r) => {
        const loop = Array.from({ length: 6 }, () => text)
        return (
          <div key={r} className={`lg-wall-row lg-wall-row--${r % 3}`}>
            <div className="lg-wall-track">
              {loop.map((t, i) => (
                <span key={i} className="lg-wall-item">
                  {t}
                  <Sparkle size={18} className="lg-wall-star" />
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
