import { Metadata } from 'next'

import ResetPasswordView from '@/views/auth/ResetPasswordView'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'This is a reset password page',
}

const Reset = ({ searchParams }: PageProps) => {
  return <ResetPasswordView searchParams={searchParams} />
}

export default Reset
