import type { Locale } from './translations'

export type ArtistData = {
  name: string
  ig: string
  whatsapp: string | null
  role: Record<Locale, string>
  styles: Record<Locale, string>
  bio: Record<Locale, string>
}

export const artists: ArtistData[] = [
  {
    name: 'César',
    ig: '@cesarxsepulveda',
    whatsapp: 'https://wa.me/521XXXXXXXXXX',
    role: {
      en: 'Owner · Resident Artist',
      es: 'Dueño · Artista Residente',
    },
    styles: {
      en: 'Neo-gothic · Anime · Fine line · Mixed technique',
      es: 'Neo-gótico · Anime · Línea fina · Técnica mixta',
    },
    bio: {
      en: 'Born in Mexico City, tattooist for 10+ years. Travelled the world working in the best studios and attending conventions across the globe.',
      es: 'Originario de Ciudad de México, tatuador con más de 10 años de experiencia. Viajó por el mundo trabajando en los mejores estudios y asistiendo a convenciones internacionales.',
    },
  },
  {
    name: 'Meri',
    ig: '@merizoldyck',
    whatsapp: null,
    role: {
      en: 'Resident Artist',
      es: 'Artista Residente',
    },
    styles: {
      en: 'Anime · Precision · Fine detail',
      es: 'Anime · Precisión · Detalle fino',
    },
    bio: {
      en: 'Born in Puebla, 5 years of experience. Anime style specialist that reflects sensitivity and passion. Exhibited in CDMX, Zacatecas and Guadalajara.',
      es: 'Originaria de Puebla, 5 años de experiencia. Especialista en estilo anime que refleja sensibilidad y pasión. Ha exhibido en CDMX, Zacatecas y Guadalajara.',
    },
  },
  {
    name: 'Morgana Andre',
    ig: 'morgana.andre',
    whatsapp: null,
    role: {
      en: 'Resident Artist',
      es: 'Artista Residente',
    },
    styles: {
      en: 'Botany · Insects · Personal style',
      es: 'Botánica · Insectos · Estilo personal',
    },
    bio: {
      en: 'Originally from Mexico City, 3 years of experience. Focused on developing a personal style influenced by botany and committed to technical refinement.',
      es: 'Originaria de Ciudad de México, 3 años de experiencia. Enfocada en desarrollar un estilo personal influenciado por la botánica y comprometida con el refinamiento técnico.',
    },
  },
  {
    name: 'Connyyink',
    ig: '@connying',
    whatsapp: null,
    role: {
      en: 'Resident Artist',
      es: 'Artista Residente',
    },
    styles: {
      en: 'Realism · Micro-realism',
      es: 'Realismo · Microrealismo',
    },
    bio: {
      en: 'Realism and micro-realism specialist. Precision and detail in every piece.',
      es: 'Especialista en realismo y microrealismo. Precisión y detalle en cada pieza.',
    },
  },
]
