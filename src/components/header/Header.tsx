import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import cartData from '../../data/cartData';
import tag from '/public/images/icon/btn/tag.png';
import logo from '/public/images/logo.png';

const Header = () => {
  const [open, setOpen] = useState('');
  const [windowHeight, setWindowHeight] = useState(0);
  const [show, setShow] = useState(false);

  const handleOpen = (e) => {
    if (open !== e.target.text) {
      setOpen(e.target.text);
    } else {
      setOpen('');
    }
  };

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    window.addEventListener('scroll', navBarTop);
    return () => {
      window.removeEventListener('scroll', navBarTop);
    };
  }, []);

  return (
    <header
      id='gotoTop'
      className={`header ${
        windowHeight > 50 && 'menu-fixed animated fadeInDown'
      }`}
    >
      <div className='header__top'>
        <div className='container'>
          <div className='row align-items-center gap-2 gap-md-0'>
            <div className='col-sm-6'>
              <div className='left d-flex align-items-center'>
                <a
                  href='tel:65655655'
                  className='d-flex align-items-center gap-1'
                >
                  <i className='las la-phone-volume'></i>
                  Customer Support
                </a>
                <div className='language'>
                  <i className='las la-globe-europe'></i>
                  <div className='select'>
                    <select className='border-0'>
                      <option>En</option>
                      <option>Rus</option>
                      <option>Bn</option>
                      <option>Hp</option>
                      <option>Frn</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='right'>
                <div className='product__cart'>
                  <span className='total__amount'>0.00</span>
                  <Link href='/cart' className='amount__btn'>
                    <i className='las la-shopping-basket'></i>
                    <span className='cart__num'>{cartData.length}</span>
                  </Link>
                </div>
                <a
                  href='#0'
                  className='user__btn d-flex align-items-center justify-content-center'
                  data-bs-toggle='modal'
                  data-bs-target='#loginModal'
                >
                  <i className='las la-user'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='header__bottom'>
        <div className='container'>
          <nav className='navbar navbar-expand-xl p-0 align-items-center'>
            <Link href='/' className='site-logo site-title'>
              <Image src={logo} alt='logo' />
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
                <li
                  className={`menu_has_children ${
                    open === 'Home' ? 'open' : ''
                  }`}
                >
                  <Link href='/#' onClick={(e) => handleOpen(e)}>
                    Home
                  </Link>
                  <ul className='sub-menu'>
                    {[
                      ['Home One', '/'],
                      ['Home Two', '/index-two'],
                      ['Home Three', '/index-three'],
                      ['Home Four', '/index-four'],
                    ].map(([itm, url], i) => (
                      <li key={i}>
                        <Link href={url} onClick={() => setShow(false)}>
                          {itm}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li
                  className={`menu_has_children ${
                    open === 'Contest' ? 'open' : ''
                  }`}
                >
                  <Link href='/#' onClick={(e) => handleOpen(e)}>
                    Contest
                  </Link>
                  <ul className='sub-menu'>
                    {[
                      ['All contest', '/contest'],
                      ['Contest Details One', '/contest-details-one'],
                      [' Contest Details Two', '/contest-details-two'],
                      ['Lottery Details One', '/lottery-details'],
                      [' Lottery Details Two', '/lottery-details-two'],
                    ].map(([itm, url], i) => (
                      <li key={i}>
                        <Link href={url} onClick={() => setShow(false)}>
                          {itm}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link href='/winner' onClick={() => setShow(false)}>
                    Winners
                  </Link>
                </li>
                <li
                  className={`menu_has_children ${
                    open === 'pages' ? 'open' : ''
                  }`}
                >
                  <Link href='#0' onClick={(e) => handleOpen(e)}>
                    pages
                  </Link>
                  <ul className='sub-menu'>
                    {[
                      ['About Us', '/about'],
                      ['Affiliate Page', '/affiliate'],
                      ['How it works', '/how-work'],
                      ['User Panel', '/user'],
                      ['Blog Single', '/blog-single'],
                      ['Cart Page', '/cart'],
                      ['Checkout Page', '/checkout'],
                      ['FAQ Page', '/faq'],
                      ['404 Page', '/404'],
                    ].map(([itm, url], i) => (
                      <li key={i}>
                        <Link href={url} onClick={() => setShow(false)}>
                          {itm}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link href='/contact' onClick={() => setShow(false)}>
                    contact
                  </Link>
                </li>
              </ul>
              <div className='nav-right'>
                <Link href='/contest' className='cmn-btn style--three btn--sm'>
                  <Image src={tag} alt='icon' className='me-1' /> Buy Tickets
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
