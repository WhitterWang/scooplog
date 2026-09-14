import type { Locale, Scoop } from '../types'
import { t } from '../i18n'
import { ScoopCard } from './ScoopCard'

type Props = {
  locale: Locale
  scoops: Scoop[]
  hasAny: boolean
  onAdd: () => void
  onEdit: (scoop: Scoop) => void
  onDelete: (scoop: Scoop) => void
  onClearFilters: () => void
}

export function ScoopList({
  locale,
  scoops,
  hasAny,
  onAdd,
  onEdit,
  onDelete,
  onClearFilters,
}: Props) {
  if (scoops.length === 0) {
    return (
      <EmptyState
        locale={locale}
        hasAny={hasAny}
        onAdd={onAdd}
        onClearFilters={onClearFilters}
      />
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {scoops.map((scoop) => (
        <ScoopCard
          key={scoop.id}
          locale={locale}
          scoop={scoop}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

function EmptyState({
  locale,
  hasAny,
  onAdd,
  onClearFilters,
}: {
  locale: Locale
  hasAny: boolean
  onAdd: () => void
  onClearFilters: () => void
}) {
  return (
    <div className="rounded-[2rem] bg-white/65 px-6 py-14 text-center shadow-[0_16px_36px_-24px_rgba(74,50,40,0.55)] ring-1 ring-chocolate/8">
      <div className="mx-auto mb-5 flex h-20 w-20 items-end justify-center rounded-full bg-cream">
        <svg viewBox="0 0 72 72" className="h-16 w-16" aria-hidden="true">
          <path d="M26 40h20l-4 20a7 7 0 0 1-6.8 5.4h.6A7 7 0 0 1 29 60l-3-20z" fill="#E8B86D" />
          <circle cx="36" cy="28" r="16" fill="#E7D7C6" />
          <path
            d="M28 28c3-6 13-6 16 0"
            fill="none"
            stroke="#C4A484"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h2 className="font-display text-3xl font-semibold text-chocolate">
        {t(locale, hasAny ? 'noResultsTitle' : 'emptyTitle')}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-chocolate/60">
        {t(locale, hasAny ? 'noResultsBody' : 'emptyBody')}
      </p>
      <div className="mt-6">
        {hasAny ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="rounded-full bg-chocolate px-5 py-2.5 text-sm font-bold text-cream"
          >
            {t(locale, 'clearFilters')}
          </button>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="rounded-full bg-strawberry px-5 py-2.5 text-sm font-bold text-white"
          >
            {t(locale, 'emptyCta')}
          </button>
        )}
      </div>
    </div>
  )
}
