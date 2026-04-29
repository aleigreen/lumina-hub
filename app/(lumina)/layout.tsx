import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lumina Sanctum · Tattoo Studio CDMX',
  description: 'Arte permanente. Cada pieza, un ritual.',
}

export default function LuminaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}