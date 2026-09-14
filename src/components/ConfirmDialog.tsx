import { useEffect } from 'react'
import type { Locale } from '../types'
import { t, type MessageKey } from '../i18n'

type Props = {
  locale: Locale
  titleKey: MessageKey
  bodyKey: MessageKey
  confirmKey: MessageKey
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  locale,
  titleKey,
  bodyKey,
  confirmKey,
  danger = false,
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-chocolate/35 backdrop-blur-[2px]"
        aria-label={t(locale, 'close')}
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-[1.8rem] bg-cream p-6 shadow-2xl"
      >
        <h2 className="font-display text-2xl font-semibold text-chocolate">
          {t(locale, titleKey)}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-chocolate/65">{t(locale, bodyKey)}</p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-4 py-2.5 text-sm font-bold text-chocolate/70 hover:bg-white"
          >
            {t(locale, 'cancel')}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-full px-5 py-2.5 text-sm font-bold text-white ${
              danger ? 'bg-strawberry' : 'bg-chocolate'
            }`}
          >
            {t(locale, confirmKey)}
          </button>
        </div>
      </div>
    </div>
  )
}
