export type Artist = {
  name: string
  role: string
  ig: string
  styles: string
  bio: string
  whatsapp: string | null
}

export const artists: Artist[] = [
  {
    name: 'César',
    role: 'Owner · Resident Artist',
    ig: '@cesarxsepulveda',
    styles: 'Neo-gothic · Anime · Fine line · Mixed technique',
    bio: 'Born in Mexico City, tattooist for 10+ years. Travelled the world working in the best studios and attending conventions across the globe.',
    whatsapp: 'https://wa.me/521XXXXXXXXXX',
  },
  {
    name: 'Meri',
    role: 'Resident Artist',
    ig: '@merizoldyck',
    styles: 'Anime · Precision · Fine detail',
    bio: 'Born in Puebla, 5 years of experience. Anime style specialist that reflects sensitivity and passion. Exhibited in CDMX, Zacatecas and Guadalajara.',
    whatsapp: null,
  },
  {
    name: 'Morgana Andre',
    role: 'Resident Artist',
    ig: 'morgana.andre',
    styles: 'Botany · Insects · Personal style',
    bio: 'Originally from Mexico City, 3 years of experience. Focused on developing a personal style influenced by botany and committed to technical refinement.',
    whatsapp: null,
  },
]
