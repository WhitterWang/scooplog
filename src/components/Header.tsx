import type { Locale } from '../types'
import { t } from '../i18n'
import { Wordmark } from './IceCreamMark'

type Props = {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  onAdd: () => void
  onReset: () => void
}

export function Header({ locale, onLocaleChange, onAdd, onReset }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-chocolate/8 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Wordmark />
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle locale={locale} onChange={onLocaleChange} />
          <button
            type="button"
            onClick={onReset}
            className="hidden rounded-full px-3 py-2 text-sm font-semibold text-chocolate/70 transition hover:bg-white/70 hover:text-chocolate sm:inline-flex"
          >
            {t(locale, 'resetData')}
          </button>
          <button
            type="button"
            onClick={onAdd}
            className="hidden items-center gap-2 rounded-full bg-strawberry px-3.5 py-2 text-sm font-bold text-white shadow-[0_8px_18px_-10px_#c46b72] transition hover:brightness-105 active:scale-[0.98] sm:inline-flex sm:px-4"
          >
            <PlusIcon />
            <span className="hidden sm:inline">{t(locale, 'logScoop')}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

function LanguageToggle({
  locale,
  onChange,
}: {
  locale: Locale
  onChange: (locale: Locale) => void
}) {
  return (
    <div
      className="flex rounded-full bg-white/80 p-1 ring-1 ring-chocolate/10"
      role="group"
      aria-label={t(locale, 'language')}
    >
      {(['en', 'zh'] as const).map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`rounded-full px-2.5 py-1 text-xs font-bold tracking-wide transition sm:px-3 ${
            locale === value
              ? 'bg-chocolate text-cream'
              : 'text-chocolate/60 hover:text-chocolate'
          }`}
        >
          {value === 'en' ? 'EN' : '中文'}
        </button>
      ))}
    </div>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
