import Image from 'next/image'
import Slider from 'react-slick'

import { Contest, Media, Winner } from '@/payload-types'

const WinnerImageSlider = ({ winner }: { winner: Winner }) => {
  const settings = {
    autoplay: true,
    speed: 700,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // vertical: true,
    // verticalSwiping: true,
    // swipeToSlide: true,
    // draggable: true,
  }
  return (
    <div className='contest-cart__winner'>
      <Slider {...settings}>
        {(winner?.contest?.value as Contest)?.images?.map((itm, i) => (
          <Image
            className='winner-image-slider'
            key={i}
            src={(itm?.product_images as Media)?.url || '/'}
            width={150}
            height={10}
            alt='image'
          />
        ))}
      </Slider>
    </div>
  )
}

export default WinnerImageSlider
