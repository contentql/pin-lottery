import { Metadata } from 'next'

import LoginView from '@/views/auth/LoginView'

export const metadata: Metadata = {
  title: 'Login',
  description: 'This is a login page',
}

const Login = () => {
  return <LoginView />
}

export default Login
