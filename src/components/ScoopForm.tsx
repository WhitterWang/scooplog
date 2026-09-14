import { useEffect, useId, useState, type FormEvent, type ReactNode } from 'react'
import type { Locale, Scoop, ScoopDraft } from '../types'
import { t, todayIso } from '../i18n'
import { ScoopIcon } from './RatingScoops'

type Props = {
  locale: Locale
  scoop: Scoop | null
  onClose: () => void
  onSave: (draft: ScoopDraft) => void
}

export function ScoopForm({ locale, scoop, onClose, onSave }: Props) {
  const headingId = useId()
  const [shop, setShop] = useState(scoop?.shop ?? '')
  const [flavor, setFlavor] = useState(scoop?.flavor ?? '')
  const [rating, setRating] = useState(scoop?.rating ?? 5)
  const [notes, setNotes] = useState(scoop?.notes ?? '')
  const [date, setDate] = useState(scoop?.date ?? todayIso())
  const [tags, setTags] = useState<string[]>(scoop?.tags ?? [])
  const [tagDraft, setTagDraft] = useState('')
  const [attempted, setAttempted] = useState(false)

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function commitTag(raw: string) {
    const next = raw
      .split(/[,，]/)
      .map((part) => part.trim())
      .filter(Boolean)
    if (next.length === 0) return
    setTags((current) => {
      const merged = [...current]
      for (const tag of next) {
        if (!merged.some((existing) => existing.toLowerCase() === tag.toLowerCase())) {
          merged.push(tag)
        }
      }
      return merged
    })
    setTagDraft('')
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    setAttempted(true)
    if (!shop.trim() || !flavor.trim()) return
    onSave({
      shop: shop.trim(),
      flavor: flavor.trim(),
      rating,
      notes: notes.trim(),
      date: date || todayIso(),
      tags,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-chocolate/35 backdrop-blur-[2px]"
        aria-label={t(locale, 'close')}
        onClick={onClose}
      />
      <form
        onSubmit={submit}
        aria-labelledby={headingId}
        className="relative max-h-[94svh] w-full overflow-y-auto rounded-t-[2rem] bg-cream p-5 shadow-2xl sm:max-w-lg sm:rounded-[2rem] sm:p-6"
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-chocolate/15 sm:hidden" />
        <h2 id={headingId} className="font-display text-2xl font-semibold text-chocolate">
          {t(locale, scoop ? 'editScoop' : 'logScoop')}
        </h2>
        <p className="mt-1 text-sm text-chocolate/50">{t(locale, 'tagline')}</p>

        <Field label={t(locale, 'shop')} error={attempted && !shop.trim() ? t(locale, 'required') : ''}>
          <input
            autoFocus
            value={shop}
            onChange={(event) => setShop(event.target.value)}
            placeholder={t(locale, 'shopPlaceholder')}
            className="field-input"
          />
        </Field>
        <Field label={t(locale, 'flavor')} error={attempted && !flavor.trim() ? t(locale, 'required') : ''}>
          <input
            value={flavor}
            onChange={(event) => setFlavor(event.target.value)}
            placeholder={t(locale, 'flavorPlaceholder')}
            className="field-input"
          />
        </Field>

        <fieldset className="mt-4">
          <legend className="mb-2 text-sm font-bold text-chocolate">{t(locale, 'rating')}</legend>
          <div className="flex gap-1" role="radiogroup" aria-label={t(locale, 'rating')}>
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                onClick={() => setRating(value)}
                className="rounded-2xl p-1.5 transition hover:bg-white"
              >
                <ScoopIcon size={34} filled={value <= rating} />
              </button>
            ))}
          </div>
        </fieldset>

        <Field label={t(locale, 'date')}>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="field-input"
          />
        </Field>

        <Field label={t(locale, 'tags')}>
          <div className="flex flex-wrap gap-1.5 pb-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setTags((current) => current.filter((item) => item !== tag))}
                className="rounded-full bg-mint px-2.5 py-1 text-xs font-bold text-chocolate"
              >
                #{tag} ×
              </button>
            ))}
          </div>
          <input
            value={tagDraft}
            onChange={(event) => setTagDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ',') {
                event.preventDefault()
                commitTag(tagDraft)
              }
            }}
            onBlur={() => commitTag(tagDraft)}
            placeholder={t(locale, 'tagsHint')}
            className="field-input"
          />
        </Field>

        <Field label={t(locale, 'notes')}>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            placeholder={t(locale, 'notesPlaceholder')}
            className="field-input resize-y"
          />
        </Field>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2.5 text-sm font-bold text-chocolate/70 hover:bg-white"
          >
            {t(locale, 'cancel')}
          </button>
          <button
            type="submit"
            className="rounded-full bg-strawberry px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_-10px_#c46b72]"
          >
            {t(locale, 'save')}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="mt-4 block">
      <span className="mb-1.5 flex items-center justify-between text-sm font-bold text-chocolate">
        {label}
        {error ? <span className="text-xs text-strawberry">{error}</span> : null}
      </span>
      {children}
    </label>
  )
}
