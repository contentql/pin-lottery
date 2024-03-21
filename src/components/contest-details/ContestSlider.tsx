import { Contest, Media } from '@/payload-types'
import Image from 'next/image'
import { useState } from 'react'
import { FaRegEye } from 'react-icons/fa'

const GalleryComponent = ({ contestDetails }: { contestDetails: Contest }) => {
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0)
  const [activeThumbIndex, setActiveThumbIndex] = useState(0)
  const [lightboxVisible, setLightboxVisible] = useState(false)

  const handleThumbnailClick = (index: number) => {
    setActiveThumbnailIndex(index)
  }
  const openLightbox = () => {
    setLightboxVisible(true)
  }

  const closeLightbox = () => {
    setLightboxVisible(false)
  }
  const thumbList = contestDetails?.images?.map(
    img => (img?.product_images as Media).url,
  )

  const handleThumbClick = (index: any) => {
    setActiveThumbIndex(index)
  }
  // const thumbList = [
  //   'https://assets.codepen.io/162656/sports-car1.jpg',
  //   'https://assets.codepen.io/162656/sports-car2.jpg',
  //   'https://assets.codepen.io/162656/sports-car3.jpg',
  //   'https://assets.codepen.io/162656/sports-car4.jpg',
  // ]
  const handleLightboxControl = (direction: any) => {
    if (direction === 'prev') {
      setActiveThumbIndex(prevIndex =>
        prevIndex === 0 ? thumbList?.length! - 1 : prevIndex - 1,
      )
    } else {
      setActiveThumbIndex(prevIndex =>
        prevIndex === thumbList?.length! - 1 ? 0 : prevIndex + 1,
      )
    }
  }

  return (
    <div className='gallery-wrapper'>
      <ul className='thumb-list'>
        {thumbList?.length! <= 0 ? (
          <li className='is-active'>
            <Image
              width='1920'
              height='1280'
              src='/images/contest/6.png'
              alt=''
            />
          </li>
        ) : (
          thumbList?.map((ele, index) => (
            <li
              key={index}
              className={activeThumbnailIndex === index - 1 ? 'is-active' : ''}
              onClick={() => handleThumbnailClick(index - 1)}>
              <Image
                width='1920'
                height='1280'
                src={thumbList[index] || '/'}
                alt=''
              />
            </li>
          ))
        )}
      </ul>
      <ul className='featured-list'>
        {thumbList?.length! <= 0 ? (
          <li className='is-active'>
            <Image
              width='1920'
              height='1280'
              src='/images/contest/6.png'
              alt=''
            />
          </li>
        ) : (
          thumbList?.map((ele, index) => (
            <li
              key={index}
              className={activeThumbnailIndex === index - 1 ? 'is-active' : ''}>
              <div
                className='featured-img'
                style={{
                  backgroundImage: `url(${thumbList[index]})`,
                  width: '700px',
                  height: '700px',
                }}></div>
            </li>
          ))
        )}
      </ul>
      {/* <span className='notification'>Drag!</span> */}
      <button type='button' className='open-lightbox' onClick={openLightbox}>
        <FaRegEye size={24} />
      </button>
      {lightboxVisible && (
        <div className='lightbox is-visible'>
          <div className='lightbox-preview'>
            <div className='lightbox-dialog'>
              <section className='lightbox-content'>
                <div className='image-preview'>
                  <Image
                    src={thumbList![activeThumbIndex] || '/'}
                    alt=''
                    width='800'
                    height='500'
                  />
                  <header className='lightbox-header'>
                    {' '}
                    <button
                      type='button'
                      className='close-lightbox'
                      aria-label='Close lightbox'
                      onClick={closeLightbox}>
                      ✕
                    </button>
                  </header>
                </div>
                <button
                  type='button'
                  className='lightbox-control lightbox-control-prev'
                  aria-label='Previous slide'
                  onClick={() => handleLightboxControl('prev')}>
                  &lt;
                </button>
                <button
                  type='button'
                  className='lightbox-control lightbox-control-next'
                  aria-label='Next slide'
                  onClick={() => handleLightboxControl('next')}>
                  &gt;
                </button>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryComponent
