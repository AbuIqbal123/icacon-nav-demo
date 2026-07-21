/** Compact mark — white / brown / maroon (ICACON site palette) */
export function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect width="64" height="64" rx="14" fill="#863419" />
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fill="white"
        fontFamily="Roboto Slab, serif"
        fontWeight="700"
        fontSize="12"
        letterSpacing="0.5"
      >
        ICA
      </text>
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fill="white"
        fontFamily="Lato, sans-serif"
        fontWeight="700"
        fontSize="8"
        letterSpacing="1.4"
      >
        CON
      </text>
      <circle cx="32" cy="54" r="2.2" fill="#e8d48b" />
    </svg>
  )
}
