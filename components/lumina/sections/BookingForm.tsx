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
  const [errors, setErrors] = useState<{ email?: string; phone?: string; artist?: string; zone?: string; size?: string; description?: string; name?: string }>({})
  const refInputRef = useRef<HTMLInputElement>(null)
  const zoneInputRef = useRef<HTMLInputElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)

  const clearError = (field: string) => setErrors(prev => ({ ...prev, [field]: undefined }))

  const set = (patch: Partial<FormData>) => setForm(prev => ({ ...prev, ...patch }))
  const selectedZone = bodyZones.find(z => z.id === form.zone)
  const minDate = getMinDate()

  const validateContact = (): boolean => {
    const newErrors: typeof errors = {}
    if (!form.name.trim()) newErrors.name = 'Campo requerido'
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    if (!emailOk) newErrors.email = tr.form.emailError
    if (form.phone.trim() && !/^[0-9\s\+\-\(\)]{7,20}$/.test(form.phone.trim())) {
      newErrors.phone = tr.form.phoneError
    }
    setErrors(prev => ({ ...prev, ...newErrors }))
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

  const compressImage = (file: File, maxSizeKB = 800): Promise<File> => {
    return new Promise(resolve => {
      if (file.size <= maxSizeKB * 1024) { resolve(file); return }
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img
        const scale = Math.sqrt((maxSizeKB * 1024) / file.size)
        width = Math.round(width * scale)
        height = Math.round(height * scale)
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
        canvas.toBlob(blob => {
          URL.revokeObjectURL(url)
          resolve(blob ? new File([blob], file.name, { type: 'image/jpeg' }) : file)
        }, 'image/jpeg', 0.82)
      }
      img.src = url
    })
  }

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('artist', form.hasArtist ? form.artist : 'Sin preferencia')
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('zone', form.zone)
      fd.append('size', form.size)
      fd.append('description', form.description)
      fd.append('date', form.date)
      if (zonePhoto) fd.append('zonePhoto', await compressImage(zonePhoto))
      for (const f of refPhotos) fd.append('refPhotos', await compressImage(f))

      const res = await fetch('/api/booking', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Error al enviar')
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert('Hubo un error al enviar tu solicitud. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
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
                onClick={() => {
                  if (form.artist) { clearError('artist'); setStep(1) }
                  else setErrors(prev => ({ ...prev, artist: 'Selecciona un artista' }))
                }}
              >
                {tr.form.continue}
              </button>
              {errors.artist && <p style={{ fontSize: '12px', color: '#c0392b', marginTop: '8px', letterSpacing: '0.02em' }}>{errors.artist}</p>}
            </>
          )}
        </div>
      )}

      {/* Step 1: Body zone + size */}
      {step === 1 && (
        <div>
          <div className="ls-section-label" style={{ marginBottom: '16px' }}>{tr.form.placement}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '8px' }}>
            {bodyZones.map(zone => (
              <button
                key={zone.id}
                type="button"
                className={`ls-artist-btn ${form.zone === zone.id ? 'active' : ''}`}
                onClick={() => { set({ zone: zone.id, size: '' }); clearError('zone'); clearError('size') }}
              >
                {zone.label[locale]}
              </button>
            ))}
          </div>
          {errors.zone && <p style={{ fontSize: '12px', color: '#c0392b', marginBottom: '16px', letterSpacing: '0.02em' }}>{errors.zone}</p>}
          {!errors.zone && <div style={{ marginBottom: '20px' }} />}

          {selectedZone && (
            <>
              <div className="ls-section-label" style={{ marginBottom: '12px' }}>{tr.form.size}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {selectedZone.sizes.map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`ls-artist-btn ${form.size === s ? 'active' : ''}`}
                    style={{ flex: 'none' }}
                    onClick={() => { set({ size: s }); clearError('size') }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {errors.size && <p style={{ fontSize: '12px', color: '#c0392b', marginBottom: '16px', letterSpacing: '0.02em' }}>{errors.size}</p>}
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
              onClick={() => {
                const e: typeof errors = {}
                if (!form.zone) e.zone = 'Selecciona una zona'
                if (form.zone && !form.size) e.size = 'Selecciona un tamaño'
                if (Object.keys(e).length) setErrors(prev => ({ ...prev, ...e }))
                else setStep(2)
              }}
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
              onChange={e => { set({ description: e.target.value }); clearError('description') }}
              style={{ height: '120px', borderBottomColor: errors.description ? '#c0392b' : undefined }}
            />
            {errors.description && <p style={{ fontSize: '12px', color: '#c0392b', marginTop: '6px', letterSpacing: '0.02em' }}>{errors.description}</p>}
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
                color: form.date ? '#e8dfcf' : '#888',
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
            <p style={{ fontSize: '12px', color: '#c8a872', lineHeight: 1.7, marginTop: '10px', letterSpacing: '0.02em' }}>
              Solo disponibles fechas a partir del {new Date(minDate + 'T00:00:00').toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p style={{ fontSize: '12px', color: '#888', lineHeight: 1.7, marginTop: '4px', letterSpacing: '0.02em' }}>
              {tr.form.dateDisclaimer}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="ls-btn-outline" onClick={() => setStep(1)}>{tr.form.back}</button>
            <button
              type="button"
              className="ls-btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => {
                if (form.description.trim()) { clearError('description'); setStep(3) }
                else setErrors(prev => ({ ...prev, description: 'Describe tu idea' }))
              }}
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
                style={{ borderBottomColor: errors.name ? '#c0392b' : undefined }}
                onChange={e => { set({ name: e.target.value }); clearError('name') }}
              />
              {errors.name && <p style={{ fontSize: '12px', color: '#c0392b', marginTop: '6px', letterSpacing: '0.02em' }}>{errors.name}</p>}
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
              disabled={submitting}
              onClick={() => { if (validateContact()) handleSubmit() }}
            >
              {submitting ? '...' : tr.form.submit}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
