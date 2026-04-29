'use client'

import { useState } from 'react'
import { artists } from '../data/artists'
import { bodyZones } from '../data/bodyZones'
import StepIndicator from '../ui/StepIndicator'

type FormData = {
  hasArtist: boolean | null
  artist: string
  zone: string
  size: string
  description: string
  name: string
  email: string
  phone: string
  date: string
}

const STEPS = ['Artist', 'Placement', 'Idea', 'Contact']

type Props = {
  initialArtist?: string
}

export default function BookingForm({ initialArtist = '' }: Props) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>({
    hasArtist: null,
    artist: initialArtist,
    zone: '',
    size: '',
    description: '',
    name: '',
    email: '',
    phone: '',
    date: '',
  })

  const set = (patch: Partial<FormData>) => setForm(prev => ({ ...prev, ...patch }))

  const selectedZone = bodyZones.find(z => z.id === form.zone)

  const handleSubmit = async () => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const artistLabel = form.hasArtist ? form.artist : 'Studio assigns'
    const { error } = await supabase.from('appointments').insert([{
      client_name: form.name,
      client_email: form.email,
      client_phone: form.phone,
      date: form.date || null,
      description: `Zone: ${form.zone} | Size: ${form.size} | ${form.description}`,
      artist: artistLabel,
      time: '00:00',
      status: 'pending',
    }])
    if (!error) setSubmitted(true)
    else {
      console.error('Supabase error:', error)
      alert(`Error: ${error.message}`)
    }
  }

  if (submitted) {
    return (
      <div className="ls-success">
        <h3>Request received.</h3>
        <p>We'll be in touch within 3–5 days.</p>
      </div>
    )
  }

  return (
    <div>
      <StepIndicator steps={STEPS} current={step} />

      {/* Step 0: Artist preference */}
      {step === 0 && (
        <div>
          <div className="ls-section-label" style={{ marginBottom: '20px' }}>Do you have an artist in mind?</div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            <button
              type="button"
              className={`ls-artist-btn ${form.hasArtist === true ? 'active' : ''}`}
              style={{ flex: 1, padding: '16px' }}
              onClick={() => set({ hasArtist: true })}
            >
              Yes, I do
            </button>
            <button
              type="button"
              className={`ls-artist-btn ${form.hasArtist === false ? 'active' : ''}`}
              style={{ flex: 1, padding: '16px' }}
              onClick={() => { set({ hasArtist: false, artist: '' }); setStep(1) }}
            >
              Let the studio decide
            </button>
          </div>

          {form.hasArtist === true && (
            <>
              <div className="ls-section-label" style={{ marginBottom: '12px' }}>Select artist</div>
              <div className="ls-artist-selector" style={{ marginBottom: '32px' }}>
                {artists.map(a => (
                  <button
                    key={a.name}
                    type="button"
                    className={`ls-artist-btn ${form.artist === a.name ? 'active' : ''}`}
                    onClick={() => set({ artist: a.name })}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="ls-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={!form.artist}
                onClick={() => setStep(1)}
              >
                Continue →
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 1: Body zone + size */}
      {step === 1 && (
        <div>
          <div className="ls-section-label" style={{ marginBottom: '16px' }}>Body placement</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '28px' }}>
            {bodyZones.map(zone => (
              <button
                key={zone.id}
                type="button"
                className={`ls-artist-btn ${form.zone === zone.id ? 'active' : ''}`}
                onClick={() => set({ zone: zone.id, size: '' })}
              >
                {zone.label}
              </button>
            ))}
          </div>

          {selectedZone && (
            <>
              <div className="ls-section-label" style={{ marginBottom: '12px' }}>Approximate size</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {selectedZone.sizes.map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`ls-artist-btn ${form.size === s ? 'active' : ''}`}
                    style={{ flex: 'none' }}
                    onClick={() => set({ size: s })}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="ls-btn-outline" onClick={() => setStep(0)}>← Back</button>
            <button
              type="button"
              className="ls-btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              disabled={!form.zone || !form.size}
              onClick={() => setStep(2)}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Description */}
      {step === 2 && (
        <div>
          <div className="ls-form-group">
            <label>Describe your idea</label>
            <textarea
              required
              value={form.description}
              placeholder="Style, references, colors, details, mood..."
              onChange={e => set({ description: e.target.value })}
              style={{ height: '120px' }}
            />
          </div>
          <div className="ls-form-group">
            <label>Preferred date (optional)</label>
            <input
              type="date"
              value={form.date}
              onChange={e => set({ date: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="ls-btn-outline" onClick={() => setStep(1)}>← Back</button>
            <button
              type="button"
              className="ls-btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              disabled={!form.description.trim()}
              onClick={() => setStep(3)}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact + submit */}
      {step === 3 && (
        <div>
          <div className="ls-form-row">
            <div className="ls-form-group">
              <label>Full name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => set({ name: e.target.value })}
              />
            </div>
            <div className="ls-form-group">
              <label>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => set({ email: e.target.value })}
              />
            </div>
          </div>
          <div className="ls-form-group">
            <label>Phone / WhatsApp (optional)</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => set({ phone: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="ls-btn-outline" onClick={() => setStep(2)}>← Back</button>
            <button
              type="button"
              className="ls-btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              disabled={!form.name.trim() || !form.email.trim()}
              onClick={handleSubmit}
            >
              Send request →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
