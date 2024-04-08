import Image from 'next/image'

import { HowToPlayInfo, Media } from '@/payload-types'
import { trpc } from '@/trpc/client'
import play_el from '/public/images/elements/play-el.png'

const HowToPlay = () => {
  const { data: howToPlayInfoData }: { data: HowToPlayInfo | undefined } =
    trpc.public.getHowToPlayInfo.useQuery()

  return (
    <section className='position-relative z-index-two pt-120 pb-120 overflow-hidden'>
      <div className='play-elements'>
        <Image src={play_el} alt='image' />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 text-sm-start text-center'>
            <div className='section-header'>
              <span className='section-sub-title'>
                {howToPlayInfoData?.caption}
              </span>
              <h2 className='section-title'>{howToPlayInfoData?.title}</h2>
              <p>{howToPlayInfoData?.sub_title}</p>
            </div>
          </div>
        </div>
        <div className='row mb-none-30 justify-content-xl-start justify-content-center'>
          {howToPlayInfoData?.step?.map(step => (
            <div key={step?.id} className='col-xl-3 col-lg-4 col-sm-6 mb-30'>
              <div className='play-card play-card--one bg_img'>
                <div className='play-card__icon'>
                  <Image
                    src={(step?.icon as Media)?.url || ''}
                    alt={(step?.icon as Media)?.alt || ''}
                    height={70}
                    width={70}
                  />
                  <span className='play-card__number'>{step?.step_number}</span>
                </div>
                <div className='play-card__content'>
                  <h3 className='play-card__title'>{step?.title}</h3>
                  <p>{step?.sub_title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowToPlay
