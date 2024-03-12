import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaArrowRightLong } from 'react-icons/fa6'
import { toast } from 'react-toastify'

import { useAuth } from '@/providers/Auth'

import { currentUser } from '@/queries/auth/currentUser'

import team_obj from '/public/images/elements/team-obj.png'

const LeftSideMenu = () => {
  const pathname = usePathname()

  const router = useRouter()

  const { logout } = useAuth()

  const { data: userData, isPending: isUserDataPending } = useQuery({
    queryKey: ['/api/users/me', 'get'],
    queryFn: async () => currentUser(),
    select: data => data.user,
  })

  const {
    isPending: isLogoutPending,
    variables: logoutVariables,
    mutate: logoutMutation,
  } = useMutation({
    mutationKey: ['/api/users/logout', 'post'],
    mutationFn: () => logout(),
    onSuccess: async () => {
      router.push('/login')
    },
    onError: async err => {
      if (err.message === 'CONFLICT') {
        toast.error('User not found.', {
          autoClose: 3000,
          onClose: () => {
            toast.info('Redirecting to login page...', {
              autoClose: 2000,
              onClose: () => router.push('/login'),
            })
          },
        })
      }

      console.error('Something went wrong. Please try again.')
    },
  })

  const handleLogout = () => {
    logoutMutation()
  }

  return (
    <div className='col-lg-4'>
      <div className='user-card'>
        <div className='avatar-upload'>
          <div className='obj-el'>
            <Image src={team_obj} alt='team obj' />
          </div>
          <div className='avatar-edit'>
            <input type='file' id='imageUpload' accept='.png, .jpg, .jpeg' />
            <label htmlFor='imageUpload'></label>
          </div>
          <div className='avatar-preview'>
            <div id='imagePreview'></div>
          </div>
        </div>
        <h3 className='user-card__name'>{userData?.user_name}</h3>
        <p className='user-card__id'>ID : {userData?.id}</p>
        <Link href='/user-info' className='complete-profile-button'>
          Complete Your Profile
          <FaArrowRightLong className='material-icons' />
        </Link>
      </div>

      <div className='user-action-card'>
        <ul className='user-action-list'>
          {[
            ['My Tickets', '/user'],
            ['Personal Information', '/user-info'],
            ['Transactions', '/user-transaction'],
            ['Referral Program', '/user-referral'],
            ['Favorite Lotteries', '/user-lottery'],
            ['Help Center', '/contact'],
          ].map(([item, url], i) => (
            <li key={item} className={`${pathname === url && 'active'} `}>
              <Link href={url}>
                {item}
                {i === 0 ? <span className='badge'>04</span> : ''}
              </Link>
            </li>
          ))}
          <li>
            <a href='#' onClick={handleLogout}>
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LeftSideMenu
