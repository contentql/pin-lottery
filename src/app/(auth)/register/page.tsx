import { Metadata } from 'next'

import RegisterView from '@/views/auth/RegisterView'

export const metadata: Metadata = {
  title: 'Register',
  description: 'This is a register page',
}

const Register = () => {
  return <RegisterView />
}

export default Register
