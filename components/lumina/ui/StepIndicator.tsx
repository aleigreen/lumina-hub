import { Sparkle } from './Ornaments'

type Props = {
  steps: string[]
  current: number
}

/** Indicador de pasos: nodos-estrella unidos por una línea dorada que se llena. */
export default function StepIndicator({ steps, current }: Props) {
  const progress = steps.length > 1 ? current / (steps.length - 1) : 0
  return (
    <ol className="lg-steps" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
      <li className="lg-steps-track" aria-hidden="true">
        <span className="lg-steps-fill" style={{ transform: `scaleX(${progress})` }} />
      </li>
      {steps.map((label, i) => {
        const state = i < current ? ' is-done' : i === current ? ' is-active' : ''
        return (
          <li key={i} className={`lg-step${state}`} aria-current={i === current ? 'step' : undefined}>
            <span className="lg-step-node"><Sparkle size={10} /></span>
            <span className="lg-step-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="lg-step-label">{label}</span>
          </li>
        )
      })}
    </ol>
  )
}
