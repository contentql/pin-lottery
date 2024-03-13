import AuthLayoutView from '@/views/AuthLayoutView'
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AuthLayoutView/>
      {children}
    </div>
  )
}

export default AuthLayout
