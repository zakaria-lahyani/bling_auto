import { Metadata } from 'next'
import ContactPage from '@/views/marketing/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us - Bling Auto',
  description: 'Get in touch with Bling Auto. Multiple ways to connect - phone, email, or send us a message. We respond within 2 hours.',
  keywords: 'contact, bling auto, car care, auto detailing, customer service',
}

export default function Contact() {
  return <ContactPage />
}