import { Metadata } from 'next'

import ForgotPasswordView from '@/views/auth/ForgotPasswordView'

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'This is a forgot password page',
}

const Forgot = () => {
  return <ForgotPasswordView />
}

export default Forgot
