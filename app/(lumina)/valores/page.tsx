import Link from "next/link"
import { t } from '../../../components/lumina/data/translations'

const eyebrow = 'font-mono text-[10px] tracking-[0.35em] text-gold uppercase'

export default function ValoresPage() {
  const { identity } = t.es
  const cards = [
    { n: '01', title: identity.missionTitle, body: identity.missionBody },
    { n: '02', title: identity.visionTitle, body: identity.visionBody },
  ]

  return (
    <div className="min-h-screen bg-ink font-display text-bone">
      <nav className="flex items-center justify-between border-b border-line/8 px-6 py-5 md:px-16 md:py-6">
        <Link href="/" className="font-mono text-[11px] tracking-[0.35em] text-gold uppercase no-underline">
          Lumina Sanctum
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-ash uppercase no-underline transition-[color] duration-200 ease-[ease] hover:text-gold"
        >
          ← Volver
        </Link>
      </nav>

      <div className="border-b border-line/8 px-6 pt-16 pb-12 md:px-16 md:pt-24 md:pb-16">
        <div className={`mb-6 ${eyebrow}`}>Lumina Sanctum</div>
        <h1 className="text-[length:clamp(40px,6vw,96px)] leading-none font-light text-bone">
          Nuestros<br /><em className="text-gold italic">Valores</em>
        </h1>
      </div>

      <div className="m-0.5 grid grid-cols-1 gap-0.5 bg-line/6 md:grid-cols-2">
        {cards.map(card => (
          <div key={card.n} className="flex flex-col gap-8 bg-ink px-6 py-12 even:bg-crypt md:px-16 md:py-18">
            <div className={eyebrow}>{card.n} — {card.title}</div>
            <div className="h-px w-10 bg-gold/30" />
            <h2 className="text-[length:clamp(28px,3vw,48px)] leading-[1.1] font-light text-bone italic">{card.title}</h2>
            <p className="max-w-[520px] font-body text-xl leading-[1.9] font-normal text-ash">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
