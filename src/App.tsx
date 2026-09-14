import { useMemo, useState } from 'react'
import type { Filters, Scoop } from './types'
import { t } from './i18n'
import { computeStats, filterScoops, sortScoops } from './lib/stats'
import { useLocale } from './hooks/useLocale'
import { useScoops } from './hooks/useScoops'
import { ConfirmDialog } from './components/ConfirmDialog'
import { Header } from './components/Header'
import { ScoopForm } from './components/ScoopForm'
import { ScoopList } from './components/ScoopList'
import { SearchFilters } from './components/SearchFilters'
import { StatsPanel } from './components/StatsPanel'

const emptyFilters: Filters = { query: '', shop: '', flavor: '', tag: '' }

export default function App() {
  const { locale, setLocale } = useLocale()
  const { scoops, addScoop, updateScoop, deleteScoop, resetScoops } = useScoops()
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [editor, setEditor] = useState<Scoop | 'new' | null>(null)
  const [pendingDelete, setPendingDelete] = useState<Scoop | null>(null)
  const [pendingReset, setPendingReset] = useState(false)

  const sorted = useMemo(() => sortScoops(scoops), [scoops])
  const visible = useMemo(() => filterScoops(sorted, filters), [sorted, filters])
  const stats = useMemo(() => computeStats(scoops), [scoops])

  return (
    <div className="relative min-h-svh overflow-x-hidden">
      <BackgroundBlobs />
      <Header
        locale={locale}
        onLocaleChange={setLocale}
        onAdd={() => setEditor('new')}
        onReset={() => setPendingReset(true)}
      />
      <main className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
        <section className="max-w-2xl">
          <p className="font-display text-3xl leading-tight font-semibold text-chocolate sm:text-4xl">
            {t(locale, 'tagline')}
          </p>
          <p className="mt-2 text-sm font-semibold text-chocolate/50">
            {t(locale, 'localFirst')}
          </p>
        </section>
        <StatsPanel locale={locale} stats={stats} />
        <SearchFilters
          locale={locale}
          scoops={scoops}
          filters={filters}
          shown={visible.length}
          onChange={setFilters}
        />
        <ScoopList
          locale={locale}
          scoops={visible}
          hasAny={scoops.length > 0}
          onAdd={() => setEditor('new')}
          onEdit={setEditor}
          onDelete={setPendingDelete}
          onClearFilters={() => setFilters(emptyFilters)}
        />
        <footer className="flex flex-wrap items-center justify-between gap-3 pt-4 pb-24 text-xs font-semibold text-chocolate/40 sm:pb-6">
          <p>ScoopLog · {t(locale, 'appNameZh')}</p>
        </footer>
      </main>

      <button
        type="button"
        onClick={() => setEditor('new')}
        className="fixed right-4 bottom-5 z-20 rounded-full bg-strawberry px-4 py-3 text-sm font-bold text-white shadow-[0_12px_24px_-10px_#c46b72] sm:hidden"
      >
        {t(locale, 'logScoop')}
      </button>

      {editor ? (
        <ScoopForm
          locale={locale}
          scoop={editor === 'new' ? null : editor}
          onClose={() => setEditor(null)}
          onSave={(draft) => {
            if (editor === 'new') addScoop(draft)
            else updateScoop(editor.id, draft)
            setEditor(null)
          }}
        />
      ) : null}

      {pendingDelete ? (
        <ConfirmDialog
          locale={locale}
          titleKey="deleteConfirmTitle"
          bodyKey="deleteConfirmBody"
          confirmKey="deleteConfirm"
          danger
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => {
            deleteScoop(pendingDelete.id)
            setPendingDelete(null)
          }}
        />
      ) : null}

      {pendingReset ? (
        <ConfirmDialog
          locale={locale}
          titleKey="resetConfirmTitle"
          bodyKey="resetConfirmBody"
          confirmKey="resetConfirm"
          onCancel={() => setPendingReset(false)}
          onConfirm={() => {
            resetScoops()
            setFilters(emptyFilters)
            setPendingReset(false)
          }}
        />
      ) : null}
    </div>
  )
}

function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-rose/70 blur-3xl" />
      <div className="absolute top-40 -right-20 h-80 w-80 rounded-full bg-mint/80 blur-3xl" />
      <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-butter/80 blur-3xl" />
    </div>
  )
}
