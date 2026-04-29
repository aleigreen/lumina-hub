const paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'OXXO', 'Mercado Pago', 'SPEI']

export default function PaymentBadges() {
  return (
    <div>
      <div className="ls-section-label" style={{ marginBottom: '12px' }}>We accept</div>
      <div className="ls-payments">
        {paymentMethods.map(m => (
          <span key={m} className="ls-payment-chip">{m}</span>
        ))}
      </div>
    </div>
  )
}
