import type { Scoop } from '../types'
import { createSeedScoops } from './seed'

export const STORAGE_KEYS = {
  scoops: 'scooplog.scoops.v1',
  locale: 'scooplog.locale.v1',
} as const

export function loadScoops(): Scoop[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.scoops)
    if (!raw) return createSeedScoops()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return createSeedScoops()
    return parsed.filter(isScoop)
  } catch {
    return createSeedScoops()
  }
}

export function saveScoops(scoops: Scoop[]): void {
  localStorage.setItem(STORAGE_KEYS.scoops, JSON.stringify(scoops))
}

export function loadLocale(): 'en' | 'zh' {
  const stored = localStorage.getItem(STORAGE_KEYS.locale)
  if (stored === 'zh' || stored === 'en') return stored
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function saveLocale(locale: 'en' | 'zh'): void {
  localStorage.setItem(STORAGE_KEYS.locale, locale)
}

function isScoop(value: unknown): value is Scoop {
  if (!value || typeof value !== 'object') return false
  const scoop = value as Partial<Scoop>
  return (
    typeof scoop.id === 'string' &&
    typeof scoop.shop === 'string' &&
    typeof scoop.flavor === 'string' &&
    typeof scoop.rating === 'number' &&
    typeof scoop.notes === 'string' &&
    typeof scoop.date === 'string' &&
    Array.isArray(scoop.tags) &&
    typeof scoop.createdAt === 'string' &&
    typeof scoop.updatedAt === 'string'
  )
}
