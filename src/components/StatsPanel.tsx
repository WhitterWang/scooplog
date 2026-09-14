import type { Locale } from '../types'
import type { ScoopStats } from '../lib/stats'
import { t } from '../i18n'

type Props = {
  locale: Locale
  stats: ScoopStats
}

export function StatsPanel({ locale, stats }: Props) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label={t(locale, 'totalScoops')}
        value={String(stats.total)}
        accent="from-rose/80 to-white"
      />
      <StatCard
        label={t(locale, 'averageRating')}
        value={stats.total ? stats.averageRating.toFixed(1) : '—'}
        hint={stats.total ? '/ 5' : undefined}
        accent="from-butter to-white"
      />
      <RankCard
        label={t(locale, 'topShops')}
        items={stats.topShops}
        empty={t(locale, 'noStats')}
        accent="from-mint/90 to-white"
      />
      <RankCard
        label={t(locale, 'topFlavors')}
        items={stats.topFlavors}
        empty={t(locale, 'noStats')}
        accent="from-sky/80 to-white"
      />
    </section>
  )
}

function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string
  value: string
  hint?: string
  accent: string
}) {
  return (
    <article
      className={`rounded-[1.6rem] bg-linear-to-br ${accent} p-4 shadow-[0_14px_30px_-22px_rgba(74,50,40,0.55)] ring-1 ring-chocolate/8`}
    >
      <p className="text-[0.7rem] font-bold tracking-[0.16em] text-chocolate/50 uppercase">
        {label}
      </p>
      <p className="mt-2 font-display text-4xl font-semibold tracking-tight text-chocolate">
        {value}
        {hint ? (
          <span className="ml-1 align-middle font-sans text-base font-bold text-chocolate/40">
            {hint}
          </span>
        ) : null}
      </p>
    </article>
  )
}

function RankCard({
  label,
  items,
  empty,
  accent,
}: {
  label: string
  items: ScoopStats['topShops']
  empty: string
  accent: string
}) {
  return (
    <article
      className={`rounded-[1.6rem] bg-linear-to-br ${accent} p-4 shadow-[0_14px_30px_-22px_rgba(74,50,40,0.55)] ring-1 ring-chocolate/8`}
    >
      <p className="text-[0.7rem] font-bold tracking-[0.16em] text-chocolate/50 uppercase">
        {label}
      </p>
      {items.length === 0 ? (
        <p className="mt-3 text-sm leading-relaxed text-chocolate/55">{empty}</p>
      ) : (
        <ol className="mt-3 space-y-2">
          {items.map((item, index) => (
            <li key={item.name} className="flex items-baseline justify-between gap-3">
              <span className="truncate text-sm font-bold text-chocolate">
                <span className="mr-1.5 text-chocolate/35">{index + 1}</span>
                {item.name}
              </span>
              <span className="shrink-0 text-xs font-semibold text-chocolate/45">
                {item.count} · {item.average.toFixed(1)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </article>
  )
}
