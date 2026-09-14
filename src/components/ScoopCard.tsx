import type { Locale, Scoop } from '../types'
import { formatDate, t } from '../i18n'
import { IceCreamMark } from './IceCreamMark'
import { RatingScoops } from './RatingScoops'

type Props = {
  locale: Locale
  scoop: Scoop
  onEdit: (scoop: Scoop) => void
  onDelete: (scoop: Scoop) => void
}

export function ScoopCard({ locale, scoop, onEdit, onDelete }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-[1.7rem] bg-white/80 p-4 shadow-[0_16px_36px_-24px_rgba(74,50,40,0.65)] ring-1 ring-chocolate/8 transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-20px_rgba(74,50,40,0.45)] sm:p-5">
      <div className="ticket-notch" aria-hidden="true" />
      <div className="flex gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-cream ring-1 ring-chocolate/8">
          <IceCreamMark flavor={scoop.flavor} className="h-12 w-12" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate font-display text-xl font-semibold tracking-tight text-chocolate">
                {scoop.flavor}
              </h2>
              <p className="truncate text-sm font-semibold text-chocolate/55">
                {scoop.shop}
              </p>
            </div>
            <time
              dateTime={scoop.date}
              className="shrink-0 rounded-full bg-cream px-2.5 py-1 text-[0.68rem] font-bold tracking-wide text-chocolate/55 uppercase ring-1 ring-chocolate/8"
            >
              {formatDate(locale, scoop.date)}
            </time>
          </div>
          <div className="mt-2">
            <RatingScoops locale={locale} filled={scoop.rating} />
          </div>
        </div>
      </div>
      {scoop.notes ? (
        <p className="mt-3 text-sm leading-relaxed text-chocolate/70">{scoop.notes}</p>
      ) : null}
      {scoop.tags.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {scoop.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-mint/70 px-2.5 py-0.5 text-[0.7rem] font-bold text-chocolate/70"
            >
              #{tag}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(scoop)}
          className="rounded-full px-3 py-1.5 text-xs font-bold text-chocolate/70 transition hover:bg-cream"
        >
          {t(locale, 'edit')}
        </button>
        <button
          type="button"
          onClick={() => onDelete(scoop)}
          className="rounded-full px-3 py-1.5 text-xs font-bold text-strawberry transition hover:bg-rose"
        >
          {t(locale, 'delete')}
        </button>
      </div>
    </article>
  )
}
