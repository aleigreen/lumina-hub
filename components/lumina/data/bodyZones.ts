export type BodyZone = {
  id: string
  label: string
  sizes: string[]
}

export const bodyZones: BodyZone[] = [
  { id: 'wrist', label: 'Wrist', sizes: ['2×2 cm', '3×3 cm', '4×4 cm'] },
  { id: 'ankle', label: 'Ankle', sizes: ['2×2 cm', '3×3 cm', '5×5 cm'] },
  { id: 'forearm', label: 'Forearm', sizes: ['5×5 cm', '8×8 cm', '10×15 cm', '15×20 cm'] },
  { id: 'upper-arm', label: 'Upper arm', sizes: ['5×5 cm', '8×8 cm', '10×15 cm', '15×20 cm'] },
  { id: 'shoulder', label: 'Shoulder', sizes: ['8×8 cm', '10×10 cm', '15×15 cm', '20×20 cm'] },
  { id: 'chest', label: 'Chest', sizes: ['8×8 cm', '12×12 cm', '15×20 cm', '20×25 cm'] },
  { id: 'ribs', label: 'Ribs', sizes: ['8×10 cm', '12×15 cm', '15×20 cm', '20×30 cm'] },
  { id: 'back', label: 'Back', sizes: ['10×10 cm', '15×15 cm', '20×20 cm', '30×40 cm', 'Full back'] },
  { id: 'hand', label: 'Hand', sizes: ['3×3 cm', '5×5 cm', '7×7 cm'] },
  { id: 'thigh', label: 'Thigh', sizes: ['8×8 cm', '12×12 cm', '15×20 cm', '20×25 cm'] },
  { id: 'calf', label: 'Calf', sizes: ['5×5 cm', '8×10 cm', '12×15 cm', '15×20 cm'] },
  { id: 'neck', label: 'Neck', sizes: ['3×3 cm', '4×6 cm', '6×8 cm'] },
]
