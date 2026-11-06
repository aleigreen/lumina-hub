'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { artists } from '../data/artists'
import { bodyZones } from '../data/bodyZones'
import { t, type Locale } from '../data/translations'
import StepIndicator from '../ui/StepIndicator'
import { ArrowLeft, ArrowRight, CalendarDays, ImagePlus, LoaderCircle, Send, X } from 'lucide-react'
import { Corners, Sparkle } from '../ui/Ornaments'
import { InstagramIcon, stripArrow } from '../ui/Icons'

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

/** Miniatura de un archivo local: crea la URL una vez y la libera al desmontar. */
function Thumb({ file, alt, size }: { file: File; alt: string; size: number }) {
  const url = useMemo(() => URL.createObjectURL(file), [file])
  useEffect(() => () => URL.revokeObjectURL(url), [url])
  return <img src={url} alt={alt} width={size} height={size} className="lg-f-thumb-img" />
}

function ErrorMsg({ msg }: { msg?: string }) {
  return msg ? <p className="lg-f-error" role="alert">{msg}</p> : null
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
  const formRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const refInputRef = useRef<HTMLInputElement>(null)
  const zoneInputRef = useRef<HTMLInputElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)

  const clearError = (field: string) => setErrors(prev => ({ ...prev, [field]: undefined }))

  // Al cambiar de paso solo se desplaza si el indicador de pasos quedó por encima
  // de la pantalla (y entonces sube hasta él). Nunca empuja la página hacia abajo.
  const goToStep = (n: number) => {
    setStep(n)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = stepsRef.current
      if (!el) return
      const { top } = el.getBoundingClientRect()
      if (top < 90) window.scrollTo({ top: top + window.scrollY - 100, behavior: 'smooth' })
    }))
  }

  const set = (patch: Partial<FormData>) => setForm(prev => ({ ...prev, ...patch }))
  const selectedZone = bodyZones.find(z => z.id === form.zone)
  const minDate = getMinDate()
  const dateLocale = locale === 'es' ? 'es-MX' : 'en-US'
  const fmtDate = (iso: string) =>
    new Date(iso + 'T00:00:00').toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })

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
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError(false)
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
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="lg-f-result">
        <div className="lg-f-result-star"><Sparkle size={34} /></div>
        <h3 className="lg-f-result-title">{tr.success.title}</h3>
        <p className="lg-f-result-body">{tr.success.body}</p>
      </div>
    )
  }

  if (submitError) {
    return (
      <div className="lg-f-result">
        <div className="lg-f-result-star lg-f-result-star--err"><X size={30} strokeWidth={1} /></div>
        <h3 className="lg-f-result-title">Algo salió mal</h3>
        <p className="lg-f-result-body">
          Lo sentimos, hubo un problema al enviar tu solicitud.{'\n'}
          Por favor escríbenos directamente por Instagram y con gusto te atendemos.
        </p>
        <a
          href="https://instagram.com/luminasanctum.tattoo"
          target="_blank"
          rel="noopener noreferrer"
          className="ls-btn-outline"
        >
          <InstagramIcon size={14} />
          @luminasanctum.tattoo
        </a>
        <div className="mt-5">
          <button type="button" className="lg-f-link" onClick={() => setSubmitError(false)}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div ref={formRef}>
      {/* Instrucciones antes del form */}
      {step === 0 && (
        <div className="lg-f-intro">
          <div className="lg-f-intro-frame" aria-hidden="true"><Corners /></div>
          <div className="lg-f-intro-title">
            <Sparkle size={10} />
            {tr.formIntro.title}
          </div>
          <p className="lg-f-intro-body">{tr.formIntro.body}</p>
          <ul className="lg-f-intro-list">
            {tr.formIntro.items.map((item, i) => (
              <li key={i}>
                <span className="lg-f-intro-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="lg-f-intro-note">{tr.formIntro.note}</p>
        </div>
      )}

      <div ref={stepsRef}><StepIndicator steps={tr.steps} current={step} /></div>

      {/* key={step}: cada paso entra con su propia animación */}
      <div key={step} className="lg-f-step">

        {/* Paso 0: preferencia de artista */}
        {step === 0 && (
          <div>
            <div className="lg-f-question">{tr.form.hasArtist}</div>
            <div className="lg-f-choices">
              <button
                type="button"
                className={`ls-artist-btn lg-choice${form.hasArtist === true ? ' active' : ''}`}
                onClick={() => set({ hasArtist: true })}
              >
                <Sparkle size={10} className="lg-choice-star" />
                {tr.form.yes}
              </button>
              <button
                type="button"
                className={`ls-artist-btn lg-choice${form.hasArtist === false ? ' active' : ''}`}
                onClick={() => { set({ hasArtist: false, artist: '' }); goToStep(1) }}
              >
                <Sparkle size={10} className="lg-choice-star" />
                {tr.form.studioDecides}
              </button>
            </div>

            {form.hasArtist === true && (
              <div className="lg-f-reveal">
                <div className="lg-f-label">{tr.form.selectArtist}</div>
                <div className="ls-artist-selector">
                  {artists.map(a => (
                    <button
                      key={a.name}
                      type="button"
                      className={`ls-artist-btn${form.artist === a.name ? ' active' : ''}`}
                      onClick={() => { set({ artist: a.name }); clearError('artist') }}
                    >
                      {a.name}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="ls-btn-primary w-full justify-center"
                  onClick={() => {
                    if (form.artist) { clearError('artist'); goToStep(1) }
                    else setErrors(prev => ({ ...prev, artist: 'Selecciona un artista' }))
                  }}
                >
                  {stripArrow(tr.form.continue)}<ArrowRight size={14} strokeWidth={1.5} />
                </button>
                <ErrorMsg msg={errors.artist} />
              </div>
            )}
          </div>
        )}

        {/* Paso 1: zona + tamaño */}
        {step === 1 && (
          <div>
            <div className="lg-f-label">{tr.form.placement}</div>
            <div className="lg-f-grid">
              {bodyZones.map(zone => (
                <button
                  key={zone.id}
                  type="button"
                  className={`ls-artist-btn${form.zone === zone.id ? ' active' : ''}`}
                  onClick={() => { set({ zone: zone.id, size: '' }); clearError('zone'); clearError('size') }}
                >
                  {zone.label[locale]}
                </button>
              ))}
            </div>
            <ErrorMsg msg={errors.zone} />

            {selectedZone && (
              <div className="lg-f-reveal lg-f-block">
                <div className="lg-f-label">{tr.form.size}</div>
                <div className="lg-f-wrap">
                  {selectedZone.sizes.map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`ls-artist-btn flex-none${form.size === s ? ' active' : ''}`}
                      onClick={() => { set({ size: s }); clearError('size') }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <ErrorMsg msg={errors.size} />
              </div>
            )}

            {/* Foto de la zona */}
            <div className="lg-f-block">
              <div className="lg-f-label">{tr.form.zonePhoto}</div>
              <p className="lg-f-hint">{tr.form.zonePhotoHint}</p>
              {zonePhoto ? (
                <div className="lg-f-thumbs">
                  <div className="lg-f-thumb">
                    <Thumb file={zonePhoto} alt="zone" size={88} />
                    <button type="button" className="lg-f-thumb-x" aria-label={tr.form.removePhoto} onClick={() => setZonePhoto(null)}><X size={12} strokeWidth={1.5} /></button>
                  </div>
                </div>
              ) : (
                <>
                  <input ref={zoneInputRef} type="file" accept="image/*" onChange={handleZonePhoto} className="hidden" />
                  <button type="button" className="lg-f-upload lg-f-upload--wide" onClick={() => zoneInputRef.current?.click()}>
                    <ImagePlus size={16} strokeWidth={1.25} />
                    <span>{tr.form.zonePhoto}</span>
                  </button>
                </>
              )}
            </div>

            <div className="lg-f-actions">
              <button type="button" className="ls-btn-outline" onClick={() => goToStep(0)}><ArrowLeft size={14} strokeWidth={1.5} />{stripArrow(tr.form.back)}</button>
              <button
                type="button"
                className="ls-btn-primary"
                onClick={() => {
                  const e: typeof errors = {}
                  if (!form.zone) e.zone = 'Selecciona una zona'
                  if (form.zone && !form.size) e.size = 'Selecciona un tamaño'
                  if (Object.keys(e).length) setErrors(prev => ({ ...prev, ...e }))
                  else goToStep(2)
                }}
              >
                {stripArrow(tr.form.continue)}<ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: descripción + referencias + fecha */}
        {step === 2 && (
          <div>
            <div className="ls-form-group">
              <label htmlFor="lg-f-desc">{tr.form.describe}</label>
              <textarea
                id="lg-f-desc"
                required
                value={form.description}
                placeholder={tr.form.describePlaceholder}
                onChange={e => { set({ description: e.target.value }); clearError('description') }}
                className={`h-[120px]${errors.description ? ' is-invalid' : ''}`}
              />
              <ErrorMsg msg={errors.description} />
            </div>

            {/* Fotos de referencia */}
            <div className="lg-f-block">
              <div className="lg-f-label">{tr.form.refPhotos}</div>
              <p className="lg-f-hint">{tr.form.refPhotosHint}</p>
              <div className="lg-f-thumbs">
                {refPhotos.map((file, i) => (
                  <div key={`${file.name}-${file.lastModified}-${i}`} className="lg-f-thumb">
                    <Thumb file={file} alt={`ref-${i}`} size={80} />
                    <button
                      type="button"
                      className="lg-f-thumb-x"
                      aria-label={tr.form.removePhoto}
                      onClick={() => setRefPhotos(prev => prev.filter((_, idx) => idx !== i))}
                    >
                      <X size={12} strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
                {refPhotos.length < 4 && (
                  <>
                    <input ref={refInputRef} type="file" accept="image/*" multiple onChange={handleRefPhotos} className="hidden" />
                    <button type="button" className="lg-f-upload" aria-label={tr.form.refPhotos} onClick={() => refInputRef.current?.click()}>
                      <ImagePlus size={18} strokeWidth={1.25} />
                    </button>
                  </>
                )}
              </div>
              {refPhotos.length === 4 && <p className="lg-f-hint mt-2.5">{tr.form.maxFiles}</p>}
            </div>

            <div className="ls-form-group">
              <label>{tr.form.date}</label>
              <div className="lg-f-date" onClick={() => dateInputRef.current?.showPicker?.()}>
                <input
                  ref={dateInputRef}
                  type="date"
                  value={form.date}
                  min={minDate}
                  onKeyDown={e => e.preventDefault()}
                  onChange={e => set({ date: e.target.value })}
                  className="lg-f-date-native"
                  aria-label={tr.form.date}
                />
                <div className={`lg-f-date-face${form.date ? ' has-value' : ''}`}>
                  <CalendarDays size={15} strokeWidth={1.25} className="shrink-0" />
                  {form.date ? fmtDate(form.date) : tr.form.datePlaceholder}
                </div>
              </div>
              <p className="lg-f-note">
                {locale === 'es' ? 'Solo disponibles fechas a partir del ' : 'Dates available from '}
                {fmtDate(minDate)}
              </p>
              <p className="lg-f-hint mt-1.5">{tr.form.dateDisclaimer}</p>
            </div>

            <div className="lg-f-actions">
              <button type="button" className="ls-btn-outline" onClick={() => goToStep(1)}><ArrowLeft size={14} strokeWidth={1.5} />{stripArrow(tr.form.back)}</button>
              <button
                type="button"
                className="ls-btn-primary"
                onClick={() => {
                  if (form.description.trim()) { clearError('description'); goToStep(3) }
                  else setErrors(prev => ({ ...prev, description: 'Describe tu idea' }))
                }}
              >
                {stripArrow(tr.form.continue)}<ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: contacto + envío */}
        {step === 3 && (
          <div>
            <div className="ls-form-row">
              <div className="ls-form-group">
                <label htmlFor="lg-f-name">{tr.form.name}</label>
                <input
                  id="lg-f-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  className={errors.name ? 'is-invalid' : undefined}
                  onChange={e => { set({ name: e.target.value }); clearError('name') }}
                />
                <ErrorMsg msg={errors.name} />
              </div>
              <div className="ls-form-group">
                <label htmlFor="lg-f-email">{tr.form.email}</label>
                <input
                  id="lg-f-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  className={errors.email ? 'is-invalid' : undefined}
                  onChange={e => { set({ email: e.target.value }); clearError('email') }}
                />
                <ErrorMsg msg={errors.email} />
              </div>
            </div>
            <div className="ls-form-group">
              <label htmlFor="lg-f-phone">{tr.form.phone}</label>
              <input
                id="lg-f-phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                className={errors.phone ? 'is-invalid' : undefined}
                onChange={e => { set({ phone: e.target.value }); clearError('phone') }}
              />
              <ErrorMsg msg={errors.phone} />
            </div>
            <div className="lg-f-actions">
              <button type="button" className="ls-btn-outline" onClick={() => goToStep(2)}><ArrowLeft size={14} strokeWidth={1.5} />{stripArrow(tr.form.back)}</button>
              <button
                type="button"
                className="ls-btn-primary"
                disabled={submitting}
                onClick={() => { if (validateContact()) handleSubmit() }}
              >
                {submitting
                  ? <><LoaderCircle size={14} strokeWidth={1.5} className="lg-spinner" />{locale === 'es' ? 'Enviando…' : 'Sending…'}</>
                  : <>{stripArrow(tr.form.submit)}<Send size={13} strokeWidth={1.5} /></>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
