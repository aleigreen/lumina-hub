import type { LucideProps } from 'lucide-react'

/**
 * Lucide (v1) ya no incluye logotipos de marcas. Este es el único ícono propio:
 * mismo trazo y API que Lucide para que conviva con el resto.
 */
export function InstagramIcon({ size = 24, strokeWidth = 1.5, className, ...rest }: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Quita la flecha de texto (→ ←) de una etiqueta, para usar un ícono en su lugar. */
export const stripArrow = (s: string) => s.replace(/\s*[→←]\s*/g, ' ').trim()
