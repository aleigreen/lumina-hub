import { Bodoni_Moda, Cinzel, Inter, JetBrains_Mono, Newsreader, UnifrakturMaguntia } from 'next/font/google'

// Auto-hospedadas por next/font: sin petición a Google, sin salto de layout.
// Se exponen como variables CSS (--f-*) que usan los estilos de Lumina.
export const display = Bodoni_Moda({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--f-display', display: 'swap' })
// Párrafos: serif de lectura con tamaño óptico (Bodoni es de títulos; en tamaños de texto sus trazos finos se pierden).
export const body = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['opsz'], variable: '--f-body', display: 'swap' })
export const caps = Cinzel({ subsets: ['latin'], variable: '--f-caps', display: 'swap' })
export const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--f-mono', display: 'swap' })
export const sans = Inter({ subsets: ['latin'], variable: '--f-sans', display: 'swap' })
// Gótica: solo para palabras sueltas (nunca números, que se leen mal en esta letra).
export const blackletter = UnifrakturMaguntia({ subsets: ['latin'], weight: '400', variable: '--f-black', display: 'swap' })

export const fontVars = [display, body, caps, mono, sans, blackletter].map(f => f.variable).join(' ')
