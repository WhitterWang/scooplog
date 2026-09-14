const PALETTE = [
  '#E89A9A',
  '#A8C99A',
  '#E8B86D',
  '#9AABB8',
  '#D4A06A',
  '#C9B1D4',
  '#F2C6DE',
  '#8FBFB5',
  '#F5D76E',
  '#C4A484',
]

const KEYWORDS: Array<[RegExp, string]> = [
  [/pistachio|开心果|matcha|抹茶|green tea|绿茶/i, '#A8C99A'],
  [/strawberr|草莓|berry|樱桃|cherry|raspberry/i, '#E89A9A'],
  [/chocolate|巧克|可可|cocoa|dark/i, '#C4A484'],
  [/vanilla|香草|牛乳|milk|cream|原味/i, '#F5E2B8'],
  [/tea|红茶|earl grey|薰衣草|lavender/i, '#C9B1D4'],
  [/mango|芒果|lemon|柠檬|yuzu|柚/i, '#F5D76E'],
  [/salt|海盐|caramel|焦糖/i, '#D4A06A'],
  [/blueberr|蓝莓|sesame|芝麻/i, '#9AABB8'],
]

export function flavorColor(flavor: string): string {
  for (const [pattern, color] of KEYWORDS) {
    if (pattern.test(flavor)) return color
  }
  let hash = 0
  for (const char of flavor) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  }
  return PALETTE[hash % PALETTE.length] ?? PALETTE[0]
}
