'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaRegHeart,
  FaTwitter,
} from 'react-icons/fa'
import { GrTransaction } from 'react-icons/gr'
import { LiaTicketAltSolid } from 'react-icons/lia'
import { LuUser2 } from 'react-icons/lu'
import { RxExit } from 'react-icons/rx'
import { toast } from 'react-toastify'
import DepositAmount from '../user-transaction/DepositAmount'
import WithdrawAmount from '../user-transaction/WithdrawAmount'
import tag from '/public/images/icon/btn/tag.png'

import { Header, Media } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { logout } from '@/queries/auth/logout'
import { ticketsMetadata } from '@/utils/tickets-metadata'

import { trpc } from '@/trpc/client'
import Cart from './Cart'

const HeaderPage = ({header}:{header:Header}) => {
  const { data: headerData=header} = trpc.public.getHeader.useQuery()
  const [open, setOpen] = useState('')
  const [windowHeight, setWindowHeight] = useState(0)
  const [show, setShow] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)
  const [isPopup, setIsPopup] = useState(false)
  const pathname = usePathname()

  const { status, user, fetchMe } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const togglePopup = () => {
    setPopupVisible(!popupVisible)
    if (isPopup) {
      setIsPopup(!isPopup)
    }
  }

  const togglePopupWallet = () => {
    setIsPopup(!isPopup)

    if (popupVisible) {
      setPopupVisible(!popupVisible)
    }
  }

  // const handleOpen = (e: any) => {
  //   if (open !== e.target.text) {
  //     setOpen(e.target.text)
  //   } else {
  //     setOpen('')
  //   }
  // }

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
      fetchMe()
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
    localStorage.setItem('prevRoute', pathname)
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
      <div className='header__top'>
        <div className='container'>
          <div className='header-wrapper'>
            <div className='left-side-header'>
              <div className='left d-flex align-items-center'>
                <ul className='social-links align-items-center'>
                  <li>Follow Us :</li>
                  <li>
                    <Link href='/#'>
                      <FaFacebookF />
                    </Link>
                  </li>
                  <li>
                    <Link href='/#'>
                      <FaTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link href='/#'>
                      <FaLinkedinIn />
                    </Link>
                  </li>
                  <li>
                    <Link href='/#'>
                      <FaInstagram />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className='header-right-side'>
                <div className='navbar navbar-expand-xl p-0 align-items-center'>
                  {' '}
                  {status === 'loggedIn' ? (
                    <div className='cart-wallet-flex'>
                      {/* <div className='mr-20 mt-6'>
                        <DepositAmount />
                      </div>
                      <div className='mr-20 mt-6'>
                        {' '}
                        <WithdrawAmount />
                      </div> */}
                      <a
                        href={isPopup ? '#popup' : '#'}
                        onClick={togglePopupWallet}>
                        <span className='wallet-amount'>
                          {ticketsMetadata?.currency} {user?.amount}
                        </span>
                      </a>
                      <div style={{ position: 'relative' }}>
                        <div id='popup'>
                          {/* <a id='close' href='#'>
                          X
                        </a> */}
                          <div id='popup-arrow'></div>
                          <DepositAmount />
                          <WithdrawAmount />
                        </div>
                      </div>
                      <Cart />
                      <div>
                        <Link
                          href=''
                          className='user-button'
                          onClick={togglePopup}
                          style={{
                            backgroundImage: `url(${user?.image !== undefined ? (user?.image as Media)?.sizes?.navUserImage?.url : '/images/user/pp.png'})`,
                          }}>
                          {popupVisible && (
                            <div className='popup'>
                              <div className='popup-arrow'></div>
                              <Link
                                href='/user-info'
                                className='popup-btn user-profile'>
                                <button
                                  className='nav-user-profile'
                                  style={{
                                    backgroundImage: `url(${user?.image !== undefined ? (user?.image as Media)?.sizes?.navUserImage?.url : '/images/user/pp.png'})`,
                                  }}></button>
                                <h6>{user?.user_name}</h6>
                              </Link>
                              <div className='divider'></div>
                              <Link
                                href='/user-info'
                                className='popup-btn list-nav'>
                                <span>
                                  <LuUser2 size={24} color='white' />
                                </span>
                                <p>Personal Info</p>
                              </Link>
                              <Link href='/user' className='popup-btn list-nav'>
                                <span>
                                  <LiaTicketAltSolid size={24} color='white' />
                                </span>
                                <p>My Tickets</p>
                              </Link>
                              <Link
                                href='/user-transaction'
                                className='popup-btn list-nav'>
                                <span>
                                  <GrTransaction size={24} color='white' />
                                </span>
                                <p>Transactions</p>
                              </Link>
                              <Link
                                href='/user-lottery'
                                className='popup-btn list-nav'>
                                <span>
                                  <FaRegHeart size={24} color='white' />
                                </span>
                                <p>Wishlist</p>
                              </Link>
                              <div className='divider'></div>
                              <button
                                onClick={handleLogout}
                                className='popup-btn list-nav'>
                                <RxExit size={24} color='white' />
                                <p> Logout</p>
                              </button>
                            </div>
                          )}
                        </Link>
                        {/* <div className='user-profile-link'>
                          <Link
                            href='/user-info'
                            className='cmn-btn style--three btn--sm'>
                            <span className='react-icon-profile'>
                              <LuUser2 size={18} color='white' />
                            </span>
                            Profile Info
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Link
                        href='/login'
                        className='cmn-btn style--three btn--sm'
                        onClick={() => {
                          localStorage.setItem('prevRoute', pathname)
                        }}>
                        Login
                      </Link>
                      <Link
                        href='/register'
                        className='cmn-btn style--three btn--sm ml-20'>
                        Register
                      </Link>
                    </div>
                  )}
                </div>
                {/* <div className="product__cart">
                  <span className="total__amount">0.00</span>
                  <Link href="/cart" className="amount__btn">
                    <i className="las la-shopping-basket"></i>
                    <span className="cart__num">{10}</span>
                  </Link>
                </div> */}
                {/* <a
                  href="#0"
                  className="user__btn d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  <i className="las la-user"></i>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='header__bottom'>
        <div className='container'>
          <nav className='navbar navbar-expand-xl p-0 align-items-center'>
            <Link href='/' className='site-logo site-title'>
              <Image
                src={(headerData?.icon as Media)?.sizes?.navLogo?.url!}
                priority={true}
                alt='logo'
                width={(headerData?.icon as Media)?.sizes?.navLogo?.width!}
                height={(headerData?.icon as Media)?.sizes?.navLogo?.height!}
              />
              <span className='logo-icon'>
                <i className='flaticon-fire'></i>
              </span>
            </Link>
            
          
                <Link className="glow-on-hover play-button"  href='/contest'> <Image src={tag} alt='icon' className='me-1' /> Play Now</Link>

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
               {headerData?.nav_links?.map((navItem,index)=>(
                 <li key={index}>
                 <Link href={navItem?.link! } onClick={() => setShow(false)}>
                  {navItem?.name}
                 </Link>
               </li>
               ))}
                {/* <li>
                  <Link href='/winner' onClick={() => setShow(false)}>
                    Winners
                  </Link>
                </li> */}
                {/* <li>
                  <Link href='/about' onClick={() => setShow(false)}>
                    About us
                  </Link>
                </li>
                <li>
                  <Link href='/contact' onClick={() => setShow(false)}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href='/blog' onClick={() => setShow(false)}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href='/how-work' onClick={() => setShow(false)}>
                    How to use
                  </Link>
                </li> */}
              </ul>
              <div className='nav-right'>
              <Link className="glow-on-hover"  href='/contest'> <Image src={tag} alt='icon' className='me-1' /> Play Now</Link>

                {/* <div className='right'>
                  {status === 'loggedIn' && (
                    <>
                      <Link
                        href=''
                        className='user__btn'
                        onClick={togglePopup}
                        style={{
                          backgroundImage: `url(${user?.image !== undefined ? (user?.image as Media)?.sizes?.navUserImage?.url : '/images/user/pp.png'})`,
                        }}>
                        {popupVisible && (
                          <div className='popup'>
                            <div className='popup-arrow'></div>
                            <Link
                              href='/user-info'
                              className='popup-btn user-profile'>
                              <button
                                className='nav-user-profile'
                                style={{
                                  backgroundImage: `url(${user?.image !== undefined ? (user?.image as Media)?.sizes?.navUserImage?.url : '/images/user/pp.png'})`,
                                }}></button>
                              <h6>{user?.user_name}</h6>
                            </Link>
                            <div className='divider'></div>
                            <Link
                              href='/user-info'
                              className='popup-btn list-nav'>
                              <span>
                                <LuUser2 size={24} color='white' />
                              </span>
                              <p>Personal Info</p>
                            </Link>
                            <Link href='/user' className='popup-btn list-nav'>
                              <span>
                                <LiaTicketAltSolid size={24} color='white' />
                              </span>
                              <p>My Tickets</p>
                            </Link>
                            <Link
                              href='/user-transaction'
                              className='popup-btn list-nav'>
                              <span>
                                <GrTransaction size={24} color='white' />
                              </span>
                              <p>Transactions</p>
                            </Link>
                            <Link
                              href='/user-lottery'
                              className='popup-btn list-nav'>
                              <span>
                                <FaRegHeart size={24} color='white' />
                              </span>
                              <p>Wishlist</p>
                            </Link>
                            <div className='divider'></div>
                            <button
                              onClick={handleLogout}
                              className='popup-btn list-nav'>
                              <RxExit size={24} color='white' />
                              <p> Logout</p>
                            </button>
                          </div>
                        )}
                      </Link>
                      <div className='user-profile-link'>
                        <Link
                          href='/user-info'
                          className='cmn-btn style--three btn--sm'>
                          <span className='react-icon-profile'>
                            <LuUser2 size={18} color='white' />
                          </span>
                          Profile Info
                        </Link>
                      </div>
                    </>
                  )}
                </div> */}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default HeaderPage
