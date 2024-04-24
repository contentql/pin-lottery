'use client'

import team_obj from '/public/images/elements/team-obj.png'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { ImSpinner } from 'react-icons/im'
import { toast } from 'react-toastify'

import { useAuth } from '@/providers/Auth'
import { currentUser } from '@/queries/auth/currentUser'
import { trpc } from '@/trpc/client'
import uploadMedia from '@/utils/uploadMedia'

const LeftSideMenu = () => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [userImage, setUserImage] = useState(null)

  const pathname = usePathname()

  const router = useRouter()

  const queryClient = useQueryClient()

  const {
    logout,
    setUser,
    totalUserFields,
    completedUserFields,
    isProfileCompleted,
  } = useAuth()

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

  if (isProfileCompleted) {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('complete-profile-redirect')
    ) {
      const route = localStorage.getItem('complete-profile-redirect')
      router.replace(route || '')
      toast.info(`please wait redirecting to cart`)
      localStorage.removeItem('complete-profile-redirect')
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
      queryClient.clear()
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
    // skipcq: JS-0415
    <div className='col-lg-4'>
      <div className='card-sticky-pos'>
        <div
          className={`user-card ${isProfileCompleted ? '' : 'profile-completetion-progress-bar'}`}
          style={
            {
              '--length': totalUserFields,
              '--i': completedUserFields,
            } as React.CSSProperties
          }>
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
              {isUserImagePending ? (
                <ImSpinner
                  size={22}
                  style={{
                    animation: 'rotateAnimation 2s linear infinite',
                  }}
                />
              ) : (
                'Update Image'
              )}
            </button>
          )}
          <h3 className='user-card__name'>{userData?.user_name}</h3>
          <p className='user-card__id'>ID : {userData?.id}</p>

          {!isProfileCompleted && (
            <Link href='/user-info' className='complete-profile-button'>
              Complete your profile ({completedUserFields}/{totalUserFields})
              <FaArrowRightLong className='material-icons' />
            </Link>
          )}
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
