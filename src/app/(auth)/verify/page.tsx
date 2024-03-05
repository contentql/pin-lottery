import { Metadata } from 'next'

import EmailVerificationView from '@/views/auth/EmailVerificationView'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export const metadata: Metadata = {
  title: 'Email verification',
  description: 'This is a verify page',
}

const VerifyEmail = ({ searchParams }: PageProps) => {
  console.log('token in any', searchParams)
  return <EmailVerificationView searchParams={searchParams} />
}

export default VerifyEmail
