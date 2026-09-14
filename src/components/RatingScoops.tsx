import type { Locale } from '../types'
import { t } from '../i18n'

type Props = {
  locale: Locale
  filled: number
  size?: 'sm' | 'md' | 'lg'
}

export function RatingScoops({ locale, filled, size = 'md' }: Props) {
  const pixels = size === 'sm' ? 16 : size === 'lg' ? 28 : 20
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={t(locale, 'ratingLabel', { n: filled })}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <ScoopIcon
          key={index}
          size={pixels}
          filled={index < filled}
        />
      ))}
    </div>
  )
}

export function ScoopIcon({
  size,
  filled,
}: {
  size: number
  filled: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={filled ? 'drop-shadow-sm' : 'opacity-35'}
    >
      <path
        d="M8.2 13.6h7.6L14.4 21a2.2 2.2 0 0 1-2.15 1.7h-.5A2.2 2.2 0 0 1 9.6 21l-1.4-7.4z"
        fill={filled ? '#E8B86D' : '#D7C4A8'}
      />
      <circle cx="12" cy="10" r="6.2" fill={filled ? '#E89A9A' : '#E7D7C6'} />
      <circle
        cx="10.2"
        cy="8.6"
        r="1.5"
        fill="#fff"
        opacity={filled ? 0.55 : 0.25}
      />
    </svg>
  )
}
