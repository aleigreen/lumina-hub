'use client'

import { useState, useRef } from 'react'
import { artists } from '../data/artists'
import { bodyZones } from '../data/bodyZones'
import { t, type Locale } from '../data/translations'
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

type Props = {
  initialArtist?: string
  locale: Locale
}

function getMinDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 21)
  return d.toISOString().split('T')[0]
}

export default function BookingForm({ initialArtist = '', locale }: Props) {
  const tr = t[locale]
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
  const [refPhotos, setRefPhotos] = useState<File[]>([])
  const [zonePhoto, setZonePhoto] = useState<File | null>(null)
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})
  const refInputRef = useRef<HTMLInputElement>(null)
  const zoneInputRef = useRef<HTMLInputElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)

  const set = (patch: Partial<FormData>) => setForm(prev => ({ ...prev, ...patch }))
  const selectedZone = bodyZones.find(z => z.id === form.zone)
  const minDate = getMinDate()

  const validateContact = (): boolean => {
    const newErrors: { email?: string; phone?: string } = {}
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    if (!emailOk) newErrors.email = tr.form.emailError
    if (form.phone.trim() && !/^[0-9\s\+\-\(\)]{7,20}$/.test(form.phone.trim())) {
      newErrors.phone = tr.form.phoneError
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRefPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setRefPhotos(prev => [...prev, ...files].slice(0, 4))
    e.target.value = ''
  }

  const handleZonePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setZonePhoto(file)
    e.target.value = ''
  }

  const uploadPhoto = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase: any,
    file: File,
    path: string
  ): Promise<string | null> => {
    const { error } = await supabase.storage
      .from('appointment-photos')
      .upload(path, file, { upsert: false })
    if (error) { console.error('Upload error:', error.message); return null }
    return path
  }

  const handleSubmit = async () => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const ts = Date.now()
    const sanitizedName = form.name.trim().toLowerCase().replace(/\s+/g, '-')
    const folder = `${ts}-${sanitizedName}`

    const refUrls: string[] = []
    for (let i = 0; i < refPhotos.length; i++) {
      const ext = refPhotos[i].name.split('.').pop()
      const url = await uploadPhoto(supabase, refPhotos[i], `${folder}/ref-${i + 1}.${ext}`)
      if (url) refUrls.push(url)
    }

    let zoneUrl: string | null = null
    if (zonePhoto) {
      const ext = zonePhoto.name.split('.').pop()
      zoneUrl = await uploadPhoto(supabase, zonePhoto, `${folder}/zone.${ext}`)
    }

    const artistLabel = form.hasArtist ? form.artist : null
    const { error } = await supabase.from('appointments').insert([{
      client_name: form.name,
      client_email: form.email,
      client_phone: form.phone,
      artist: artistLabel,
      has_specific_artist: form.hasArtist ?? false,
      zone: form.zone,
      size: form.size,
      idea: form.description,
      preferred_date: form.date || null,
      ref_photos: refUrls.length > 0 ? refUrls : null,
      zone_photo: zoneUrl,
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
        <h3>{tr.success.title}</h3>
        <p>{tr.success.body}</p>
      </div>
    )
  }

  return (
    <div>
      {/* Instrucciones antes del form */}
      {step === 0 && (
        <div style={{ marginBottom: '40px', padding: '28px 32px', background: '#fff', border: '1px solid #e8e8e8' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#888', marginBottom: '14px' }}>
            {tr.formIntro.title}
          </div>
          <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.8, marginBottom: '20px', letterSpacing: '0.02em' }}>
            {tr.formIntro.body}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tr.formIntro.items.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#999', paddingTop: '3px', flexShrink: 0 }}>
                  0{i + 1}
                </span>
                <span style={{ fontSize: '14px', color: '#444', lineHeight: 1.7, letterSpacing: '0.02em' }}>{item}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.7, fontStyle: 'italic', letterSpacing: '0.02em' }}>
            {tr.formIntro.note}
          </p>
        </div>
      )}

      <StepIndicator steps={tr.steps} current={step} />

      {/* Step 0: Artist preference */}
      {step === 0 && (
        <div>
          <div className="ls-section-label" style={{ marginBottom: '20px' }}>{tr.form.hasArtist}</div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            <button
              type="button"
              className={`ls-artist-btn ${form.hasArtist === true ? 'active' : ''}`}
              style={{ flex: 1, padding: '16px' }}
              onClick={() => set({ hasArtist: true })}
            >
              {tr.form.yes}
            </button>
            <button
              type="button"
              className={`ls-artist-btn ${form.hasArtist === false ? 'active' : ''}`}
              style={{ flex: 1, padding: '16px' }}
              onClick={() => { set({ hasArtist: false, artist: '' }); setStep(1) }}
            >
              {tr.form.studioDecides}
            </button>
          </div>

          {form.hasArtist === true && (
            <>
              <div className="ls-section-label" style={{ marginBottom: '12px' }}>{tr.form.selectArtist}</div>
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
                {tr.form.continue}
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 1: Body zone + size */}
      {step === 1 && (
        <div>
          <div className="ls-section-label" style={{ marginBottom: '16px' }}>{tr.form.placement}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '28px' }}>
            {bodyZones.map(zone => (
              <button
                key={zone.id}
                type="button"
                className={`ls-artist-btn ${form.zone === zone.id ? 'active' : ''}`}
                onClick={() => set({ zone: zone.id, size: '' })}
              >
                {zone.label[locale]}
              </button>
            ))}
          </div>

          {selectedZone && (
            <>
              <div className="ls-section-label" style={{ marginBottom: '12px' }}>{tr.form.size}</div>
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

          {/* Zone photo upload */}
          <div style={{ marginBottom: '32px' }}>
            <div className="ls-section-label" style={{ marginBottom: '8px' }}>{tr.form.zonePhoto}</div>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px', letterSpacing: '0.02em' }}>{tr.form.zonePhotoHint}</p>
            {zonePhoto ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={URL.createObjectURL(zonePhoto)}
                  alt="zone"
                  style={{ width: '72px', height: '72px', objectFit: 'cover', border: '1px solid #e8e8e8' }}
                />
                <button
                  type="button"
                  onClick={() => setZonePhoto(null)}
                  style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {tr.form.removePhoto}
                </button>
              </div>
            ) : (
              <>
                <input ref={zoneInputRef} type="file" accept="image/*" onChange={handleZonePhoto} style={{ display: 'none' }} />
                <button
                  type="button"
                  className="ls-btn-outline"
                  style={{ fontSize: '9px', padding: '10px 24px' }}
                  onClick={() => zoneInputRef.current?.click()}
                >
                  + {tr.form.zonePhoto}
                </button>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="ls-btn-outline" onClick={() => setStep(0)}>{tr.form.back}</button>
            <button
              type="button"
              className="ls-btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              disabled={!form.zone || !form.size}
              onClick={() => setStep(2)}
            >
              {tr.form.continue}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Description + ref photos + date */}
      {step === 2 && (
        <div>
          <div className="ls-form-group">
            <label>{tr.form.describe}</label>
            <textarea
              required
              value={form.description}
              placeholder={tr.form.describePlaceholder}
              onChange={e => set({ description: e.target.value })}
              style={{ height: '120px' }}
            />
          </div>

          {/* Reference photos */}
          <div style={{ marginBottom: '28px' }}>
            <div className="ls-section-label" style={{ marginBottom: '8px' }}>{tr.form.refPhotos}</div>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px', letterSpacing: '0.02em' }}>{tr.form.refPhotosHint}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end' }}>
              {refPhotos.map((file, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`ref-${i}`}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid #e8e8e8', display: 'block' }}
                  />
                  <button
                    type="button"
                    onClick={() => setRefPhotos(prev => prev.filter((_, idx) => idx !== i))}
                    style={{
                      position: 'absolute', top: '4px', right: '4px',
                      background: '#111', color: '#fff', border: 'none',
                      width: '18px', height: '18px', fontSize: '10px',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              {refPhotos.length < 4 && (
                <>
                  <input
                    ref={refInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleRefPhotos}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => refInputRef.current?.click()}
                    style={{
                      width: '80px', height: '80px',
                      border: '1px dashed #ccc', background: 'none',
                      cursor: 'pointer', color: '#aaa', fontSize: '22px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    +
                  </button>
                </>
              )}
            </div>
            {refPhotos.length === 4 && (
              <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', letterSpacing: '0.08em' }}>{tr.form.maxFiles}</p>
            )}
          </div>

          <div className="ls-form-group">
            <label>{tr.form.date}</label>
            <div
              style={{ position: 'relative', display: 'block', maxWidth: '280px' }}
              onClick={() => dateInputRef.current?.showPicker?.()}
            >
              <input
                ref={dateInputRef}
                type="date"
                value={form.date}
                min={minDate}
                onKeyDown={e => e.preventDefault()}
                onChange={e => set({ date: e.target.value })}
                style={{
                  position: 'absolute', inset: 0,
                  opacity: 0, cursor: 'pointer', zIndex: 2,
                  width: '100%', height: '100%',
                }}
              />
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                borderBottom: '1px solid #ddd', padding: '10px 0',
                cursor: 'pointer', pointerEvents: 'none',
                fontSize: '14px', letterSpacing: '0.02em',
                color: form.date ? '#111' : '#888',
                fontFamily: 'Jost, sans-serif',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {form.date
                  ? new Date(form.date + 'T00:00:00').toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
                  : tr.form.datePlaceholder}
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.8, marginTop: '10px', letterSpacing: '0.02em' }}>
              {tr.form.dateDisclaimer}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="ls-btn-outline" onClick={() => setStep(1)}>{tr.form.back}</button>
            <button
              type="button"
              className="ls-btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              disabled={!form.description.trim()}
              onClick={() => setStep(3)}
            >
              {tr.form.continue}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact + submit */}
      {step === 3 && (
        <div>
          <div className="ls-form-row">
            <div className="ls-form-group">
              <label>{tr.form.name}</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => set({ name: e.target.value })}
              />
            </div>
            <div className="ls-form-group">
              <label>{tr.form.email}</label>
              <input
                type="email"
                required
                value={form.email}
                style={{ borderBottomColor: errors.email ? '#c0392b' : undefined }}
                onChange={e => { set({ email: e.target.value }); setErrors(prev => ({ ...prev, email: undefined })) }}
              />
              {errors.email && (
                <p style={{ fontSize: '11px', color: '#c0392b', marginTop: '6px', letterSpacing: '0.02em' }}>{errors.email}</p>
              )}
            </div>
          </div>
          <div className="ls-form-group">
            <label>{tr.form.phone}</label>
            <input
              type="tel"
              value={form.phone}
              style={{ borderBottomColor: errors.phone ? '#c0392b' : undefined }}
              onChange={e => { set({ phone: e.target.value }); setErrors(prev => ({ ...prev, phone: undefined })) }}
            />
            {errors.phone && (
              <p style={{ fontSize: '11px', color: '#c0392b', marginTop: '6px', letterSpacing: '0.02em' }}>{errors.phone}</p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="ls-btn-outline" onClick={() => setStep(2)}>{tr.form.back}</button>
            <button
              type="button"
              className="ls-btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              disabled={!form.name.trim() || !form.email.trim()}
              onClick={() => { if (validateContact()) handleSubmit() }}
            >
              {tr.form.submit}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
