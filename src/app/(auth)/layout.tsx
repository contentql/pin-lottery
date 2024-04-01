import { getMeUser } from '@/utils/get-me-user'
import AuthLayoutView from '@/views/AuthLayoutView'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  await getMeUser({ validUserRedirect: '/' })

  return (
    <div>
      <AuthLayoutView />
      {children}
    </div>
  )
}

export default AuthLayout
