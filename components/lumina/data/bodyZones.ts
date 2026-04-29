import type { Locale } from './translations'

export type BodyZone = {
  id: string
  label: Record<Locale, string>
  sizes: string[]
}

export const bodyZones: BodyZone[] = [
  { id: 'wrist',     label: { en: 'Wrist',     es: 'Muñeca'     }, sizes: ['2×2 cm', '3×3 cm', '4×4 cm'] },
  { id: 'ankle',     label: { en: 'Ankle',     es: 'Tobillo'    }, sizes: ['2×2 cm', '3×3 cm', '5×5 cm'] },
  { id: 'forearm',   label: { en: 'Forearm',   es: 'Antebrazo'  }, sizes: ['5×5 cm', '8×8 cm', '10×15 cm', '15×20 cm'] },
  { id: 'upper-arm', label: { en: 'Upper arm', es: 'Brazo'      }, sizes: ['5×5 cm', '8×8 cm', '10×15 cm', '15×20 cm'] },
  { id: 'shoulder',  label: { en: 'Shoulder',  es: 'Hombro'     }, sizes: ['8×8 cm', '10×10 cm', '15×15 cm', '20×20 cm'] },
  { id: 'chest',     label: { en: 'Chest',     es: 'Pecho'      }, sizes: ['8×8 cm', '12×12 cm', '15×20 cm', '20×25 cm'] },
  { id: 'ribs',      label: { en: 'Ribs',      es: 'Costillas'  }, sizes: ['8×10 cm', '12×15 cm', '15×20 cm', '20×30 cm'] },
  { id: 'back',      label: { en: 'Back',      es: 'Espalda'    }, sizes: ['10×10 cm', '15×15 cm', '20×20 cm', '30×40 cm', 'Full back'] },
  { id: 'hand',      label: { en: 'Hand',      es: 'Mano'       }, sizes: ['3×3 cm', '5×5 cm', '7×7 cm'] },
  { id: 'thigh',     label: { en: 'Thigh',     es: 'Muslo'      }, sizes: ['8×8 cm', '12×12 cm', '15×20 cm', '20×25 cm'] },
  { id: 'calf',      label: { en: 'Calf',      es: 'Pantorrilla'}, sizes: ['5×5 cm', '8×10 cm', '12×15 cm', '15×20 cm'] },
  { id: 'neck',      label: { en: 'Neck',      es: 'Cuello'     }, sizes: ['3×3 cm', '4×6 cm', '6×8 cm'] },
]
