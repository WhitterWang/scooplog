import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Scoop, ScoopDraft } from '../types'
import { createSeedScoops } from '../lib/seed'
import { loadScoops, saveScoops } from '../lib/storage'

export function useScoops() {
  const [scoops, setScoops] = useState<Scoop[]>(() => loadScoops())

  useEffect(() => {
    saveScoops(scoops)
  }, [scoops])

  const addScoop = useCallback((draft: ScoopDraft) => {
    const now = new Date().toISOString()
    const scoop: Scoop = {
      ...draft,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }
    setScoops((current) => [scoop, ...current])
  }, [])

  const updateScoop = useCallback((id: string, draft: ScoopDraft) => {
    const now = new Date().toISOString()
    setScoops((current) =>
      current.map((scoop) =>
        scoop.id === id ? { ...scoop, ...draft, updatedAt: now } : scoop,
      ),
    )
  }, [])

  const deleteScoop = useCallback((id: string) => {
    setScoops((current) => current.filter((scoop) => scoop.id !== id))
  }, [])

  const resetScoops = useCallback(() => {
    setScoops(createSeedScoops())
  }, [])

  return useMemo(
    () => ({ scoops, addScoop, updateScoop, deleteScoop, resetScoops }),
    [scoops, addScoop, updateScoop, deleteScoop, resetScoops],
  )
}
