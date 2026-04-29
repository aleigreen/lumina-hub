export const brands = {
  lumina: {
    name: 'Lumina Sanctum',
    domain: 'luminasanctum.mx',
    description: 'Tattoo Studio · CDMX',
  },
  velvetal: {
    name: 'Velvetal',
    domain: 'velvetal.mx',
    description: 'Ropa · Servicios · Insumos',
  },
  cxs: {
    name: 'cxs',
    domain: 'cxs.mx',
    description: 'Arte · Merch · Ilustración',
  },
} as const

export type BrandId = keyof typeof brands