import Link from 'next/link'
import { BsChevronLeft } from 'react-icons/bs'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Link href='/' className='cmn-back-btn'>
        <BsChevronLeft className='icon' />
        Back to home
      </Link>

      {children}
    </div>
  )
}

export default AuthLayout
