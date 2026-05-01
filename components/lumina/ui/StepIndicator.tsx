type Props = {
  steps: string[]
  current: number
}

export default function StepIndicator({ steps, current }: Props) {
  return (
    <div className="ls-step-indicator">
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={i} className={`ls-step${active ? ' active' : done ? ' done' : ''}`}>
            <span style={{ marginRight: '6px' }}>{String(i + 1).padStart(2, '0')}</span>
            <span>· {label}</span>
          </div>
        )
      })}
    </div>
  )
}
