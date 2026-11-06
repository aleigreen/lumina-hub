import type { CSSProperties, ReactNode } from 'react'
import type { Locale } from '../data/translations'

/* ─────────────────────────────────────────────────────────────
   Ornamentos góticos reutilizables (SVG puro, sin dependencias)
   ───────────────────────────────────────────────────────────── */

const STAR_PATH =
  'M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z'

type SparkleProps = { size?: number; className?: string; style?: CSSProperties }

/** Estrella de cuatro puntas (motivo recurrente de las referencias). */
export function Sparkle({ size = 14, className, style }: SparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

/** Gran estrella carmesí con rayos alargados. `id` debe ser único por instancia. */
export function HeroStar({ id = 'hero' }: { id?: string }) {
  const gid = `lg-star-fill-${id}`
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id={gid} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9a2620" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#7a1d18" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7a1d18" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M100 0C103 72 128 97 200 100C128 103 103 128 100 200C97 128 72 103 0 100C72 97 97 72 100 0Z"
        fill={`url(#${gid})`}
      />
      <circle cx="100" cy="100" r="18" fill="none" stroke="#c8a872" strokeOpacity="0.35" strokeWidth="0.3" />
      <circle cx="100" cy="100" r="11" fill="none" stroke="#c8a872" strokeOpacity="0.25" strokeWidth="0.3" />
    </svg>
  )
}

/** Arco ojival doble que se "dibuja" al cargar. */
export function Arch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 560" fill="none" aria-hidden="true" className={className}>
      <path
        className="lg-draw"
        pathLength={1}
        d="M20 560V230A300 300 0 0 1 200 10A300 300 0 0 1 380 230V560"
        stroke="#c8a872"
        strokeOpacity="0.38"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="lg-draw lg-draw--late"
        pathLength={1}
        d="M36 560V234A284 284 0 0 1 200 30A284 284 0 0 1 364 234V560"
        stroke="#c8a872"
        strokeOpacity="0.18"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path d={STAR_PATH} transform="translate(192 -14) scale(0.66)" fill="#c8a872" className="lg-arch-star" />
    </svg>
  )
}

/** Daga / aguja vertical ornamental. */
export function Dagger({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 400" fill="none" aria-hidden="true" className={className} preserveAspectRatio="xMidYMid meet">
      <g stroke="#c8a872" strokeLinecap="round" strokeLinejoin="round">
        {/* Pomo: destello de cuatro puntas con anillo */}
        <path d="M20 2C20.6 8.4 21.6 9.4 28 10C21.6 10.6 20.6 11.6 20 18C19.4 11.6 18.4 10.6 12 10C18.4 9.4 19.4 8.4 20 2Z" fill="#c8a872" fillOpacity="0.85" strokeWidth="0" />
        <circle cx="20" cy="10" r="4.2" strokeOpacity="0.45" strokeWidth="0.7" />
        {/* Empuñadura con vendaje */}
        <path d="M18.4 20H21.6V62H18.4Z" fill="#c8a872" fillOpacity="0.12" strokeOpacity="0.7" strokeWidth="0.8" />
        <path d="M18.4 27L21.6 24M18.4 33L21.6 30M18.4 39L21.6 36M18.4 45L21.6 42M18.4 51L21.6 48M18.4 57L21.6 54" strokeOpacity="0.5" strokeWidth="0.6" />
        {/* Guarda: brazos curvos que terminan en espiral */}
        <path d="M20 66C14 66 9 64.5 6.5 61.5C5 59.6 5.6 57.2 7.6 57C9.4 56.9 10 58.8 8.8 59.6" strokeOpacity="0.8" strokeWidth="0.9" />
        <path d="M20 66C26 66 31 64.5 33.5 61.5C35 59.6 34.4 57.2 32.4 57C30.6 56.9 30 58.8 31.2 59.6" strokeOpacity="0.8" strokeWidth="0.9" />
        <path d="M20 62L23.5 66L20 70L16.5 66Z" fill="#c8a872" fillOpacity="0.85" strokeWidth="0" />
        {/* Hoja: contorno fino, relleno tenue y canal central */}
        <path d="M17 72H23L22.4 330L20 396L17.6 330Z" fill="#c8a872" fillOpacity="0.14" strokeOpacity="0.75" strokeWidth="0.8" />
        <path d="M20 78V318" strokeOpacity="0.55" strokeWidth="0.6" />
      </g>
    </svg>
  )
}

