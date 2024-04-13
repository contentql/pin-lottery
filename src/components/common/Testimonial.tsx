import round_shape from '/public/images/elements/round-shape.png'
import Image from 'next/image'
import { CiStar } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick.css'

// css
import { Media, User } from '@/payload-types'
import { trpc } from '@/trpc/client'

const Testimonial = () => {
  const { data: testimonials } = trpc.public.getTestimonials.useQuery()

  const NextBtn = ({ onClick }: any) => {
    return (
      <button
        type='button'
        className='next-button-slick next-slick-button-position'
        onClick={onClick}
      >
        <i className='las la-angle-left'></i>
      </button>
    )
  }

  const PrevBtn = ({ onClick }: any) => {
    return (
      <button
        type='button'
        className='next-button-slick prev-slick-button'
        onClick={onClick}
      >
        <i className='las la-angle-right'></i>
      </button>
    )
  }
  const settings = {
    autoplay: true,
    speed: 700,
    infinite: true,
    // arrows: false,
    nextArrow: <PrevBtn />,
    prevArrow: <NextBtn />,
    slidesToShow: 1,
    slidesToScroll: 1,
    // vertical: true,
    //verticalSwiping: true,
    // swipeToSlide: true,
    // draggable: true,
  }
  return (
    <section className='has-bg--shape pt-120 pb-120'>
      <div className='bg-shape'>
        <div className='round-shape d-sm-block d-none'>
          <Image src={round_shape} alt='image' />
        </div>
        <div className='shape-1'></div>
        <div className='shape-2'></div>
        <div className='shape-3'></div>
        <div className='shape-4'></div>
        <div className='shape-5'></div>
        <div className='shape-6'></div>
      </div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-8 col-lg-9'>
            <div className='section-header text-center'>
              <span className='section-sub-title'>Testimonial</span>
              <h2 className='section-title'>{testimonials?.title}</h2>
              <p>{testimonials?.description}</p>
            </div>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='testimonial-area bg_img'>
              <Slider {...settings} className='testimonial-slider'>
                {testimonials?.reviews?.map((itm, i) => (
                  <div key={itm.id} className='testimonial-single'>
                    <div className='testimonial-single__thumb'>
                      <Image
                        src={((itm?.user as User).image as Media)?.url || ''}
                        alt='image'
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className='testimonial-single__content'>
                      <h4 className='client-name'>
                        {(itm.user as User).user_name}
                      </h4>
                      <p>{itm.review}</p>
                      <div className='ratings'>
                        {[...Array(itm?.rating)].map((_, i) => (
                          <i key={i}>
                            <FaStar fill='orange' />
                          </i>
                        ))}
                        {[...Array(5 - itm?.rating!)].map((_, i) => (
                          <i key={i}>
                            <CiStar fill='white' />
                          </i>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
