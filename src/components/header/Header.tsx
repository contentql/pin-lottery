import { trpc } from '@/trpc/client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import tag from '/public/images/icon/btn/tag.png'

import { Media } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { logout } from '@/queries/auth/logout'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Header = () => {
  const [open, setOpen] = useState('')
  const [windowHeight, setWindowHeight] = useState(0)
  const [show, setShow] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)
  const router = useRouter()

  const togglePopup = () => {
    setPopupVisible(!popupVisible)
  }

  const { data: cartData } = trpc.cart.getCartTickets.useQuery()

  const { status, user } = useAuth()
  const handleOpen = (e: any) => {
    if (open !== e.target.text) {
      setOpen(e.target.text)
    } else {
      setOpen('')
    }
  }

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY
      setWindowHeight(height)
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

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0)
    }
    window.addEventListener('scroll', navBarTop)
    return () => {
      window.removeEventListener('scroll', navBarTop)
    }
  }, [])

  return (
    <header
      id='gotoTop'
      className={`header ${
        windowHeight > 50 && 'menu-fixed animated fadeInDown'
      }`}>
      <div className='header__bottom'>
        <div className='container'>
          <nav className='navbar navbar-expand-xl p-0 align-items-center'>
            <Link href='/' className='site-logo site-title'>
              <Image
                src='/images/client/3.png'
                priority={true}
                alt='logo'
                width={200}
                height={20}
              />
              <span className='logo-icon'>
                <i className='flaticon-fire'></i>
              </span>
            </Link>
            <button
              className='navbar-toggler ms-auto'
              type='button'
              onClick={() => setShow(!show)}
              //data-bs-toggle="collapse"
              // data-bs-target="#navbarContent"
              // aria-controls="navbarContent"
              //aria-expanded="false"
              //aria-label="Toggle navigation"
            >
              <span className='menu-toggle'></span>
            </button>
            <div
              className={`collapse navbar-collapse ${show && 'show'}`}
              // id="navbarContent"
            >
              <ul className='navbar-nav main-menu ms-auto'>
                <li>
                  <Link href='/contest' onClick={() => setShow(false)}>
                    Contest
                  </Link>
                </li>
                <li>
                  <Link href='/winner' onClick={() => setShow(false)}>
                    Winners
                  </Link>
                </li>
                <li>
                  <Link href='/contact' onClick={() => setShow(false)}>
                    contact
                  </Link>
                </li>
                <li>
                  <Link href='/how-work' onClick={() => setShow(false)}>
                    how to use
                  </Link>
                </li>
              </ul>
              <div className='nav-right'>
                <Link href='/contest' className='cmn-btn style--three btn--sm'>
                  <Image src={tag} alt='icon' className='me-1' /> Buy Tickets
                </Link>

                <div className='right'>
                  {status === 'loggedIn' && (
                    <div className='product__cart'>
                      <Link href='/cart' className='amount__btn'>
                        <i className='las la-shopping-basket'></i>
                        <span className='cart__num'>{cartData?.length}</span>
                      </Link>
                    </div>
                  )}
                  {status === 'loggedIn' ? (
                    <Link
                      href=''
                      className='user__btn d-flex align-items-center justify-content-center'
                      onClick={togglePopup}
                      style={{
                        backgroundImage: `url(${user?.image !== undefined ? (user?.image as Media)?.sizes?.navUserImage?.url : '/images/user/pp.png'})`,
                      }}>
                      {popupVisible && (
                        <div className='popup'>
                          <div className='popup-arrow'></div>
                          {/* <div className='popup-btn user-profile'>
                            <button
                              className='user__btn d-flex align-items-center justify-content-center'
                              onClick={togglePopup}
                              style={{
                                backgroundImage: `url(${user?.image !== undefined ? (user?.image as Media)?.sizes?.navUserImage?.url : '/images/user/pp.png'})`,
                              }}></button>
                            <p>Text for showing</p>
                          </div> */}
                          <Link href='/user-info' className='popup-btn'>
                            Personal Info
                          </Link>
                          <Link href='/user' className='popup-btn'>
                            My Tickets
                          </Link>
                          <Link href='/user-transaction' className='popup-btn'>
                            Transactions
                          </Link>
                          <button onClick={handleLogout} className='popup-btn'>
                            Logout
                          </button>
                        </div>
                      )}
                    </Link>
                  ) : (
                    <Link href='/login' className='login-btn btn--sm'>
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