/**
 * Sello circular con texto. Gira el <svg> completo (no un nodo interno)
 * para que la rotación la componga la GPU sin repintar.
 */
export function Seal({ text, id, className }: { text: string; id: string; className?: string }) {
  const pathId = `lg-seal-${id}`
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <defs>
        <path id={pathId} d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
      </defs>
      <text fontFamily="Cinzel, serif" fontSize="8.5" fill="#c9bfa9" letterSpacing="2">
        <textPath href={`#${pathId}`} textLength="286" lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
      <circle cx="60" cy="60" r="36" fill="none" stroke="#c8a872" strokeOpacity="0.3" strokeWidth="0.6" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="#c8a872" strokeOpacity="0.18" strokeWidth="0.6" />
      <path d={STAR_PATH} transform="translate(48 48)" fill="#c8a872" />
    </svg>
  )
}

/** Tres círculos entrelazados con puntos carmesí (referencia "Демон внутри"). */
export function Circles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 64" fill="none" aria-hidden="true" className={className}>
      <circle cx="48" cy="32" r="28" stroke="#c8a872" strokeOpacity="0.45" strokeWidth="0.8" />
      <circle cx="80" cy="32" r="28" stroke="#c8a872" strokeOpacity="0.45" strokeWidth="0.8" />
      <circle cx="112" cy="32" r="28" stroke="#c8a872" strokeOpacity="0.45" strokeWidth="0.8" />
      <line x1="80" y1="0" x2="80" y2="64" stroke="#c8a872" strokeOpacity="0.3" strokeWidth="0.6" />
      <circle cx="64" cy="32" r="2.2" fill="#9a2620" />
      <circle cx="96" cy="32" r="2.2" fill="#9a2620" />
      <circle cx="80" cy="32" r="1.4" fill="#c8a872" />
    </svg>
  )
}

/** Esquinas cuadradas para marcos (estilo Art Déco gótico). */
export function Corners() {
  return (
    <>
      <span className="lg-corner lg-corner--tl" />
      <span className="lg-corner lg-corner--tr" />
      <span className="lg-corner lg-corner--bl" />
      <span className="lg-corner lg-corner--br" />
    </>
  )
}

/** Divisor línea — estrella — línea. */
export function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`lg-divider ${className}`} aria-hidden="true" data-reveal="line">
      <span className="lg-divider-line" />
      <Sparkle size={10} className="lg-divider-dot" />
      <Sparkle size={18} className="lg-divider-star" />
      <Sparkle size={10} className="lg-divider-dot" />
      <span className="lg-divider-line lg-divider-line--r" />
    </div>
  )
}

