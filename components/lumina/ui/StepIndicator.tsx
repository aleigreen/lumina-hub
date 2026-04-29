type Props = {
  steps: string[]
  current: number
}

export default function StepIndicator({ steps, current }: Props) {
  return (
    <div style={{ display: 'flex', gap: '0', marginBottom: '32px' }}>
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {i > 0 && (
                <div style={{ flex: 1, height: '1px', background: done || active ? '#111' : '#ddd', transition: 'background 0.3s' }} />
              )}
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                border: `1px solid ${active ? '#111' : done ? '#111' : '#ddd'}`,
                background: done ? '#111' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.3s',
              }}>
                {done
                  ? <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>
                  : <span style={{ fontSize: '9px', color: active ? '#111' : '#aaa' }}>{i + 1}</span>
                }
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: '1px', background: done ? '#111' : '#ddd', transition: 'background 0.3s' }} />
              )}
            </div>
            <span style={{ fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: active ? '#111' : '#aaa', textAlign: 'center' }}>
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
