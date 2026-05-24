const CHIP_H = 20

const badges = [
  {
    name: 'Visa',
    svg: (
      <svg viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg" height={CHIP_H} width="60">
        <path d="M18.72 1.44L15.6 14.56H12.48L15.6 1.44H18.72Z" fill="#1A1F71"/>
        <path d="M30.24 1.76C29.6 1.52 28.64 1.28 27.44 1.28C24.24 1.28 21.92 2.96 21.92 5.44C21.92 7.28 23.6 8.24 24.88 8.8C26.16 9.36 26.56 9.76 26.56 10.32C26.56 11.2 25.44 11.6 24.4 11.6C22.96 11.6 22.24 11.36 21.04 10.8L20.56 10.56L20.08 13.36C20.88 13.68 22.32 14 23.84 14C27.28 14 29.52 12.32 29.52 9.68C29.52 8.24 28.64 7.12 26.72 6.24C25.6 5.68 24.88 5.36 24.88 4.72C24.88 4.16 25.52 3.6 26.96 3.6C28.16 3.52 29.04 3.84 29.76 4.08L30.08 4.24L30.56 1.52L30.24 1.76Z" fill="#1A1F71"/>
        <path d="M34.72 9.52C34.96 8.88 35.92 6.4 35.92 6.4C35.92 6.4 36.16 5.76 36.32 5.36L36.56 6.24C36.56 6.24 37.2 9.2 37.36 9.52H34.72ZM38.24 1.44H35.76C35.04 1.44 34.48 1.68 34.16 2.4L29.36 14.56H32.8L33.52 12.48H37.68L38.08 14.56H41.12L38.24 1.44Z" fill="#1A1F71"/>
        <path d="M11.76 1.44L8.56 10.24L8.24 8.64C7.6 6.64 5.76 4.48 3.68 3.36L6.64 14.56H10.08L15.2 1.44H11.76Z" fill="#1A1F71"/>
        <path d="M5.6 1.44H0.08L0 1.76C4.24 2.88 7.12 5.44 8.24 8.64L7.04 2.4C6.88 1.68 6.32 1.44 5.6 1.44Z" fill="#F9A51A"/>
      </svg>
    ),
  },
  {
    name: 'Mastercard',
    svg: (
      <svg viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" height={CHIP_H} width="32">
        <circle cx="15" cy="12" r="7" fill="#EB001B"/>
        <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
        <path d="M19 6.8C20.5 7.9 21.5 9.8 21.5 12C21.5 14.2 20.5 16.1 19 17.2C17.5 16.1 16.5 14.2 16.5 12C16.5 9.8 17.5 7.9 19 6.8Z" fill="#FF5F00"/>
      </svg>
    ),
  },
  {
    name: 'PayPal',
    svg: (
      <svg viewBox="0 0 52 16" fill="none" xmlns="http://www.w3.org/2000/svg" height={CHIP_H} width="52">
        <text x="4" y="13" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="13" fill="#003087">Pay</text>
        <text x="28" y="13" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="13" fill="#009CDE">Pal</text>
      </svg>
    ),
  },
  {
    name: 'OXXO',
    svg: (
      <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" height={CHIP_H} width="52">
        <text x="50%" y="15" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="14" fill="#DA1F26" letterSpacing="1">OXXO</text>
      </svg>
    ),
  },
  {
    name: 'Mercado Pago',
    svg: (
      <svg viewBox="0 0 110 20" fill="none" xmlns="http://www.w3.org/2000/svg" height={CHIP_H} width="88">
        <text x="50%" y="15" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill="#009EE3" letterSpacing="0.3">Mercado Pago</text>
      </svg>
    ),
  },
  {
    name: 'SPEI',
    svg: (
      <svg viewBox="0 0 52 20" fill="none" xmlns="http://www.w3.org/2000/svg" height={CHIP_H} width="44">
        <text x="50%" y="15" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#006847" letterSpacing="1">SPEI</text>
      </svg>
    ),
  },
  {
    name: 'Efectivo',
    svg: (
      <svg viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" height={CHIP_H} width="32">
        <rect x="1" y="3" width="30" height="14" rx="2" stroke="#2a7a3b" strokeWidth="1.5"/>
        <circle cx="16" cy="10" r="4" stroke="#2a7a3b" strokeWidth="1.5"/>
        <circle cx="16" cy="10" r="1.5" fill="#2a7a3b"/>
        <rect x="4" y="6" width="2" height="2" rx="0.5" fill="#2a7a3b"/>
        <rect x="26" y="12" width="2" height="2" rx="0.5" fill="#2a7a3b"/>
      </svg>
    ),
  },
]

export default function PaymentBadges({ label }: { label: string }) {
  return (
    <div>
      <div className="ls-section-label" style={{ marginBottom: '12px' }}>{label}</div>
      <div className="ls-payments">
        {badges.map(({ name, svg }) => (
          <div key={name} className="ls-payment-chip" title={name}>
            {svg}
          </div>
        ))}
      </div>
    </div>
  )
}
