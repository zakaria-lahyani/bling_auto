import { Metadata } from 'next'
import LandingPage from '@views/marketing/LandingPage'
import PublicLayout from '@layouts/PublicLayout'

export const metadata: Metadata = {
  title: 'CarWash Pro - Professional Car Wash Services',
  description: 'Premium car wash services that come to you. Book online, same-day service available.',
}

export default function HomePage() {
  return (
    <PublicLayout>
      <LandingPage />
    </PublicLayout>
  )
}