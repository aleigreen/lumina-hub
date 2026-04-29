import type { Locale } from './translations'

export type FAQ = {
  q: Record<Locale, string>
  a: Record<Locale, string>
}

export const faqs: FAQ[] = [
  {
    q: {
      en: 'How can I book an appointment?',
      es: '¿Cómo puedo agendar una cita?',
    },
    a: {
      en: "Select the artist you'd like to work with and fill out the quote form below, or reach out to the artist directly through their social media channels.",
      es: 'Selecciona el artista con quien quieres trabajar y llena el formulario de cotización más abajo, o contáctalo directamente a través de sus redes sociales.',
    },
  },
  {
    q: {
      en: 'How long does it take to get a response?',
      es: '¿Cuánto tiempo tardan en responder?',
    },
    a: {
      en: 'We guarantee a response to every submission. Our typical response time is 3–5 days depending on the current volume of requests.',
      es: 'Respondemos a todas las solicitudes. Nuestro tiempo de respuesta habitual es de 3 a 5 días dependiendo del volumen actual de peticiones.',
    },
  },
  {
    q: {
      en: 'What happens to my deposit if I need to cancel?',
      es: '¿Qué pasa con mi depósito si necesito cancelar?',
    },
    a: {
      en: 'A non-refundable deposit is required to secure your appointment. It will be deducted from the total cost. Rescheduling with 6+ hours notice keeps your deposit valid.',
      es: 'Se requiere un depósito no reembolsable para confirmar tu cita. Se descontará del costo total. Si reagendas con al menos 6 horas de anticipación, tu depósito sigue siendo válido.',
    },
  },
  {
    q: {
      en: 'Will my tattoo need a touch-up?',
      es: '¿Mi tatuaje va a necesitar retoque?',
    },
    a: {
      en: "Sometimes tattoos need a little TLC after the initial session. We're happy to provide touch-ups free of charge as long as aftercare instructions were followed.",
      es: 'A veces los tatuajes necesitan un pequeño retoque después de la sesión inicial. Con gusto lo hacemos sin costo adicional, siempre que se hayan seguido las instrucciones de cuidado.',
    },
  },
]
