import LuminaHome from '../../components/lumina/LuminaHome'
import Script from 'next/script'

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    "name": "Lumina Sanctum",
    "description": "Estudio de tatuaje en la Colonia Condesa, Ciudad de México. Especialistas en neo-gótico, anime, fine line, blackwork y full color.",
    "url": "https://luminasanctum.com",
    "logo": "https://luminasanctum.com/lumina/logo.png",
    "image": "https://luminasanctum.com/lumina/og-image.jpg",
    "telephone": "+52-55-1457-3628",
    "email": "luminasanctum@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Zamora 165",
      "addressLocality": "Colonia Condesa",
      "addressRegion": "Cuauhtémoc, Ciudad de México",
      "postalCode": "06140",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.4122,
      "longitude": -99.1688
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "11:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "11:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/luminasanctum.tattoo"
    ],
    "priceRange": "$$",
    "currenciesAccepted": "MXN",
    "paymentAccepted": "Cash, Credit Card, Debit Card, SPEI, Mercado Pago",
    "areaServed": {
      "@type": "City",
      "name": "Ciudad de México"
    }
  }

  return (
    <>
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LuminaHome />
    </>
  )
}
