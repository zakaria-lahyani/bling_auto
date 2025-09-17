import { Metadata } from 'next'
import AboutPage from '@/views/marketing/AboutPage'

export const metadata: Metadata = {
  title: 'About Us - Bling Auto',
  description: 'Learn about Bling Auto\'s mission, values, and commitment to providing exceptional automotive care services. Founded in 2020 with a passion for excellence.',
  keywords: 'about bling auto, car care company, automotive services, mobile car wash, company story, mission, values',
}

export default function About() {
  return <AboutPage />
}