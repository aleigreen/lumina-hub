import type { CSSProperties, ReactNode } from 'react'
import { ArrowRight, Ban, HeartHandshake, ScrollText, ShieldCheck, Users, type LucideIcon } from 'lucide-react'
import { t, type Locale } from '../data/translations'
import { SectionDecor, SectionMark, SectionTitle, Sparkle } from '../ui/Ornaments'

type Props = { locale: Locale; onValores?: () => void }

const ICONS: Record<string, LucideIcon> = {
  dignity: HeartHandshake,
  inclusion: Users,
  ethics: ShieldCheck,
  zero: Ban,
}

function ArchCard({ Icon, title, body, i, children }: { Icon: LucideIcon; title: string; body: string; i: number; children?: ReactNode }) {
  return (
    <>
      <span className="lg-acard-icon"><Icon size={22} strokeWidth={1} /></span>
      <Sparkle size={8} className="lg-acard-star" />
      <h3 className="lg-acard-title">{title}</h3>
      <span className="lg-acard-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
      <p className="lg-acard-body">{body}</p>
      {children}
    </>
  )
}

export default function SafeSpace({ locale, onValores }: Props) {
  const tr = t[locale].safeSpace
  return (
    <section id="safe-space" className="ls-section lg-sec" data-anim>
      <SectionDecor id="safe" glow="left" sparks={[[90, 14, 16, 0.8], [6, 80, 10, 1.9], [62, 92, 9, 0.2]]} />
      <header className="lg-head">
        <SectionMark n={2} locale={locale} center />
        <div className="ls-section-label" data-reveal="fade">{tr.label}</div>
        <SectionTitle kicker={tr.title.replace(/:$/, '')} main={tr.titleEm} />
      </header>

      <div className="lg-acards">
        {tr.items.map((item, i) => (
          <article key={item.icon} className="lg-acard" data-reveal style={{ '--d': `${i * 0.1}s` } as CSSProperties}>
            <ArchCard Icon={ICONS[item.icon] ?? ShieldCheck} title={item.title} body={item.body} i={i} />
          </article>
        ))}
        <article
          className="lg-acard lg-acard--cta"
          data-reveal
          style={{ '--d': `${tr.items.length * 0.1}s` } as CSSProperties}
        >
          <ArchCard
            Icon={ScrollText}
            title={t[locale].identity.accordion}
            body={locale === 'es' ? 'Conoce nuestra misión y visión.' : 'Learn about our mission and vision.'}
            i={tr.items.length}
          >
            <button type="button" className="lg-acard-more" onClick={onValores}>
              {locale === 'es' ? 'Ver más' : 'Read more'} <ArrowRight size={12} strokeWidth={1.5} />
            </button>
          </ArchCard>
        </article>
      </div>
    </section>
  )
}
