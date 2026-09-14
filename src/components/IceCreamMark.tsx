import { flavorColor } from '../lib/flavorColor'

export function IceCreamMark({
  flavor,
  className = '',
}: {
  flavor: string
  className?: string
}) {
  const color = flavorColor(flavor)
  return (
    <svg
      viewBox="0 0 72 72"
      className={className}
      aria-hidden="true"
    >
      <path d="M26 42h20l-4.2 21.2A7.4 7.4 0 0 1 34.5 69h-1.8A7.4 7.4 0 0 1 25.4 63.2L26 42z" fill="#E8B86D" />
      <circle cx="36" cy="30" r="20" fill={color} />
      <circle cx="28" cy="24" r="5" fill="#fff" opacity="0.4" />
    </svg>
  )
}

export function Wordmark() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-white/80 shadow-[0_8px_20px_-12px_rgba(74,50,40,0.5)] ring-1 ring-chocolate/10">
        <IceCreamMark flavor="strawberry" className="h-8 w-8" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[1.35rem] font-semibold tracking-tight text-chocolate">
          ScoopLog
        </span>
        <span className="block text-[0.72rem] font-semibold tracking-[0.14em] text-caramel uppercase">
          冰淇淋护照
        </span>
      </span>
    </div>
  )
}
