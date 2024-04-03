import { useAuth } from '@/providers/Auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { toast } from 'react-toastify'

import { currentUser } from '@/queries/auth/currentUser'

import { trpc } from '@/trpc/client'
import uploadMedia from '@/utils/uploadMedia'
import team_obj from '/public/images/elements/team-obj.png'

const LeftSideMenu = () => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [userImage, setUserImage] = useState(null)

  const pathname = usePathname()

  const router = useRouter()

  const queryClient = useQueryClient()

  const { logout, setUser } = useAuth()

  const handleUpload = (event: any) => {
    setUserImage(event.target.files)
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        setUploadedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const { data: userData, isPending: isUserDataPending } = useQuery({
    queryKey: ['/api/users/me', 'get'],
    queryFn: async () => currentUser(),
    select: data => data.user,
  })

  const { mutate: uploadUserImage, isPending: isUserImagePending } =
    trpc.auth.updateUserImage.useMutation({
      onSuccess: async data => {
        toast.success(`Image updated successfully`)
        setUserImage(null)
        setUser(data?.data)
        setUploadedImage(null)
        console.log('data in use auth', data?.data)
        queryClient.invalidateQueries({ queryKey: ['/api/users/me', 'get'] })
      },
      onError: () => {
        toast.error(`unable to update image please try again`)
      },
    })

  const handleUpdateUserProfile = async () => {
    try {
      const doc = await uploadMedia(userImage)
      if (doc && doc.id) {
        uploadUserImage({ id: doc.id })
      } else {
        console.error(
          'Error: Unable to get document or document id is missing.',
        )
      }
    } catch (error) {
      console.error('Error uploading media:', error)
    }
  }

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
      <div className='card-sticky-pos'>
        <div className='user-card'>
          <div className='avatar-upload'>
            <div className='obj-el'>
              <Image src={team_obj} alt='team obj' />
            </div>
            <div className='avatar-edit'>
              <input type='file' id='imageUpload' onChange={handleUpload} />
              <label htmlFor='imageUpload'></label>
            </div>
            <div
              className='avatar-preview'
              style={{
                backgroundImage: `url(${uploadedImage ? uploadedImage : userData?.image !== undefined ? userData?.image?.sizes?.userProfile?.url : '/images/user/pp.png'})`,
              }}>
              <div id='imagePreview'></div>
            </div>
          </div>
          {userImage && (
            <button
              className='cmn-btn style--two d-flex align-items-center update-profile-image'
              type='button'
              disabled={isUserImagePending}
              onClick={() => handleUpdateUserProfile()}>
              Update Image
            </button>
          )}
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
                  {/* {i === 0 ? <span className='badge'>04</span> : ''} */}
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
    </div>
  )
}

export default LeftSideMenu
