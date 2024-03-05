'use client'

import { useRouter } from 'next/navigation'

import VerificationFailed from '@/components/auth/verification-status/VerificationFailed'
import VerificationSuccess from '@/components/auth/verification-status/VerificationSuccess'
import VerificationLoading from '@/components/loading/VerificationLoading'

import { trpc } from '@/trpc/client'
import { toast } from 'react-toastify'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const EmailVerificationView = ({ searchParams }: PageProps) => {
  const router = useRouter()

  const token = searchParams.token as string
  const { isLoading, isError, isSuccess } = trpc.auth.verifyEmail.useQuery({
    token: token,
  })

  if (isSuccess) {
    toast.success(`Your email successfully verified`)
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }
  if (isError) {
    toast.error(`Failed to verify your email address`)
  }
  return (
    <div>
      {isLoading ? (
        <VerificationLoading />
      ) : isSuccess ? (
        <VerificationSuccess />
      ) : (
        <VerificationFailed />
      )}
    </div>
  )
}

export default EmailVerificationView
