import type { Scoop } from '../types'
import { todayIso } from '../i18n'

function daysAgo(days: number): string {
  const date = new Date(`${todayIso()}T12:00:00`)
  date.setDate(date.getDate() - days)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function stamp(
  partial: Omit<Scoop, 'createdAt' | 'updatedAt' | 'date'> & { daysAgo: number },
): Scoop {
  const date = daysAgo(partial.daysAgo)
  const createdAt = new Date(`${date}T18:30:00`).toISOString()
  return {
    id: partial.id,
    shop: partial.shop,
    flavor: partial.flavor,
    rating: partial.rating,
    notes: partial.notes,
    date,
    tags: partial.tags,
    createdAt,
    updatedAt: createdAt,
  }
}

export function createSeedScoops(): Scoop[] {
  return [
    stamp({
      id: 'seed-grom-pistachio',
      daysAgo: 2,
      shop: 'Grom',
      flavor: 'Pistachio',
      rating: 5,
      notes: 'Dense, roasted, not too sweet. The kind of scoop that makes you quiet for a second.',
      tags: ['gelato', 'nutty', 'firenze'],
    }),
    stamp({
      id: 'seed-fulu-blacktea',
      daysAgo: 6,
      shop: '福禄 Fulu',
      flavor: '红茶牛乳',
      rating: 5,
      notes: '茶香先到，奶感后收。北京夏天的正确打开方式。',
      tags: ['gelato', '茶香', '北京'],
    }),
    stamp({
      id: 'seed-saltstraw-lavender',
      daysAgo: 9,
      shop: 'Salt & Straw',
      flavor: 'Honey Lavender',
      rating: 4,
      notes: 'Floral without tasting like soap. Best on a walk, not in a rush.',
      tags: ['floral', 'seasonal'],
    }),
    stamp({
      id: 'seed-morgenstern-salted',
      daysAgo: 14,
      shop: "Morgenstern's Finest",
      flavor: 'Salted Chocolate',
      rating: 5,
      notes: 'Dark, salty, a little dangerous. I would fly for this one.',
      tags: ['chocolate', 'nyc'],
    }),
    stamp({
      id: 'seed-amorino-strac',
      daysAgo: 18,
      shop: 'Amorino',
      flavor: 'Stracciatella',
      rating: 4,
      notes: 'Flower-shaped scoop, cold cream, chocolate shards. Touristy and still worth it.',
      tags: ['classic', 'paris'],
    }),
    stamp({
      id: 'seed-zhongjie-milk',
      daysAgo: 21,
      shop: '中街1946',
      flavor: '原味牛乳',
      rating: 4,
      notes: '小时候的味道，干净的奶香。不是gelato，但护照里也该有一页。',
      tags: ['雪糕', '怀旧'],
    }),
    stamp({
      id: 'seed-haagen-matcha',
      daysAgo: 27,
      shop: 'Häagen-Dazs',
      flavor: 'Matcha',
      rating: 4,
      notes: 'A little too sweet, a little too perfect. Still a reliable green hug.',
      tags: ['matcha', 'chain'],
    }),
    stamp({
      id: 'seed-vanleeuwen-earlgrey',
      daysAgo: 33,
      shop: 'Van Leeuwen',
      flavor: 'Earl Grey Tea',
      rating: 3,
      notes: 'Pretty idea, muted bergamot. I wanted it to be louder.',
      tags: ['tea', 'brooklyn'],
    }),
    stamp({
      id: 'seed-neri-dark',
      daysAgo: 41,
      shop: 'Gelateria dei Neri',
      flavor: 'Dark Chocolate',
      rating: 5,
      notes: 'Bitter edge, velvet middle. Ate it standing up on a stone street.',
      tags: ['chocolate', 'firenze'],
    }),
    stamp({
      id: 'seed-cornetto',
      daysAgo: 48,
      shop: 'Walls / 和路雪',
      flavor: 'Cornetto 巧克力脆皮',
      rating: 3,
      notes: 'Crunchy cap, soft vanilla. Not artisanal — still a scoop that counts.',
      tags: ['怀旧', 'convenience'],
    }),
  ]
}