const ROMAN: [number, string][] = [
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

export function toRoman(n: number) {
  let out = ''
  for (const [v, s] of ROMAN) {
    while (n >= v) { out += s; n -= v }
  }
  return out
}

/** Marca de capítulo: "✦ CAPÍTULO III ✦" en Cinzel, legible y con contexto. */
export function SectionMark({ n, locale, center = false }: { n: number; locale: Locale; center?: boolean }) {
  const word = locale === 'es' ? 'Capítulo' : 'Chapter'
  return (
    <div className={`lg-mark${center ? ' lg-mark--center' : ''}`} data-reveal="line" aria-hidden="true">
      {center && <span className="lg-mark-line lg-mark-line--l" />}
      <Sparkle size={9} className="lg-mark-star" />
      <span className="lg-mark-num">{word} {toRoman(n)}</span>
      <Sparkle size={9} className="lg-mark-star" />
      <span className="lg-mark-line" />
    </div>
  )
}

type Spark = [left: number, top: number, size: number, delay: number]

type DecorProps = {
  id: string
  glow?: 'left' | 'right' | 'none'
  sparks?: Spark[]
  daggers?: boolean
}

/**
 * Atmósfera del hero aplicada a cualquier sección: marco doble con esquinas,
 * estrella carmesí difusa, destellos y (opcional) dagas flanqueando el título.
 * La sección contenedora debe llevar la clase `lg-sec`.
 */
export function SectionDecor({ id, glow = 'right', sparks = [], daggers = false }: DecorProps) {
  return (
    <div className="lg-decor" aria-hidden="true">
      <div className="lg-decor-frame" data-reveal="frame"><Corners /></div>
      {/* Hilo vertical que cruza el borde superior: une cada sección con la anterior */}
      <span className="lg-thread" data-reveal="line" />
      {glow !== 'none' && (
        <div className={`lg-decor-glow lg-decor-glow--${glow}`}><HeroStar id={id} /></div>
      )}
      {daggers && (
        <>
          <Dagger className="lg-decor-dagger lg-decor-dagger--l" />
          <Dagger className="lg-decor-dagger lg-decor-dagger--r" />
        </>
      )}
      {sparks.map(([x, y, s, d], i) => (
        <Sparkle
          key={i}
          size={s}
          className="lg-decor-spark lg-twinkle"
          style={{ left: `${x}%`, top: `${y}%`, '--d': `${d}s` } as CSSProperties}
        />
      ))}
    </div>
  )
}

/* ═══ Capa editorial ═══════════════════════════════════════════ */

type TitleProps = {
  /** Palabra corta en letra gótica, superpuesta (p. ej. "Los"). */
  kicker?: string
  /** Palabra principal en Bodoni grande y mayúsculas (p. ej. "Artistas"). */
  main: string
  align?: 'center' | 'left'
  as?: 'h2' | 'h3'
}

/** Título editorial: gótica dorada sobre Bodoni monumental (ver referencias "TRUE Artists" / "Martha lives"). */
export function SectionTitle({ kicker, main, align = 'center', as: Tag = 'h2' }: TitleProps) {
  return (
    <Tag className={`lg-title lg-title--${align}`} data-reveal="title">
      {kicker && <span className="lg-title-kicker">{kicker}</span>}
      <span className="lg-title-main">{main}</span>
    </Tag>
  )
}

/** Arco ojival (lanceta). viewBox 100×130; las curvas son arcos de radio 60. */
export const ARCH_PATH = 'M0,130 V59.2 A60,60 0 0 1 50,0 A60,60 0 0 1 100,59.2 V130 Z'

/** Contorno dorado del arco, desplazado detrás de la imagen. */
export function ArchOutline({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 130" preserveAspectRatio="none" aria-hidden="true">
      <path d={ARCH_PATH} pathLength={1} fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** Haz de rayos bajo el arco (ref. "Martha lives"). */
export function Rays({ className, count = 11 }: { className?: string; count?: number }) {
  const lines = Array.from({ length: count }, (_, i) => {
    const a = (-60 + (120 / (count - 1)) * i) * (Math.PI / 180)
    const long = i % 2 === 0
    const r1 = 8
    const r2 = long ? 58 : 38
    return {
      x1: 60 + Math.sin(a) * r1, y1: Math.cos(a) * r1,
      x2: 60 + Math.sin(a) * r2, y2: Math.cos(a) * r2,
    }
  })
  return (
    <svg className={className} viewBox="0 0 120 60" aria-hidden="true">
      {lines.map((l, i) => (
        <line key={i} {...l} stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" style={{ '--i': i } as CSSProperties} />
      ))}
    </svg>
  )
}

/** Texto vertical decorativo (ref. "Aurora" / "Martha lives"). */
export function VerticalText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`lg-vert ${className}`} aria-hidden="true">{children}</span>
}
