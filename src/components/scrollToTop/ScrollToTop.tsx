import Link from 'next/link'
import { useEffect, useRef } from 'react'

const ScrollToTop = () => {
  const scrollTop = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    })
  })

  useEffect(() => {
    window.addEventListener('scroll', e => {
      if (scrollTop.current && window.scrollY > 200) {
        scrollTop.current.style.display = 'inline-block'
        scrollTop.current.style.bottom = '30px'
        scrollTop.current.style.transform = 'translateY(0%)'
      } else if (scrollTop.current) {
        scrollTop.current.style.display = 'none'
      }
    })
  }, [])

  return (
    <Link href='#gotoTop' className='scroll-to-top' ref={scrollTop}>
      <span className='scroll-icon'>
        <i className='las la-arrow-up'></i>
      </span>
    </Link>
  )
}

export default ScrollToTop
