export type FAQ = {
  q: string
  a: string
}

export const faqs: FAQ[] = [
  {
    q: 'How can I book an appointment?',
    a: "Select the artist you'd like to work with and fill out the quote form below, or reach out to the artist directly through their social media channels.",
  },
  {
    q: 'How long does it take to get a response?',
    a: 'We guarantee a response to every submission. Our typical response time is 3–5 days depending on the current volume of requests.',
  },
  {
    q: 'What happens to my deposit if I need to cancel?',
    a: "A non-refundable deposit is required to secure your appointment. It will be deducted from the total cost. Rescheduling with 6+ hours notice keeps your deposit valid.",
  },
  {
    q: 'Will my tattoo need a touch-up?',
    a: "Sometimes tattoos need a little TLC after the initial session. We're happy to provide touch-ups free of charge as long as aftercare instructions were followed.",
  },
]
