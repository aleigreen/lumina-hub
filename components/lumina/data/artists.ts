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
      en: 'Founder · Resident Artist',
      es: 'Fundador · Artista Residente',
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
    ig: '@morgana.andre',
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
    name: 'Connyink',
    ig: '@connyink',
    whatsapp: null,
    role: {
      en: 'Resident Artist',
      es: 'Artista Residente',
    },
    styles: {
      en: 'Full color · Realism · Micro-realism',
      es: 'Full color · Realismo · Microrealismo',
    },
    bio: {
      en: 'Tattoo artist from CDMX with 8 years of experience. Throughout her career she has developed a solid visual identity, characterized by attention to small details and focused on a full color, realistic aesthetic.',
      es: 'Tatuadora de CDMX con 8 años de experiencia. A lo largo de su trayectoria ha desarrollado una identidad visual sólida, caracterizada por la atención a los pequeños detalles, enfocada en una estética full color y realista.',
    },
  },
  {
    name: 'Danz',
    ig: '@danz.zo',
    whatsapp: null,
    role: {
      en: 'Resident Artist',
      es: 'Artista Residente',
    },
    styles: {
      en: 'Blackwork · Dark illustration · Gothic · Spooky cute · Horror · Emo',
      es: 'Blackwork · Ilustración oscura · Gótico · Spooky cute · Horror · Emo',
    },
    bio: {
      en: 'Our newest resident. Her signature: blackwork and dark illustration — gothic, spooky cute, and nods to horror and emo culture. The darker, the better.',
      es: 'Nuestra nueva residente. Su sello: blackwork e ilustración oscura — gótico, spooky cute y guiños al horror y la cultura emo. The darker, the better.',
    },
  },
]
