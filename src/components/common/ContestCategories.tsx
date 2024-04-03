import { Media, Tag } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

function ContestCategories({ allTags }: { allTags: Tag[] }) {
  return (
    <section className='position-relative z-index-two pt-120 pb-120 overflow-hidden'>
      <div className='container'>
        {/* <div className='row'>
          <div className='col-lg-6 text-sm-start text-center'>
            <div className='section-header'>
              <span className='section-sub-title'>Available Products</span>
            </div>
          </div>
        </div> */}
        <div className='row mb-none-30 justify-content-xl-start justify-content-center'>
          {allTags?.map(tag => (
            <div key={tag?.id} className='col-xl-3 col-lg-4 col-sm-6 mb-30'>
              <div className='play-card play-card--one'>
                <div className='play-card__icon'>
                  <Link
                    href={{
                      pathname: '/contest',
                      query: { tag: tag?.tag },
                    }}>
                    <Image
                      src={(tag?.img as Media)?.url || ''}
                      width={100}
                      height={100}
                      alt='image-icon'
                    />
                  </Link>
                </div>
                <div className='play-card__content'>
                  {tag?.is_coming_soon ? (
                    <span>
                      {' '}
                      <h3 className='play-card__title'>{tag?.tag}</h3>
                    </span>
                  ) : (
                    <h3 className='play-card__title'>{tag?.tag}</h3>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContestCategories
