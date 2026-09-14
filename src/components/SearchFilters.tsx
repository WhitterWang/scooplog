import type { Filters, Locale, Scoop } from '../types'
import { t } from '../i18n'
import { uniqueSorted } from '../lib/stats'

type Props = {
  locale: Locale
  scoops: Scoop[]
  filters: Filters
  shown: number
  onChange: (filters: Filters) => void
}

export function SearchFilters({ locale, scoops, filters, shown, onChange }: Props) {
  const shops = uniqueSorted(scoops.map((scoop) => scoop.shop))
  const flavors = uniqueSorted(scoops.map((scoop) => scoop.flavor))
  const tags = uniqueSorted(scoops.flatMap((scoop) => scoop.tags))
  const hasFilters = Boolean(
    filters.query || filters.shop || filters.flavor || filters.tag,
  )

  return (
    <section className="rounded-[1.7rem] bg-white/70 p-4 shadow-[0_14px_30px_-22px_rgba(74,50,40,0.5)] ring-1 ring-chocolate/8 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">{t(locale, 'searchPlaceholder')}</span>
          <SearchIcon />
          <input
            value={filters.query}
            onChange={(event) => onChange({ ...filters, query: event.target.value })}
            placeholder={t(locale, 'searchPlaceholder')}
            className="w-full rounded-full border-0 bg-cream py-2.5 pr-4 pl-10 text-sm font-semibold text-chocolate outline-none ring-1 ring-chocolate/10 placeholder:font-medium placeholder:text-chocolate/35 focus:ring-2 focus:ring-strawberry/50"
          />
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:w-[min(100%,34rem)]">
          <FilterSelect
            value={filters.shop}
            options={shops}
            emptyLabel={t(locale, 'allShops')}
            onChange={(shop) => onChange({ ...filters, shop })}
          />
          <FilterSelect
            value={filters.flavor}
            options={flavors}
            emptyLabel={t(locale, 'allFlavors')}
            onChange={(flavor) => onChange({ ...filters, flavor })}
          />
          <FilterSelect
            value={filters.tag}
            options={tags}
            emptyLabel={t(locale, 'allTags')}
            onChange={(tag) => onChange({ ...filters, tag })}
          />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-chocolate/50">
        <p>{t(locale, 'showing', { shown, total: scoops.length })}</p>
        {hasFilters ? (
          <button
            type="button"
            onClick={() =>
              onChange({ query: '', shop: '', flavor: '', tag: '' })
            }
            className="rounded-full px-2 py-1 text-strawberry hover:bg-rose"
          >
            {t(locale, 'clearFilters')}
          </button>
        ) : null}
      </div>
    </section>
  )
}

function FilterSelect({
  value,
  options,
  emptyLabel,
  onChange,
}: {
  value: string
  options: string[]
  emptyLabel: string
  onChange: (value: string) => void
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full appearance-none rounded-full bg-cream px-3 py-2.5 text-sm font-semibold text-chocolate outline-none ring-1 ring-chocolate/10 focus:ring-2 focus:ring-strawberry/50"
    >
      <option value="">{emptyLabel}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function SearchIcon() {
  return (
    <svg
      className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-chocolate/35"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
