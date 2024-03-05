'use client'

import ResetPassword from '@/components/auth/ResetPassword'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const ResetPasswordView = ({ searchParams }: PageProps) => {
  return <ResetPassword searchParams={searchParams} />
}

export default ResetPasswordView
