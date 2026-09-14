import type { Filters, Scoop } from '../types'

export type RankedItem = {
  name: string
  count: number
  average: number
}

export type ScoopStats = {
  total: number
  averageRating: number
  topShops: RankedItem[]
  topFlavors: RankedItem[]
}

export function sortScoops(scoops: Scoop[]): Scoop[] {
  return [...scoops].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1
    return a.createdAt < b.createdAt ? 1 : -1
  })
}

export function filterScoops(scoops: Scoop[], filters: Filters): Scoop[] {
  const query = filters.query.trim().toLowerCase()
  return scoops.filter((scoop) => {
    if (filters.shop && scoop.shop !== filters.shop) return false
    if (filters.flavor && scoop.flavor !== filters.flavor) return false
    if (filters.tag && !scoop.tags.includes(filters.tag)) return false
    if (!query) return true
    const haystack = [scoop.shop, scoop.flavor, scoop.notes, ...scoop.tags]
      .join(' ')
      .toLowerCase()
    return haystack.includes(query)
  })
}

export function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  )
}

function rankBy(scoops: Scoop[], key: 'shop' | 'flavor', limit = 3): RankedItem[] {
  const buckets = new Map<string, { count: number; sum: number }>()
  for (const scoop of scoops) {
    const name = scoop[key].trim()
    if (!name) continue
    const current = buckets.get(name) ?? { count: 0, sum: 0 }
    current.count += 1
    current.sum += scoop.rating
    buckets.set(name, current)
  }
  return [...buckets.entries()]
    .map(([name, { count, sum }]) => ({
      name,
      count,
      average: sum / count,
    }))
    .sort((a, b) => b.count - a.count || b.average - a.average)
    .slice(0, limit)
}

export function computeStats(scoops: Scoop[]): ScoopStats {
  const total = scoops.length
  const averageRating =
    total === 0 ? 0 : scoops.reduce((sum, scoop) => sum + scoop.rating, 0) / total
  return {
    total,
    averageRating,
    topShops: rankBy(scoops, 'shop'),
    topFlavors: rankBy(scoops, 'flavor'),
  }
}
